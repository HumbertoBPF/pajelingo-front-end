const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: Badge } = require("components/Badge");
import { faker } from "@faker-js/faker/locale/en_US";
const { renderWithProviders } = require("test-utils/store");

it("should display badge information", async () => {
  const user = userEvent.setup();

  const badge = {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.lorem.words({ min: 1, max: 3 }),
    image: "image",
    color: faker.color.rgb(),
    description: faker.lorem.sentence(5)
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
