const { render, screen } = require("@testing-library/react");
const {
  default: SearchResultCard
} = require("components/cards/SearchResultCard");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { default: store } = require("store");
const { getRandomInteger } = require("utils");

describe("should display a word in a card", () => {
  it.each([[true], [false], [null]])(
    "with different heart icon variants",
    (isFavorite) => {
      const word = {
        id: getRandomInteger(1000, 2000),
        word_name: "Word",
        language: "English",
        is_favorite: isFavorite
      };
      const flagImage = "flag image";

      render(
        <Provider store={store}>
          <MemoryRouter>
            <SearchResultCard word={word} flagImage={flagImage} />
          </MemoryRouter>
        </Provider>
      );

      const wordCardHeartFilled = screen.queryByTestId("heart-icon-filled");
      const wordCardHeartNonFilled = screen.queryByTestId(
        "heart-icon-non-filled"
      );
      const wordCardFlagImage = screen.getByAltText(
        `${word.language} language flag`
      );
      const wordCardWordName = screen.getByText(word.word_name);

      if (isFavorite !== null) {
        if (isFavorite) {
          expect(wordCardHeartFilled).toBeInTheDocument();
          expect(wordCardHeartNonFilled).not.toBeInTheDocument();
        } else {
          expect(wordCardHeartFilled).not.toBeInTheDocument();
          expect(wordCardHeartNonFilled).toBeInTheDocument();
        }
      } else {
        expect(wordCardHeartFilled).not.toBeInTheDocument();
        expect(wordCardHeartNonFilled).not.toBeInTheDocument();
      }

      expect(wordCardFlagImage).toBeInTheDocument();
      expect(wordCardWordName.textContent).toBe(word.word_name);
    }
  );
});
