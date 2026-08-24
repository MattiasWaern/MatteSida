import { useState } from "react";
import '../styles/math.css'

function MathQuiz() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");




  const questions = [
    {
        text: "x² - 5x + 6 = 0",
        answer: ["2", "3"],
        category: "Andragradsekvationer",
        difficulty: "medium",
    },
    {
        text: "2x + 7 = 15",
        answer: ["4"],
        category: "Linjära ekvationer",
        difficulty: "easy",
    },
];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    const correctAnswer = randomQuestion.answer;
  function checkAnswer() {
    if (answer === correctAnswer) {
      setResult("Rätt");
    } else {
      setResult("Fel");
    }
  }

  console.log(correctAnswer);
  console.log(randomQuestion);

  return (
    <section>
      <h2>Lös ekvationen</h2>
      <h3>{randomQuestion.category}</h3>
      <h3>{randomQuestion.difficulty}</h3>

      <p>{randomQuestion.text}</p>

      <input
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="ditt svar"
      />

      <button onClick={checkAnswer}>Kontrollera</button>

      <p>{result}</p>
    </section>
  );
}

export default MathQuiz;
