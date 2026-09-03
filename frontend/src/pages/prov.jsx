import { useEffect, useState } from "react";
import questions from "../data";
import GeometryRender from "../components/geometryRender";
import statisticsRender from "../components/statisticsRender";
import "../styles/prov.css"
import { current } from "@reduxjs/toolkit";
import { preview } from "vite";

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
            setTimeLeft((time) => time - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [started, finished, timeLeft]);

    function formatTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function handleAnswer(value, answerNumber = 1){
        setAnswers((previousAnswers) => ({
            ...previousAnswers,

            [currentQuestion]:{
                ...previousAnswers[currentQuestion],
                [`answer${answerNumber}`]:value,
            },
        }));
    }


    const question = examQuesions[currentQuestion];


    function toggleMark(){
        setMarkedQuestions((previous) => {
            if(previous.includes(currentQuestion)){
                return previous.filter(
                    (questionIndex) => questionIndex !== currentQuestion
                );
            }

            return[...previous, currentQuestion];
        })
    }

    function submitExam(){
        setFinished(true);
    }


    function calculateScore(){
        let score = 0;

        examQuesions.forEach((question, index) => {
            const userAnswer = answers[index];

            if(!userAnswer) return;

            if(question.type === "single"){
                const answer = userAnswer.answer1
                    ?.trim()
                    .toLowerCase();

                const correct = questions.answer.some(
                    (correctAnswer) => 
                        answer === correctAnswer.trim().toLowerCase()
                );

                if(correct){
                    score++
                }
            }

            if (question.type === "multiple") {
                const userAnswers = [
                    userAnswer.answer1 || "",
                    userAnswer.answer2 || "",
                ]
                    .map((answer) => answer.trim().toLowerCase())
                    .sort();

                const correctAnswers = [...question.answer]
                    .map((answer) => answer.trim().toLowerCase())
                    .sort();

                if (
                    JSON.stringify(userAnswers) ===
                    JSON.stringify(correctAnswers)
                ) {
                    score++;
                }            
        });

        return score;
    }
}


export default Prov;