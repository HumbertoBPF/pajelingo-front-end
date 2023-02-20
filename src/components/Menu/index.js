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
                                        <Link className="dropdown-item" to="/dashboard">Rankings</Link>
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