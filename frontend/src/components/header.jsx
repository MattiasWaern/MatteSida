import "../styles/header.css";

function Header({ setCategory, setDifficulty }) {
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

                                <div className="category-item">
                                    <button
                                        onClick={() => 
                                            setCategory("Linjära ekvationer")

                                        }
                                    >
                                        Linjära ekvationer</button>

                                    <div className="difficulty-dropdown">
                                        <button
                                            onClick={() => {
                                            setDifficulty("easy")
                                            setCategory("Linjära ekvationer")

                                        }
                                    }
                                        >Lätt</button>

                                        <button
                                            onClick={() => {
                                            setDifficulty("medium")
                                            setCategory("Linjära ekvationer")

                                        }
                                    }                                     
                                        >Medel</button>

                                        <button
                                            onClick={() => {
                                            setDifficulty("hard")
                                            setCategory("Linjära ekvationer")

                                        }
                                    }                                         
                                        >Svår</button>
                                    </div>
                                </div>


                                <div className="category-item">
                                        <button
                                            onClick={() => 
                                            setCategory("Andragradsekvationer")

                                        
                                    }   
                                    >Andragradsekvationer</button>

                                    <div className="difficulty-dropdown">
                                        <button
                                            onClick={() => {
                                            setDifficulty("easy")
                                            setCategory("Andragradsekvationer")

                                        }
                                    }   
                                        >Lätt</button>

                                        <button
                                            onClick={() => {
                                            setDifficulty("medium")
                                            setCategory("Andragradsekvationer")

                                        }
                                    } 
                                        >Medel</button>

                                        <button
                                            onClick={() => {
                                            setDifficulty("hard")
                                            setCategory("Andragradsekvationer")

                                        }
                                    } 
                                        >Svår</button>
                                    </div>
                                </div>


                                <div className="category-item">
                                    <button
                                        onClick={() => 
                                            setCategory("Ekvationssystem")
                                        }
                                    >Ekvationssystem</button>

                                    <div className="difficulty-dropdown">
                                    <button
                                        onClick={() => {
                                            setCategory("Ekvationssystem")
                                            setDifficulty("easy")
                                        }
                                    }     
                                        >Lätt</button>

                                    <button
                                        onClick={() => {
                                            setCategory("Ekvationssystem")
                                            setDifficulty("medium")
                                        }
                                    }   
                                        >Medel</button>

                                    <button
                                        onClick={() => {
                                            setCategory("Ekvationssystem")
                                            setDifficulty("hard")
                                        }
                                    }   
                                        >Svår</button>
                                    </div>
                                </div>

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