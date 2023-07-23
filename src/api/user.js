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
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

export const getUser = async (token) => {
  return await fetch(`${baseUrl}/user/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export const deleteUser = (token, onSuccess, onFail) => {
  fetch(`${baseUrl}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw Error();
    })
    .catch(() => onFail());
};

export const getUserPicture = (token, body, onSuccess, onFail) => {
  fetch(`${baseUrl}/user/picture`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`
    },
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw Error();
    })
    .catch(() => onFail());
};
