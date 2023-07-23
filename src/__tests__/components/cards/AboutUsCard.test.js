const { screen } = require("@testing-library/react");
const { default: AboutUsCard } = require("components/cards/AboutUsCard");
const { getRandomInteger } = require("utils");
const { renderWithProviders } = require("test-utils/store");

it("should render a card with details about the app", () => {
  const item = {
    id: getRandomInteger(1, 1000),
    image: "image",
    text: "This is an item about the app",
    alt: "This is an alternative text for the image"
  };

  renderWithProviders(<AboutUsCard item={item} />);

  screen.getByTestId(`${item.id}-about-us-card`);
  const aboutUsText = screen.getByText(item.text);
  screen.getByAltText(item.alt);

  expect(aboutUsText).toHaveTextContent(item.text);
});
