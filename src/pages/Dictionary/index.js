import EyeglassIcon from "components/icons/EyeglassIcon";
import WordListWithFilters from "components/WordListWithFilters";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "services/base";

export default function Dictionary() {
  const user = useSelector((state) => state.user);
  const [words, setWords] = useState({ results: [] });
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);

  const getSearchResultsPage = useCallback(
    (searchPattern, languages, page) => {
      const searchFilters = { search: searchPattern, page };

      languages.forEach((value, key) => {
        searchFilters[key] = value;
      });

      const queryParams = new URLSearchParams(searchFilters);

      let options = {};

      if (user) {
        options = {
          headers: {
            Authorization: `Token ${user.token}`
          }
        };
      }

      fetch(`${baseUrl}/search?${queryParams}`, options)
        .then((response) => response.json())
        .then((data) => {
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
      <h5 className="mb-4">
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
