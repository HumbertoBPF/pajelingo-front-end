import languages from "../../../test-data/languages.json";
import userEvent from "@testing-library/user-event";
import { getInitialGamesState, renderWithProviders } from "utils/test-utils";
const { screen, within } = require("@testing-library/react");
const {
  default: ArticleGameSetup
} = require("pages/Games/ArticleGame/ArticleGameSetup");

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

it("should display article game setup form", () => {
  renderWithProviders(<ArticleGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const selectLanguage = screen.getByTestId("select-language");
  const startButton = screen.getByTestId("start-button");

  expect(selectLanguage).toBeInTheDocument();

  languages.forEach((language) => {
    const languageOption = within(selectLanguage).queryByText(
      language.language_name
    );

    if (language.language_name === "English") {
      expect(languageOption).not.toBeInTheDocument();
    } else {
      expect(languageOption).toBeInTheDocument();
      expect(languageOption).toHaveTextContent(language.language_name);
      expect(languageOption).toHaveValue(language.language_name);
    }
  });

  expect(startButton).toBeInTheDocument();
  expect(startButton).toHaveTextContent("Start");
});

it("should display error toast if no language is selected", async () => {
  const user = userEvent.setup();

  renderWithProviders(<ArticleGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const startButton = screen.getByTestId("start-button");
  await user.click(startButton);

  const errorToast = screen.getByTestId("error-toast");
  expect(errorToast).toBeInTheDocument();
  expect(errorToast).toHaveClass("bg-danger");
  within(errorToast).getByText("Error");
  within(errorToast).getByText("You must choose a language.");
});
