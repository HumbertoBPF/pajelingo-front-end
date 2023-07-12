import { MemoryRouter } from "react-router-dom";
import mockedGames from "../../../test-data/games.json";
import languages from "../../../test-data/languages.json";
import userEvent from "@testing-library/user-event";
const { configureStore } = require("@reduxjs/toolkit");
const { render, screen, within } = require("@testing-library/react");
const {
  default: ArticleGameSetup
} = require("pages/Games/ArticleGame/ArticleGameSetup");
const { Provider } = require("react-redux");
const { default: gamesSliceReducers } = require("store/reducers/games");
const { default: languagesSliceReducers } = require("store/reducers/languages");
const { default: tokenSliceReducer } = require("store/reducers/user");

it("should display article game setup form", () => {
  const customStore = configureStore({
    reducer: {
      languages: languagesSliceReducers,
      user: tokenSliceReducer,
      games: gamesSliceReducers
    },
    preloadedState: {
      games: mockedGames,
      languages
    }
  });

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <ArticleGameSetup />
      </MemoryRouter>
    </Provider>
  );

  const selectLanguage = screen.getByTestId("select-language");
  const startButton = screen.getByTestId("start-button");

  expect(selectLanguage).toBeInTheDocument();

  languages.forEach((language) => {
    if (language.language_name !== "English") {
      const languageOption = within(selectLanguage).getByText(
        language.language_name
      );
      expect(languageOption).toBeInTheDocument();
      expect(languageOption.textContent).toBe(language.language_name);
    }
  });

  expect(startButton).toBeInTheDocument();
  expect(startButton.textContent).toBe("Start");
});

it("should display error toast if no language is selected", async () => {
  const user = userEvent.setup();

  const customStore = configureStore({
    reducer: {
      languages: languagesSliceReducers,
      user: tokenSliceReducer,
      games: gamesSliceReducers
    },
    preloadedState: {
      games: mockedGames,
      languages
    }
  });

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <ArticleGameSetup />
      </MemoryRouter>
    </Provider>
  );

  const startButton = screen.getByTestId("start-button");
  await user.click(startButton);

  const errorToast = screen.getByTestId("error-toast");
  expect(errorToast).toBeInTheDocument();
  within(errorToast).getByText("Error");
  within(errorToast).getByText("You must choose a language.");
});
