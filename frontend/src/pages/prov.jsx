import { useEffect, useState } from "react";
import questions from "../data/index.js";
import GeometryRender from "../components/geometryRender";
import StatisticsRender from "../components/statisticsRender";
import "../styles/prov.css";

function Prov() {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const [examQuestions, setExamQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState([]);

    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minuter


    function startExam() {
        const shuffledQuestions = [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 20); // antal frågor

        setExamQuestions(shuffledQuestions);
        setCurrentQuestion(0);
        setAnswers({});
        setMarkedQuestions([]);
        setTimeLeft(60 * 60);

        setStarted(true);
        setFinished(false);
    }


    useEffect(() => {
        if (!started || finished) return;

        if (timeLeft <= 0) {
            submitExam();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((time) => time - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [started, finished, timeLeft]);


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }


    function handleAnswer(value, answerNumber = 1) {
        setAnswers((previousAnswers) => ({
            ...previousAnswers,

            [currentQuestion]: {
                ...previousAnswers[currentQuestion],
                [`answer${answerNumber}`]: value,
            },
        }));
    }


    const question = examQuestions[currentQuestion];


    function toggleMark() {
        setMarkedQuestions((previous) => {
            if (previous.includes(currentQuestion)) {
                return previous.filter(
                    (questionIndex) => questionIndex !== currentQuestion
                );
            }

            return [...previous, currentQuestion];
        });
    }


    function submitExam() {
        setFinished(true);
    }


    function calculateScore() {
        let score = 0;

        examQuestions.forEach((question, index) => {
            const userAnswer = answers[index];

            if (!userAnswer) return;

            if (question.type === "single") {
                const answer = userAnswer.answer1
                    ?.trim()
                    .toLowerCase();

                const correct = question.answer.some(
                    (correctAnswer) =>
                        answer === correctAnswer.trim().toLowerCase()
                );

                if (correct) {
                    score++;
                }
            }

            if (question.type === "multiple") {
                const userAnswers = [
                    userAnswer.answer1 || "",
                    userAnswer.answer2 || "",
                ]
                    .map((answer) => answer.trim().toLowerCase())
                    .sort();

                const correctAnswers = [...question.answer]
                    .map((answer) => answer.trim().toLowerCase())
                    .sort();

                if (
                    JSON.stringify(userAnswers) ===
                    JSON.stringify(correctAnswers)
                ) {
                    score++;
                }
            }
        });

        return score;
    }


    if (!started) {
        return (
            <div className="prov-container">
                <section className="prov-start">

                    <h1>Matematik 2</h1>

                    <h2>Prov</h2>

                    <p>
                        Testa dina kunskaper inom matematik 2.
                    </p>

                    <div className="prov-info">

                        <div>
                            <strong>20</strong>
                            <span>Uppgifter</span>
                        </div>

                        <div>
                            <strong>60</strong>
                            <span>Minuter</span>
                        </div>

                        <div>
                            <strong>2</strong>
                            <span>Poäng / uppgift</span>
                        </div>

                    </div>

                    <div className="prov-rules">

                        <h3>Innan du börjar</h3>

                        <ul>
                            <li>Du har 60 minuter på dig.</li>
                            <li>Du kan gå tillbaka till tidigare frågor.</li>
                            <li>Dina svar rättas när du lämnar in provet.</li>
                            <li>Du kan markera frågor som du vill återkomma till.</li>
                        </ul>

                    </div>

                    <button
                        className="prov-start-button"
                        onClick={startExam}
                    >
                        Starta prov
                    </button>

                </section>
            </div>
        );
    }


    if (finished) {
        const score = calculateScore();

        return (
            <div className="prov-container">

                <section className="prov-result">

                    <h1>Provresultat</h1>

                    <div className="score">
                        <strong>
                            {score} / {examQuestions.length}
                        </strong>

                        <span>
                            {Math.round(
                                (score / examQuestions.length) * 100
                            )}%
                        </span>
                    </div>

                    <h3>
                        Du svarade på{" "}
                        {Object.keys(answers).length} av{" "}
                        {examQuestions.length} frågor.
                    </h3>

                    <div className="result-list">

                        {examQuestions.map((question, index) => {

                            const userAnswer = answers[index];

                            let correct = false;

                            if (userAnswer) {

                                if (question.type === "single") {

                                    correct = question.answer.some(
                                        (correctAnswer) =>
                                            userAnswer.answer1
                                                ?.trim()
                                                .toLowerCase() ===
                                            correctAnswer
                                                .trim()
                                                .toLowerCase()
                                    );

                                } else if (question.type === "multiple") {

                                    const userAnswers = [
                                        userAnswer.answer1 || "",
                                        userAnswer.answer2 || "",
                                    ]
                                        .map((answer) =>
                                            answer.trim().toLowerCase()
                                        )
                                        .sort();

                                    const correctAnswers = [
                                        ...question.answer,
                                    ]
                                        .map((answer) =>
                                            answer.trim().toLowerCase()
                                        )
                                        .sort();

                                    correct =
                                        JSON.stringify(userAnswers) ===
                                        JSON.stringify(correctAnswers);
                                }
                            }

                            return (
                                <div
                                    key={index}
                                    className={
                                        correct
                                            ? "result-item correct"
                                            : "result-item incorrect"
                                    }
                                >
                                    <strong>
                                        {index + 1}.{" "}
                                        {correct ? "Rätt" : "Fel"}
                                    </strong>

                                    <p>
                                        {question.text}
                                    </p>

                                    <p>
                                        <strong>Ditt svar:</strong>{" "}
                                        {userAnswer?.answer1 || "Ej besvarad"}
                                    </p>

                                    <p>
                                        <strong>Rätt svar:</strong>{" "}
                                        {question.answer.join(", ")}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                    <button
                        className="prov-start-button"
                        onClick={startExam}
                    >
                        Gör om provet
                    </button>

                </section>

            </div>
        );
    }

    if (!question) return null;

    const currentAnswer = answers[currentQuestion] || {};

    return (
        <div className="prov-container">

            <section className="prov">

                <header className="prov-header">

                    <div>
                        <h1>Matematik 2</h1>
                        <span>
                            Uppgift {currentQuestion + 1} av{" "}
                            {examQuestions.length}
                        </span>
                    </div>

                    <div className="timer">
                        {formatTime(timeLeft)}
                    </div>

                </header>


                <div className="prov-content">

                    <main className="prov-question">

                        <div className="question-top">

                            <span>
                                {question.category}
                            </span>

                            <button
                                className={
                                    markedQuestions.includes(
                                        currentQuestion
                                    )
                                        ? "marked"
                                        : ""
                                }
                                onClick={toggleMark}
                            >
                                Markera
                            </button>

                        </div>


                        {question.geometry && (
                            <div className="geometry-container">
                                <GeometryRender
                                    geometry={question.geometry}
                                />
                            </div>
                        )}


                        {question.statistics && (
                            <div className="statistics-container">
                                <StatisticsRender
                                    statistics={question.statistics}
                                />
                            </div>
                        )}


                        <h2 className="question-text">
                            {question.text}
                        </h2>


                        {question.type === "single" && (
                            <input
                                type="text"
                                value={currentAnswer.answer1 || ""}
                                onChange={(event) =>
                                    handleAnswer(
                                        event.target.value
                                    )
                                }
                                placeholder="Skriv ditt svar"
                            />
                        )}


                        {question.type === "multiple" && (
                            <div className="answer-row">

                                <input
                                    type="text"
                                    value={
                                        currentAnswer.answer1 || ""
                                    }
                                    onChange={(event) =>
                                        handleAnswer(
                                            event.target.value,
                                            1
                                        )
                                    }
                                    placeholder="x₁"
                                />

                                <input
                                    type="text"
                                    value={
                                        currentAnswer.answer2 || ""
                                    }
                                    onChange={(event) =>
                                        handleAnswer(
                                            event.target.value,
                                            2
                                        )
                                    }
                                    placeholder="x₂"
                                />

                            </div>
                        )}


                        <div className="navigation-buttons">

                            <button
                                disabled={currentQuestion === 0}
                                onClick={() =>
                                    setCurrentQuestion(
                                        currentQuestion - 1
                                    )
                                }
                            >
                                ← Föregående
                            </button>


                            {currentQuestion <
                            examQuestions.length - 1 ? (

                                <button
                                    onClick={() =>
                                        setCurrentQuestion(
                                            currentQuestion + 1
                                        )
                                    }
                                >
                                    Nästa →
                                </button>

                            ) : (

                                <button
                                    className="submit-button"
                                    onClick={submitExam}
                                >
                                    Lämna in prov
                                </button>

                            )}

                        </div>

                    </main>


                    <aside className="prov-sidebar">

                        <h3>Uppgifter</h3>

                        <div className="question-grid">

                            {examQuestions.map(
                                (_, index) => {

                                    const answered =
                                        answers[index];

                                    const marked =
                                        markedQuestions.includes(
                                            index
                                        );

                                    return (
                                        <button
                                            key={index}
                                            className={`
                                                question-number
                                                ${
                                                    currentQuestion ===
                                                    index
                                                        ? "active"
                                                        : ""
                                                }
                                                ${
                                                    answered
                                                        ? "answered"
                                                        : ""
                                                }
                                                ${
                                                    marked
                                                        ? "marked"
                                                        : ""
                                                }
                                            `}
                                            onClick={() =>
                                                setCurrentQuestion(
                                                    index
                                                )
                                            }
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                }
                            )}

                        </div>


                        <div className="legend">

                            <p>🟩Besvarad</p>
                            <p>⬛Ej besvarad</p>
                            <p>🟨Markerad</p>

                        </div>

                    </aside>

                </div>

            </section>

        </div>
    );
}

export default Prov;