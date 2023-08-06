import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import FloatingLabelInput from "components/FloatingLabelInput";
import WordList from "components/WordList";
import FilterIcon from "components/icons/FilterIcon";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import PropTypes from "prop-types";

export default function WordListWithFilters({
  words,
  isFiltering = false,
  isPaginating = false,
  filterCallback,
  paginationCallback
}) {
  const languages = useSelector((state) => state.languages);
  const dispatch = useDispatch();

  const [searchPattern, setSearchPattern] = useState("");
  const [languagesSelected, setLanguagesSelected] = useState(new Map());

  const [showFilterWordsModal, setShowFilterWordsModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (languages.length > 0) {
      const languageMap = new Map();
      languages.forEach((language) =>
        languageMap.set(language.language_name, true)
      );
      setLanguagesSelected(languageMap);
      paginationCallback("", languageMap, 1);
    }
  }, [languages, paginationCallback]);

  return (
    <>
      <div className="mb-4 text-center">
        <CustomButton
          variant="info"
          disabled={isFiltering}
          isLoading={isFiltering}
          onClick={() => setShowFilterWordsModal(true)}
          testId="filter-button">
          <FilterIcon /> <span>Filter results</span>
        </CustomButton>
      </div>
      {isFiltering ? (
        <div className="text-center">
          <CustomSpinner />
        </div>
      ) : (
        <WordList
          words={words}
          isLoading={isPaginating}
          callback={(page) =>
            paginationCallback(searchPattern, languagesSelected, page)
          }
        />
      )}
      <Modal data-testid="filter-modal" show={showFilterWordsModal}>
        <Modal.Header>
          <Modal.Title>Filter results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabelInput
            controlId="floatingSearch"
            type="text"
            label="Search for..."
            placeholder="Search for..."
            defaultValue={searchPattern}
            onChange={(event) => setSearchPattern(event.target.value)}
            testId="search-input"
          />
          {languages.map((item) => (
            <Form.Check
              key={item.id}
              id={item.id}
              value={item.language_name}
              type="checkbox"
              label={item.language_name}
              checked={languagesSelected.has(item.language_name)}
              onChange={(event) => {
                const currentLanguagesSelected = new Map(languagesSelected);
                if (event.target.checked) {
                  currentLanguagesSelected.set(event.target.value, true);
                } else {
                  currentLanguagesSelected.delete(event.target.value);
                }
                setLanguagesSelected(currentLanguagesSelected);
              }}
              data-testid={`${item.language_name}-check-item`}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            variant="secondary"
            onClick={() => setShowFilterWordsModal(false)}
            testId="cancel-button">
            Cancel
          </CustomButton>
          <CustomButton
            variant="success"
            onClick={() => {
              filterCallback(searchPattern, languagesSelected);
              setShowFilterWordsModal(false);
            }}
            testId="apply-filters-button">
            Apply
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

WordListWithFilters.propTypes = {
  words: PropTypes.shape({
    results: PropTypes.array.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string,
    count: PropTypes.number,
    page: PropTypes.number
  }).isRequired,
  isFiltering: PropTypes.bool,
  isPaginating: PropTypes.bool,
  filterCallback: PropTypes.func.isRequired,
  paginationCallback: PropTypes.func.isRequired
};
