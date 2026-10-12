import { Link } from "react-router-dom";
import questions from "../data/index.js";
import { categories, difficulties } from "../data/categories.js";
import QuestionPanel from "../components/QuestionPanel.jsx";
import useRandomQuestion from "../utils/useRandomQuestion.js";
import "../styles/home.css";

// Antal uppgifter per område, räknas en gång
const questionCount = categories.reduce((counts, item) => {
    counts[item.slug] = questions.filter(
        (question) => question.category === item.category
    ).length;
    return counts;
}, {});

function Home() {
    const { question, serial, next } = useRandomQuestion(questions);

    return (
        <div className="page home">

            {/* HERO */}
            <section className="hero" aria-labelledby="home-title">
                <p className="eyebrow">Matematik 2</p>

                <h1 id="home-title" className="page-title">
                    Öva matte i din egen takt Annika
                </h1>

                <p className="lead">
                    Lös hundratals uppgifter inom {categories.length} områden
                </p>

                <div className="btn-row hero-actions">
                    <Link to="/quiz/linjara-ekvationer/easy" className="btn btn-primary">
                        Börja öva
                    </Link>
                    <Link to="/Prov" className="btn btn-outline">
                        Gör ett prov
                    </Link>
                </div>
            </section>

            {/* PROVA EN FRÅGA */}
            {question && (
                <section className="card try-card" aria-labelledby="try-title">
                    <h2 id="try-title" className="section-title">
                        Testa en fråga
                    </h2>

                    <QuestionPanel
                        key={serial}
                        question={question}
                        onNext={next}
                        nextLabel="Ny fråga"
                        showMeta
                    />
                </section>
            )}

            {/* OMRÅDEN */}
            <section className="areas" aria-labelledby="areas-title">
                <h2 id="areas-title" className="section-title">
                    Välj område
                </h2>

                <ul className="area-grid">
                    {categories.map((category) => (
                        <li className="area-card" key={category.slug}>
                            <h3>{category.label}</h3>
                            <p>{category.blurb}</p>

                            <p className="area-count">
                                {questionCount[category.slug]} uppgifter
                            </p>

                            <div className="area-levels">
                                {difficulties.map((difficulty) => (
                                    <Link
                                        key={difficulty.slug}
                                        to={`/quiz/${category.slug}/${difficulty.slug}`}
                                        className={`badge badge--${difficulty.slug}`}
                                        aria-label={`${category.label}, ${difficulty.label}`}
                                    >
                                        {difficulty.label}
                                    </Link>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
}

export default Home;
