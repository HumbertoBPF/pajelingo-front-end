import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Ranking.module.css";
import PropTypes from "prop-types";

export default function Ranking({ ranking }) {
  const navigate = useNavigate();

  return (
    <Table striped>
      <thead data-testid="ranking-headers">
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Username</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {ranking.results.map((item, index) => (
          <tr
            className={styles["clickable-row"]}
            onClick={() => navigate(`/accounts/${item.user}`)}
            key={index}
            data-testid={`${index + 1}th-ranking-record`}>
            <td>{(ranking.page - 1) * 10 + index + 1}</td>
            <td>{item.user}</td>
            <td>{item.score}</td>
          </tr>
        ))}
        {ranking.user_score ? (
          <>
            <tr data-testid="ranking-separator">
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
            <tr
              className={styles["clickable-row"]}
              onClick={() => navigate(`/accounts/${ranking.user_score.user}`)}
              data-testid="user-score-record">
              <th scope="row">(You) {ranking.user_score.position}</th>
              <th scope="row">{ranking.user_score.user}</th>
              <th scope="row">{ranking.user_score.score}</th>
            </tr>
          </>
        ) : null}
      </tbody>
    </Table>
  );
}

Ranking.propTypes = {
  ranking: PropTypes.shape({
    results: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    user_score: PropTypes.shape({
      position: PropTypes.number,
      user: PropTypes.string,
      score: PropTypes.number
    })
  }).isRequired
};
