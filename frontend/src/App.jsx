import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MathQuiz from "./components/math.jsx";

function App() {
    return (
        <BrowserRouter>

            <Header />

            <main>
                <Routes>

                    <Route
                        path="/quiz/:category/:difficulty"
                        element={<MathQuiz />}
                    />

                </Routes>
            </main>

            <Footer />

        </BrowserRouter>
    );
}

export default App;