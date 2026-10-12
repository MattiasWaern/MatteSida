import { useId } from "react";

// Svarsfält med riktiga <label>-element. Frågor av typen "multiple"
// får två fält (x₁ och x₂), övriga ett.

function AnswerFields({ question, values, onChange }) {
    const baseId = useId();
    const isMultiple = question.type === "multiple";

    const labels = isMultiple ? ["Lösning x₁", "Lösning x₂"] : ["Ditt svar"];

    return (
        <div
            className={
                isMultiple ? "answer-fields" : "answer-fields answer-fields--single"
            }
        >
            {labels.map((label, index) => {
                const id = `${baseId}-${index}`;

                return (
                    <div className="field" key={id}>
                        <label className="field-label" htmlFor={id}>
                            {label}
                        </label>
                        <input
                            id={id}
                            className="field-input"
                            type="text"
                            value={values[index] ?? ""}
                            onChange={(event) => onChange(index, event.target.value)}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck={false}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default AnswerFields;
