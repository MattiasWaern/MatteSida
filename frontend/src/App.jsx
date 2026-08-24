import {useState} from 'react'

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import './style.css'


function App() {
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("");

    const correctAnswer = "2";

    function checkAnswer(){
        if (answer === correctAnswer){
            setResult("Rätt");
        } else {
            setResult("Fel");
        }
    }
  return (
    <div>
      <Header />
      <main>
            <section>
                <h2>Lös ekvationen</h2>

                <p>x² - 5x + 6 = 0</p>

                <input
                type='text'
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder='ditt svar'
                />

                <button onClick={checkAnswer}>
                    Kontrollera
                </button>

                <p>{result}</p>
            </section>
      </main>
      <Footer/>
    </div>
  );
}

export default App;