const { screen } = require("@testing-library/react");
const { default: ArticleGame } = require("pages/Games/ArticleGame/ArticleGame");
import { setupArticleGame, submitAnswerArticleGame } from "api/games";
import { renderWithProviders } from "test-utils/store";
import userEvent from "@testing-library/user-event";
import { getInitialGamesState } from "test-utils/mocking/games";
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
    setupArticleGame: jest.fn(),
    submitAnswerArticleGame: jest.fn()
  };
});

it("should display the word returned by the API", () => {
  setupArticleGame.mockImplementation((token, searchParams, onSuccess) => {
    onSuccess(mockedWord);
  });

  renderWithProviders(<ArticleGame />, {
    preloadedState: {
      games: getInitialGamesState()
    }
  });

  expect(setupArticleGame).toBeCalledTimes(1);

  const articleInput = screen.getByTestId("article-input");
  expect(articleInput).toBeInTheDocument();
  screen.getByPlaceholderText("Article");

  const wordDisabledInput = screen.getByTestId("word-disabled-input");
  expect(wordDisabledInput).toBeInTheDocument();
  screen.getByPlaceholderText("Mocked word");

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

    setupArticleGame.mockImplementation((token, searchParams, onSuccess) => {
      onSuccess(mockedWord);
    });

    submitAnswerArticleGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    renderWithProviders(<ArticleGame />, {
      preloadedState: {
        games: getInitialGamesState()
      }
    });

    const articleInput = screen.getByTestId("article-input");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(articleInput, "article");
    await user.click(submitAnswerButton);

    expect(submitAnswerArticleGame).toBeCalledTimes(1);
    expect(submitAnswerArticleGame).toBeCalledWith(
      null,
      {
        word_id: mockedWord.id,
        answer: "article"
      },
      expect.anything()
    );

    const feedbackAlert = screen.getByTestId("feedback-alert");
    expect(feedbackAlert).toBeInTheDocument();
    expect(feedbackAlert).toHaveClass("alert-success");

    const feedback = screen.getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Correct answer :)");

    const answer = screen.getByTestId("unique-response-item");
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(mockedAnswer.correct_answer);

    const score = screen.getByTestId("score");
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

    setupArticleGame.mockImplementation((token, searchParams, onSuccess) => {
      onSuccess(mockedWord);
    });

    submitAnswerArticleGame.mockImplementation((token, body, onSuccess) => {
      onSuccess(mockedAnswer);
    });

    renderWithProviders(<ArticleGame />, {
      preloadedState: {
        games: getInitialGamesState()
      }
    });

    const articleInput = screen.getByTestId("article-input");
    const submitAnswerButton = screen.getByTestId("submit-answer-button");

    await user.type(articleInput, "article");
    await user.click(submitAnswerButton);

    expect(submitAnswerArticleGame).toBeCalledTimes(1);
    expect(submitAnswerArticleGame).toBeCalledWith(
      null,
      {
        word_id: mockedWord.id,
        answer: "article"
      },
      expect.anything()
    );

    const feedbackAlert = screen.getByTestId("feedback-alert");
    expect(feedbackAlert).toBeInTheDocument();
    expect(feedbackAlert).toHaveClass("alert-danger");

    const feedback = screen.getByTestId("feedback");
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent("Wrong answer");

    const answer = screen.getByTestId("unique-response-item");
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(mockedAnswer.correct_answer);
  });
});
