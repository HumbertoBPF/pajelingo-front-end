const { screen, within } = require("@testing-library/react");
const { default: FeedbackPage } = require("pages/FeedbackPage");
const { getRandomInteger } = require("utils");
import userEvent from "@testing-library/user-event";
import newBadges from "../test-data/new-badges.json";
import { renderWithProviders } from "test-utils/store";

const getFeedback = (result, correctAnswer, newBadges = []) => {
  return {
    result,
    correct_answer: correctAnswer,
    new_badges: newBadges,
    state: "succeeded"
  };
};

const assertHasPositiveFeedback = () => {
  const messageElement = screen.getByTestId("feedback");
  expect(messageElement).toBeInTheDocument();
  expect(messageElement).toHaveTextContent("Correct answer :)");
};

const assertHasNegativeFeedback = () => {
  const messageElement = screen.getByTestId("feedback");
  expect(messageElement).toBeInTheDocument();
  expect(messageElement).toHaveTextContent("Wrong answer");
};

const assertHasNewWordButton = () => {
  const newWordButton = screen.getByTestId("new-word-button");
  expect(newWordButton).toBeInTheDocument();
  expect(newWordButton).toHaveClass("btn-success");
  expect(newWordButton).toHaveTextContent("New word");
};

describe("should display positive feedback", () => {
  describe("with a unique answer item", () => {
    it("and with score", () => {
      const feedback = getFeedback(true, "Correct answer");
      feedback.score = getRandomInteger(100, 1000);

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasPositiveFeedback();

      const uniqueResponseItem = screen.getByTestId("unique-response-item");
      expect(uniqueResponseItem).toBeInTheDocument();
      expect(uniqueResponseItem).toHaveTextContent("Correct answer");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).toBeInTheDocument();
      expect(scoreElement).toHaveTextContent(`Your score is ${feedback.score}`);

      assertHasNewWordButton();
    });

    it("and without score", () => {
      const feedback = getFeedback(true, "Correct answer");

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasPositiveFeedback();

      const uniqueResponseItem = screen.getByTestId("unique-response-item");
      expect(uniqueResponseItem).toBeInTheDocument();
      expect(uniqueResponseItem).toHaveTextContent("Correct answer");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).not.toBeInTheDocument();

      assertHasNewWordButton();
    });
  });

  describe("with multiple answer items", () => {
    it("and with score", () => {
      const feedback = getFeedback(
        true,
        "Correct answer 1\nCorrect answer 2\nCorrect answer 3"
      );
      feedback.score = getRandomInteger(100, 1000);

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasPositiveFeedback();

      const uniqueResponseItem = screen.queryByTestId("unique-response-item");
      expect(uniqueResponseItem).not.toBeInTheDocument();

      const firstResponseItem = screen.getByTestId("1th-response-item");
      expect(firstResponseItem).toBeInTheDocument();
      expect(firstResponseItem).toHaveTextContent("Correct answer 1");

      const secondResponseItem = screen.getByTestId("2th-response-item");
      expect(secondResponseItem).toBeInTheDocument();
      expect(secondResponseItem).toHaveTextContent("Correct answer 2");

      const threeResponseItem = screen.getByTestId("3th-response-item");
      expect(threeResponseItem).toBeInTheDocument();
      expect(threeResponseItem).toHaveTextContent("Correct answer 3");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).toBeInTheDocument();
      expect(scoreElement).toHaveTextContent(`Your score is ${feedback.score}`);

      assertHasNewWordButton();
    });

    it("and without score", () => {
      const feedback = getFeedback(
        true,
        "Correct answer 1\nCorrect answer 2\nCorrect answer 3"
      );

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasPositiveFeedback();

      const uniqueResponseItem = screen.queryByTestId("unique-response-item");
      expect(uniqueResponseItem).not.toBeInTheDocument();

      const firstResponseItem = screen.getByTestId("1th-response-item");
      expect(firstResponseItem).toBeInTheDocument();
      expect(firstResponseItem).toHaveTextContent("Correct answer 1");

      const secondResponseItem = screen.getByTestId("2th-response-item");
      expect(secondResponseItem).toBeInTheDocument();
      expect(secondResponseItem).toHaveTextContent("Correct answer 2");

      const threeResponseItem = screen.getByTestId("3th-response-item");
      expect(threeResponseItem).toBeInTheDocument();
      expect(threeResponseItem).toHaveTextContent("Correct answer 3");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).not.toBeInTheDocument();

      assertHasNewWordButton();
    });
  });
});

