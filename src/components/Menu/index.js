import { Link } from "react-router-dom"
import styles from "./Menu.module.css"

export default function Menu() {
    return (
        <header className={styles["customized-menu"]}>
            <nav className="navbar navbar-expand-lg navbar-light mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">
                        <img src="/images/brand.png" alt="Pajelingo logo" height="48"/>
                    </Link>

                    <div className={`${styles["account-options"]}`}>
                        <Link className="btn btn-success" to="/signup" role="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                            </svg> <span>Sign up</span>
                        </Link>
                        <Link className="btn btn-primary ms-2" to="/login" role="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg> <span>Sign in</span>
                        </Link>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${styles["nav-link"]}`} aria-current="page" to="/search">Search tool</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a id="gameDropdown" className={`nav-link dropdown-toggle ${styles["nav-link"]}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Games
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="gameDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/vocabulary-game/setup">Vocabulary training</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/article-game/setup">Guess the article</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/conjugation-game/setup">Conjugation game</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/rankings">Rankings</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles["nav-link"]}`} aria-current="page" to="/about-us">About us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}