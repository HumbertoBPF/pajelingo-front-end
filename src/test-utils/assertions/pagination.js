import { screen } from "@testing-library/react";

export const assertIsNthPage = (page) => {
  const currentPage = screen.getByTestId("current-page");
  expect(currentPage).toBeInTheDocument();
  expect(currentPage).toHaveTextContent(`${page}(current)`);
};

export const assertPaginationCallbackHasBeenCalled = (callback, page) => {
  expect(callback).toBeCalledTimes(1);
  expect(callback).toBeCalledWith(page);
};
