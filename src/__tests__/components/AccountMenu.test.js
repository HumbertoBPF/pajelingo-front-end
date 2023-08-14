import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  assertAuthenticatedAccountMenu,
  assertUnauthenticatedAccountMenu
} from "test-utils/assertions/account-menu";
import { getAuthenticatedUser } from "test-utils/mocking/users";
import { renderWithProviders } from "test-utils/store";
const { default: AccountMenu } = require("../../components/AccountMenu");

it("should display two buttons when no user props is specified", () => {
  renderWithProviders(<AccountMenu />);
  assertUnauthenticatedAccountMenu();
});

it("should display user profile dropdown when user props is specified", async () => {
  const user = userEvent.setup();

  const userData = getAuthenticatedUser();

  renderWithProviders(<AccountMenu user={userData} />);

  const dropdownToggle = screen.getByTestId("profile-dropdown");

  expect(dropdownToggle).toHaveTextContent(userData.username);
  await user.click(dropdownToggle);

  assertAuthenticatedAccountMenu();
});
