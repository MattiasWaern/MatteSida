import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const categories = [
    { name: "Linjära ekvationer", slug: "linjara-ekvationer" },
    { name: "Andragradsekvationer", slug: "andragradsekvationer" },
    { name: "Ekvationssystem", slug: "ekvationssystem" },
    { name: "Linjära funktioner", slug: "linjara-funktioner" },
    { name: "Parallella linjer", slug: "parallella-linjer" },
    { name: "Geometri Area", slug: "geometriarea" },
    { name: "Geometri Cirkel", slug: "geometricirkel" },
    { name: "Geometri Pythagoras", slug: "geometripythagoras" },
    { name: "Geometri Volym", slug: "geometrivolym" },
    { name: "Statistik", slug: "statistik" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setPracticeOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon" aria-hidden="true">
            β
          </span>

          <span className="logo-text">
            Matte<span>Experten</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="nav">
          <Link to="/" className="nav-link">
            Hem
          </Link>

          <div className="category-menu">
            <span className="nav-link category-trigger">
              Öva

              <svg
                className="chevron"
                viewBox="0 0 12 8"
                width="10"
                height="7"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="category-dropdown">
              {categories.map((category) => (
                <div className="category-item" key={category.slug}>
                  <span>{category.name}</span>

                  <div className="difficulty-dropdown">
                    <Link
                      to={`/quiz/${category.slug}/easy`}
                      className="diff-link diff-easy"
                    >
                      Lätt
                    </Link>

                    <Link
                      to={`/quiz/${category.slug}/medium`}
                      className="diff-link diff-medium"
                    >
                      Medel
                    </Link>

                    <Link
                      to={`/quiz/${category.slug}/hard`}
                      className="diff-link diff-hard"
                    >
                      Svår
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/Prov" className="nav-link">
            Prov
          </Link>
        </nav>

        {/* DESKTOP PROFILE */}
        <button className="profile-button">
          <span className="profile-icon" aria-hidden="true">
            👤
          </span>
          <span>Mitt konto</span>
        </button>

        {/* MOBILE HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            Hem
          </Link>

          <button
            className="mobile-nav-link mobile-practice-button"
            onClick={() => setPracticeOpen(!practiceOpen)}
          >
            <span>Öva</span>

            <svg
              className={`mobile-chevron ${practiceOpen ? "rotated" : ""}`}
              viewBox="0 0 12 8"
              width="10"
              height="7"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* MOBILE CATEGORIES */}
          <div className={`mobile-categories ${practiceOpen ? "open" : ""}`}>
            {categories.map((category) => (
              <div className="mobile-category" key={category.slug}>
                <span className="mobile-category-title">
                  {category.name}
                </span>

                <div className="mobile-difficulties">
                  <Link
                    to={`/quiz/${category.slug}/easy`}
                    className="diff-link diff-easy"
                    onClick={closeMenu}
                  >
                    Lätt
                  </Link>

                  <Link
                    to={`/quiz/${category.slug}/medium`}
                    className="diff-link diff-medium"
                    onClick={closeMenu}
                  >
                    Medel
                  </Link>

                  <Link
                    to={`/quiz/${category.slug}/hard`}
                    className="diff-link diff-hard"
                    onClick={closeMenu}
                  >
                    Svår
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/Prov"
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            Prov
          </Link>

          <button className="mobile-profile-button">
            <span className="profile-icon" aria-hidden="true">
              👤
            </span>
            Mitt konto
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
