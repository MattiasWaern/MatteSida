import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

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

const difficulties = [
  { name: "Lätt", slug: "easy", className: "diff-easy" },
  { name: "Medel", slug: "medium", className: "diff-medium" },
  { name: "Svår", slug: "hard", className: "diff-hard" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

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
              <svg className="chevron" viewBox="0 0 12 8" width="10" height="7">
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
                    {difficulties.map((difficulty) => (
                      <Link
                        key={difficulty.slug}
                        to={`/quiz/${category.slug}/${difficulty.slug}`}
                        className={`diff-link ${difficulty.className}`}
                      >
                        {difficulty.name}
                      </Link>
                    ))}
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
        <button className="profile-button" type="button">
          <span className="profile-icon" aria-hidden="true">
            👤
          </span>
          <span>Mitt konto</span>
        </button>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
          type="button"
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

          {/* ÖVA */}
          <button
            className="mobile-nav-link mobile-practice-button"
            onClick={() => setPracticeOpen((prev) => !prev)}
            aria-expanded={practiceOpen}
            type="button"
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

          {/* KATEGORIER */}
          <div className={`mobile-categories ${practiceOpen ? "open" : ""}`}>
            <div>
              {categories.map((category) => (
                <div className="mobile-category" key={category.slug}>
                  <span className="mobile-category-title">{category.name}</span>
                  <div className="mobile-difficulties">
                    {difficulties.map((difficulty) => (
                      <Link
                        key={difficulty.slug}
                        to={`/quiz/${category.slug}/${difficulty.slug}`}
                        className={`diff-link ${difficulty.className}`}
                        onClick={closeMenu}
                      >
                        {difficulty.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROV */}
          <Link to="/Prov" className="mobile-nav-link" onClick={closeMenu}>
            Prov
          </Link>

          {/* KONTO */}
          <button className="mobile-profile-button" type="button">
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