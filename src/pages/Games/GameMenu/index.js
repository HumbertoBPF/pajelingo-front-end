import GameCard from "components/cards/GameCard";
import { useSelector } from "react-redux";

export default function GameMenu() {
    const games = useSelector(state => state.games);

    return (
        <>
            {Object.values(games).map(game => <GameCard key={game.game_name} game={game}/>)}
        </>
    );
}