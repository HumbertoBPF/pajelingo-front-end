import { getInitialGamesState, renderWithProviders } from "utils/test-utils";
import languages from "../../../test-data/languages.json";
import ConjugationGameSetup from "pages/Games/ConjugationGame/ConjugationGameSetup";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  languages.forEach((language) => {
    const languageOption = within(selectLanguage).queryByText(
      language.language_name
    );

    expect(languageOption).toBeInTheDocument();
    expect(languageOption).toHaveTextContent(language.language_name);
  });

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
