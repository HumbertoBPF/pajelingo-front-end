const { screen } = require("@testing-library/react");
const { default: AboutUsCard } = require("components/cards/AboutUsCard");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";

it("should render a card with details about the app", () => {
  const item = {
    id: faker.number.int({ min: 1, max: 1000 }),
    image: "image",
    text: faker.lorem.sentence(),
    alt: faker.lorem.sentence()
  };

  renderWithProviders(<AboutUsCard item={item} />);

  screen.getByTestId(`${item.id}-about-us-card`);
  const aboutUsText = screen.getByText(item.text);
  screen.getByAltText(item.alt);

  expect(aboutUsText).toHaveTextContent(item.text);
});
