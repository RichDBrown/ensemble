import { render, screen, within } from "@testing-library/react";
import SignUpPage from "./page";

describe("SignUpPage", () => {
  beforeEach(() => render(<SignUpPage />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center pt-16 px-4");
  });

  it("renders logo container container", () => {
    const container = screen
      .getByRole("heading", {
        level: 1,
        name: "Ensemble",
      })
      .closest("div");
    expect(container).toHaveClass("flex gap-x-4 items-center");
  });

  it("renders logo correctly", () => {
    const logo = screen.getByAltText("Logo.");
    expect(logo).toHaveClass("h-10 w-auto");
  });

  it("renders app name correctly", () => {
    const appName = screen.getByRole("heading", { level: 1, name: "Ensemble" });
    expect(appName).toHaveClass("text-2xl font-medium");
  });

  it("renders sign up container correctly", () => {
    const signUpContainer = screen
      .getByRole("heading", {
        level: 2,
        name: "Sign Up",
      })
      .closest("div");
    expect(signUpContainer).toHaveClass("flex flex-col mt-16 w-full");
  });

  it("renders sign up text correctly", () => {
    const signUp = screen.getByRole("heading", { level: 2, name: "Sign Up" });
    expect(signUp).toHaveClass("text-3xl font-medium");
  });

  it("renders sign up subheading correctly", () => {
    const signUpSubHeading = screen.getByText(/Already have an account/i);
    expect(signUpSubHeading).toHaveClass(
      "mt-1 text-sm text-on-surface-variant"
    );

    const link = within(signUpSubHeading).getByRole("link", {
      name: "Sign in",
    });
    expect(link).toHaveClass("text-primary");
  });
});
