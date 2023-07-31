export async function enterText(user, element, text) {
  if (text) {
    await user.type(element, text);
  } else {
    await user.clear(element);
  }
}
