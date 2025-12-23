import { render, screen } from "@testing-library/react";
import ProfileLayout from "./layout";

describe("ProfileLayout", () => {
  beforeEach(() => render(<ProfileLayout />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center pt-27");
  });
});
