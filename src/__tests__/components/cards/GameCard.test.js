const { screen } = require("@testing-library/react");
const { default: GameCard } = require("components/cards/GameCard");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";

it("should represent a game as a card element", () => {
  const game = {
    link: faker.internet.url(),
    game_name: faker.lorem.words({ min: 1, max: 3 }),
    image: "Game image"
  };

  renderWithProviders(<GameCard game={game} />);

  screen.getByAltText(game.game_name);
  const gameName = screen.getByText(game.game_name);

  expect(gameName).toHaveTextContent(game.game_name);
});