describe("should display negative feedback", () => {
  describe("with a unique answer item", () => {
    it("and with score", () => {
      const feedback = getFeedback(false, "Correct answer");
      feedback.score = getRandomInteger(100, 1000);

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasNegativeFeedback();

      const uniqueResponseItem = screen.getByTestId("unique-response-item");
      expect(uniqueResponseItem).toBeInTheDocument();
      expect(uniqueResponseItem).toHaveTextContent("Correct answer");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).toBeInTheDocument();
      expect(scoreElement).toHaveTextContent(`Your score is ${feedback.score}`);

      assertHasNewWordButton();
    });

    it("and without score", () => {
      const feedback = getFeedback(false, "Correct answer");

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasNegativeFeedback();

      const uniqueResponseItem = screen.getByTestId("unique-response-item");
      expect(uniqueResponseItem).toBeInTheDocument();
      expect(uniqueResponseItem).toHaveTextContent("Correct answer");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).not.toBeInTheDocument();

      assertHasNewWordButton();
    });
  });

  describe("with multiple answer items", () => {
    it("and with score", () => {
      const feedback = getFeedback(
        false,
        "Correct answer 1\nCorrect answer 2\nCorrect answer 3"
      );
      feedback.score = getRandomInteger(100, 1000);

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasNegativeFeedback();

      const uniqueResponseItem = screen.queryByTestId("unique-response-item");
      expect(uniqueResponseItem).not.toBeInTheDocument();

      const firstResponseItem = screen.getByTestId("1th-response-item");
      expect(firstResponseItem).toBeInTheDocument();
      expect(firstResponseItem).toHaveTextContent("Correct answer 1");

      const secondResponseItem = screen.getByTestId("2th-response-item");
      expect(secondResponseItem).toBeInTheDocument();
      expect(secondResponseItem).toHaveTextContent("Correct answer 2");

      const threeResponseItem = screen.getByTestId("3th-response-item");
      expect(threeResponseItem).toBeInTheDocument();
      expect(threeResponseItem).toHaveTextContent("Correct answer 3");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).toBeInTheDocument();
      expect(scoreElement).toHaveTextContent(`Your score is ${feedback.score}`);

      assertHasNewWordButton();
    });

    it("and without score", () => {
      const feedback = getFeedback(
        false,
        "Correct answer 1\nCorrect answer 2\nCorrect answer 3"
      );

      renderWithProviders(<FeedbackPage feedback={feedback} />);

      assertHasNegativeFeedback();

      const uniqueResponseItem = screen.queryByTestId("unique-response-item");
      expect(uniqueResponseItem).not.toBeInTheDocument();

      const firstResponseItem = screen.getByTestId("1th-response-item");
      expect(firstResponseItem).toBeInTheDocument();
      expect(firstResponseItem).toHaveTextContent("Correct answer 1");

      const secondResponseItem = screen.getByTestId("2th-response-item");
      expect(secondResponseItem).toBeInTheDocument();
      expect(secondResponseItem).toHaveTextContent("Correct answer 2");

      const threeResponseItem = screen.getByTestId("3th-response-item");
      expect(threeResponseItem).toBeInTheDocument();
      expect(threeResponseItem).toHaveTextContent("Correct answer 3");

      const scoreElement = screen.queryByTestId("score");
      expect(scoreElement).not.toBeInTheDocument();

      assertHasNewWordButton();
    });
  });
});

it("should display the lastly achieved user badges", () => {
  const feedback = getFeedback(true, "Correct answer", newBadges.badges);
  feedback.score = getRandomInteger(100, 1000);

  renderWithProviders(<FeedbackPage feedback={feedback} />);

  assertHasPositiveFeedback();

  const uniqueResponseItem = screen.getByTestId("unique-response-item");
  expect(uniqueResponseItem).toBeInTheDocument();
  expect(uniqueResponseItem).toHaveTextContent("Correct answer");

  const score = screen.queryByTestId("score");
  expect(score).toBeInTheDocument();
  expect(score).toHaveTextContent(`Your score is ${feedback.score}`);

  assertHasNewWordButton();

  newBadges.badges.forEach((badge) => {
    const badgeNotification = screen.getByTestId(
      `${badge.id}-notification-badge`
    );
    expect(badgeNotification).toBeInTheDocument();

    const notificationTitle = within(badgeNotification).getByText(
      `New achievement: ${badge.name}`
    );
    expect(notificationTitle).toBeInTheDocument();
    expect(notificationTitle).toHaveTextContent(
      `New achievement: ${badge.name}`
    );

    const notificationMessage = within(badgeNotification).getByText(
      badge.description
    );
    expect(notificationMessage).toBeInTheDocument();
    expect(notificationMessage).toHaveTextContent(badge.description);
  });
});

it("should call playAgain callback when users click on the new word button", async () => {
  const user = userEvent.setup();

  const feedback = getFeedback(true, "Correct answer");

  const playAgain = jest.fn(() => {});

  renderWithProviders(
    <FeedbackPage feedback={feedback} playAgain={playAgain} />
  );

  const newWordButton = screen.getByTestId("new-word-button");
  await user.click(newWordButton);

  expect(playAgain).toBeCalledTimes(1);
});
