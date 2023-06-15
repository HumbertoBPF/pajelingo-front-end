import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

export default function UserScores({ scores }) {
  return (
    <Table striped className="mt-4">
      <thead>
        <tr>
          <th scope="col">Game</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={index}>
            <td>{score.game}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

UserScores.propTypes = {
  scores: PropTypes.array.isRequired
}
