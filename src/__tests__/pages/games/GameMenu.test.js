const { screen, within } = require("@testing-library/react");
const { default: GameMenu } = require("pages/Games/GameMenu");
import { getInitialGamesState, renderWithProviders } from "utils/test-utils";

it("should display the list of games", () => {
  const initialGamesState = getInitialGamesState();

  renderWithProviders(<GameMenu />, {
    preloadedState: {
      games: initialGamesState
    }
  });

  Object.values(initialGamesState).forEach((game) => {
    const gameCard = screen.getByTestId(`${game.id}-game-card`);
    const gameCardGameName = within(gameCard).getByText(game.game_name);
    const gameCardImage = within(gameCard).getByAltText(game.game_name);

    expect(gameCard).toBeInTheDocument();
    expect(gameCardGameName).toBeInTheDocument();
    expect(gameCardGameName).toHaveTextContent(game.game_name);
    expect(gameCardImage).toBeInTheDocument();
  });
});
