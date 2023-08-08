import { baseUrl } from "services/base";

export const getUserScores = (language, username, onSuccess) => {
  fetch(`${baseUrl}/scores?language=${language}&user=${username}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data));
};

export const getRanking = (
  language,
  onSuccess,
  onFail,
  additionalParams = {
    page: 1,
    username: null
  }
) => {
  const { page, username } = additionalParams;

  let url = `${baseUrl}/rankings?language=${language}&page=${page}`;

  if (username) {
    url += `&user=${username}`;
  }

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};
