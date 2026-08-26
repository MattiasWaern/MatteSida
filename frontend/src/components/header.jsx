import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-content">

                <Link to="/" className="logo">
                    <span className="logo-icon">β</span>
                    <span>Matte<span>Experten</span></span>
                </Link>


                <nav className="nav">

                    <Link to="/">
                        Hem
                    </Link>


                    <div className="category-menu">

                        <span>Öva</span>

                        <div className="category-dropdown">

                            {/* Linjära ekvationer */}
                            <div className="category-item">

                                <span>
                                    Linjära ekvationer
                                </span>

                                <div className="difficulty-dropdown">

                                    <Link to="/quiz/linjara-ekvationer/easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/linjara-ekvationer/medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/linjara-ekvationer/hard">
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

                                    <Link to="/quiz/andragradsekvationer/easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/andragradsekvationer/medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/andragradsekvationer/hard">
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

                                    <Link to="/quiz/ekvationssystem/easy">
                                        Lätt
                                    </Link>

                                    <Link to="/quiz/ekvationssystem/medium">
                                        Medel
                                    </Link>

                                    <Link to="/quiz/ekvationssystem/hard">
                                        Svår
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>


                    <Link to="/progress">
                        Min progress
                    </Link>

                </nav>


                <button className="profile-button">
                    <span className="profile-icon">👤</span>
                    <span>Mitt konto</span>
                </button>

            </div>
        </header>
    );
}

export default Header;