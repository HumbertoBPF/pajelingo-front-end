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

const getMockedWord = (isFavorite) => {
  return {
    id: getRandomInteger(1000, 2000),
    word_name: "Word",
    language: "English",
    is_favorite: isFavorite
  };
};

it("should display a favorited word", () => {
  const word = getMockedWord(true);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  const wordCardHeartFilled = screen.getByTestId("heart-icon-filled");
  expect(wordCardHeartFilled).toBeInTheDocument();

  const wordCardHeartNonFilled = screen.queryByTestId("heart-icon-non-filled");
  expect(wordCardHeartNonFilled).not.toBeInTheDocument();

  const wordCardFlagImage = screen.getByAltText(
    `${word.language} language flag`
  );
  expect(wordCardFlagImage).toBeInTheDocument();

  const wordCardWordName = screen.getByText(word.word_name);
  expect(wordCardWordName).toHaveTextContent(word.word_name);
});

it("should display a non-favorited word", () => {
  const word = getMockedWord(false);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  const wordCardHeartFilled = screen.queryByTestId("heart-icon-filled");
  expect(wordCardHeartFilled).not.toBeInTheDocument();

  const wordCardHeartNonFilled = screen.getByTestId("heart-icon-non-filled");
  expect(wordCardHeartNonFilled).toBeInTheDocument();

  const wordCardFlagImage = screen.getByAltText(
    `${word.language} language flag`
  );
  expect(wordCardFlagImage).toBeInTheDocument();

  const wordCardWordName = screen.getByText(word.word_name);
  expect(wordCardWordName).toHaveTextContent(word.word_name);
});

it("should display a word without a favorite key", () => {
  const word = getMockedWord(null);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  const wordCardHeartFilled = screen.queryByTestId("heart-icon-filled");
  expect(wordCardHeartFilled).not.toBeInTheDocument();

  const wordCardHeartNonFilled = screen.queryByTestId("heart-icon-non-filled");
  expect(wordCardHeartNonFilled).not.toBeInTheDocument();

  const wordCardWordName = screen.getByText(word.word_name);
  expect(wordCardWordName).toHaveTextContent(word.word_name);

  const wordCardFlagImage = screen.getByAltText(
    `${word.language} language flag`
  );
  expect(wordCardFlagImage).toBeInTheDocument();
});

it.each([true, false])(
  "should call API when a click on the heart icon occurs",
  async (isFavorite) => {
    const user = userEvent.setup();

    const word = getMockedWord(isFavorite);
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
