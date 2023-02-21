import RankingItem from "components/RankingItem";

export default function Ranking({ ranking }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                { ranking.results.map((item, index) => <RankingItem 
                                                            key={index} 
                                                            position={(ranking.page-1)*10 + index + 1}
                                                            user={item.user} 
                                                            score={item.score}/>
                ) }
            </tbody>
        </table>
    )
}