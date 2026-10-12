// Återkoppling på ett svar. Behållaren finns alltid i DOM:en och är en
// "live region" så att skärmläsare läser upp resultatet när det dyker upp.
// `attempt` ändras vid varje kontroll så att samma meddelande läses upp igen.

const MESSAGES = {
    correct: {
        icon: "✓",
        title: "Rätt!",
        text: "Bra jobbat.",
    },
    wrong: {
        icon: "✕",
        title: "Inte riktigt.",
        text: "Kontrollera din uträkning och försök igen, eller välj Visa uträkning.",
    },
    empty: {
        icon: "!",
        title: "Skriv ett svar först.",
        text: "Fyll i ditt svar innan du kontrollerar.",
    },
};

function Feedback({ result, attempt = 0, detail }) {
    const message = result ? MESSAGES[result] : null;

    return (
        <div className="feedback-slot" role="status" aria-live="polite">
            {message && (
                <div key={attempt} className={`feedback feedback--${result}`}>
                    <span className="feedback-icon" aria-hidden="true">
                        <span>{message.icon}</span>
                    </span>
                    <div>
                        <p className="feedback-title">{message.title}</p>
                        <p className="feedback-text">{detail ?? message.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Feedback;
