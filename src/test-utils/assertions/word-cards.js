const { within, screen } = require("@testing-library/react");

export const assertWordCardWithoutFavoriteOption = (word) => {
  const wordCard = screen.getByTestId(`${word.id}-word-card`);
  expect(wordCard).toBeInTheDocument();

  const wordCardHeartFilled =
    within(wordCard).queryByTestId("heart-filled-icon");
  expect(wordCardHeartFilled).not.toBeInTheDocument();

  const wordCardHeartNonFilled = within(wordCard).queryByTestId("heart-icon");
  expect(wordCardHeartNonFilled).not.toBeInTheDocument();

  const wordName = within(wordCard).getByText(word.word_name);
  expect(wordName).toBeInTheDocument();
  expect(wordName).toHaveTextContent(word.word_name);

  const flagImage = within(wordCard).getByAltText(
    `${word.language} language flag`
  );
  expect(flagImage).toBeInTheDocument();
};

export const assertWordCardWithFavoriteOption = (word) => {
  const wordCard = screen.getByTestId(`${word.id}-word-card`);
  expect(wordCard).toBeInTheDocument();

  const wordCardHeartFilled =
    within(wordCard).queryByTestId("heart-filled-icon");

  const wordCardHeartNonFilled = within(wordCard).queryByTestId("heart-icon");

  if (word.is_favorite) {
    expect(wordCardHeartFilled).toBeInTheDocument();
    expect(wordCardHeartNonFilled).not.toBeInTheDocument();
  } else {
    expect(wordCardHeartFilled).not.toBeInTheDocument();
    expect(wordCardHeartNonFilled).toBeInTheDocument();
  }

  const wordName = within(wordCard).getByText(word.word_name);
  expect(wordName).toBeInTheDocument();
  expect(wordName).toHaveTextContent(word.word_name);

  const flagImage = within(wordCard).getByAltText(
    `${word.language} language flag`
  );
  expect(flagImage).toBeInTheDocument();
};
