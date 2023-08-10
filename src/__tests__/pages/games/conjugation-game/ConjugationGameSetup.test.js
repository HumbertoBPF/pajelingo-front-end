import { renderWithProviders } from "test-utils/store";
import ConjugationGameSetup from "pages/Games/ConjugationGame/ConjugationGameSetup";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getInitialGamesState } from "test-utils/mocking/games";
import languages from "../../../../../cypress/fixtures/languages.json";
import { assertSelectLanguageItems } from "test-utils/assertions/select-language";

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

it("should display conjugation game setup form", () => {
  renderWithProviders(<ConjugationGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const selectLanguage = screen.getByTestId("select-language");
  const startButton = screen.getByTestId("start-button");

  expect(selectLanguage).toBeInTheDocument();

  assertSelectLanguageItems(selectLanguage, languages);

  expect(startButton).toBeInTheDocument();
  expect(startButton).toHaveTextContent("Start");
});

it("should display error toast if no language is selected", async () => {
  const user = userEvent.setup();

  renderWithProviders(<ConjugationGameSetup />, {
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
