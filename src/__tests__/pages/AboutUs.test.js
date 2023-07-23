import { renderWithProviders } from "test-utils/store";
import aboutUsData from "../../pages/AboutUs/data.json";
const { screen, within } = require("@testing-library/react");
const { default: AboutUs } = require("pages/AboutUs");

it("should display items explaining the app features", () => {
  renderWithProviders(<AboutUs />);

  expect(aboutUsData.items.length).toBe(5);

  aboutUsData.items.forEach((item) => {
    const aboutUsItem = screen.getByTestId(`${item.id}-about-us-card`);
    const aboutUsItemText = within(aboutUsItem).getByText(item.text);
    within(aboutUsItem).getByAltText(item.alt);
    expect(aboutUsItemText).toHaveTextContent(item.text);
  });
});
