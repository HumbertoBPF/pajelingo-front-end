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

export const assertFirstPageOf = (page) => {
  assertIsNthPage(1);

  const lastPage = screen.getByTestId(`${page}th-page`);
  expect(lastPage).toBeInTheDocument();
  expect(lastPage).toHaveTextContent(`${page}`);

  const previousPage = screen.queryByTestId("previous-page");
  expect(previousPage).not.toBeInTheDocument();

  const nextPage = screen.getByTestId("next-page");
  expect(nextPage).toBeInTheDocument();

  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  expect(ellipsisStart).not.toBeInTheDocument();

  const ellipsisEnd = screen.getByTestId("ellipsis-end");
  expect(ellipsisEnd).toBeInTheDocument();
  expect(ellipsisEnd).toHaveTextContent("…More");
};
