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

export const getUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;

  const response = await fetch(`${baseUrl}/user/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    const updatedUser = {
      token,
      username: data.username,
      bio: data.bio,
      email: data.email,
      badges: data.badges
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return { ...updatedUser, picture: data.picture };
  } else {
    localStorage.removeItem("user");
    return null;
  }
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

export const updateUserPicture = (token, body, onSuccess, onFail) => {
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

export const getAccount = (username, onSuccess, onFail) => {
  fetch(`${baseUrl}/accounts/${username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

export const requestResetAccount = (email, onSuccess, onFail) => {
  fetch(`${baseUrl}/request-reset-account/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw Error(response);
    })
    .catch(() => onFail());
};

export const resetAccount = (uid, token, password, onSuccess, onFail) => {
  fetch(`${baseUrl}/reset-account/${uid}/${token}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw Error(response);
    })
    .catch(() => onFail());
};

export const searchAccount = (searchParams, onSuccess) => {
  const queryParams = new URLSearchParams(searchParams);

  fetch(`${baseUrl}/accounts?${queryParams}`)
    .then((response) => response.json())
    .then((data) => onSuccess(data));
};

export const signup = (body, onSuccess, onFail) => {
  fetch(`${baseUrl}/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response);
    })
    .then(() => onSuccess())
    .catch(() => onFail());
};

export const updateAccount = (token, body, onSuccess, onFail) => {
  fetch(`${baseUrl}/user/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response);
    })
    .then(() => onSuccess())
    .catch(() => onFail());
};

export const activateAccount = (uid, token, onSuccess, onFail) => {
  fetch(`${baseUrl}/activate/${uid}/${token}`, {
    method: "PUT"
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response);
    })
    .then(() => onSuccess())
    .catch(() => onFail());
};
