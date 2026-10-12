import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                {/* Vänster sektion */}
                <div className="footer-section">
                    <p className="footer-brand">
                        <span className="footer-logo" aria-hidden="true">β</span>
                        Matte Experten
                    </p>
                    <p>
                        Hoppas detta hjälper dig lära dig matte Annika.
                    </p>
                </div>

                {/* Mitten sektion */}
                <nav className="footer-section" aria-label="Snabbmeny">
                    <h2 className="footer-heading">Snabbmeny</h2>
                    <ul className="footer-links">
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/quiz/linjara-ekvationer/easy">Öva</Link></li>
                        <li><Link to="/Prov">Prov</Link></li>
                    </ul>
                </nav>

                {/* Höger sektion */}
                <div className="footer-section">
                    <h2 className="footer-heading">Följ mig</h2>
                    <a
                        href="https://github.com/MattiasWaern"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                        <span className="sr-only"> (öppnas i ny flik)</span>
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Matte Experten. Alla rättigheter förbehållna.</p>
            </div>
        </footer>
    );
}

export default Footer;
