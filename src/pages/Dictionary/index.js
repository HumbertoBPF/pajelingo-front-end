import { searchWords } from "api/words";
import EyeglassIcon from "components/icons/EyeglassIcon";
import WordListWithFilters from "components/WordListWithFilters";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

export default function Dictionary() {
  const user = useSelector((state) => state.user);
  const [words, setWords] = useState({
    results: [],
    page: 1,
    count: -1
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);

  const getSearchResultsPage = useCallback(
    (searchPattern, languages, page) => {
      const searchFilters = { search: searchPattern, page };

      languages.forEach((value, key) => {
        searchFilters[key] = value;
      });

      const token = user ? user.token : null;

      searchWords(searchFilters, token, (data) => {
        data.page = page;
        setWords(data);
        setTimeout(() => {
          setIsFiltering(false);
          setIsPaginating(false);
        }, 2000);
      });
    },
    [user]
  );

  const filterCallback = useCallback(
    (searchPattern, languages) => {
      setIsFiltering(true);
      getSearchResultsPage(searchPattern, languages, 1);
    },
    [getSearchResultsPage]
  );

  const paginationCallback = useCallback(
    (searchPattern, languages, page) => {
      setIsPaginating(true);
      getSearchResultsPage(searchPattern, languages, page);
    },
    [getSearchResultsPage]
  );

  return (
    <>
      <h5 className="mb-4" data-testid="title">
        <EyeglassIcon /> <span>Dictionary</span>
      </h5>
      <WordListWithFilters
        words={words}
        isFiltering={isFiltering}
        isPaginating={isPaginating}
        filterCallback={filterCallback}
        paginationCallback={paginationCallback}
      />
    </>
  );
}
