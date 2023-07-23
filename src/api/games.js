import { baseUrl } from "services/base";

export const setupArticleGame = (token, searchParams, onSuccess, onFail) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/article-game?${searchParams}`, {
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

export const submitAnswerArticleGame = (token, body, onSuccess) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/article-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

export const setupConjugationGame = (
  token,
  searchParams,
  onSuccess,
  onFail
) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/conjugation-game?${searchParams}`, {
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

export const submitAnswerConjugationGame = (token, body, onSuccess) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/conjugation-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

export const setupVocabularyGame = (token, searchParams, onSuccess, onFail) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/vocabulary-game?${searchParams}`, {
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

export const submitAnswerVocabularyGame = (token, body, onSuccess) => {
  const authHeaders = {};

  if (token) {
    authHeaders["Authorization"] = `Token ${token}`;
  }

  fetch(`${baseUrl}/vocabulary-game`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};
