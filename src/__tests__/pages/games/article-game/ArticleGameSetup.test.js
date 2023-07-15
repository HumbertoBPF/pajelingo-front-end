import mockedGames from "../../../test-data/games.json";
import languages from "../../../test-data/languages.json";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "utils/test-utils";
const { screen, within } = require("@testing-library/react");
const {
  default: ArticleGameSetup
} = require("pages/Games/ArticleGame/ArticleGameSetup");

it("should display article game setup form", () => {
  renderWithProviders(<ArticleGameSetup />, {
    preloadedState: {
      games: mockedGames,
      languages
    }
  });

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

  renderWithProviders(<ArticleGameSetup />, {
    preloadedState: {
      games: mockedGames,
      languages
    }
  });

  const startButton = screen.getByTestId("start-button");
  await user.click(startButton);

  const errorToast = screen.getByTestId("error-toast");
  expect(errorToast).toBeInTheDocument();
  within(errorToast).getByText("Error");
  within(errorToast).getByText("You must choose a language.");
});
