const { default: Index } = require("pages/Index");
const { renderWithProviders } = require("test-utils/store");
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import data from "pages/Index/data.json";
import { assertCarouselItem } from "test-utils/assertions/carousel";

it("should display carousel items", async () => {
  const user = userEvent.setup();

  renderWithProviders(<Index />);

  const carousel = screen.getByTestId("carousel");

  const nextButton = within(carousel).getByText("Next");

  const carouselItems = data.items;

  assertCarouselItem(carouselItems[0]);
  await user.click(nextButton);

  assertCarouselItem(carouselItems[1]);
  await user.click(nextButton);

  assertCarouselItem(carouselItems[2]);
  await user.click(nextButton);

  assertCarouselItem(carouselItems[0]);
});
