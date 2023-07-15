const { screen } = require("@testing-library/react");
const { default: ArticleGame } = require("pages/Games/ArticleGame/ArticleGame");
import { setupArticleGame } from "api/games";
import mockedGames from "../../../test-data/games.json";
import { renderWithProviders } from "utils/test-utils";

jest.mock("api/games", () => {
  const originalModule = jest.requireActual("api/games");

  return {
    __esmodule: true,
    ...originalModule,
    setupArticleGame: jest.fn()
  };
});

it("should display the word returned by the API", () => {
  setupArticleGame.mockImplementation((token, queryParams, onSuccess) => {
    onSuccess({
      id: 100,
      word: "Mocked word"
    });
  });

  renderWithProviders(<ArticleGame />, {
    preloadedState: {
      games: mockedGames
    }
  });

  const articleInput = screen.getByTestId("article-input");
  expect(articleInput).toBeInTheDocument();
  screen.getByPlaceholderText("Article");

  const wordDisabledInput = screen.getByTestId("word-disabled-input");
  expect(wordDisabledInput).toBeInTheDocument();
  screen.getByPlaceholderText("Mocked word");

  expect(setupArticleGame).toBeCalledTimes(1);
});
