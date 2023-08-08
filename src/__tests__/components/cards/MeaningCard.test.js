const { screen } = require("@testing-library/react");
const { default: MeaningCard } = require("components/cards/MeaningCard");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";

const meaning = {
  id: faker.number.int({ min: 1, max: 100 }),
  meaning: faker.lorem.words({ min: 5, max: 15 }),
  word: faker.number.int({ min: 1, max: 100 })
};

describe("should display a word meaning in a card", () => {
  it("when the word has a unique meaning", () => {
    renderWithProviders(<MeaningCard meaning={meaning} />);

    const meaningCard = screen.getByTestId(`${meaning.id}-meaning-card`);
    expect(meaningCard).toHaveTextContent(`Meaning: ${meaning.meaning}`);
  });

  it("when the word has more than one meaning", () => {
    const index = faker.number.int({ min: 1, max: 5 });

    renderWithProviders(<MeaningCard index={index} meaning={meaning} />);

    const meaningCard = screen.getByTestId(`${meaning.id}-meaning-card`);
    expect(meaningCard).toHaveTextContent(
      `Meaning number ${index}: ${meaning.meaning}`
    );
  });
});
