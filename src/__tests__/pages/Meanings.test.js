const { screen } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { getWord, getMeaning, toggleFavoriteWord } = require("api/words");
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

const preloadedStateAuthenticatedUser = {
  user: {
    token: "token"
  }
};

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

const getMockedWord = (favorite, image) => {
  return {
    id: randomWordId,
    word_name: "mocked word",
    image,
    is_favorite: favorite
  };
};

const assertIsAddToFavoritesButton = (favoriteButton) => {
  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteButton).toHaveClass("btn-info");
  expect(favoriteButton).toHaveTextContent("Add to favorite words");
};

const assertIsRemoveFromFavoritesButton = (favoriteButton) => {
  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteButton).toHaveClass("btn-info");
  expect(favoriteButton).toHaveTextContent("Remove from favorite words");
};

const assertMeaningsAreInTheDocument = (meanings) => {
  meanings.forEach((item, index) => {
    const meaning = screen.getByText(
      `Meaning number ${index + 1}: ${item.meaning}`
    );
    expect(meaning).toBeInTheDocument();
  });
};

describe("should render meanings", () => {
  describe("of favorited word", () => {
    it("with image", () => {
      const mockedWord = getMockedWord(true, "image");

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`],
        preloadedState: preloadedStateAuthenticatedUser
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).toBeInTheDocument();
      expect(wordImage).toHaveAccessibleName("Word meaning");

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.getByTestId("favorite-button");
      assertIsRemoveFromFavoritesButton(favoriteButton);
    });

    it("without image", () => {
      const mockedWord = getMockedWord(true);

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`],
        preloadedState: preloadedStateAuthenticatedUser
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).not.toBeInTheDocument();

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.getByTestId("favorite-button");
      assertIsRemoveFromFavoritesButton(favoriteButton);
    });
  });

  describe("of non-favorited word", () => {
    it("with image", () => {
      const mockedWord = getMockedWord(false, "image");

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`],
        preloadedState: preloadedStateAuthenticatedUser
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).toBeInTheDocument();
      expect(wordImage).toHaveAccessibleName("Word meaning");

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.getByTestId("favorite-button");
      assertIsAddToFavoritesButton(favoriteButton);
    });

    it("without image", () => {
      const mockedWord = getMockedWord(false);

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`],
        preloadedState: preloadedStateAuthenticatedUser
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).not.toBeInTheDocument();

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.getByTestId("favorite-button");
      assertIsAddToFavoritesButton(favoriteButton);
    });
  });

  describe("of word without favorite key", () => {
    it("with image", () => {
      const mockedWord = getMockedWord(null, "image");

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`]
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).toBeInTheDocument();
      expect(wordImage).toHaveAccessibleName("Word meaning");

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.queryByTestId("favorite-button");
      expect(favoriteButton).not.toBeInTheDocument();
    });

    it("without image", () => {
      const mockedWord = getMockedWord(null);

      getWord.mockImplementation((token, wordId, onSuccess) => {
        onSuccess(mockedWord);
      });

      getMeaning.mockImplementation((wordId, onSuccess) => {
        onSuccess(meanings);
      });

      renderWithProviders(<Meanings />, {
        initialEntries: [`/meanings/${randomWordId}`]
      });

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Meanings of "mocked word"');

      const wordImage = screen.queryByTestId("word-image");
      expect(wordImage).not.toBeInTheDocument();

      assertMeaningsAreInTheDocument(meanings);

      const favoriteButton = screen.queryByTestId("favorite-button");
      expect(favoriteButton).not.toBeInTheDocument();
    });
  });
});

describe("shoukd call API when", () => {
  it("adding word to favorites", async () => {
    const user = userEvent.setup();

    const mockedWord = getMockedWord(false);

    getWord.mockImplementation((token, wordId, onSuccess) => {
      onSuccess(mockedWord);
    });

    getMeaning.mockImplementation((wordId, onSuccess) => {
      onSuccess(meanings);
    });

    toggleFavoriteWord.mockImplementation(
      (token, wordId, isFavorite, onSuccess) => {
        onSuccess({ ...mockedWord, is_favorite: !mockedWord.is_favorite });
      }
    );

    renderWithProviders(<Meanings />, {
      initialEntries: [`/meanings/${randomWordId}`],
      preloadedState: {
        user: {
          token: "token"
        }
      }
    });

    const favoriteButton = screen.queryByTestId("favorite-button");
    assertIsAddToFavoritesButton(favoriteButton);

    await user.click(favoriteButton);

    expect(toggleFavoriteWord).toBeCalledTimes(1);
    expect(toggleFavoriteWord).toBeCalledWith(
      "token",
      randomWordId,
      !mockedWord.is_favorite,
      expect.anything()
    );

    assertIsRemoveFromFavoritesButton(favoriteButton);
  });

  it("removing word from favorites", async () => {
    const user = userEvent.setup();

    const mockedWord = getMockedWord(true);

    getWord.mockImplementation((token, wordId, onSuccess) => {
      onSuccess(mockedWord);
    });

    getMeaning.mockImplementation((wordId, onSuccess) => {
      onSuccess(meanings);
    });

    toggleFavoriteWord.mockImplementation(
      (token, wordId, isFavorite, onSuccess) => {
        onSuccess({ ...mockedWord, is_favorite: !mockedWord.is_favorite });
      }
    );

    renderWithProviders(<Meanings />, {
      initialEntries: [`/meanings/${randomWordId}`],
      preloadedState: {
        user: {
          token: "token"
        }
      }
    });

    const favoriteButton = screen.queryByTestId("favorite-button");
    assertIsRemoveFromFavoritesButton(favoriteButton);

    await user.click(favoriteButton);

    expect(toggleFavoriteWord).toBeCalledTimes(1);
    expect(toggleFavoriteWord).toBeCalledWith(
      "token",
      randomWordId,
      !mockedWord.is_favorite,
      expect.anything()
    );

    assertIsAddToFavoritesButton(favoriteButton);
  });
});
