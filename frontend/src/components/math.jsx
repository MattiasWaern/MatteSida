import { useState, useEffect } from "react";
import "../styles/math.css";

function MathQuiz({ category, difficulty }) {

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [result, setResult] = useState("");
    const [explanation, setExplanation] = useState([]);

    const questions = [
        {
            text: "x² - 5x + 6 = 0",
            answer: ["2", "3"],
            type: "multiple",
            category: "Andragradsekvationer",
            difficulty: "medium",
            explanation: [
                "Faktorisera ekvationen.",
                "(x - 2)(x - 3) = 0",
                "En produkt är noll om någon av faktorerna är noll.",
                "x - 2 = 0 → x = 2",
                "x - 3 = 0 → x = 3",
                "Alltså är x = 2 eller x = 3."
            ]
        },

        {
            text: "x² - 9 = 0",
            answer: ["3", "-3"],
            type: "multiple",
            category: "Andragradsekvationer",
            difficulty: "easy",
            explanation: [
                "Flytta -9 till högerledet.",
                "x² = 9",
                "Ta roten ur båda leden.",
                "x = ±√9",
                "√9 = 3",
                "Alltså är x = 3 eller x = -3."
            ]
        },

        {
            text: "3x² - 12x = 0",
            answer: ["0", "4"],
            type: "multiple",
            category: "Andragradsekvationer",
            difficulty: "medium",
            explanation: [
                "Bryt ut den gemensamma faktorn 3x.",
                "3x(x - 4) = 0",
                "En produkt är noll om någon av faktorerna är noll.",
                "3x = 0 → x = 0",
                "x - 4 = 0 → x = 4",
                "Alltså är x = 0 eller x = 4."
            ]
        },

        {
            text: "x² - 6x + 8 = 0",
            answer: ["2", "4"],
            type: "multiple",
            category: "Andragradsekvationer",
            difficulty: "medium",
            explanation: [
                "Identifiera p och q.",
                "p = -6 och q = 8",
                "Använd pq-formeln: x = -p/2 ± √((p/2)² - q)",
                "x = 3 ± √(9 - 8)",
                "x = 3 ± 1",
                "x = 3 + 1 = 4",
                "x = 3 - 1 = 2",
                "Alltså är x = 2 eller x = 4."
            ]
        },

        {
            text: "2x² + 8x - 24 = 0",
            answer: ["2", "-6"],
            type: "multiple",
            category: "Andragradsekvationer",
            difficulty: "hard",
            explanation: [
                "Dividera hela ekvationen med 2.",
                "x² + 4x - 12 = 0",
                "Identifiera p och q.",
                "p = 4 och q = -12",
                "Använd pq-formeln.",
                "x = -2 ± √(4 + 12)",
                "x = -2 ± √16",
                "x = -2 ± 4",
                "x = -2 + 4 = 2",
                "x = -2 - 4 = -6",
                "Alltså är x = 2 eller x = -6."
            ]
        },

        {
            text: "x² - 4x + 5 = 0",
            answer: [""],
            type: "single",
            category: "Andragradsekvationer",
            difficulty: "hard",
            explanation: [
                "Identifiera p och q.",
                "p = -4 och q = 5",
                "Använd pq-formeln.",
                "x = 2 ± √(4 - 5)",
                "x = 2 ± √(-1)",
                "√(-1) är inte ett reellt tal.",
                "Alltså saknar ekvationen reella lösningar."
            ]
        },

        {
            text: "2x + 7 = 15",
            answer: ["4"],
            type: "single",
            category: "Linjära ekvationer",
            difficulty: "easy",
            explanation: [
                "Subtrahera 7 från båda leden.",
                "2x = 8",
                "Dividera båda leden med 2.",
                "x = 4"
            ]
        },

        {
            text: "4x + 7 = 23",
            answer: ["4"],
            type: "single",
            category: "Linjära ekvationer",
            difficulty: "easy",
            explanation: [
                "Subtrahera 7 från båda leden.",
                "4x = 16",
                "Dividera båda leden med 4.",
                "x = 4"
            ]
        },

        {
            text: "2(x - 3) + 4 = 3x - 5",
            answer: ["3"],
            type: "single",
            category: "Linjära ekvationer",
            difficulty: "medium",
            explanation: [
                "Multiplicera in 2 i parentesen.",
                "2x - 6 + 4 = 3x - 5",
                "Förenkla vänsterledet.",
                "2x - 2 = 3x - 5",
                "Subtrahera 2x från båda leden.",
                "-2 = x - 5",
                "Addera 5 till båda leden.",
                "x = 3"
            ]
        },

        {
            text: "Bestäm x i ekvationssystemet:\nx + y = 7\n2x - y = 2",
            answer: ["3"],
            type: "single",
            category: "Ekvationssystem",
            difficulty: "medium",
            explanation: [
                "Addera de två ekvationerna för att eliminera y.",
                "(x + y) + (2x - y) = 7 + 2",
                "3x = 9",
                "Dividera med 3.",
                "x = 3"
            ]
        },

        {
            text: "Bestäm y i ekvationssystemet:\n2x + 3y = 13\n4x - y = 5",
            answer: ["3"],
            type: "single",
            category: "Ekvationssystem",
            difficulty: "hard",
            explanation: [
                "Börja med den andra ekvationen.",
                "4x - y = 5",
                "Lös ut y.",
                "y = 4x - 5",
                "Sätt in uttrycket för y i den första ekvationen.",
                "2x + 3(4x - 5) = 13",
                "2x + 12x - 15 = 13",
                "14x = 28",
                "x = 2",
                "Sätt in x = 2 i y = 4x - 5.",
                "y = 4(2) - 5",
                "y = 3"
            ]
        },

        {
            text: "Bestäm x-koordinaten för skärningspunkten mellan linjerna:\ny = 2x + 3\ny = -x + 9",
            answer: ["2"],
            type: "single",
            category: "Ekvationssystem",
            difficulty: "hard",
            explanation: [
                "Vid skärningspunkten har linjerna samma y-värde.",
                "Sätt därför uttrycken lika med varandra.",
                "2x + 3 = -x + 9",
                "Addera x till båda leden.",
                "3x + 3 = 9",
                "Subtrahera 3 från båda leden.",
                "3x = 6",
                "Dividera med 3.",
                "x = 2"
            ]
        }
    ];


    // 1. Filtrera frågorna
    const filteredQuestions = questions.filter((question) => {

        const categoryMatch =
            !category || question.category === category;

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


    return (
        <div className="container">

            <section className="math-quiz">

                <h2>Lös ekvationen</h2>

                <h3>
                    {randomQuestion.category}
                </h3>

                <h4>
                    {randomQuestion.difficulty}
                </h4>

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
                    <>
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
                    </>
                )}


                <button onClick={checkAnswer}>
                    Kontrollera
                </button>

                <button onClick={nextQuestion}>
                    Nästa fråga
                </button>

                <button onClick={showExplanation}>
                    Visa uträkning
                </button>


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