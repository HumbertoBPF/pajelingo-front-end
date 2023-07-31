import userEvent from "@testing-library/user-event";
import { assertSelectLanguageItems } from "test-utils/assertions/select-language";
import { getInitialGamesState } from "test-utils/mocking/games";
import { languages } from "test-utils/mocking/languages";
import { renderWithProviders } from "test-utils/store";
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

  assertSelectLanguageItems(
    selectLanguage,
    languages.filter((language) => language.language_name !== "English")
  );

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
