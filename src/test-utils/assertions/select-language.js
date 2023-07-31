import { within } from "@testing-library/react";

export const assertSelectLanguageItems = (selectLanguage, languages) => {
  languages.forEach((languageItem) => {
    const language = languageItem.language_name;

    const languageOption = within(selectLanguage).getByText(language);
    expect(languageOption).toBeInTheDocument();
    expect(languageOption).toHaveTextContent(language);
    expect(languageOption).toHaveValue(language);
  });
};
