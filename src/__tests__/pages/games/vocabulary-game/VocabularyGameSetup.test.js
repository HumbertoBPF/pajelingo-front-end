const {
  default: VocabularyGameSetup
} = require("pages/Games/VocabularyGame/VocabularyGameSetup");
const {
  renderWithProviders,
  getInitialGamesState
} = require("test-utils/store");
import { screen, within } from "@testing-library/react";
import languages from "../../../test-data/languages.json";
import { getRandomInteger } from "utils";
import userEvent from "@testing-library/user-event";

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

const randomLanguage1 = languages[getRandomInteger(0, 2)];
const randomLanguage2 = languages[getRandomInteger(3, 4)];

it("should display vocabulary game setup form", () => {
  renderWithProviders(<VocabularyGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const selectBaseLanguage = screen.getByTestId("select-base-language");
  expect(selectBaseLanguage).toBeInTheDocument();

  languages.forEach((language) => {
    const languageItem = within(selectBaseLanguage).getByText(
      language.language_name
    );

    expect(languageItem).toBeInTheDocument();
    expect(languageItem).toHaveTextContent(language.language_name);
    expect(languageItem).toHaveValue(language.language_name);
  });

  const selectTargetLanguage = screen.getByTestId("select-target-language");
  expect(selectTargetLanguage).toBeInTheDocument();

  languages.forEach((language) => {
    const languageItem = within(selectTargetLanguage).getByText(
      language.language_name
    );

    expect(languageItem).toBeInTheDocument();
    expect(languageItem).toHaveTextContent(language.language_name);
    expect(languageItem).toHaveValue(language.language_name);
  });

  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
  expect(startButton).toHaveTextContent("Start");
});

it.each([
  [randomLanguage1, null],
  [null, randomLanguage2],
  [null, null]
])(
  "should validate the base and target languages were selected",
  async (language1, language2) => {
    const user = userEvent.setup();

    renderWithProviders(<VocabularyGameSetup />, {
      preloadedState: {
        games: getInitialGamesState(),
        languages
      }
    });

    const selectBaseLanguage = screen.getByTestId("select-base-language");
    const selectTargetLanguage = screen.getByTestId("select-target-language");
    const startButton = screen.getByTestId("start-button");

    if (language1 !== null) {
      await user.selectOptions(selectBaseLanguage, language1.language_name);
    }

    if (language2 !== null) {
      await user.selectOptions(selectTargetLanguage, language2.language_name);
    }

    await user.click(startButton);

    const toastError = screen.getByTestId("toast-error");
    expect(toastError).toBeInTheDocument();
    expect(toastError).toHaveClass("bg-danger");

    const toastTitle = within(toastError).getByText("Error");
    expect(toastTitle).toBeInTheDocument();

    const toastMessage = within(toastError).getByText(
      "You must set both base and target languages."
    );
    expect(toastMessage).toBeInTheDocument();
  }
);

it("should validate the base and target languages are different", async () => {
  const user = userEvent.setup();

  renderWithProviders(<VocabularyGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const selectBaseLanguage = screen.getByTestId("select-base-language");
  const selectTargetLanguage = screen.getByTestId("select-target-language");
  const startButton = screen.getByTestId("start-button");

  await user.selectOptions(selectBaseLanguage, randomLanguage1.language_name);
  await user.selectOptions(selectTargetLanguage, randomLanguage1.language_name);

  await user.click(startButton);

  const toastError = screen.getByTestId("toast-error");
  expect(toastError).toBeInTheDocument();
  expect(toastError).toHaveClass("bg-danger");

  const toastTitle = within(toastError).getByText("Error");
  expect(toastTitle).toBeInTheDocument();

  const toastMessage = within(toastError).getByText(
    "Base and target languages must be different."
  );
  expect(toastMessage).toBeInTheDocument();
});
