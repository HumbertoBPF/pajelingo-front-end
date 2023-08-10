import MeaningCard from "components/cards/MeaningCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomButton from "components/CustomButton";
import HeartIcon from "components/icons/HeartIcon";
import { getMeaning, getWord, toggleFavoriteWord } from "api/words";
import CustomSpinner from "components/CustomSpinner";

export default function Meanings() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [meanings, setMeanings] = useState(undefined);
  const [word, setWord] = useState(undefined);

  useEffect(() => {
    // Fetching word
    const token = user ? user.token : null;
    getWord(token, params.pk, (data) => setWord(data));
  }, [user, params.pk]);

  useEffect(() => {
    // Fetching meanings
    getMeaning(params.pk, (data) => setMeanings(data));
  }, [params.pk]);

  function toggleFavoriteButton() {
    if (user) {
      toggleFavoriteWord(user.token, word.id, !word.is_favorite, (data) => {
        if (data !== null) {
          setWord(data);
        }
      });
    }
  }

  function renderFavoriteButton(word) {
    return (
      <>
        <HeartIcon fill={!word.is_favorite} />{" "}
        <span>
          {word.is_favorite
            ? "Remove from favorite words"
            : "Add to favorite words"}
        </span>
      </>
    );
  }

  function renderMeanings() {
    return (
      <>
        <h5 className="mb-4" data-testid="title">
          Meanings of &quot;{word.word_name}&quot;
        </h5>

        {word.image ? (
          <div className="row g-0 justify-content-center mb-4">
            <img
              src={`data:image/jpeg;base64,${word.image}`}
              className="img-fluid rounded col-md-2 col-sm-3 col-6"
              alt="Word meaning"
              data-testid="word-image"
            />
          </div>
        ) : null}

        {meanings.length > 1
          ? meanings.map((meaning, index) => (
              <MeaningCard
                key={meaning.id}
                index={index + 1}
                meaning={meaning}
              />
            ))
          : meanings.map((meaning) => (
              <MeaningCard key={meaning.id} meaning={meaning} />
            ))}

        {user ? (
          <div className="text-center">
            <CustomButton
              variant="info"
              onClick={() => toggleFavoriteButton()}
              testId="favorite-button">
              {renderFavoriteButton(word)}
            </CustomButton>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      {meanings && word ? (
        renderMeanings()
      ) : (
        <div className="text-center">
          <CustomSpinner />
        </div>
      )}
    </>
  );
}
