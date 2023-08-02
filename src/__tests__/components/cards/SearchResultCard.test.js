const { screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
const {
  default: SearchResultCard
} = require("components/cards/SearchResultCard");
import { toggleFavoriteWord } from "api/words";
import { renderWithProviders } from "test-utils/store";
import { faker } from "@faker-js/faker/locale/en_US";
import {
  assertWordCardWithFavoriteOption,
  assertWordCardWithoutFavoriteOption
} from "test-utils/assertions/word-cards";

jest.mock("api/words", () => {
  return {
    toggleFavoriteWord: jest.fn(() => {})
  };
});

const getMockedWord = (isFavorite) => {
  return {
    id: faker.number.int({ min: 1000, max: 2000 }),
    word_name: faker.word.sample(),
    language: "English",
    is_favorite: isFavorite
  };
};

it("should display a favorited word", () => {
  const word = getMockedWord(true);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  assertWordCardWithFavoriteOption(word);
});

it("should display a non-favorited word", () => {
  const word = getMockedWord(false);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  assertWordCardWithFavoriteOption(word);
});

it("should display a word without a favorite key", () => {
  const word = getMockedWord(null);
  const flagImage = "flag image";

  renderWithProviders(<SearchResultCard word={word} flagImage={flagImage} />);

  assertWordCardWithoutFavoriteOption(word);
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
      isFavorite ? "heart-filled-icon" : "heart-icon"
    );

    await user.click(heartIcon);

    expect(toggleFavoriteWord).toHaveBeenCalledTimes(1);
  }
);
