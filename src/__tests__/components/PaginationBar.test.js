import { faker } from "@faker-js/faker/locale/en_US";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  assertIsNthPage,
  assertPaginationCallbackHasBeenCalled
} from "test-utils/assertions/pagination";
import { renderWithProviders } from "test-utils/store";
const { default: PaginationBar } = require("../../components/PaginationBar");

const resultsPerPage = 10;
const previous = "previous url";
const next = "next url";

describe("should have a number of pages", () => {
  const page = 1;

  it("equal to one", () => {
    const count = faker.number.int({ min: 1, max: 10 });

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    assertIsNthPage(1);

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).not.toBeInTheDocument();

    const lastPage = screen.queryByTestId("1th-page");
    expect(lastPage).not.toBeInTheDocument();

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).not.toBeInTheDocument();
  });

  it("equal to two", () => {
    const count = faker.number.int({ min: 11, max: 20 });

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    assertIsNthPage(1);

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).not.toBeInTheDocument();

    const lastPage = screen.queryByTestId("2th-page");
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent("2");

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).not.toBeInTheDocument();
  });

  it("greater than two", () => {
    const n = faker.number.int({ min: 3, max: 10 });
    const count = faker.number.int({ min: 10 * (n - 1) + 1, max: 10 * n });

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    assertIsNthPage(1);

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).not.toBeInTheDocument();

    const lastPage = screen.queryByTestId(`${n}th-page`);
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent(`${n}`);

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).toBeInTheDocument();
    expect(ellipsisEnd).toHaveTextContent("…More");
  });
});

describe("should display as current page", () => {
  const count = faker.number.int({ min: 91, max: 100 });

  it("the first one", () => {
    const page = 1;

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    expect(previousPage).not.toBeInTheDocument();

    assertIsNthPage(1);

    const nextPage = screen.queryByTestId("next-page");
    expect(nextPage).not.toBeInTheDocument();

    const firstPage = screen.queryByTestId("1th-page");
    expect(firstPage).not.toBeInTheDocument();

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).not.toBeInTheDocument();

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).toBeInTheDocument();
    expect(ellipsisEnd).toHaveTextContent("…More");

    const lastPage = screen.queryByTestId("10th-page");
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent("10");
  });

  it("the second one", () => {
    const page = 2;

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    expect(previousPage).not.toBeInTheDocument();

    assertIsNthPage(page);

    const nextPage = screen.queryByTestId("next-page");
    expect(nextPage).not.toBeInTheDocument();

    const firstPage = screen.queryByTestId("1th-page");
    expect(firstPage).toBeInTheDocument();
    expect(firstPage).toHaveTextContent("1");

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).not.toBeInTheDocument();

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).toBeInTheDocument();
    expect(ellipsisEnd).toHaveTextContent("…More");

    const lastPage = screen.queryByTestId("10th-page");
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent("10");
  });

  it("a page between the second and the penultimate", () => {
    const page = faker.number.int({ min: 3, max: 8 });

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    expect(previousPage).not.toBeInTheDocument();

    assertIsNthPage(page);

    const nextPage = screen.queryByTestId("next-page");
    expect(nextPage).not.toBeInTheDocument();

    const firstPage = screen.queryByTestId("1th-page");
    expect(firstPage).toBeInTheDocument();
    expect(firstPage).toHaveTextContent("1");

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).toBeInTheDocument();
    expect(ellipsisStart).toHaveTextContent("…More");

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).toBeInTheDocument();
    expect(ellipsisEnd).toHaveTextContent("…More");

    const lastPage = screen.queryByTestId("10th-page");
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent("10");
  });

  it("the penultimate one", () => {
    const page = 9;

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    expect(previousPage).not.toBeInTheDocument();

    assertIsNthPage(page);

    const nextPage = screen.queryByTestId("next-page");
    expect(nextPage).not.toBeInTheDocument();

    const firstPage = screen.queryByTestId("1th-page");
    expect(firstPage).toBeInTheDocument();
    expect(firstPage).toHaveTextContent("1");

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).toBeInTheDocument();
    expect(ellipsisStart).toHaveTextContent("…More");

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).not.toBeInTheDocument();

    const lastPage = screen.queryByTestId("10th-page");
    expect(lastPage).toBeInTheDocument();
    expect(lastPage).toHaveTextContent("10");
  });

  it("the last one", () => {
    const page = 10;

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
      />
    );

    const previousPage = screen.queryByTestId("previous-page");
    expect(previousPage).not.toBeInTheDocument();

    assertIsNthPage(page);

    const nextPage = screen.queryByTestId("next-page");
    expect(nextPage).not.toBeInTheDocument();

    const firstPage = screen.queryByTestId("1th-page");
    expect(firstPage).toBeInTheDocument();
    expect(firstPage).toHaveTextContent("1");

    const ellipsisStart = screen.queryByTestId("ellipsis-start");
    expect(ellipsisStart).toBeInTheDocument();
    expect(ellipsisStart).toHaveTextContent("…More");

    const ellipsisEnd = screen.queryByTestId("ellipsis-end");
    expect(ellipsisEnd).not.toBeInTheDocument();

    const lastPage = screen.queryByTestId("10th-page");
    expect(lastPage).not.toBeInTheDocument();
  });
});

