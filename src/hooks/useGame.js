import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useGame(id) {
  let games = useSelector((state) => state.games);
  const [articleGame, setArticleGame] = useState({});

  useEffect(() => {
    if (games) {
      if (games[id]) {
        setArticleGame(games[id]);
      }
    }
  }, [games, id]);

  return [articleGame];
}
