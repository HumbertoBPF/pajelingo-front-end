const { screen } = require("@testing-library/react");
const { activateAccount } = require("api/user");
const { default: Activation } = require("pages/Activation");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    activateAccount: jest.fn()
  };
});

describe("should call API", () => {
  it("and display successful message", () => {
    activateAccount.mockImplementation((uid, token, onSuccess) => {
      onSuccess();
    });

    renderWithProviders(<Activation />);

    expect(activateAccount).toHaveBeenCalledTimes(1);

    const successAlert = screen.getByTestId("success-alert");
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toHaveTextContent(
      "Thank you for your email confirmation. Now you can sign in your account."
    );

    const dashboardButton = screen.getByTestId("dashboard-button");
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton).toHaveTextContent("Go to dashboard");
    expect(dashboardButton).toHaveClass("btn-primary");

    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent("Login");
    expect(loginButton).toHaveClass("btn-success");
  });

  it("and display error message", () => {
    activateAccount.mockImplementation((uid, token, onSuccess, onFail) => {
      onFail();
    });

    renderWithProviders(<Activation />);

    expect(activateAccount).toHaveBeenCalledTimes(1);

    const successAlert = screen.getByTestId("error-alert");
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toHaveTextContent("Invalid token!");

    const dashboardButton = screen.getByTestId("dashboard-button");
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton).toHaveTextContent("Go to dashboard");
    expect(dashboardButton).toHaveClass("btn-primary");

    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent("Login");
    expect(loginButton).toHaveClass("btn-success");
  });
});
