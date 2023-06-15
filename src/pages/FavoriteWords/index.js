import WordListWithFilters from "components/WordListWithFilters";
import HeartIcon from "components/icons/HeartIcon";
import Notification from "components/Notification";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "services/base";
import { useNavigate } from "react-router-dom";
import Login from "pages/Login";
import NotificationContainer from "components/NotificationContainer";

export default function FavoriteWords() {
  const user = useSelector((state) => state.user);

  const [favoriteWords, setFavoriteWords] = useState({ results: [] });
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const getSearchResultsPage = useCallback(
    (searchPattern, languages, page) => {
      if (user) {
        const searchFilters = { search: searchPattern, page };

        languages.forEach((value, key) => {
          searchFilters[key] = value;
        });

        const queryParams = new URLSearchParams(searchFilters);

        fetch(`${baseUrl}/words/favorite-words?${queryParams}`, {
          headers: {
            Authorization: `Token ${user.token}`
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }

            throw Error();
          })
          .then((data) => {
            data.page = page;
            setFavoriteWords(data);
            setTimeout(() => {
              setIsFiltering(false);
              setIsPaginating(false);
            }, 2000);
          })
          .catch(() => setShowToast(true));
      }
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

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <h5 className="mb-4">
        <HeartIcon fill /> <span>Favorite words</span>
      </h5>
      <WordListWithFilters
        words={favoriteWords}
        isFiltering={isFiltering}
        isPaginating={isPaginating}
        filterCallback={filterCallback}
        paginationCallback={paginationCallback}
      />
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="An error occurred when processing the request. Please try again."
        />
      </NotificationContainer>
    </>
  );
}
