const { screen } = require("@testing-library/react");
const { getWord, getMeaning } = require("api/words");
const { default: Meanings } = require("pages/Meanings");
const { getRandomInteger } = require("utils");
const { renderWithProviders } = require("utils/test-utils");

jest.mock("api/words", () => {
  return {
    getWord: jest.fn(),
    getMeaning: jest.fn(),
    toggleFavoriteWord: jest.fn()
  };
});

const randomWordId = getRandomInteger(100, 1000);

const meanings = [
  {
    id: 1,
    meaning: "Mocked meaning 1"
  },
  {
    id: 2,
    meaning: "Mocked meaning 2"
  },
  {
    id: 3,
    meaning: "Mocked meaning 3"
  }
];

describe("should render meanings", () => {
  describe.each([["image"], [null]])("with proper meaning image", (image) => {
    it.each([[true], [false], [null]])(
      "and with proper favorite button",
      (favorite) => {
        const mockedWord = {
          id: randomWordId,
          word_name: "mocked word",
          image,
          is_favorite: favorite
        };

        const preloadedState = {};

        if (favorite !== null) {
          preloadedState.user = { token: "token" };
        }

        getWord.mockImplementation((token, wordId, onSuccess) => {
          onSuccess(mockedWord);
        });

        getMeaning.mockImplementation((wordId, onSuccess) => {
          onSuccess(meanings);
        });

        renderWithProviders(<Meanings />, {
          initialEntries: [`/meanings/${randomWordId}`],
          preloadedState
        });

        const title = screen.getByTestId("title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Meanings of "mocked word"');

        const wordImage = screen.queryByTestId("word-image");

        if (image) {
          expect(wordImage).toBeInTheDocument();
          expect(wordImage).toHaveAccessibleName("Word meaning");
        } else {
          expect(wordImage).not.toBeInTheDocument();
        }

        meanings.forEach((item, index) => {
          const meaning = screen.getByText(
            `Meaning number ${index + 1}: ${item.meaning}`
          );
          expect(meaning).toBeInTheDocument();
        });

        const favoriteButton = screen.queryByTestId("favorite-button");

        if (favorite === null) {
          expect(favoriteButton).not.toBeInTheDocument();
        } else {
          expect(favoriteButton).toBeInTheDocument();
          expect(favoriteButton).toHaveTextContent(
            favorite ? "Remove from favorite words" : "Add to favorite words"
          );
        }
      }
    );
  });
});
