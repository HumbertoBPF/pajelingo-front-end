import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "utils/test-utils";
const { default: PaginationBar } = require("../../components/PaginationBar");
const { getRandomInteger } = require("utils");

it.each([[1], [2], [getRandomInteger(3, 10)]])(
  "should display certain number of pages in the PaginationBar",
  (n) => {
    const page = 1;
    const count = getRandomInteger(10 * (n - 1) + 1, 10 * n);
    const resultsPerPage = 10;

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    const nextPage = screen.queryByTestId("next-page");
    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    const currentPage = screen.getByTestId("current-page");
    const lastPage = screen.queryByTestId(`${n}th-page`);
    const ellipsisEnd = screen.queryByTestId("ellipsis-end");

    expect(previousPage).not.toBeInTheDocument();
    expect(nextPage).not.toBeInTheDocument();
    expect(ellipsisStart).not.toBeInTheDocument();
    expect(currentPage).toHaveTextContent("1(current)");

    if (n > 1) {
      expect(lastPage).toHaveTextContent(`${n}`);
    } else {
      expect(lastPage).not.toBeInTheDocument();
    }

    if (n > 2) {
      expect(ellipsisEnd).toHaveTextContent("…More");
    } else {
      expect(ellipsisEnd).not.toBeInTheDocument();
    }
  }
);

it.each([[1], [2], [getRandomInteger(3, 8)], [9], [10]])(
  "should display the current page in PaginationBar",
  (page) => {
    const n = 10;
    const resultsPerPage = 10;
    const count = getRandomInteger(
      resultsPerPage * (n - 1) + 1,
      resultsPerPage * n
    );

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    const nextPage = screen.queryByTestId("next-page");
    const currentPage = screen.getByTestId("current-page");
    const firstPage = screen.queryByTestId("1th-page");
    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    const lastPage = screen.queryByTestId(`${n}th-page`);

    expect(previousPage).not.toBeInTheDocument();
    expect(nextPage).not.toBeInTheDocument();
    expect(currentPage).toHaveTextContent(`${page}(current)`);

    if (page !== 1) {
      expect(firstPage).toHaveTextContent("1");
    } else {
      expect(firstPage).not.toBeInTheDocument();
    }

    if (page > 2) {
      expect(ellipsisStart).toHaveTextContent("…More");
    } else {
      expect(ellipsisStart).not.toBeInTheDocument();
    }

    if (page < 9) {
      expect(ellipsisEnd).toHaveTextContent("…More");
    } else {
      expect(ellipsisEnd).not.toBeInTheDocument();
    }

    if (page !== n) {
      expect(lastPage).toHaveTextContent(`${n}`);
    } else {
      expect(lastPage).not.toBeInTheDocument();
    }
  }
);

it.each([[1], [2], [getRandomInteger(3, 8)], [9], [10]])(
  "should call the callback function in the PaginationBar",
  async (page) => {
    const user = userEvent.setup();
    const n = 10;
    const resultsPerPage = 10;
    const count = getRandomInteger(
      resultsPerPage * (n - 1) + 1,
      resultsPerPage * n
    );
    const previous = "previous url";
    const next = "next url";
    const callback = jest.fn((page) => page);

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
        previous={previous}
        next={next}
        callback={callback}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    const nextPage = screen.queryByTestId("next-page");
    const currentPage = screen.getByTestId("current-page");

    await user.click(previousPage);
    expect(callback).toBeCalled();
    callback.mockClear();

    await user.click(nextPage);
    expect(callback).toBeCalled();
    callback.mockClear();

    await user.click(currentPage);
    expect(callback).toBeCalled();
    callback.mockClear();

    if (page !== 1) {
      const firstPage = screen.getByTestId("1th-page");
      await user.click(firstPage);
      expect(callback).toBeCalled();
      callback.mockClear();
    }

    if (page > 2) {
      const ellipsisStart = screen.getByTestId("ellipsis-start");
      await user.click(ellipsisStart);
      expect(callback).toHaveBeenCalledTimes(0);
    }

    if (page < 9) {
      const ellipsisEnd = screen.getByTestId("ellipsis-end");
      await user.click(ellipsisEnd);
      expect(callback).toHaveBeenCalledTimes(0);
    }

    if (page !== n) {
      const lastPage = screen.getByTestId(`${n}th-page`);
      await user.click(lastPage);
      expect(callback).toBeCalled();
      callback.mockClear();
    }
  }
);
