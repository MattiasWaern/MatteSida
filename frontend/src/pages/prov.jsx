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
}


export default Prov;