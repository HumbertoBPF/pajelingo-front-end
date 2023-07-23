import { baseUrl } from "services/base";

export const getUserScores = (language, username, onSuccess) => {
  fetch(`${baseUrl}/scores/?language=${language}&user=${username}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data));
};
