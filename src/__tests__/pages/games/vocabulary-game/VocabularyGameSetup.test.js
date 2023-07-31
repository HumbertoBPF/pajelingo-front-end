const {
  default: VocabularyGameSetup
} = require("pages/Games/VocabularyGame/VocabularyGameSetup");
const { renderWithProviders } = require("test-utils/store");
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getInitialGamesState } from "test-utils/mocking/games";
import { languages } from "test-utils/mocking/languages";
import { assertSelectLanguageItems } from "test-utils/assertions/select-language";
import { faker } from "@faker-js/faker/locale/en_US";

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

const randomLanguage1 = languages[faker.number.int({ min: 0, max: 2 })];
const randomLanguage2 = languages[faker.number.int({ min: 3, max: 4 })];

it("should display vocabulary game setup form", () => {
  renderWithProviders(<VocabularyGameSetup />, {
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  const selectBaseLanguage = screen.getByTestId("select-base-language");
  expect(selectBaseLanguage).toBeInTheDocument();
  assertSelectLanguageItems(selectBaseLanguage, languages);

  const selectTargetLanguage = screen.getByTestId("select-target-language");
  expect(selectTargetLanguage).toBeInTheDocument();
  assertSelectLanguageItems(selectTargetLanguage, languages);

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
