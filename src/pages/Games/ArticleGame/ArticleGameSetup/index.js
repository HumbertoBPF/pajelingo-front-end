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

export default function ArticleGameSetup() {
  let languages = useSelector((state) => state.languages);

  const [error, setError] = useState({
    showToast: false,
    message: ""
  });
  const [articleGame] = useGame(2);
  const [language, setLanguage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();

    if (language === null || language === "") {
      setError({ showToast: true, message: "You must choose a language." });
      return;
    }

    const queryParams = new URLSearchParams({ language });
    navigate(`${articleGame.link}play?${queryParams}`);
  }

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  languages = languages.filter((item) => item.language_name !== "English");

  return (
    <>
      {Object.keys(articleGame).length === 0 ? (
        <div className="text-center">
          <CustomSpinner />
        </div>
      ) : (
        <>
          <h5>{articleGame.game_name}</h5>
          <br />
          <section>
            <ReactMarkdown>{articleGame.instructions}</ReactMarkdown>
          </section>
          <Form onSubmit={(event) => handleFormSubmit(event)}>
            <SelectLanguage
              items={languages}
              defaultItem="Choose a language"
              onClick={(target) => setLanguage(target.value)}
              testId="select-language"
            />
            <div className="text-center">
              <CustomButton
                variant="success"
                type="submit"
                testId="start-button">
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
