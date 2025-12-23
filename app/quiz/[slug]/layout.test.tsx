import { render, screen } from "@testing-library/react";
import QuizLayout from "./layout";

describe("QuizLayout", () => {
  beforeEach(() => render(<QuizLayout />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center px-4");
  });
});
