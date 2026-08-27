import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MathQuiz from "./components/math.jsx";
import Home from "./pages/home.jsx";
import MyProgress from "./pages/progress.jsx";

function App() {
    return (
        <BrowserRouter>

            <Header />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/quiz/:category/:difficulty"
                        element={<MathQuiz />}
                    />
                    <Route
                        path="/progress"
                        element={<MyProgress />}
                    />                    

                </Routes>
            </main>

            <Footer />

        </BrowserRouter>
    );
}

export default App;