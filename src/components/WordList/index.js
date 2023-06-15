import CustomSpinner from "components/CustomSpinner";
import PaginationBar from "components/PaginationBar";
import SearchResultCard from "components/cards/SearchResultCard";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function WordList({
  words,
  isLoading = false,
  callback = () => {}
}) {
  const languages = useSelector((state) => state.languages);
  const [languagesFlag, setLanguagesFlag] = useState(new Map());

  useEffect(() => {
    // Preparing language map
    let temp = new Map();
    languages.forEach((item) => {
      temp.set(item.language_name, item.flag_image);
    });
    setLanguagesFlag(temp);
  }, [languages]);

  return words.count === 0 ? (
    <div className="row justify-content-center">
      <div className="text-center col-sm-8 col-md-4">
        <img
          id="noResultImg"
          src="/images/no_result.jpg"
          className="img-fluid rounded"
          alt="No results"
        />
        <p>No result matching your search was found</p>
      </div>
    </div>
  ) : (
    <>
      <Row className="justify-content-center" xs={2} sm={2} md={3}>
        {isLoading ? (
          <CustomSpinner animation="border" />
        ) : (
          <>
            {words.results.map((word) => (
              <SearchResultCard
                key={word.id}
                word={word}
                flagImage={languagesFlag.get(word.language)}
              />
            ))}
          </>
        )}
      </Row>
      <PaginationBar
        previous={words.previous}
        next={words.next}
        count={words.count}
        resultsPerPage={12}
        page={words.page}
        callback={(page) => callback(page)}
      />
    </>
  );
}

WordList.propTypes = {
  words: PropTypes.shape({
    results: PropTypes.array.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string,
    count: PropTypes.number,
    page: PropTypes.number
  }).isRequired,
  isLoading: PropTypes.bool,
  callback: PropTypes.func
};
