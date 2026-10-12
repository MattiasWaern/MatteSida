import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import questions from "../data/index.js";
import { difficulties, difficultyLabel, getCategory } from "../data/categories.js";
import QuestionPanel from "../components/QuestionPanel.jsx";
import useRandomQuestion from "../utils/useRandomQuestion.js";
import "../styles/math.css";

// En övningsomgång. Monteras om (via key) när område eller nivå byts.
function QuizSession({ list }) {
    const { question, serial, next } = useRandomQuestion(list);

    return <QuestionPanel key={serial} question={question} onNext={next} />;
}

function MathQuiz() {
    const { category, difficulty } = useParams();

    const selected = getCategory(category);

    const list = useMemo(() => {
        if (!selected) return [];

        return questions.filter(
            (question) =>
                question.category === selected.category &&
                (!difficulty || question.difficulty === difficulty)
        );
    }, [selected, difficulty]);

    const title = selected?.label ?? "Okänt område";

    return (
        <div className="page page--narrow quiz-page">

            <header className="quiz-header">
                <p className="eyebrow">Öva</p>
                <h1 className="page-title">{title}</h1>

                <nav aria-label="Svårighetsgrad" className="level-switcher">
                    <ul>
                        {difficulties.map((level) => (
                            <li key={level.slug}>
                                <Link
                                    to={`/quiz/${category}/${level.slug}`}
                                    className={`badge badge--${level.slug}`}
                                    aria-current={level.slug === difficulty ? "page" : undefined}
                                >
                                    {level.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {list.length > 0 && (
                    <p className="quiz-count">
                        {list.length} uppgifter på nivån {difficultyLabel(difficulty).toLowerCase()}
                    </p>
                )}
            </header>

            <section className="card" aria-label="Uppgift">
                {list.length === 0 ? (
                    <div className="quiz-empty">
                        <h2>Inga uppgifter här än</h2>
                        <p>
                            Det finns inga uppgifter för det här området och den här nivån.
                            Prova en annan nivå eller välj ett annat område.
                        </p>
                        <Link to="/" className="btn btn-primary">
                            Till startsidan
                        </Link>
                    </div>
                ) : (
                    <QuizSession key={`${category}/${difficulty}`} list={list} />
                )}
            </section>

        </div>
    );
}

export default MathQuiz;
