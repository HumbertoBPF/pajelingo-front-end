import MeaningCard from "components/cards/MeaningCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";
import CustomButton from "components/CustomButton";
import HeartIcon from "components/icons/HeartIcon";

export default function Meanings() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState({ word_name: "" });

  useEffect(() => {
    // Fetching word
    let options = {};

    if (user) {
      options = {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      };
    }

    fetch(`${baseUrl}/words/${params.pk}`, options)
      .then((response) => response.json())
      .then((data) => setWord(data));
  }, [user, params.pk]);

  useEffect(() => {
    // Fetching meanings
    fetch(`${baseUrl}/meanings/${params.pk}`)
      .then((response) => response.json())
      .then((data) => setMeanings(data));
  }, [params.pk]);

  function toggleFavoriteButton() {
    if (user) {
      fetch(`${baseUrl}/words/${word.id}/favorite-word`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          is_favorite: !word.is_favorite,
        }),
      })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
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

  return (
    <>
      <h5 className="mb-4">Meanings of &quot;{word.word_name}&quot;</h5>

      {word.image === null ? null : (
        <div className="row g-0 justify-content-center mb-4">
          <img
            src={`data:image/jpeg;base64,${word.image}`}
            className="img-fluid rounded col-md-2 col-sm-3 col-6"
            alt="Word meaning"
          />
        </div>
      )}

      {meanings.length > 1
        ? meanings.map((meaning, index) => (
            <MeaningCard key={meaning.id} index={index + 1} meaning={meaning.meaning} />
          ))
        : meanings.map((meaning) => (
            <MeaningCard key={meaning.id} meaning={meaning.meaning} />
          ))}

      {user ? (
        <div className="text-center">
          <CustomButton variant="info" onClick={() => toggleFavoriteButton()}>
            {renderFavoriteButton(word)}
          </CustomButton>
        </div>
      ) : null}
    </>
  );
}
