const { screen } = require("@testing-library/react");
const { default: AccountCard } = require("components/cards/AccountCard");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";
import { getUnauthenticatedUser } from "test-utils/mocking/users";

describe("should display account public data in a card", () => {
  it("with short bio", () => {
    const user = getUnauthenticatedUser("picture");

    renderWithProviders(<AccountCard user={user} />);

    screen.getByAltText(user.username);
    const accountUsername = screen.getByText(user.username);
    const accountBio = screen.getByText(user.bio);

    expect(accountUsername).toHaveTextContent(user.username);
    expect(accountBio.parentNode).toHaveTextContent(`Bio: ${user.bio}`);
  });

  it("with long bio", () => {
    const user = getUnauthenticatedUser("picture");
    user.bio = faker.string.alphanumeric({ length: { min: 75, max: 500 } });

    renderWithProviders(<AccountCard user={user} />);

    const bioSubstr = user.bio.substring(0, 75);

    screen.getByAltText(user.username);
    const accountUsername = screen.getByText(user.username);
    const accountBio = screen.getByText(`${bioSubstr}...`);

    expect(accountUsername).toHaveTextContent(user.username);
    expect(accountBio.parentNode).toHaveTextContent(`Bio: ${bioSubstr}...`);
  });
});
