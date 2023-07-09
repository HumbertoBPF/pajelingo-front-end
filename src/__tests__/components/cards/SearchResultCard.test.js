const { render, screen } = require("@testing-library/react");
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
const {
  default: SearchResultCard
} = require("components/cards/SearchResultCard");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { default: store } = require("store");
const { getRandomInteger } = require("utils");
import { toggleFavoriteWord } from "api/words";
import gamesSliceReducers from "store/reducers/games";
import languagesSliceReducers from "store/reducers/languages";
import tokenSliceReducer from "store/reducers/user";

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

it.each([true, false])(
  "should call API when a click on the heart icon occurs",
  async (isFavorite) => {
    const user = userEvent.setup();

    const customStore = configureStore({
      reducer: {
        languages: languagesSliceReducers,
        user: tokenSliceReducer,
        games: gamesSliceReducers
      },
      preloadedState: {
        user: {
          token: "token"
        }
      }
    });

    const word = {
      id: getRandomInteger(1000, 2000),
      word_name: "Word",
      language: "English",
      is_favorite: isFavorite
    };
    const flagImage = "flag image";

    render(
      <Provider store={customStore}>
        <MemoryRouter>
          <SearchResultCard word={word} flagImage={flagImage} />
        </MemoryRouter>
      </Provider>
    );

    const heartIcon = screen.getByTestId(
      isFavorite ? "heart-icon-filled" : "heart-icon-non-filled"
    );

    await user.click(heartIcon);

    expect(toggleFavoriteWord).toHaveBeenCalledTimes(1);
  }
);
