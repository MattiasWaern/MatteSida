import { useState } from "react";
import '../styles/math.css'

function MathQuiz() {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [result, setResult] = useState("");

  const questions = [
    {
        text: "x² - 5x + 6 = 0",
        answer: ["2", "3"],
        type: "multiple",
        category: "Andragradsekvationer",
        difficulty: "medium",
    },
    {
        text: "2x + 7 = 15",
        answer: ["4"],
        type: "single",
        category: "Linjära ekvationer",
        difficulty: "easy",
    },
    {
        text: "4x + 7 = 23",
        answer: ["4"],
        type: "single",
        category: "Linjära ekvationer",
        difficulty: "easy"
    },
    {
        text: "2(x - 3) + 4 = 3x - 5",
        answer: ["3"],
        type: "single",
        category: "Linjära ekvationer med parenteser",
        difficulty: "medium"
    },
    {
        text: "Bestäm x i ekvationssystemet:\nx + y = 7\n2x - y = 2",
        answer: ["3"],
        type: "single",
        category: "Ekvationssystem (introduktion)",
        difficulty: "medium"
    },
    {
        text: "Bestäm y i ekvationssystemet:\n2x + 3y = 13\n4x - y = 5",
        answer: ["3"],
        type: "single",
        category: "Lösning av ekvationssystem",
        difficulty: "hard"
    },
    {
        text: "Bestäm x-koordinaten för skärningspunkten mellan linjerna:\ny = 2x + 3\ny = -x + 9",
        answer: ["2"],
        type: "single",
        category: "Skärningspunkt för linjära funktioner",
        difficulty: "hard"
    }    
];

  const [randomQuestion, setRandomQuestion] = useState(
        questions[Math.floor(Math.random() * questions.length)]);

function nextQuestion(){
    setRandomQuestion(
         questions[Math.floor(Math.random() * questions.length)]
    );
    setAnswer1("");
    setAnswer2("");
    setResult("");
}

function checkAnswer() {
    if (randomQuestion.type === "single") {
        if (answer1 === randomQuestion.answer[0]) {
            setResult("Rätt!");
        } else {
            setResult("Fel!");
        }
    }

    if (randomQuestion.type === "multiple") {
        const userAnswers = [answer1, answer2].sort();
        const correctAnswers = [...randomQuestion.answer].sort();

        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
            setResult("Rätt!");
        } else {
            setResult("Fel!");
        }
    }
}


  console.log(randomQuestion);

  return (
    <section>
      <h2>Lös ekvationen</h2>
      <h3>{randomQuestion.category}</h3>
      <h4>{randomQuestion.difficulty}</h4>

      <p>{randomQuestion.text}</p>

        {randomQuestion.type === 'single' && (
            <input
            type="text"
            value={answer1}
            onChange={(event) => setAnswer1(event.target.value)}
            placeholder="Ditt svar"
            />
        )}

        {randomQuestion.type === 'multiple' &&(
         <>
            <input
            type="text"
            value={answer1}
            onChange={(event) => setAnswer1(event.target.value)}
            placeholder="x₁"
            />

            <input
            type="text"
            value={answer2}
            onChange={(event) => setAnswer2(event.target.value)}
            placeholder="x₂"
            /> 
         </>
           
        )}

      <button onClick={checkAnswer}>Kontrollera</button>
      <button onClick={nextQuestion}>Nästa fråga</button>

      <p id="results">{result}</p>
    </section>
  );
}

export default MathQuiz;
