import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-content">

                <Link to="/" className="logo">
                    <span className="logo-icon" aria-hidden="true">
                          β  
                    </span>
                    <span className="logo-text">
                        Matte<span>Experten</span>
                    </span>
                </Link>


                <nav className="nav">

                    <Link to="/" className="nav-link">
                        Hem
                    </Link>


                    <div className="category-menu">

                        <span className="nav-link category-trigger">
                            Öva
                            <svg className="chevron" viewBox="0 0 12 8" width="10" height="7">
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                        <div className="category-dropdown">

                            {/* Linjära ekvationer */}
                            <div className="category-item">

                                <span>
                                    Linjära ekvationer
                                </span>

                                <div className="difficulty-dropdown">

                                    <Link to="/quiz/linjara-ekvationer/easy" className="diff-link diff-easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/linjara-ekvationer/medium" className="diff-link diff-medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/linjara-ekvationer/hard" className="diff-link diff-hard">
                                        Svår
                                    </Link>

                                </div>

                            </div>


                            {/* Andragradsekvationer */}
                            <div className="category-item">

                                <span>
                                    Andragradsekvationer
                                </span>

                                <div className="difficulty-dropdown">

                                    <Link to="/quiz/andragradsekvationer/easy" className="diff-link diff-easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/andragradsekvationer/medium" className="diff-link diff-medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/andragradsekvationer/hard" className="diff-link diff-hard">
                                        Svår
                                    </Link>

                                </div>

                            </div>


                            {/* Ekvationssystem */}
                            <div className="category-item">

                                <span>
                                    Ekvationssystem
                                </span>

                                <div className="difficulty-dropdown">

                                    <Link to="/quiz/ekvationssystem/easy" className="diff-link diff-easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/ekvationssystem/medium" className="diff-link diff-medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/ekvationssystem/hard" className="diff-link diff-hard">
                                        Svår
                                    </Link>

                                </div>

                            </div>

                            {/* Ekvationssystem */}
                            <div className="category-item">

                                <span>
                                    GeometriArea
                                </span>

                                <div className="difficulty-dropdown">

                                    <Link to="/quiz/geometriarea/easy" className="diff-link diff-easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/geometriarea/medium" className="diff-link diff-medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/geometriarea/hard" className="diff-link diff-hard">
                                        Svår
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>


                    <Link to="/Prov" className="nav-link">
                        Prov
                    </Link>

                </nav>


                <button className="profile-button">
                    <span className="profile-icon" aria-hidden="true">👤</span>
                    <span>Mitt konto</span>
                </button>

            </div>
        </header>
    );
}

export default Header;