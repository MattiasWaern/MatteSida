import { useEffect, useRef, useState } from "react";
import questions from "../data/index.js";
import AnswerFields from "../components/AnswerFields.jsx";
import QuestionFigure from "../components/QuestionFigure.jsx";
import { isAnswerCorrect, normalize } from "../utils/checkAnswer";
import "../styles/prov.css";

const QUESTION_COUNT = 20;
const EXAM_MINUTES = 60;
const EXAM_SECONDS = EXAM_MINUTES * 60;
const POINTS_PER_QUESTION = 2;
const LOW_TIME_SECONDS = 5 * 60;

// Fisher–Yates. (sort(() => Math.random() - 0.5) ger ojämn blandning)
function shuffle(list) {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

// Meddelande för skärmläsare vid vissa tidpunkter
function timeNotice(seconds) {
    if (seconds <= 60) return "Mindre än 1 minut kvar.";
    if (seconds <= 300) return "Mindre än 5 minuter kvar.";
    if (seconds <= 600) return "Mindre än 10 minuter kvar.";
    return "";
}

function hasAnswer(answer) {
    return (
        !!answer &&
        (normalize(answer.answer1) !== "" || normalize(answer.answer2) !== "")
    );
}

function answerText(answer) {
    if (!answer) return "";

    return [answer.answer1, answer.answer2]
        .filter((value) => normalize(value) !== "")
        .join(", ");
}

function Prov() {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const [examQuestions, setExamQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState([]);

    const [endsAt, setEndsAt] = useState(0);
    const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);

    const [confirming, setConfirming] = useState(false);
    const [onlyWrong, setOnlyWrong] = useState(false);

    const dialogRef = useRef(null);


    function startExam() {
        setExamQuestions(shuffle(questions).slice(0, QUESTION_COUNT));
        setCurrentIndex(0);
        setAnswers({});
        setMarked([]);
        setConfirming(false);
        setOnlyWrong(false);

        setTimeLeft(EXAM_SECONDS);
        setEndsAt(Date.now() + EXAM_SECONDS * 1000);

        setStarted(true);
        setFinished(false);
    }


    // Tiden räknas mot en sluttid och inte genom att räkna ticks. Då går
    // klockan rätt även om fliken pausas (t.ex. i Safari på iPad).
    useEffect(() => {
        if (!started || finished) return undefined;

        const timer = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil((endsAt - Date.now()) / 1000)
            );

            setTimeLeft(remaining);

            if (remaining === 0) {
                setConfirming(false);
                setFinished(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [started, finished, endsAt]);


    // Bekräftelserutan är ett riktigt <dialog> (fokusfälla + Esc ingår)
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (confirming && !dialog.open) dialog.showModal();
        if (!confirming && dialog.open) dialog.close();
    }, [confirming]);


    function handleAnswer(value, answerNumber) {
        setAnswers((previous) => ({
            ...previous,
            [currentIndex]: {
                ...previous[currentIndex],
                [`answer${answerNumber}`]: value,
            },
        }));
    }

    function toggleMark() {
        setMarked((previous) =>
            previous.includes(currentIndex)
                ? previous.filter((index) => index !== currentIndex)
                : [...previous, currentIndex]
        );
    }

    function submitExam() {
        setConfirming(false);
        setFinished(true);
    }


    /* ---------- STARTSKÄRM ---------- */

    if (!started) {
        return (
            <div className="page page--narrow">
                <section className="card exam-start" aria-labelledby="exam-title">

                    <p className="eyebrow">Matematik 2</p>
                    <h1 id="exam-title" className="page-title">Prov</h1>

                    <p className="lead">
                        Testa dina kunskaper med uppgifter från alla områden.
                    </p>

                    <ul className="exam-info">
                        <li>
                            <strong>{QUESTION_COUNT}</strong>
                            <span>Uppgifter</span>
                        </li>
                        <li>
                            <strong>{EXAM_MINUTES}</strong>
                            <span>Minuter</span>
                        </li>
                        <li>
                            <strong>{POINTS_PER_QUESTION}</strong>
                            <span>Poäng per uppgift</span>
                        </li>
                    </ul>

                    <div className="exam-rules">
                        <h2>Innan du börjar</h2>

                        <ul>
                            <li>Du har {EXAM_MINUTES} minuter på dig.</li>
                            <li>Du kan gå tillbaka till tidigare uppgifter.</li>
                            <li>Du kan markera uppgifter som du vill återkomma till.</li>
                            <li>Dina svar rättas när du lämnar in provet.</li>
                        </ul>
                    </div>

                    <button type="button" className="btn btn-primary btn-large" onClick={startExam}>
                        Starta prov
                    </button>

                </section>
            </div>
        );
    }


    /* ---------- RESULTAT ---------- */

    if (finished) {
        const results = examQuestions.map((question, index) => {
            const answer = answers[index];

            return {
                question,
                index,
                answer,
                answered: hasAnswer(answer),
                correct:
                    hasAnswer(answer) &&
                    isAnswerCorrect(question, answer.answer1, answer.answer2),
            };
        });

        const score = results.filter((item) => item.correct).length;
        const answeredTotal = results.filter((item) => item.answered).length;
        const percent = Math.round((score / examQuestions.length) * 100);

        const visibleResults = onlyWrong
            ? results.filter((item) => !item.correct)
            : results;

        return (
            <div className="page page--narrow">
                <section className="card exam-result" aria-labelledby="result-title">

                    <p className="eyebrow">Matematik 2</p>
                    <h1 id="result-title" className="page-title">Provresultat</h1>

                    <div className="score" role="status">
                        <strong>
                            {score} / {examQuestions.length}
                        </strong>
                        <span>{percent} % rätt</span>
                    </div>

                    <p className="score-note">
                        Du svarade på {answeredTotal} av {examQuestions.length} uppgifter.
                    </p>

                    <div className="result-tools">
                        <label className="check">
                            <input
                                type="checkbox"
                                checked={onlyWrong}
                                onChange={(event) => setOnlyWrong(event.target.checked)}
                            />
                            <span>Visa bara uppgifter jag missade</span>
                        </label>

                        <button type="button" className="btn btn-primary" onClick={startExam}>
                            Gör om provet
                        </button>
                    </div>

                    {visibleResults.length === 0 ? (
                        <p className="result-empty">Du hade alla rätt. Snyggt jobbat!</p>
                    ) : (
                        <ol className="result-list">
                            {visibleResults.map((item) => {
                                const state = item.correct
                                    ? "correct"
                                    : item.answered
                                    ? "wrong"
                                    : "skipped";

                                const stateLabel = {
                                    correct: "Rätt",
                                    wrong: "Fel",
                                    skipped: "Inte besvarad",
                                }[state];

                                const stateIcon = { correct: "✓", wrong: "✕", skipped: "–" }[state];

                                return (
                                    <li
                                        key={item.index}
                                        value={item.index + 1}
                                        className={`result-item result-item--${state}`}
                                    >
                                        <p className="result-state">
                                            <span aria-hidden="true">{stateIcon}</span>
                                            <span>
                                                Uppgift {item.index + 1}: {stateLabel}
                                            </span>
                                        </p>

                                        <p className="result-question">{item.question.text}</p>

                                        <p>
                                            <strong>Ditt svar:</strong>{" "}
                                            {item.answered ? answerText(item.answer) : "Inget svar"}
                                        </p>

                                        <p>
                                            <strong>Rätt svar:</strong>{" "}
                                            {item.question.answer.join(", ")}
                                        </p>

                                        <details className="result-solution">
                                            <summary>Visa uträkning</summary>

                                            {item.question.explanation.map((step, stepIndex) => (
                                                <p key={stepIndex}>{step}</p>
                                            ))}
                                        </details>
                                    </li>
                                );
                            })}
                        </ol>
                    )}

                </section>
            </div>
        );
    }


    /* ---------- PÅGÅENDE PROV ---------- */

    const question = examQuestions[currentIndex];

    if (!question) return null;

    const current = answers[currentIndex] ?? {};
    const answeredCount = examQuestions.filter((_, index) => hasAnswer(answers[index])).length;
    const unanswered = examQuestions.length - answeredCount;
    const isLast = currentIndex === examQuestions.length - 1;
    const isMarked = marked.includes(currentIndex);
    const lowTime = timeLeft <= LOW_TIME_SECONDS;

    return (
        <div className="page prov-page">

            <div className="card exam">

                <header className="exam-header">
                    <div>
                        <h1>Prov i Matematik 2</h1>
                        <p>
                            Uppgift {currentIndex + 1} av {examQuestions.length}
                        </p>
                    </div>

                    <div className={`timer ${lowTime ? "timer--low" : ""}`}>
                        <span className="timer-label">Tid kvar</span>
                        <span className="timer-value" role="timer" aria-label="Tid kvar">
                            {formatTime(timeLeft)}
                        </span>
                        {lowTime && <span className="timer-note">Lite tid kvar</span>}
                    </div>
                </header>

                {/* Tidsmeddelanden till skärmläsare */}
                <p className="sr-only" role="status" aria-live="polite">
                    {timeNotice(timeLeft)}
                </p>

                <div className="exam-body">

                    <section className="exam-question" aria-label={`Uppgift ${currentIndex + 1}`}>

                        <div className="exam-question-top">
                            <span className="badge badge--category">{question.category}</span>

                            <button
                                type="button"
                                className="btn btn-outline btn-small mark-button"
                                aria-pressed={isMarked}
                                onClick={toggleMark}
                            >
                                <span aria-hidden="true">⚑</span>
                                {isMarked ? "Markerad" : "Markera för senare"}
                            </button>
                        </div>

                        <h2 className="question-text">{question.text}</h2>

                        <QuestionFigure question={question} />

                        <AnswerFields
                            key={currentIndex}
                            question={question}
                            values={[current.answer1, current.answer2]}
                            onChange={(index, value) => handleAnswer(value, index + 1)}
                        />

                        <div className="exam-nav">
                            <button
                                type="button"
                                className="btn btn-outline"
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex(currentIndex - 1)}
                            >
                                ← Föregående
                            </button>

                            {isLast ? (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setConfirming(true)}
                                >
                                    Lämna in prov
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setCurrentIndex(currentIndex + 1)}
                                >
                                    Nästa →
                                </button>
                            )}
                        </div>

                    </section>


                    <aside className="exam-sidebar" aria-label="Översikt">

                        <h2>Uppgifter</h2>

                        <p className="sidebar-count">
                            {answeredCount} av {examQuestions.length} besvarade
                        </p>

                        <nav aria-label="Uppgiftsnavigering">
                            <ul className="question-grid">
                                {examQuestions.map((_, index) => {
                                    const answered = hasAnswer(answers[index]);
                                    const isCurrent = currentIndex === index;
                                    const flagged = marked.includes(index);

                                    const classes = [
                                        "question-number",
                                        isCurrent ? "is-current" : "",
                                        answered ? "is-answered" : "",
                                        flagged ? "is-marked" : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ");

                                    return (
                                        <li key={index}>
                                            <button
                                                type="button"
                                                className={classes}
                                                aria-current={isCurrent ? "step" : undefined}
                                                aria-label={`Uppgift ${index + 1}, ${
                                                    answered ? "besvarad" : "inte besvarad"
                                                }${flagged ? ", markerad" : ""}`}
                                                onClick={() => setCurrentIndex(index)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <ul className="legend">
                            <li>
                                <span className="legend-swatch legend-swatch--answered" aria-hidden="true"></span>
                                Besvarad
                            </li>
                            <li>
                                <span className="legend-swatch" aria-hidden="true"></span>
                                Inte besvarad
                            </li>
                            <li>
                                <span className="legend-swatch legend-swatch--marked" aria-hidden="true"></span>
                                Markerad
                            </li>
                        </ul>

                        <button
                            type="button"
                            className="btn btn-secondary submit-early"
                            onClick={() => setConfirming(true)}
                        >
                            Lämna in prov
                        </button>

                    </aside>

                </div>

            </div>


            {/* Bekräfta innan provet lämnas in */}
            <dialog
                ref={dialogRef}
                className="confirm-dialog"
                aria-labelledby="confirm-title"
                onClose={() => setConfirming(false)}
            >
                <h2 id="confirm-title">Lämna in provet?</h2>

                <p>
                    Du har besvarat {answeredCount} av {examQuestions.length} uppgifter.
                    {unanswered > 0 && ` ${unanswered} saknar svar.`} Du kan inte ändra
                    något efter att du har lämnat in.
                </p>

                <div className="btn-row">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setConfirming(false)}
                    >
                        Fortsätt med provet
                    </button>

                    <button type="button" className="btn btn-primary" onClick={submitExam}>
                        Lämna in
                    </button>
                </div>
            </dialog>

        </div>
    );
}

export default Prov;
