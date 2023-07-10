const { render, screen } = require("@testing-library/react");
const { default: FeedbackPage } = require("pages/FeedbackPage");
const { getRandomInteger } = require("utils");

describe("should display positive feedback", () => {
  it.each([[true], [false]])("with a unique answer item", (hasScore) => {
    const feedback = {
      result: true,
      correct_answer: "Correct answer",
      new_badges: [],
      state: "succeeded"
    };

    if (hasScore) {
      feedback.score = getRandomInteger(100, 1000);
    }

    render(<FeedbackPage feedback={feedback} />);

    const successMessage = screen.getByTestId("feedback");
    expect(successMessage).toBeInTheDocument();
    expect(successMessage.textContent).toBe("Correct answer :)");

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
  });

  it.each([[true], [false]])("with multiple answer items", (hasScore) => {
    const feedback = {
      result: true,
      correct_answer: "Correct answer 1\nCorrect answer 2\nCorrect answer 3",
      new_badges: [],
      state: "succeeded"
    };

    if (hasScore) {
      feedback.score = getRandomInteger(100, 1000);
    }

    render(<FeedbackPage feedback={feedback} />);

    const successMessage = screen.getByTestId("feedback");
    expect(successMessage).toBeInTheDocument();
    expect(successMessage.textContent).toBe("Correct answer :)");

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
  });
});
