const { screen } = require("@testing-library/react");
const { default: MeaningCard } = require("components/cards/MeaningCard");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";

const meaning = faker.lorem.words({ min: 5, max: 15 });

describe("should display a word meaning in a card", () => {
  it("when the word has a unique meaning", () => {
    renderWithProviders(<MeaningCard meaning={meaning} />);

    const meaningCardText = screen.getByText(`Meaning: ${meaning}`);
    expect(meaningCardText).toHaveTextContent(`Meaning: ${meaning}`);
  });

  it("when the word has more than one meaning", () => {
    const index = faker.number.int({ min: 1, max: 5 });

    renderWithProviders(<MeaningCard index={index} meaning={meaning} />);

    const meaningCardText = screen.getByText(
      `Meaning number ${index}: ${meaning}`
    );
    expect(meaningCardText).toHaveTextContent(
      `Meaning number ${index}: ${meaning}`
    );
  });
});
