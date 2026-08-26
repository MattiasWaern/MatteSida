import "../styles/header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-content">

                <a href="/" className="logo">
                    <span className="logo-icon">β</span>
                    <span>Matte<span>Experten</span></span>
                </a>

                <nav className="nav">
                    <a href="/">Hem</a>

                    <div className="practice-menu">
                        <a href="/quiz" className="practice-link">
                            Öva
                        </a>

                        <div className="category-dropdown">
                            <a href="/quiz/linjara-ekvationer">
                                Linjära ekvationer
                            </a>

                            <a href="/quiz/andragradsekvationer">
                                Andragradsekvationer
                            </a>

                            <a href="/quiz/ekvationssystem">
                                Ekvationssystem
                            </a>
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