import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import SelectLanguage from "components/SelectLanguage";
import useGame from "hooks/useGame";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function VocabularyGameSetup() {
  let languages = useSelector((state) => state.languages);
  const [vocabularyGame] = useGame(1);

  const [error, setError] = useState({
    showToast: false,
    message: ""
  });
  const [baseLanguage, setBaseLanguage] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();

    if (
      baseLanguage === null ||
      baseLanguage === "" ||
      targetLanguage === null ||
      targetLanguage === ""
    ) {
      setError({
        showToast: true,
        message: "You must set both base and target languages."
      });
      return;
    }

    if (baseLanguage === targetLanguage) {
      setError({
        showToast: true,
        message: "Base and target languages must be different."
      });
      return;
    }

    const queryParams = new URLSearchParams({
      base_language: baseLanguage,
      target_language: targetLanguage
    });
    navigate(`/vocabulary-game/play?${queryParams}`);
  }

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <>
      {Object.keys(vocabularyGame).length === 0 ? (
        <div className="text-center">
          <CustomSpinner />
        </div>
      ) : (
        <>
          <h5>{vocabularyGame.game_name}</h5>
          <br />
          <section>
            <ReactMarkdown>{vocabularyGame.instructions}</ReactMarkdown>
          </section>
          <Form onSubmit={(event) => handleFormSubmit(event)}>
            <SelectLanguage
              items={languages}
              defaultItem="Choose a base language"
              onClick={(target) => setBaseLanguage(target.value)}
            />
            <SelectLanguage
              items={languages}
              defaultItem="Choose a target language"
              onClick={(target) => setTargetLanguage(target.value)}
            />
            <div className="text-center">
              <CustomButton variant="success" type="submit">
                Start
              </CustomButton>
            </div>
          </Form>
          <NotificationContainer>
            <Notification
              show={error.showToast}
              onClose={() => setError({ ...error, showToast: false })}
              variant="danger"
              title="Error"
              message={error.message}
            />
          </NotificationContainer>
        </>
      )}
    </>
  );
}
