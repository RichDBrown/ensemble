import { render, screen } from "@testing-library/react";
import StudyPlan from "./study-plan";

describe("StudyPlan", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-11-10"));
  });
  beforeEach(() =>
    render(
      <StudyPlan
        id="1234567"
        subject="Calculus"
        testDate={new Date("2025-11-10")}
      />
    )
  );

  it("renders parent container correctly", () => {
    const parentContainer = screen.getByRole("heading", {
      name: "Calculus",
      level: 2,
    }).parentElement?.parentElement;
    expect(parentContainer).toHaveClass(
      "flex flex-col w-full p-4 bg-surface-container-low rounded-xl shadow-sm"
    );
  });

  it("renders subject container correctly", () => {
    const subjectContainer = screen.getByRole("heading", {
      name: "Calculus",
      level: 2,
    }).parentElement;
    expect(subjectContainer).toHaveClass("flex justify-between items-center");
  });

  it("renders days left container correctly", () => {
    const daysLeftContainer = screen.getByText("1 Days left").parentElement;
    expect(daysLeftContainer).toHaveClass("flex items-center gap-x-2");
  });

  it("renders clock icon correctly", () => {
    const clockIcon = screen.getByAltText("Days left before test.");
    expect(clockIcon).toHaveClass("w-5 h-auto");
  });

  it("renders days left correctly", () => {
    const daysLeftText = screen.getByText("1 Days left");
    expect(daysLeftText).toHaveClass("text-sm text-on-surface-variant");
  });

  it("renders study progress label correctly", () => {
    const studyProgressLabel = screen.getByText("Study progress");
    expect(studyProgressLabel).toHaveClass(
      "mt-8 text-sm text-on-surface-variant"
    );
  });

  it("renders progress bar correctly", () => {
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveClass("mt-1 w-full h-2");
  });
});
