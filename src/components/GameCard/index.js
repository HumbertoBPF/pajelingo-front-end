import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

export default function GameCard({ game }) {
    return (
        <Link className={`card ${styles["game-card"]} text-reset text-decoration-none mb-4`} to={`${game.link}setup`}>
            <div className="row g-0">
                <div className="col-4 col-md-3 col-lg-2 d-flex align-items-center justify-content-center">
                    <div>
                        <img src={`data:image/jpeg;base64,${game.image}`} className="img-fluid rounded-start" alt="Welcome to Pajelingo"/>
                    </div>
                </div>
                <div className="col-8 col-md-9 col-lg-10 row p-4">
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <p className="card-text text-center">{game.game_name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}