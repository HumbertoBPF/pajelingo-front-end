const { screen, within } = require("@testing-library/react");
const { default: FeedbackPage } = require("pages/FeedbackPage");
const { getRandomInteger } = require("utils");
import userEvent from "@testing-library/user-event";
import newBadges from "../test-data/new-badges.json";
import { renderWithProviders } from "utils/test-utils";

describe.each([[true], [false]])("should display feedback", (result) => {
  it.each([[true], [false]])("with a unique answer item", (hasScore) => {
    const feedback = {
      result,
      correct_answer: "Correct answer",
      new_badges: [],
      state: "succeeded"
    };

    const expectedMessage = result ? "Correct answer :)" : "Wrong answer";

    if (hasScore) {
      feedback.score = getRandomInteger(100, 1000);
    }

    renderWithProviders(<FeedbackPage feedback={feedback} />);

    const message = screen.getByTestId("feedback");
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe(expectedMessage);

    const uniqueResponseItem = screen.getByTestId("unique-response-item");
    expect(uniqueResponseItem).toBeInTheDocument();
    expect(uniqueResponseItem.textContent).toBe("Correct answer");

    const score = screen.queryByTestId("score");

    if (hasScore) {
      expect(score).toBeInTheDocument();
      expect(score.textContent).toBe(`Your score is ${feedback.score}`);
    } else {
      expect(score).not.toBeInTheDocument();
    }

    const newWordButton = screen.getByTestId("new-word-button");
    expect(newWordButton).toBeInTheDocument();
    expect(newWordButton.textContent).toBe("New word");
  });

  it.each([[true], [false]])("with multiple answer items", (hasScore) => {
    const feedback = {
      result,
      correct_answer: "Correct answer 1\nCorrect answer 2\nCorrect answer 3",
      new_badges: [],
      state: "succeeded"
    };

    const expectedMessage = result ? "Correct answer :)" : "Wrong answer";

    if (hasScore) {
      feedback.score = getRandomInteger(100, 1000);
    }

    renderWithProviders(<FeedbackPage feedback={feedback} />);

    const message = screen.getByTestId("feedback");
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe(expectedMessage);

    const uniqueResponseItem = screen.queryByTestId("unique-response-item");
    expect(uniqueResponseItem).not.toBeInTheDocument();

    const firstResponseItem = screen.getByTestId("1th-response-item");
    expect(firstResponseItem).toBeInTheDocument();
    expect(firstResponseItem.textContent).toBe("Correct answer 1");

    const secondResponseItem = screen.getByTestId("2th-response-item");
    expect(secondResponseItem).toBeInTheDocument();
    expect(secondResponseItem.textContent).toBe("Correct answer 2");

    const threeResponseItem = screen.getByTestId("3th-response-item");
    expect(threeResponseItem).toBeInTheDocument();
    expect(threeResponseItem.textContent).toBe("Correct answer 3");

    const score = screen.queryByTestId("score");

    if (hasScore) {
      expect(score).toBeInTheDocument();
      expect(score.textContent).toBe(`Your score is ${feedback.score}`);
    } else {
      expect(score).not.toBeInTheDocument();
    }

    const newWordButton = screen.getByTestId("new-word-button");
    expect(newWordButton).toBeInTheDocument();
    expect(newWordButton.textContent).toBe("New word");
  });
});

it("should display the lastly achieved user badges", () => {
  const feedback = {
    result: true,
    correct_answer: "Correct answer",
    new_badges: newBadges.badges,
    state: "succeeded",
    score: getRandomInteger(100, 1000)
  };

  renderWithProviders(<FeedbackPage feedback={feedback} />);

  const message = screen.getByTestId("feedback");
  expect(message).toBeInTheDocument();
  expect(message.textContent).toBe("Correct answer :)");

  const uniqueResponseItem = screen.getByTestId("unique-response-item");
  expect(uniqueResponseItem).toBeInTheDocument();
  expect(uniqueResponseItem.textContent).toBe("Correct answer");

  const score = screen.queryByTestId("score");
  expect(score).toBeInTheDocument();
  expect(score.textContent).toBe(`Your score is ${feedback.score}`);

  const newWordButton = screen.getByTestId("new-word-button");
  expect(newWordButton).toBeInTheDocument();
  expect(newWordButton.textContent).toBe("New word");

  newBadges.badges.forEach((badge) => {
    const badgeNotification = screen.getByTestId(
      `${badge.id}-notification-badge`
    );
    const notificationTitle = within(badgeNotification).getByText(
      `New achievement: ${badge.name}`
    );
    const notificationMessage = within(badgeNotification).getByText(
      badge.description
    );

    expect(badgeNotification).toBeInTheDocument();
    expect(notificationTitle).toBeInTheDocument();
    expect(notificationTitle.textContent).toBe(
      `New achievement: ${badge.name}`
    );
    expect(notificationMessage).toBeInTheDocument();
    expect(notificationMessage.textContent).toBe(badge.description);
  });
});

it("should call playAgain callback when users click on the new word button", async () => {
  const user = userEvent.setup();

  const feedback = {
    result: true,
    correct_answer: "Correct answer",
    new_badges: [],
    state: "succeeded",
    score: getRandomInteger(100, 1000)
  };

  const playAgain = jest.fn(() => {});

  renderWithProviders(
    <FeedbackPage feedback={feedback} playAgain={playAgain} />
  );

  const message = screen.getByTestId("feedback");
  expect(message).toBeInTheDocument();
  expect(message.textContent).toBe("Correct answer :)");

  const uniqueResponseItem = screen.getByTestId("unique-response-item");
  expect(uniqueResponseItem).toBeInTheDocument();
  expect(uniqueResponseItem.textContent).toBe("Correct answer");

  const score = screen.queryByTestId("score");
  expect(score).toBeInTheDocument();
  expect(score.textContent).toBe(`Your score is ${feedback.score}`);

  const newWordButton = screen.getByTestId("new-word-button");
  await user.click(newWordButton);

  expect(playAgain).toBeCalledTimes(1);
});
