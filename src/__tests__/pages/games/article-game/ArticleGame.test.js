const { configureStore } = require("@reduxjs/toolkit");
const { render, screen } = require("@testing-library/react");
const { default: ArticleGame } = require("pages/Games/ArticleGame/ArticleGame");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { default: gamesSliceReducers } = require("store/reducers/games");
const { default: languagesSliceReducers } = require("store/reducers/languages");
const { default: tokenSliceReducer } = require("store/reducers/user");
import { setupArticleGame } from "api/games";
import mockedGames from "../../../test-data/games.json";

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
        <ArticleGame />
      </MemoryRouter>
    </Provider>
  );

  const articleInput = screen.getByTestId("article-input");
  expect(articleInput).toBeInTheDocument();
  screen.getByPlaceholderText("Article");

  const wordDisabledInput = screen.getByTestId("word-disabled-input");
  expect(wordDisabledInput).toBeInTheDocument();
  screen.getByPlaceholderText("Mocked word");

  expect(setupArticleGame).toBeCalledTimes(1);
});
