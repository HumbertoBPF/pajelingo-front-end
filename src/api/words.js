import { baseUrl } from "services/base";

export const toggleFavoriteWord = (token, wordId, isFavorite, onSuccess) => {
  fetch(`${baseUrl}/words/${wordId}/favorite-word`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      is_favorite: isFavorite
    })
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      onSuccess(data);
    });
};

export const getWord = (token, wordId, onSuccess) => {
  let options = {};

  if (token) {
    options = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
  }

  fetch(`${baseUrl}/words/${wordId}`, options)
    .then((response) => response.json())
    .then((data) => onSuccess(data));
};

export const getMeaning = (wordId, onSuccess) => {
  fetch(`${baseUrl}/meanings/${wordId}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data));
};
