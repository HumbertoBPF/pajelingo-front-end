export function showFirstCharacters(text, n) {
  const len = text.length;

  if (len === 0) {
    return "-";
  }

  if (len < n) {
    return text;
  }

  return `${text.slice(0, n)}...`;
}
