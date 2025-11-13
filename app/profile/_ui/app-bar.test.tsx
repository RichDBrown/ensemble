import { act, render, screen } from "@testing-library/react";
import AppBar from "./app-bar";

describe("AppBar", () => {
  beforeEach(() => render(<AppBar />));

  it("renders header correctly", () => {
    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "fixed flex justify-center w-full pb-4.5 pt-10.5 top-0 z-10 transition-colors"
    );

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveClass("bg-surface-container");
  });

  it("renders app bar heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Profile",
    });
    expect(heading).toHaveClass("text-xl");
  });
});
