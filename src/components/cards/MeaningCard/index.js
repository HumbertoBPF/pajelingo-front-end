import styles from "./MeaningCard.module.css";

export default function MeaningCard({ index=null, meaning }) {
    return (
        <div className={`card mb-4 ${styles["meaning-card"]}`} >
            <div className="row g-0">
                <div className="card-body">
                    <p className="card-text">Meaning{(index === null)?"":` number ${index}`}: {meaning.meaning}</p>
                </div>
            </div>
        </div>
    );
}