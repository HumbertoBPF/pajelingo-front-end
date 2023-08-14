import { screen, within } from "@testing-library/dom";

export const assertCarouselItem = (item) => {
  const carouselItem = screen.getByTestId(`carousel-item-${item.id}`);
  expect(carouselItem).toBeInTheDocument();
  expect(carouselItem).toHaveClass("active");

  const carouselItemImage = within(carouselItem).getByTestId(
    "carousel-item-image"
  );
  expect(carouselItemImage).toBeInTheDocument();
  expect(carouselItemImage).toHaveAccessibleName(item.title);

  const carouselItemTitle = within(carouselItem).getByTestId(
    "carousel-item-title"
  );
  expect(carouselItemTitle).toBeInTheDocument();
  expect(carouselItemTitle).toHaveTextContent(item.title);

  const carouselItemDescription = within(carouselItem).getByTestId(
    "carousel-item-description"
  );
  expect(carouselItemDescription).toBeInTheDocument();
  expect(carouselItemDescription).toHaveTextContent(item.description);
};
