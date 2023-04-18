import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import FloatingLabelInput from "components/FloatingLabelInput";
import WordList from "components/WordList";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";

export default function WordListWithFilters({ words, isFiltering=false, isPaginating=false,
        filterCallback, paginationCallback }) {
    const languages = useSelector(state => state.languages);
    const dispatch = useDispatch();

    const [searchPattern, setSearchPattern] = useState("");
    const [languagesSelected, setLanguagesSelected] = useState(new Map());

    const [showFilterWordsModal, setShowFilterWordsModal] = useState(false);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        if (languages.length > 0) {
            let languageMap = new Map();
            languages.forEach(language => languageMap.set(language.language_name, true));
            setLanguagesSelected(languageMap);
            paginationCallback("", languageMap, 1);
        }
    }, [languages, paginationCallback]);

    return (
        <>
            <div className="mb-4 text-center">
                <CustomButton variant="info" 
                    disabled={isFiltering} 
                    isLoading={isFiltering} 
                    onClick={() => setShowFilterWordsModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                        </svg> Filter results
                </CustomButton>
            </div>
            {
                isFiltering?
                <div className="text-center">
                    <CustomSpinner animation="border"/>
                </div>:
                <WordList 
                    words={words} 
                    isLoading={isPaginating} 
                    callback={(page) => paginationCallback(searchPattern, languagesSelected, page)}/>
            }
            <Modal show={showFilterWordsModal}>
                <Modal.Header>
                    <Modal.Title>
                        Filter results
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabelInput controlId="floatingSearch" type="text" label="Search for..." placeholder="Search for..." 
                        defaultValue={searchPattern} onChange={(event) => setSearchPattern(event.target.value)}/>
                    {languages.map(item => <Form.Check 
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
                                                    }else {
                                                        currentLanguagesSelected.delete(event.target.value);
                                                    }
                                                    setLanguagesSelected(currentLanguagesSelected);
                                                }}/>)}
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton variant="secondary" onClick={() => setShowFilterWordsModal(false)}>Cancel</CustomButton>
                    <CustomButton variant="success" 
                        onClick={() => {
                            filterCallback(searchPattern, languagesSelected);
                            setShowFilterWordsModal(false);    
                        }}>Apply</CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}