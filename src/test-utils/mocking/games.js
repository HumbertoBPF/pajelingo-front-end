import games from "../../../cypress/fixtures/games.json";

export const getInitialGamesState = () => {
  return {
    1: games[0],
    2: games[1],
    3: games[2]
  };
};
