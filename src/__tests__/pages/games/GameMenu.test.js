const { screen, within } = require("@testing-library/react");
const { default: GameMenu } = require("pages/Games/GameMenu");
import { renderWithProviders } from "utils/test-utils";
import mockedGames from "../../test-data/games.json";

it("should display the list of games", () => {
  renderWithProviders(<GameMenu />, {
    preloadedState: {
      games: mockedGames
    }
  });

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
