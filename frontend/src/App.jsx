import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MathQuiz from "./pages/math.jsx";
import Home from "./pages/home.jsx";
import Prov from "./pages/prov.jsx";

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
                        path="/Prov"
                        element={<Prov />}
                    />                    

                </Routes>
            </main>

            <Footer />

        </BrowserRouter>
    );
}

export default App;