import mockedGames from "../test-data/games.json";

export const getInitialGamesState = () => {
  return {
    1: mockedGames[0],
    2: mockedGames[1],
    3: mockedGames[2]
  };
};
