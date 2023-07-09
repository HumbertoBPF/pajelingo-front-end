import { baseUrl } from "services/base";

export const toggleFavoriteWord = (token, wordId, isFavorite, callback) => {
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
      callback(data);
    });
};
