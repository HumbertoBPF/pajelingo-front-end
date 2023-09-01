const { screen } = require("@testing-library/react");
const { default: NotFound } = require("pages/NotFound");
const { renderWithProviders } = require("test-utils/store");

it("should display content indicating that the accessed page does not exist", () => {
  renderWithProviders(<NotFound />);

  const notFound = screen.getByTestId("not-found");
  expect(notFound).toBeInTheDocument();
  expect(notFound).toHaveTextContent(
    "The page you are trying to access does not exist or was removed"
  );

  const notFoundImage = screen.getByTestId("not-found-image");
  expect(notFoundImage).toBeInTheDocument();
  expect(notFoundImage).toHaveAccessibleName("Not found");
});
