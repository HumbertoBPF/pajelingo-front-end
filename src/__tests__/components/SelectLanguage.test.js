const { default: SelectLanguage } = require("components/SelectLanguage");
const { renderWithProviders } = require("test-utils/store");
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { languages } from "test-utils/mocking/languages";
import { getRandomInteger } from "utils";

const assertItems = () => {
  languages.forEach((languageItem) => {
    const language = languageItem.language_name;

    const languageOption = screen.getByText(language);
    expect(languageOption).toBeInTheDocument();
    expect(languageOption).toHaveTextContent(language);
    expect(languageOption).toHaveValue(language);
  });
};

it("should display languages passed as props", () => {
  renderWithProviders(<SelectLanguage items={languages} />);

  assertItems();
});

it("should display default option", () => {
  renderWithProviders(
    <SelectLanguage items={languages} defaultItem="Default item" />
  );

  assertItems();

  const defaultItem = screen.getByText("Default item");
  expect(defaultItem).toBeInTheDocument();
  expect(defaultItem).toHaveTextContent("Default item");
  expect(defaultItem).toHaveValue("");
});

it("should call callback passed as props", async () => {
  const user = userEvent.setup();

  const callback = jest.fn((language) => language);

  renderWithProviders(
    <SelectLanguage
      items={languages}
      onClick={callback}
      testId="select-language"
    />
  );

  assertItems();

  const selectLanguage = screen.getByTestId("select-language");

  await user.click(selectLanguage);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback.mock.calls[0][0].value).toBe(languages[0].language_name);
  callback.mockClear();

  const randomLanguage = languages[getRandomInteger(0, 4)];

  const randomLanguageItem = within(selectLanguage).getByText(
    randomLanguage.language_name
  );

  await user.click(randomLanguageItem);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback.mock.calls[0][0].value).toBe(randomLanguage.language_name);
});
