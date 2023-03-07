export default function UserScores({ scores }) {
    return (
        <table className="table table-striped mt-4">
            <thead>
                <tr>
                    <th scope="col">Game</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((score, index) => 
                    <tr key={index}>
                        <td>{score.game}</td>
                        <td>{score.score}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}