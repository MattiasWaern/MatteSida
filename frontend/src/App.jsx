import { useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MathQuiz from "./components/math.jsx";

function App() {
    const [category, setCategory] = useState(null);

    return (
        <div>
            <Header setCategory={setCategory} />

            <main>
                <MathQuiz category={category} />
            </main>

            <Footer />
        </div>
    );
}

export default App;