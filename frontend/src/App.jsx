import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MathQuiz from "./pages/math.jsx";
import Home from "./pages/home.jsx";
import Prov from "./pages/prov.jsx";
import NotFound from "./pages/notFound.jsx";

// Scrolla till toppen när man byter sida
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <a className="skip-link" href="#main">
                Hoppa till innehållet
            </a>

            <Header />

            {/* Enda <main> på sidan. Sidorna renderar bara innehåll. */}
            <main id="main" tabIndex={-1}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/quiz/:category/:difficulty"
                        element={<MathQuiz />}
                    />
                    <Route path="/Prov" element={<Prov />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
