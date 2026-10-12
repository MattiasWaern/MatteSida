import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { categories, difficulties } from "../data/categories.js";
import "../styles/header.css";

function Chevron({ open }) {
  return (
    <svg
      className={`chevron ${open ? "rotated" : ""}`}
      viewBox="0 0 12 8"
      width="10"
      height="7"
      aria-hidden="true"
      focusable="false"
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
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const headerRef = useRef(null);
  const practiceButtonRef = useRef(null);
  const location = useLocation();

  const practiceActive = location.pathname.toLowerCase().startsWith("/quiz");

  // Stäng menyerna när sidan byts (justera state under rendering,
  // i stället för i en effekt)
  const [lastPath, setLastPath] = useState(location.pathname);

  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setMenuOpen(false);
    setPracticeOpen(false);
  }

  // Esc stänger, klick utanför stänger
  useEffect(() => {
    function closeAll() {
      setMenuOpen(false);
      setPracticeOpen(false);
    }

    function onKeyDown(event) {
      if (event.key !== "Escape") return;

      if (practiceOpen) {
        setPracticeOpen(false);
        practiceButtonRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
      }
    }

    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        closeAll();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [practiceOpen, menuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-content">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-icon" aria-hidden="true">
            β
          </span>
          <span className="logo-text">
            Matte <span>Experten</span>
          </span>
        </Link>

        {/* HAMBURGER (mobil) */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? "open" : ""}`}
          aria-label="Huvudmeny"
        >
          <ul className="nav-list">
            <li>
              <NavLink to="/" end className="nav-link">
                Hem
              </NavLink>
            </li>

            <li className="nav-practice">
              <button
                ref={practiceButtonRef}
                type="button"
                className={`nav-link nav-trigger ${practiceActive ? "is-active" : ""}`}
                aria-expanded={practiceOpen}
                aria-controls="practice-panel"
                onClick={() => setPracticeOpen((open) => !open)}
              >
                Öva
                <Chevron open={practiceOpen} />
              </button>

              <div
                id="practice-panel"
                className="practice-panel"
                hidden={!practiceOpen}
              >
                <p className="practice-heading">Välj område och nivå</p>

                <ul className="practice-list">
                  {categories.map((category) => (
                    <li className="practice-item" key={category.slug}>
                      <span className="practice-name">{category.label}</span>

                      <span className="practice-levels">
                        {difficulties.map((difficulty) => (
                          <Link
                            key={difficulty.slug}
                            to={`/quiz/${category.slug}/${difficulty.slug}`}
                            className={`badge badge--${difficulty.slug}`}
                            aria-label={`${category.label}, ${difficulty.label}`}
                          >
                            {difficulty.label}
                          </Link>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <NavLink to="/Prov" className="nav-link">
                Prov
              </NavLink>
            </li>
          </ul>

          {/* Inloggning är inte byggd i frontend än */}
          <button
            className="profile-button"
            type="button"
            disabled
            title="Inloggning kommer snart"
          >
            <span className="profile-icon" aria-hidden="true">
              👤
            </span>
            <span>Mitt konto</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
