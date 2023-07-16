const { screen } = require("@testing-library/react");
const { default: MeaningCard } = require("components/cards/MeaningCard");
const { getRandomInteger } = require("utils");
const { renderWithProviders } = require("utils/test-utils");

describe("should display a word meaning in a card", () => {
  it("when the word has a unique meaning", () => {
    const meaning = "This is the meaning of the word";

    renderWithProviders(<MeaningCard meaning={meaning} />);

    const meaningCardText = screen.getByText(`Meaning: ${meaning}`);
    expect(meaningCardText).toHaveTextContent(`Meaning: ${meaning}`);
  });

  it("when the word has more than one meaning", () => {
    const index = getRandomInteger(1, 5);
    const meaning = "This is the meaning of the word";

    renderWithProviders(<MeaningCard index={index} meaning={meaning} />);

    const meaningCardText = screen.getByText(
      `Meaning number ${index}: ${meaning}`
    );
    expect(meaningCardText).toHaveTextContent(
      `Meaning number ${index}: ${meaning}`
    );
  });
});
