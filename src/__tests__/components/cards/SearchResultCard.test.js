const { screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
const {
  default: SearchResultCard
} = require("components/cards/SearchResultCard");
const { getRandomInteger } = require("utils");
import { toggleFavoriteWord } from "api/words";
import { renderWithProviders } from "utils/test-utils";

jest.mock("api/words", () => {
  return {
    toggleFavoriteWord: jest.fn(() => {})
  };
});

it.each([[true], [false], [null]])(
  "should display a word in a card",
  (isFavorite) => {
    const word = {
      id: getRandomInteger(1000, 2000),
      word_name: "Word",
      language: "English",
      is_favorite: isFavorite
    };
    const flagImage = "flag image";

    renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

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

it.each([true, false])(
  "should call API when a click on the heart icon occurs",
  async (isFavorite) => {
    const user = userEvent.setup();

    const word = {
      id: getRandomInteger(1000, 2000),
      word_name: "Word",
      language: "English",
      is_favorite: isFavorite
    };
    const flagImage = "flag image";

    renderWithProviders(
      <SearchResultCard word={word} flagImage={flagImage} />,
      {
        preloadedState: {
          user: {
            token: "token"
          }
        }
      }
    );

    const heartIcon = screen.getByTestId(
      isFavorite ? "heart-icon-filled" : "heart-icon-non-filled"
    );

    await user.click(heartIcon);

    expect(toggleFavoriteWord).toHaveBeenCalledTimes(1);
  }
);
