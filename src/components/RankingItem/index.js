export default function RankingItem({ position, user, score }) {
    return (
        <tr>
            <td>{position}</td>
            <td>{user}</td>
            <td>{score}</td>
        </tr>
    )
}