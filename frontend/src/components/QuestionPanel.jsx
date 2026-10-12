import { useId, useState } from "react";
import AnswerFields from "./AnswerFields";
import Feedback from "./Feedback";
import QuestionFigure from "./QuestionFigure";
import { difficultyClass, difficultyLabel } from "../data/categories.js";
import { isAnswerCorrect, normalize } from "../utils/checkAnswer";
import "../styles/question-panel.css";

// En fråga med svarsfält, kontroll, återkoppling och uträkning.
// Används både på startsidan och på övningssidan. Sätt `key` till ett nytt
// värde för varje ny fråga så nollställs allt.

function QuestionPanel({ question, onNext, nextLabel = "Nästa fråga", showMeta = false }) {
    const [answers, setAnswers] = useState(["", ""]);
    const [result, setResult] = useState(null);
    const [detail, setDetail] = useState(undefined);
    const [attempt, setAttempt] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    const solutionId = useId();

    function changeAnswer(index, value) {
        setAnswers((previous) => {
            const copy = [...previous];
            copy[index] = value;
            return copy;
        });
    }

    function checkAnswer(event) {
        event.preventDefault();

        const expected = question.type === "multiple" ? question.answer.length : 1;
        const filled = answers
            .slice(0, expected)
            .filter((value) => normalize(value) !== "").length;

        setAttempt((count) => count + 1);

        if (filled === 0) {
            setResult("empty");
            setDetail(undefined);
            return;
        }

        if (filled < expected) {
            setResult("empty");
            setDetail(`Den här uppgiften har ${expected} lösningar. Fyll i alla fält.`);
            return;
        }

        setDetail(undefined);
        setResult(isAnswerCorrect(question, answers[0], answers[1]) ? "correct" : "wrong");
    }

    return (
        <div className="question-panel">
            <form className="question-form" onSubmit={checkAnswer} noValidate>
                {showMeta && (
                    <div className="question-meta">
                        <span className="badge badge--category">{question.category}</span>
                        <span className={`badge ${difficultyClass(question.difficulty)}`}>
                            {difficultyLabel(question.difficulty)}
                        </span>
                    </div>
                )}

                <p className="question-text">{question.text}</p>

                <QuestionFigure question={question} />

                <AnswerFields question={question} values={answers} onChange={changeAnswer} />

                <div className="btn-row btn-row--center">
                    <button type="submit" className="btn btn-primary">
                        Kontrollera svar
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        aria-expanded={showSolution}
                        aria-controls={solutionId}
                        onClick={() => setShowSolution((open) => !open)}
                    >
                        {showSolution ? "Dölj uträkning" : "Visa uträkning"}
                    </button>

                    {onNext && (
                        <button type="button" className="btn btn-outline" onClick={onNext}>
                            {nextLabel}
                        </button>
                    )}
                </div>
            </form>

            <Feedback result={result} attempt={attempt} detail={detail} />

            <div id={solutionId}>
                {showSolution && (
                    <section className="explanation">
                        <h2>Så här löser du uppgiften</h2>
                        {question.explanation.map((step, index) => (
                            <p key={index}>{step}</p>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}

export default QuestionPanel;
