const { screen, within } = require("@testing-library/react");
const {
  setupConjugationGame,
  submitAnswerConjugationGame
} = require("api/games");
const {
  default: ConjugationGame
} = require("pages/Games/ConjugationGame/ConjugationGame");
const {
  renderWithProviders,
  getInitialGamesState
} = require("test-utils/store");
import { getRandomInteger } from "utils";
import languages from "../../../test-data/languages.json";
import userEvent from "@testing-library/user-event";

const mockedVerb = {
  id: 100,
  word: "Mocked verb",
  tense: "Mocked tense"
};

const randomLanguage = languages[getRandomInteger(0, 4)];

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

jest.mock("api/games", () => {
  const originalModule = jest.requireActual("api/games");

  return {
    __esmodule: true,
    ...originalModule,
    setupConjugationGame: jest.fn(),
    submitAnswerConjugationGame: jest.fn()
  };
});

it("should display the verb and the tense returned by the API", () => {
  setupConjugationGame.mockImplementation((token, searchParams, onSuccess) => {
    onSuccess(mockedVerb);
  });

  renderWithProviders(<ConjugationGame />, {
    initialEntries: [
      `/conjugation-game/play?language=${randomLanguage.language_name}`
    ],
    preloadedState: {
      games: getInitialGamesState(),
      languages
    }
  });

  expect(setupConjugationGame).toBeCalledTimes(1);

  const verbAndTense = screen.getByTestId("verb-and-tense");
  expect(verbAndTense).toBeInTheDocument();
  const verbAndTenseText = within(verbAndTense).getByPlaceholderText(
    `${mockedVerb.word} - ${mockedVerb.tense}`
  );
  expect(verbAndTenseText).toBeDisabled();

  const conjugation1 = screen.getByTestId("conjugation-1");
  expect(conjugation1).toBeInTheDocument();
  within(conjugation1).getByLabelText(randomLanguage.personal_pronoun_1);

  const conjugation2 = screen.getByTestId("conjugation-2");
  expect(conjugation2).toBeInTheDocument();
  within(conjugation2).getByLabelText(randomLanguage.personal_pronoun_2);

  const conjugation3 = screen.getByTestId("conjugation-3");
  expect(conjugation3).toBeInTheDocument();
  within(conjugation3).getByLabelText(randomLanguage.personal_pronoun_3);

  const conjugation4 = screen.getByTestId("conjugation-4");
  expect(conjugation4).toBeInTheDocument();
  within(conjugation4).getByLabelText(randomLanguage.personal_pronoun_4);

  const conjugation5 = screen.getByTestId("conjugation-5");
  expect(conjugation5).toBeInTheDocument();
  within(conjugation5).getByLabelText(randomLanguage.personal_pronoun_5);

  const conjugation6 = screen.getByTestId("conjugation-6");
  expect(conjugation6).toBeInTheDocument();
  within(conjugation6).getByLabelText(randomLanguage.personal_pronoun_6);

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
      score: getRandomInteger(100, 1000),
      new_badges: []
    };

    setupConjugationGame.mockImplementation(
      (token, searchParams, onSuccess) => {
        onSuccess(mockedVerb);
      }
    );

    submitAnswerConjugationGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    renderWithProviders(<ConjugationGame />, {
      initialEntries: [
        `/conjugation-game/play?language=${randomLanguage.language_name}`
      ],
      preloadedState: {
        games: getInitialGamesState(),
        languages
      }
    });

    const conjugation1 = screen.getByTestId("conjugation-1");
    const conjugationInput1 = within(conjugation1).getByPlaceholderText("");
    const conjugation2 = screen.getByTestId("conjugation-2");
    const conjugationInput2 = within(conjugation2).getByPlaceholderText("");
    const conjugation3 = screen.getByTestId("conjugation-3");
    const conjugationInput3 = within(conjugation3).getByPlaceholderText("");
    const conjugation4 = screen.getByTestId("conjugation-4");
    const conjugationInput4 = within(conjugation4).getByPlaceholderText("");
    const conjugation5 = screen.getByTestId("conjugation-5");
    const conjugationInput5 = within(conjugation5).getByPlaceholderText("");
    const conjugation6 = screen.getByTestId("conjugation-6");
    const conjugationInput6 = within(conjugation6).getByPlaceholderText("");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(conjugationInput1, "conjugation 1");
    await user.type(conjugationInput2, "conjugation 2");
    await user.type(conjugationInput3, "conjugation 3");
    await user.type(conjugationInput4, "conjugation 4");
    await user.type(conjugationInput5, "conjugation 5");
    await user.type(conjugationInput6, "conjugation 6");
    await user.click(submitAnswerButton);

    expect(submitAnswerConjugationGame).toBeCalledTimes(1);
    expect(submitAnswerConjugationGame).toBeCalledWith(
      null,
      {
        word_id: mockedVerb.id,
        tense: mockedVerb.tense,
        conjugation_1: "conjugation 1",
        conjugation_2: "conjugation 2",
        conjugation_3: "conjugation 3",
        conjugation_4: "conjugation 4",
        conjugation_5: "conjugation 5",
        conjugation_6: "conjugation 6"
      },
      expect.anything()
    );

    const feedbackAlert = screen.getByTestId("feedback-alert");
    expect(feedbackAlert).toBeInTheDocument();
    expect(feedbackAlert).toHaveClass("alert-success");

    const feedback = within(feedbackAlert).getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Correct answer :)");

    const answer = within(feedbackAlert).getByTestId("unique-response-item");
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(mockedAnswer.correct_answer);

    const score = within(feedbackAlert).getByTestId("score");
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent(`Your score is ${mockedAnswer.score}`);
  });

  it("when the answer is wrong", async () => {
    const user = userEvent.setup();

    const mockedAnswer = {
      result: false,
      correct_answer: "Mocked wrong answer",
      new_badges: []
    };

    setupConjugationGame.mockImplementation(
      (token, searchParams, onSuccess) => {
        onSuccess(mockedVerb);
      }
    );

    submitAnswerConjugationGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    renderWithProviders(<ConjugationGame />, {
      initialEntries: [
        `/conjugation-game/play?language=${randomLanguage.language_name}`
      ],
      preloadedState: {
        games: getInitialGamesState(),
        languages
      }
    });

    const conjugation1 = screen.getByTestId("conjugation-1");
    const conjugationInput1 = within(conjugation1).getByPlaceholderText("");
    const conjugation2 = screen.getByTestId("conjugation-2");
    const conjugationInput2 = within(conjugation2).getByPlaceholderText("");
    const conjugation3 = screen.getByTestId("conjugation-3");
    const conjugationInput3 = within(conjugation3).getByPlaceholderText("");
    const conjugation4 = screen.getByTestId("conjugation-4");
    const conjugationInput4 = within(conjugation4).getByPlaceholderText("");
    const conjugation5 = screen.getByTestId("conjugation-5");
    const conjugationInput5 = within(conjugation5).getByPlaceholderText("");
    const conjugation6 = screen.getByTestId("conjugation-6");
    const conjugationInput6 = within(conjugation6).getByPlaceholderText("");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(conjugationInput1, "conjugation 1");
    await user.type(conjugationInput2, "conjugation 2");
    await user.type(conjugationInput3, "conjugation 3");
    await user.type(conjugationInput4, "conjugation 4");
    await user.type(conjugationInput5, "conjugation 5");
    await user.type(conjugationInput6, "conjugation 6");
    await user.click(submitAnswerButton);

    expect(submitAnswerConjugationGame).toBeCalledTimes(1);
    expect(submitAnswerConjugationGame).toBeCalledWith(
      null,
      {
        word_id: mockedVerb.id,
        tense: mockedVerb.tense,
        conjugation_1: "conjugation 1",
        conjugation_2: "conjugation 2",
        conjugation_3: "conjugation 3",
        conjugation_4: "conjugation 4",
        conjugation_5: "conjugation 5",
        conjugation_6: "conjugation 6"
      },
      expect.anything()
    );

    const feedbackAlert = screen.getByTestId("feedback-alert");
    expect(feedbackAlert).toBeInTheDocument();
    expect(feedbackAlert).toHaveClass("alert-danger");

    const feedback = within(feedbackAlert).getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Wrong answer");

    const answer = within(feedbackAlert).getByTestId("unique-response-item");
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(mockedAnswer.correct_answer);
  });
});
