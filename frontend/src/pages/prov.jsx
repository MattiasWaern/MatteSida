import { useEffect, useState } from "react";
import questions from "../data";
import GeometryRender from "../components/geometryRender";
import statisticsRender from "../components/statisticsRender";
import "../styles/prov.css"

function Prov(){
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const [examQuesions, setExamQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState([]);

    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minuter



    function startExam(){
        const shuffledQuestions = [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 20);

            setExamQuestions(shuffledQuestions);
            setCurrentQuestion(0);
            setAnswers({});
            setMarkedQuestions([]);
            setTimeLeft(60 * 60);

            setStarted(true);
            setFinished(false);
    }

    useState(() => {
        if(!started || finished) return;

        if(timeLeft <=0){
            submitExam();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((time) => time  1);
        }, 1000);

        return () => clearInterval(timer);
    }, [started, finished, timeLeft]);

    function formatTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }
}


export default Prov;