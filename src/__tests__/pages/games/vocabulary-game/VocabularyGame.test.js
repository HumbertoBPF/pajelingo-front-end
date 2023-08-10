const { screen, within } = require("@testing-library/react");
const {
  setupVocabularyGame,
  submitAnswerVocabularyGame
} = require("api/games");
const {
  default: VocabularyGame
} = require("pages/Games/VocabularyGame/VocabularyGame");
const { renderWithProviders } = require("test-utils/store");
import userEvent from "@testing-library/user-event";
import { getInitialGamesState } from "test-utils/mocking/games";
import languages from "../../../../../cypress/fixtures/languages.json";
import { faker } from "@faker-js/faker/locale/en_US";

const mockedWord = {
  id: 100,
  word: "Mocked word"
};

jest.mock("api/games", () => {
  const originalModule = jest.requireActual("api/games");

  return {
    __esmodule: true,
    ...originalModule,
    setupVocabularyGame: jest.fn(),
    submitAnswerVocabularyGame: jest.fn()
  };
});

it("should display the word returned by the API", () => {
  setupVocabularyGame.mockImplementation((token, searchParams, onSuccess) => {
    onSuccess(mockedWord);
  });

  const baseLanguage = languages[faker.number.int({ min: 0, max: 1 })];
  const targetLanguage = languages[faker.number.int({ min: 2, max: 4 })];

  renderWithProviders(<VocabularyGame />, {
    preloadedState: {
      games: getInitialGamesState()
    },
    initialEntries: [
      `/vocabulary-game/play?base_language=${baseLanguage.language_name}&target_language=${targetLanguage.language_name}`
    ]
  });

  expect(setupVocabularyGame).toBeCalledTimes(1);

  const wordInput = screen.getByTestId("word-input");
  expect(wordInput).toBeInTheDocument();
  expect(wordInput).toHaveAttribute("placeholder", "Mocked word");
  expect(wordInput).toBeDisabled();

  const answerInput = screen.getByTestId("answer-input");
  expect(answerInput).toBeInTheDocument();
  expect(answerInput).toHaveAttribute(
    "placeholder",
    `Provide the translation in ${baseLanguage.language_name}`
  );

  const submitAnswerButton = screen.getByTestId("submit-answer-button");
  expect(submitAnswerButton).toBeInTheDocument();
  expect(submitAnswerButton).toHaveTextContent("Verify answer");
});

describe("should display the feedback", () => {
  it("when the answer is correct", async () => {
    const user = userEvent.setup();

    const mockedAnswer = {
      result: true,
      correct_answer: "Mocked correct answer",
      score: faker.number.int({ min: 100, max: 1000 }),
      new_badges: []
    };

    setupVocabularyGame.mockImplementation((token, searchParams, onSuccess) => {
      onSuccess(mockedWord);
    });

    submitAnswerVocabularyGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    const baseLanguage = languages[faker.number.int({ min: 0, max: 1 })];
    const targetLanguage = languages[faker.number.int({ min: 2, max: 4 })];

    renderWithProviders(<VocabularyGame />, {
      preloadedState: {
        games: getInitialGamesState()
      },
      initialEntries: [
        `/vocabulary-game/play?base_language=${baseLanguage.language_name}&target_language=${targetLanguage.language_name}`
      ]
    });

    const answerInput = screen.getByTestId("answer-input");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(answerInput, "mocked answer");
    await user.click(submitAnswerButton);

    expect(submitAnswerVocabularyGame).toBeCalledTimes(1);
    expect(submitAnswerVocabularyGame).toBeCalledWith(
      null,
      {
        word_id: mockedWord.id,
        base_language: baseLanguage.language_name,
        answer: "mocked answer"
      },
      expect.anything()
    );

    const toastError = screen.getByTestId("feedback-alert");
    expect(toastError).toBeInTheDocument();
    expect(toastError).toHaveClass("alert-success");

    const feedback = within(toastError).getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Correct answer :)");

    const correctAnswer = within(toastError).getByTestId(
      "unique-response-item"
    );
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(mockedAnswer.correct_answer);

    const score = within(toastError).getByTestId("score");
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent(mockedAnswer.score);
  });

  it("when the answer is wrong", async () => {
    const user = userEvent.setup();

    const mockedAnswer = {
      result: false,
      correct_answer: "Mocked correct answer",
      new_badges: []
    };

    setupVocabularyGame.mockImplementation((token, searchParams, onSuccess) => {
      onSuccess(mockedWord);
    });

    submitAnswerVocabularyGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    const baseLanguage = languages[faker.number.int({ min: 0, max: 1 })];
    const targetLanguage = languages[faker.number.int({ min: 2, max: 4 })];

    renderWithProviders(<VocabularyGame />, {
      preloadedState: {
        games: getInitialGamesState()
      },
      initialEntries: [
        `/vocabulary-game/play?base_language=${baseLanguage.language_name}&target_language=${targetLanguage.language_name}`
      ]
    });

    const answerInput = screen.getByTestId("answer-input");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(answerInput, "mocked answer");
    await user.click(submitAnswerButton);

    expect(submitAnswerVocabularyGame).toBeCalledTimes(1);
    expect(submitAnswerVocabularyGame).toBeCalledWith(
      null,
      {
        word_id: mockedWord.id,
        base_language: baseLanguage.language_name,
        answer: "mocked answer"
      },
      expect.anything()
    );

    const toastError = screen.getByTestId("feedback-alert");
    expect(toastError).toBeInTheDocument();
    expect(toastError).toHaveClass("alert-danger");

    const feedback = within(toastError).getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Wrong answer");

    const correctAnswer = within(toastError).getByTestId(
      "unique-response-item"
    );
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent(mockedAnswer.correct_answer);
  });
});
