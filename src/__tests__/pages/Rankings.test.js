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
import defaultRanking from "../../../cypress/fixtures/default-ranking.json";
import filteredRanking from "../../../cypress/fixtures/filtered-ranking.json";
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";
import { assertFirstPageOf } from "test-utils/assertions/pagination";
import { getAuthenticatedUser } from "test-utils/mocking/users";
import userEvent from "@testing-library/user-event";

const userScore = {
  position: faker.number.int({ min: 1, max: 50 }),
  user: faker.internet.userName(),
  score: faker.number.int({ min: 100, max: 1000 })
};

const defaultLanguage = languages[0].language_name;
const randomIndex = faker.number.int({ min: 1, max: 4 });
const randomLanguage = languages[randomIndex].language_name;

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
  describe("for the language selected as default", () => {
    it("without user score", async () => {
      getLanguages.mockImplementation(() => {
        return languages;
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess(defaultRanking);
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

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      expect(getLanguages).toHaveBeenCalledTimes(1);

      expect(getRanking).toHaveBeenCalledTimes(1);
      expect(getRanking).toHaveBeenCalledWith(
        defaultLanguage,
        expect.anything(),
        expect.anything(),
        {
          page: 1
        }
      );

      const selectLanguage = screen.getByTestId("select-language");

      assertSelectLanguageItems(selectLanguage, languages);
      assertRankingHeaders();
      assertRankingRecords(1, defaultRanking.results);
      assertFirstPageOf(5);
    });

    it("with user score", async () => {
      const mockedUser = getAuthenticatedUser();

      getLanguages.mockImplementation(() => {
        return languages;
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess({ ...defaultRanking, user_score: userScore });
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

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      expect(getLanguages).toHaveBeenCalledTimes(1);

      expect(getRanking).toHaveBeenCalledTimes(1);
      expect(getRanking).toHaveBeenCalledWith(
        defaultLanguage,
        expect.anything(),
        expect.anything(),
        {
          page: 1,
          username: mockedUser.username
        }
      );

      const selectLanguage = screen.getByTestId("select-language");

      assertSelectLanguageItems(selectLanguage, languages);
      assertRankingHeaders();
      assertRankingRecords(1, defaultRanking.results);
      assertMyPosition(userScore);
      assertFirstPageOf(5);
    });
  });

  describe("for the language selected as default", () => {
    it("without user score", async () => {
      const user = userEvent.setup();

      getLanguages.mockImplementation(() => {
        return languages;
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess(defaultRanking);
      });

      renderWithProviders(<Rankings />, {
        preloadedState: {
          languages
        }
      });

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess(filteredRanking);
      });

      const selectLanguage = screen.getByTestId("select-language");
      await user.selectOptions(selectLanguage, randomLanguage);

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      expect(getRanking).toHaveBeenCalledTimes(2);
      expect(getRanking).toHaveBeenCalledWith(
        randomLanguage,
        expect.anything(),
        expect.anything(),
        {
          page: 1
        }
      );

      assertRankingHeaders();
      assertRankingRecords(1, filteredRanking.results);
      assertFirstPageOf(5);
    });

    it("with user score", async () => {
      const user = userEvent.setup();

      const mockedUser = getAuthenticatedUser();

      getLanguages.mockImplementation(() => {
        return languages;
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess({ ...defaultRanking, user_score: userScore });
      });

      renderWithProviders(<Rankings />, {
        preloadedState: {
          languages,
          user: mockedUser
        }
      });

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      getRanking.mockImplementation((language, onSuccess) => {
        onSuccess({ ...filteredRanking, user_score: userScore });
      });

      const selectLanguage = screen.getByTestId("select-language");
      await user.selectOptions(selectLanguage, randomLanguage);

      expect(screen.getByTestId("spinner")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
        timeout: 5000
      });

      expect(getRanking).toHaveBeenCalledTimes(2);
      expect(getRanking).toHaveBeenCalledWith(
        randomLanguage,
        expect.anything(),
        expect.anything(),
        {
          page: 1,
          username: mockedUser.username
        }
      );

      assertRankingHeaders();
      assertRankingRecords(1, filteredRanking.results);
      assertFirstPageOf(5);
    });
  });
});
