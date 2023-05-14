import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Ranking.module.css";

export default function Ranking({ ranking }) {
    const navigate = useNavigate();

    return (
        <Table striped>
            <thead>
                <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {ranking.results.map((item, index) => 
                        <tr className={styles["clickable-row"]} onClick={() => navigate(`/accounts/${item.user}`)} key={index}>
                            <td>{(ranking.page-1)*10 + index + 1}</td>
                            <td>{item.user}</td>
                            <td>{item.score}</td>
                        </tr>
                    )
                }
                {(ranking.user_score)?
                <>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr className={styles["clickable-row"]} onClick={() => navigate(`/accounts/${ranking.user_score.user}`)}>
                        <th scope="row">(You) {ranking.user_score.position}</th>
                        <th scope="row">{ranking.user_score.user}</th>
                        <th scope="row">{ranking.user_score.score}</th>
                    </tr>
                </>:null}
            </tbody>
        </Table>
    )
}