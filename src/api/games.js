import { baseUrl } from "services/base";

export const setupArticleGame = (token, queryParams, onSuccess, onFail) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/article-game?${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onFail();
    })
    .then((data) => {
      onSuccess(data);
    });
};
