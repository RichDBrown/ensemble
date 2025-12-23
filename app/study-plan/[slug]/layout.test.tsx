import { render, screen } from "@testing-library/react";
import StudyPlanLayout from "./layout";

describe("StudyPlanLayout", () => {
  beforeEach(() => render(<StudyPlanLayout />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center px-4");
  });
});
