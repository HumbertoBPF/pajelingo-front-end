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
            </tbody>
        </Table>
    )
}