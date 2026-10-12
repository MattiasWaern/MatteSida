import { useState } from "react";

// Väljer en slumpad fråga ur listan. Om det finns fler än en undviks
// den fråga som just visades, så att "Nästa fråga" alltid ger något nytt.
export function pickRandom(list, previous) {
    if (!list || list.length === 0) return null;
    if (list.length === 1) return list[0];

    let next = previous;
    while (next === previous) {
        next = list[Math.floor(Math.random() * list.length)];
    }
    return next;
}

// Håller en slumpad fråga i state. `serial` ändras för varje ny fråga och
// används som React-key så att svarsfält och återkoppling nollställs.
export default function useRandomQuestion(list) {
    const [state, setState] = useState(() => ({
        question: pickRandom(list),
        serial: 0,
    }));

    function next() {
        setState((previous) => ({
            question: pickRandom(list, previous.question),
            serial: previous.serial + 1,
        }));
    }

    return { question: state.question, serial: state.serial, next };
}
