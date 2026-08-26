import "../styles/header.css";

function Header({ setCategory }) {
    return (
        <header className="header">
            <div className="header-content">

                <a href="/" className="logo">
                    <span className="logo-icon">β</span>
                    <span>
                        Matte<span>Experten</span>
                    </span>
                </a>

                <nav className="nav">
                    <a href="/">Hem</a>

                    <div className="practice-menu">
                        <button className="practice-link">
                            Öva
                        </button>

                        <div className="category-dropdown">

                            <button
                                onClick={() =>
                                    setCategory("Linjära ekvationer")
                                }
                            >
                                Linjära ekvationer
                            </button>

                            <button
                                onClick={() =>
                                    setCategory("Andragradsekvationer")
                                }
                            >
                                Andragradsekvationer
                            </button>

                            <button
                                onClick={() =>
                                    setCategory("Ekvationssystem")
                                }
                            >
                                Ekvationssystem
                            </button>
                            

                        </div>
                    </div>

                    <a href="/progress">Min progress</a>
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