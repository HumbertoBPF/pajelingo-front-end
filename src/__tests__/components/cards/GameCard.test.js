const { screen } = require("@testing-library/react");
const { default: GameCard } = require("components/cards/GameCard");
const { renderWithProviders } = require("utils/test-utils");

it("should represent a game as a card element", () => {
  const game = {
    link: "Game link",
    game_name: "Game name",
    image: "Game image"
  };

  renderWithProviders(<GameCard game={game} />);

  screen.getByAltText(game.game_name);
  const gameName = screen.getByText(game.game_name);

  expect(gameName).toHaveTextContent(game.game_name);
});
