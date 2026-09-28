// Gemensam svarsrättning för Home, MathQuiz och Prov.
// Tolerant mot mellanslag, komma/punkt, unicode-minus, bråk/decimal ("1/2" = "0,5")
// samt "x = 3" i stället för "3" och "2x+3" i stället för "y = 2x + 3".

export function normalize(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[\u2212\u2013\u2014]/g, "-")
        .replace(/,/g, ".")
        .replace(/\s+/g, "");
}

function toNumber(s) {
    if (/^[+-]?\d+(\.\d+)?$/.test(s)) return parseFloat(s);

    const fraction = s.match(/^([+-]?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (fraction && parseFloat(fraction[2]) !== 0) {
        return parseFloat(fraction[1]) / parseFloat(fraction[2]);
    }

    return null;
}

export function answersMatch(user, correct) {
    const u = normalize(user);
    const c = normalize(correct);

    if (u === "" || c === "") return false;
    if (u === c) return true;

    const candidates = [u];

    // "x=3" räknas som "3", men bara om facit inte själv är en ekvation
    if (!/^[a-z]=/.test(c)) {
        candidates.push(u.replace(/^[a-zx₁₂]{1,2}=/, ""));
    }

    // "2x+3" räknas som "y=2x+3"
    if (c.startsWith("y=") && !u.startsWith("y=")) {
        candidates.push("y=" + u);
    }

    const cn = toNumber(c);

    return candidates.some((candidate) => {
        if (candidate === c) return true;

        const un = toNumber(candidate);
        return un !== null && cn !== null && Math.abs(un - cn) < 1e-9;
    });
}

export function isAnswerCorrect(question, answer1 = "", answer2 = "") {
    if (!question) return false;

    if (question.type === "multiple") {
        const users = [answer1, answer2].filter((a) => normalize(a) !== "");
        const used = new Set();

        if (users.length !== question.answer.length) return false;

        return users.every((user) => {
            const index = question.answer.findIndex(
                (correct, i) => !used.has(i) && answersMatch(user, correct)
            );
            if (index === -1) return false;
            used.add(index);
            return true;
        });
    }

    return question.answer.some((correct) => answersMatch(answer1, correct));
}
