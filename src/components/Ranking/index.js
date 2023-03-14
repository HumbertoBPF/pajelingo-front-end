import { Table } from "react-bootstrap";

export default function Ranking({ ranking }) {
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
                    <tr key={index}>
                        <td>{(ranking.page-1)*10 + index + 1}</td>
                        <td>{item.user}</td>
                        <td>{item.score}</td>
                    </tr>)}
                {(ranking.user_score)?
                <>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <th scope="row">(You) {ranking.user_score.position}</th>
                        <th scope="row">{ranking.user_score.user}</th>
                        <th scope="row">{ranking.user_score.score}</th>
                    </tr>
                </>:null}
            </tbody>
        </Table>
    )
}