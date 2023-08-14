const { screen, within } = require("@testing-library/dom");
const { default: Footer } = require("components/Footer");
const { renderWithProviders } = require("test-utils/store");

it("should display footer with links for external pages", () => {
  renderWithProviders(<Footer />);

  const textDescription = screen.getByTestId("text-description");
  expect(textDescription).toBeInTheDocument();
  expect(textDescription).toHaveTextContent(
    "Author of this app and his other projects:"
  );

  const linkedinLink = screen.getByTestId("linkedin-link");
  expect(linkedinLink).toBeInTheDocument();
  expect(linkedinLink).toHaveTextContent("www.linkedin.com/in/humberto-bpf");
  expect(linkedinLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/humberto-bpf"
  );

  const linkedinIcon = within(linkedinLink).getByTestId("linkedin-icon");
  expect(linkedinIcon).toBeInTheDocument();

  const githubLink = screen.getByTestId("github-link");
  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveTextContent("https://github.com/HumbertoBPF");
  expect(githubLink).toHaveAttribute("href", "https://github.com/HumbertoBPF");

  const githubIcon = within(githubLink).getByTestId("github-icon");
  expect(githubIcon).toBeInTheDocument();
});
