import { render, screen } from "@testing-library/react";
import Results from "./results";

describe("Results", () => {
  it("renders section correctly", () => {
    render(<Results grade={80} />);

    const section = screen.getByText("80%").parentElement;
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders results container correctly", () => {
    render(<Results grade={80} />);

    const section = screen.getByText("80%");
    expect(section).toHaveClass(
      "flex justify-center items-center mt-[23vh] w-38.5 h-38.5 text-3xl font-medium border-3 border-tertiary rounded-full"
    );
  });

  it("renders supporting text correctly when greater than or equal 80%", () => {
    render(<Results grade={80} />);

    const section = screen.getByText("Amazing work!");
    expect(section).toHaveClass("mt-8 text-center");
  });

  it("renders supporting text correctly when less than 80%", () => {
    render(<Results grade={79} />);

    const section = screen.getByText(
      "Almost there! A score of 80% is required to the pass quiz. Please try again."
    );
    expect(section).toHaveClass("mt-8 text-center");
  });
});
