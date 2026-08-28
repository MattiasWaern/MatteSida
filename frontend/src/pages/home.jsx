import questions from "../data/index.js";
import { useState, useEffect } from "react";
import GeometryRender from "../components/geometryRender";
import StatisticsRender from "../components/statisticsRender.jsx";
import "../styles/home.css";

function Home() {
    // Spara den slumpade frågan i state så den inte ändras
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [result, setResult] = useState("");
    const [explanation, setExplanation] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

  

    // Funktion för att hämta en ny slumpmässig fråga
    const getNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
        setAnswer1("");
        setAnswer2("");
        setResult("");
        setExplanation([]);
        setShowExplanation(false);
          console.log(randomIndex)
    };

    // Hämta första frågan när komponenten laddas
    useEffect(() => {
        getNewQuestion();
    }, []); 

    // Om frågan inte är laddad än, visa laddningsmeddelande
    if (!currentQuestion) {
        return <main>Laddar fråga...</main>;
    }

    function checkAnswer() {
        if (currentQuestion.type === "single") {
            if (answer1.trim() === currentQuestion.answer[0].trim()) {
                setResult("Rätt!");
            } else {
                setResult("Fel! Försök igen.");
            }
        }

        if (currentQuestion.type === "multiple") {
            const userAnswers = [answer1, answer2]
                .map(answer => answer.trim())
                .filter(answer => answer !== "")
                .sort();

            const correctAnswers = [...currentQuestion.answer]
                .map(answer => answer.trim())
                .sort();

            if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
                setResult("Rätt!");
            } else {
                setResult("Fel! Försök igen.");
            }
        }
    }

    function handleShowExplanation() {
        setShowExplanation(true);
        const explanationElements = currentQuestion.explanation.map((step, id) => (
            <p key={id}>{step}</p>
        ));
        setExplanation(explanationElements);
    }

    return (
        <main>
            <h1>DAGENS FRÅGA</h1>
            
            <div className="question-container">
                <p className="question-text">{currentQuestion.text}</p>
                <p className="question-meta">
                    Kategori: {currentQuestion.category} | 
                    Svårighet: {currentQuestion.difficulty}
                </p>
            </div>

                {currentQuestion.geometry && (
                    <div className="geometry-container">
                        <GeometryRender geometry={currentQuestion.geometry} />
                    </div>
                )}  

                {currentQuestion.statistics && (
                    <div className="statistics-container">
                        <StatisticsRender
                            statistics={currentQuestion.statistics}
                        />
                    </div>
                )}                      

            {currentQuestion.type === "single" && (
                <input
                    type="text"
                    value={answer1}
                    onChange={(event) => setAnswer1(event.target.value)}
                    placeholder="Skriv ditt svar här"
                    className="answer-input"
                />
            )}

            {currentQuestion.type === "multiple" && (
                <div className="answer-row">
                    <input
                        type="text"
                        value={answer1}
                        onChange={(event) => setAnswer1(event.target.value)}
                        placeholder="x₁ = ?"
                        className="answer-input"
                    />
                    <input
                        type="text"
                        value={answer2}
                        onChange={(event) => setAnswer2(event.target.value)}
                        placeholder="x₂ = ?"
                        className="answer-input"
                    />
                </div>
            )}

            <div className="button-group">
                <button className="btn-primary" onClick={checkAnswer}>
                    Kontrollera svar
                </button>
                <button className="btn-secondary" onClick={handleShowExplanation}>
                    Visa uträkning
                </button>
            </div>

            {result && <p className="result">{result}</p>}

            {showExplanation && (
                <div className="explanation">
                    <h4>Såhär löser du uppgiften:</h4>
                    {explanation}
                </div>
            )}
        </main>
    );
}

export default Home;