const { default: SelectLanguage } = require("components/SelectLanguage");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { assertSelectLanguageItems } from "test-utils/assertions/select-language";
import languages from "../../../cypress/fixtures/languages.json";

it("should display languages passed as props", () => {
  renderWithProviders(
    <SelectLanguage items={languages} testId="select-language" />
  );

  const selectLanguage = screen.getByTestId("select-language");

  assertSelectLanguageItems(selectLanguage, languages);
});

it("should display default option", () => {
  renderWithProviders(
    <SelectLanguage
      items={languages}
      defaultItem="Default item"
      testId="select-language"
    />
  );

  const selectLanguage = screen.getByTestId("select-language");

  assertSelectLanguageItems(selectLanguage, languages);

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
      onChange={callback}
      testId="select-language"
    />
  );

  const selectLanguage = screen.getByTestId("select-language");

  assertSelectLanguageItems(selectLanguage, languages);

  const randomLanguage = languages[faker.number.int({ min: 0, max: 4 })];

  await user.selectOptions(selectLanguage, randomLanguage.language_name);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback.mock.calls[0][0].value).toBe(randomLanguage.language_name);
});
