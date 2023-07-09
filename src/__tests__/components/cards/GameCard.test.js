const { render, screen } = require("@testing-library/react");
const { default: GameCard } = require("components/cards/GameCard");
const { MemoryRouter } = require("react-router-dom");

it("should represent a game as a card element", () => {
  const game = {
    link: "Game link",
    game_name: "Game name",
    image: "Game image"
  };

  render(
    <MemoryRouter>
      <GameCard game={game} />
    </MemoryRouter>
  );

  screen.getByAltText(game.game_name);
  const gameName = screen.getByText(game.game_name);

  expect(gameName.textContent).toBe(game.game_name);
});
