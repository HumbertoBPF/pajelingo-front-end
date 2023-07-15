const { screen } = require("@testing-library/react");
const { default: AccountCard } = require("components/cards/AccountCard");
const { renderWithProviders } = require("utils/test-utils");

describe("should display account public data in a card", () => {
  it("with short bio", () => {
    const user = {
      picture: "picture",
      username: "Humberto Borges",
      bio: "My Bio"
    };

    renderWithProviders(<AccountCard user={user} />);

    screen.getByAltText(user.username);
    const accountUsername = screen.getByText(user.username);
    const accountBio = screen.getByText(user.bio);

    expect(accountUsername.textContent).toBe(user.username);
    expect(accountBio.parentNode.textContent).toBe(`Bio: ${user.bio}`);
  });

  it("with long bio", () => {
    const user = {
      picture: "picture",
      username: "Humberto Borges",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Donec ultrices tincidunt arcu non sodales neque sodales ut. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Mauris augue neque gravida in fermentum et sollicitudin ac. Lectus magna fringilla urna porttitor rhoncus. Elementum nisi quis eleifend quam. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Quam nulla porttitor massa id. Facilisis sed odio morbi quis commodo odio aenean. Pulvinar sapien et ligula ullamcorper malesuada. Rhoncus urna neque viverra justo."
    };

    renderWithProviders(<AccountCard user={user} />);

    const bioSubstr = user.bio.substring(0, 75);

    screen.getByAltText(user.username);
    const accountUsername = screen.getByText(user.username);
    const accountBio = screen.getByText(`${bioSubstr}...`);

    expect(accountUsername.textContent).toBe(user.username);
    expect(accountBio.parentNode.textContent).toBe(`Bio: ${bioSubstr}...`);
  });
});