describe("should call the callback function", () => {
  const count = faker.number.int({ min: 91, max: 100 });

  it("on the first page", async () => {
    const page = 1;
    const user = userEvent.setup();
    const callback = jest.fn((page) => page);

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
        next={next}
        callback={callback}
      />
    );

    const currentPage = screen.getByTestId("current-page");
    await user.click(currentPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const nextPage = screen.queryByTestId("next-page");
    await user.click(nextPage);
    assertPaginationCallbackHasBeenCalled(callback, 2);
    callback.mockClear();

    const ellipsisEnd = screen.getByTestId("ellipsis-end");
    await user.click(ellipsisEnd);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const lastPage = screen.getByTestId("10th-page");
    await user.click(lastPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();
  });

  it("on the second page", async () => {
    const page = 2;
    const user = userEvent.setup();
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

    const firstPage = screen.getByTestId("1th-page");
    await user.click(firstPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const previousPage = screen.queryByTestId("previous-page");
    await user.click(previousPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const currentPage = screen.getByTestId("current-page");
    await user.click(currentPage);
    assertPaginationCallbackHasBeenCalled(callback, 2);
    callback.mockClear();

    const nextPage = screen.queryByTestId("next-page");
    await user.click(nextPage);
    assertPaginationCallbackHasBeenCalled(callback, 3);
    callback.mockClear();

    const ellipsisEnd = screen.getByTestId("ellipsis-end");
    await user.click(ellipsisEnd);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const lastPage = screen.getByTestId("10th-page");
    await user.click(lastPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();
  });

  it("on a page between the second and the penultimate", async () => {
    const page = faker.number.int({ min: 3, max: 8 });
    const user = userEvent.setup();
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

    const firstPage = screen.getByTestId("1th-page");
    await user.click(firstPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const ellipsisStart = screen.getByTestId("ellipsis-start");
    await user.click(ellipsisStart);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const previousPage = screen.queryByTestId("previous-page");
    await user.click(previousPage);
    assertPaginationCallbackHasBeenCalled(callback, page - 1);
    callback.mockClear();

    const currentPage = screen.getByTestId("current-page");
    await user.click(currentPage);
    assertPaginationCallbackHasBeenCalled(callback, page);
    callback.mockClear();

    const nextPage = screen.queryByTestId("next-page");
    await user.click(nextPage);
    assertPaginationCallbackHasBeenCalled(callback, page + 1);
    callback.mockClear();

    const ellipsisEnd = screen.getByTestId("ellipsis-end");
    await user.click(ellipsisEnd);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const lastPage = screen.getByTestId("10th-page");
    await user.click(lastPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();
  });

  it("on the penultimate page", async () => {
    const page = 9;
    const user = userEvent.setup();
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

    const firstPage = screen.getByTestId("1th-page");
    await user.click(firstPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const ellipsisStart = screen.getByTestId("ellipsis-start");
    await user.click(ellipsisStart);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const previousPage = screen.queryByTestId("previous-page");
    await user.click(previousPage);
    assertPaginationCallbackHasBeenCalled(callback, 8);
    callback.mockClear();

    const currentPage = screen.getByTestId("current-page");
    await user.click(currentPage);
    assertPaginationCallbackHasBeenCalled(callback, 9);
    callback.mockClear();

    const nextPage = screen.queryByTestId("next-page");
    await user.click(nextPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();

    const lastPage = screen.getByTestId("10th-page");
    await user.click(lastPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();
  });

  it("on the last page", async () => {
    const page = 10;
    const user = userEvent.setup();
    const callback = jest.fn((page) => page);

    renderWithProviders(
      <PaginationBar
        page={page}
        count={count}
        resultsPerPage={resultsPerPage}
        previous={previous}
        callback={callback}
      />
    );

    const firstPage = screen.getByTestId("1th-page");
    await user.click(firstPage);
    assertPaginationCallbackHasBeenCalled(callback, 1);
    callback.mockClear();

    const ellipsisStart = screen.getByTestId("ellipsis-start");
    await user.click(ellipsisStart);
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    const previousPage = screen.queryByTestId("previous-page");
    await user.click(previousPage);
    assertPaginationCallbackHasBeenCalled(callback, 9);
    callback.mockClear();

    const currentPage = screen.getByTestId("current-page");
    await user.click(currentPage);
    assertPaginationCallbackHasBeenCalled(callback, 10);
    callback.mockClear();
  });
});
