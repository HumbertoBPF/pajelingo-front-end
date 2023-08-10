const {
  screen,
  within,
  waitForElementToBeRemoved
} = require("@testing-library/react");
const { getLanguages } = require("api/languages");
const { getRanking } = require("api/scores");
const { default: Rankings } = require("pages/Rankings");
const {
  assertRankingHeaders,
  assertRankingRecords,
  assertMyPosition
} = require("test-utils/assertions/ranking");
const {
  assertSelectLanguageItems
} = require("test-utils/assertions/select-language");
import languages from "../../../cypress/fixtures/languages.json";
import ranking from "../../../cypress/fixtures/default-ranking.json";
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";
import { assertFirstPageOf } from "test-utils/assertions/pagination";
import { getAuthenticatedUser } from "test-utils/mocking/users";

const userScore = {
  position: faker.number.int({ min: 1, max: 50 }),
  user: faker.internet.userName(),
  score: faker.number.int({ min: 100, max: 1000 })
};

jest.mock("api/languages", () => {
  return {
    getLanguages: jest.fn()
  };
});

jest.mock("api/scores", () => {
  return {
    getRanking: jest.fn()
  };
});

describe("should render ranking page", () => {
  it("without user score", async () => {
    getLanguages.mockImplementation(() => {
      return languages;
    });

    getRanking.mockImplementation((language, onSuccess) => {
      onSuccess(ranking);
    });

    renderWithProviders(<Rankings />, {
      preloadedState: {
        languages
      }
    });

    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Ranking");

    const titleIcon = within(title).getByTestId("trophee-icon");
    expect(titleIcon).toBeInTheDocument();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
      timeout: 5000
    });

    const selectLanguage = screen.getByTestId("select-language");

    assertSelectLanguageItems(selectLanguage, languages);
    assertRankingHeaders();
    assertRankingRecords(1, ranking.results);

    expect(getLanguages).toHaveBeenCalledTimes(1);

    expect(getRanking).toHaveBeenCalledTimes(1);
    expect(getRanking).toHaveBeenCalledWith(
      languages[0].language_name,
      expect.anything(),
      expect.anything(),
      {
        page: 1
      }
    );

    assertFirstPageOf(5);
  });

  it("with user score", async () => {
    const mockedUser = getAuthenticatedUser();

    getLanguages.mockImplementation(() => {
      return languages;
    });

    getRanking.mockImplementation((language, onSuccess) => {
      onSuccess({ ...ranking, user_score: userScore });
    });

    renderWithProviders(<Rankings />, {
      preloadedState: {
        languages,
        user: mockedUser
      }
    });

    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Ranking");

    const titleIcon = within(title).getByTestId("trophee-icon");
    expect(titleIcon).toBeInTheDocument();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
      timeout: 5000
    });

    const selectLanguage = screen.getByTestId("select-language");

    assertSelectLanguageItems(selectLanguage, languages);
    assertRankingHeaders();
    assertRankingRecords(1, ranking.results);

    assertMyPosition(userScore);

    expect(getLanguages).toHaveBeenCalledTimes(1);

    expect(getRanking).toHaveBeenCalledTimes(1);
    expect(getRanking).toHaveBeenCalledWith(
      languages[0].language_name,
      expect.anything(),
      expect.anything(),
      {
        page: 1,
        username: mockedUser.username
      }
    );

    assertFirstPageOf(5);
  });
});
