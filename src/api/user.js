import { baseUrl } from "services/base";

export const login = (username, password, onSuccess, onFail) => {
  fetch(`${baseUrl}/user-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};
