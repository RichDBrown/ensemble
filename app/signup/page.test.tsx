import { render, screen } from "@testing-library/react";
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
});
