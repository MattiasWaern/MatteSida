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
                    <a href="/quiz">Öva</a>
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