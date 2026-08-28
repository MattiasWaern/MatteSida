import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questions from "../data/questions.json";
import GeometryRender from "../components/geometryRender";
import StatisticsRender from "../components/statisticsRender";
import "../styles/math.css";

function MathQuiz() {

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [result, setResult] = useState("");
    const [explanation, setExplanation] = useState([]);
    const { category, difficulty } = useParams();
    const categoryNames = {
        "linjara-ekvationer": "Linjära ekvationer",
        "andragradsekvationer": "Andragradsekvationer",
        "ekvationssystem": "Ekvationssystem",
        "geometriarea": "Geometri - Area",
        "geometricirkel": "Geometri - Cirkel",
        "geometripythagoras": "Geometri - Pythagoras",
        "geometrivolym": "Geometri - Volym",
        "statistik": "Statistik"
    };

    const selectedCategory = categoryNames[category]

    // 1. Filtrera frågorna
    const filteredQuestions = questions.filter((question) => {

        const categoryMatch =
            !category || question.category === selectedCategory;

        const difficultyMatch =
            !difficulty || question.difficulty === difficulty;

        return categoryMatch && difficultyMatch;
    });


    const [randomQuestion, setRandomQuestion] = useState(null);



    useEffect(() => {

        if (filteredQuestions.length === 0) {
            setRandomQuestion(null);
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * filteredQuestions.length
        );

        setRandomQuestion(filteredQuestions[randomIndex]);

        setAnswer1("");
        setAnswer2("");
        setResult("");
        setExplanation([]);

    }, [category, difficulty]);


    //Nästa fråga
    function nextQuestion() {

        const randomIndex = Math.floor(
            Math.random() * filteredQuestions.length
        );

        setRandomQuestion(filteredQuestions[randomIndex]);

        setAnswer1("");
        setAnswer2("");
        setResult("");
        setExplanation([]);
    }


    function checkAnswer() {

        if (randomQuestion.type === "single") {

            if (
                answer1.trim() ===
                randomQuestion.answer[0].trim()
            ) {
                setResult("Rätt!");
            } else {
                setResult("Fel!");
            }
        }


        if (randomQuestion.type === "multiple") {

            const userAnswers = [answer1, answer2]
                .map(answer => answer.trim())
                .sort();

            const correctAnswers = [...randomQuestion.answer]
                .map(answer => answer.trim())
                .sort();

            if (
                JSON.stringify(userAnswers) ===
                JSON.stringify(correctAnswers)
            ) {
                setResult("Rätt!");
            } else {
                setResult("Fel!");
            }
        }
    }

    function showExplanation() {

        setExplanation(
            randomQuestion.explanation.map((step, id) => (
                <p key={id}>
                    {step}
                </p>
            ))
        );
    }


    // Om inga frågor hittades
    if (!randomQuestion) {
        return (
            <div className="container">
                <section className="math-quiz">
                    <h2>Inga frågor hittades</h2>
                    <p>
                        Det finns inga frågor för den här kategorin och svårighetsgraden.
                    </p>
                </section>
            </div>
        );
    }


    const difficultyClass =
        randomQuestion.difficulty?.toLowerCase() === "easy"
            ? "diff-easy"
            : randomQuestion.difficulty?.toLowerCase() === "medium"
            ? "diff-medium"
            : "diff-hard";

    return (
        <div className="container">

            <section className="math-quiz">

                <h2>Lös {randomQuestion.category}</h2>

                <div className="tags">

                    <h3>
                        {randomQuestion.category}
                    </h3>

                    <h4 className={difficultyClass}>
                        {randomQuestion.difficulty}
                    </h4>

                </div>

                {randomQuestion.geometry && (
                    <div className="geometry-container">
                        <GeometryRender geometry={randomQuestion.geometry} />
                    </div>
                )}               

                {randomQuestion.statistics && (
                    <div className="statistics-container">
                        <StatisticsRender
                            statistics={randomQuestion.statistics}
                        />
                    </div>
                )}                

                <p className="question-text">
                    {randomQuestion.text}
                </p>


                {randomQuestion.type === "single" && (
                    <input
                        type="text"
                        value={answer1}
                        onChange={(event) =>
                            setAnswer1(event.target.value)
                        }
                        placeholder="Ditt svar"
                    />
                )}


                {randomQuestion.type === "multiple" && (
                    <div className="answer-row">
                        <input
                            type="text"
                            value={answer1}
                            onChange={(event) =>
                                setAnswer1(event.target.value)
                            }
                            placeholder="x₁"
                        />

                        <input
                            type="text"
                            value={answer2}
                            onChange={(event) =>
                                setAnswer2(event.target.value)
                            }
                            placeholder="x₂"
                        />
                    </div>
                )}


                <div className="button-row">

                    <button className="btn-primary" onClick={checkAnswer}>
                        Kontrollera
                    </button>

                    <button className="btn-secondary" onClick={nextQuestion}>
                        Nästa fråga
                    </button>

                    <button className="btn-secondary" onClick={showExplanation}>
                        Visa uträkning
                    </button>

                </div>


                <p id="results">
                    {result}
                </p>


                <div className="explanation">

                    <h4>
                        Såhär löser du:
                    </h4>

                    {explanation}

                </div>

            </section>

        </div>
    );
}

export default MathQuiz;