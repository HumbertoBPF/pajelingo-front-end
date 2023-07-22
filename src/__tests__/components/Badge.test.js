const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: Badge } = require("components/Badge");
const { getRandomInteger } = require("utils");
const { renderWithProviders } = require("utils/test-utils");

it("should display badge information", async () => {
  const user = userEvent.setup();

  const badge = {
    id: getRandomInteger(1, 1000),
    name: "Badge name",
    image: "image",
    color: "#0000FF",
    description: "Badge description"
  };

  renderWithProviders(<Badge badge={badge} />);

  const badgeElement = screen.getByTestId(`badge-${badge.id}`);

  const badgeName = within(badgeElement).getByText(badge.name);
  expect(badgeName).toBeInTheDocument();

  const badgeIcon = within(badgeElement).getByAltText(badge.name);
  expect(badgeIcon).toBeInTheDocument();

  await user.hover(badgeName);

  const popover = screen.getByTestId(`popover-${badge.id}`);

  const badgePopoverHeader = within(popover).getByText(badge.name);
  expect(badgePopoverHeader).toBeInTheDocument();

  const badgePopoverBody = within(popover).getByText(badge.description);
  expect(badgePopoverBody).toBeInTheDocument();
});
