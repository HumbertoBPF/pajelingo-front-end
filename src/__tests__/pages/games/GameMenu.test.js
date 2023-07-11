const { configureStore } = require("@reduxjs/toolkit");
const { render, screen, within } = require("@testing-library/react");
const { default: GameMenu } = require("pages/Games/GameMenu");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { default: gamesSliceReducers } = require("store/reducers/games");
const { default: languagesSliceReducers } = require("store/reducers/languages");
const { default: tokenSliceReducer } = require("store/reducers/user");
import mockedGames from "../../test-data/games.json";

it("should display the list of games", () => {
  const customStore = configureStore({
    reducer: {
      languages: languagesSliceReducers,
      user: tokenSliceReducer,
      games: gamesSliceReducers
    },
    preloadedState: {
      games: mockedGames
    }
  });

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <GameMenu />
      </MemoryRouter>
    </Provider>
  );

  Object.values(mockedGames).forEach((game) => {
    const gameCard = screen.getByTestId(`${game.id}-game-card`);
    const gameCardGameName = within(gameCard).getByText(game.game_name);
    const gameCardImage = within(gameCard).getByAltText(game.game_name);

    expect(gameCard).toBeInTheDocument();
    expect(gameCardGameName).toBeInTheDocument();
    expect(gameCardGameName.textContent).toBe(game.game_name);
    expect(gameCardImage).toBeInTheDocument();
  });
});
