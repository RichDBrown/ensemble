import { act, render, screen } from "@testing-library/react";
import AppBar from "./app-bar";

describe("AppBar", () => {
  beforeEach(() => render(<AppBar title="Chemistry Quiz" />));

  it("renders app bar correctly", () => {
    const appBar = screen.getByText("Chemistry Quiz");
    expect(appBar).toHaveClass(
      "fixed flex justify-center w-full pb-4.5 pt-10.5 px-4 top-0 z-10 text-xl text-center transition-colors"
    );
    expect(appBar).toHaveRole("banner");
  });

  it("renders app bar correctly when scrolling", () => {
    const appBar = screen.getByRole("banner");
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(appBar).toHaveClass("bg-surface-container");
  });
});
