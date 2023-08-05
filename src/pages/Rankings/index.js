import { getRanking } from "api/scores";
import CustomSpinner from "components/CustomSpinner";
import PaginationBar from "components/PaginationBar";
import Ranking from "components/Ranking";
import SelectLanguage from "components/SelectLanguage";
import TropheeIcon from "components/icons/TropheeIcon";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";

export default function Rankings() {
  const languages = useSelector((state) => state.languages);
  const user = useSelector((state) => state.user);
  const [ranking, setRanking] = useState({ results: [], page: 1, count: 0 });
  const [language, setLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getRankingPage = useCallback((language, page, user = null) => {
    if (language !== null) {
      const additionalParams = { page };

      if (user) {
        additionalParams.username = user.username;
      }

      setIsLoading(true);

      getRanking(
        language,
        (data) => {
          setRanking({ ...data, page });
          setTimeout(() => setIsLoading(false), 2000);
        },
        () => {
          setTimeout(() => setIsLoading(false), 2000);
        },
        additionalParams
      );
    }
  }, []);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (languages.length > 0) {
      setLanguage(languages[0].language_name);
    }
  }, [languages]);

  useEffect(
    () => getRankingPage(language, 1, user),
    [language, getRankingPage, user]
  );

  return (
    <>
      <h5 className="mb-4" data-testid="title">
        <TropheeIcon /> <span>Rankings</span>
      </h5>
      <div className="mb-4">
        <SelectLanguage
          items={languages}
          onChange={(target) => setLanguage(target.value)}
          testId="select-language"
        />
      </div>
      {isLoading ? (
        <div className="text-center">
          <CustomSpinner />
        </div>
      ) : (
        <Ranking ranking={ranking} />
      )}
      <PaginationBar
        previous={ranking.previous}
        next={ranking.next}
        count={ranking.count}
        resultsPerPage={10}
        page={ranking.page}
        callback={(page) => getRankingPage(language, page, user)}
      />
    </>
  );
}
