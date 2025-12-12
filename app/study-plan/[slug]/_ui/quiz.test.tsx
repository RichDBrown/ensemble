import { render, screen } from "@testing-library/react";
import Quiz from "./quiz";

describe("Quiz", () => {
  it("renders quiz container correctly", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={false}
      />
    );
    const quizContainer = screen.getByRole("link");
    expect(quizContainer).toHaveClass(
      "flex flex-col p-4 w-full bg-surface-container-low border border-primary rounded-lg"
    );
  });

  it("renders cursor and quiz container background color correctly when quiz is completed", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={true}
      />
    );
    const quizContainer = screen.getByRole("heading", {
      name: "Quiz 1",
      level: 2,
    }).parentElement?.parentElement;
    expect(quizContainer).toHaveClass("border-tertiary cursor-not-allowed");
  });

  it("renders cursor and the quiz container background color correctly when quiz is not available", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={tomorrow}
        isComplete={false}
      />
    );
    const quizContainer = screen.getByRole("heading", {
      name: "Quiz 1",
      level: 2,
    }).parentElement?.parentElement;
    expect(quizContainer).toHaveClass(
      "border-outline-variant cursor-not-allowed"
    );
  });

  it("renders quiz title container correctly", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={false}
      />
    );
    const titleContainer = screen.getByRole("heading", {
      name: "Quiz 1",
      level: 2,
    }).parentElement;
    expect(titleContainer).toHaveClass("flex justify-between w-full");
  });

  it("renders quiz status correctly when completed", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={true}
      />
    );
    const status = screen.getByText("Complete");
    expect(status).toHaveClass("text-tertiary");
  });

  it("renders quiz status correctly when available, but not complete", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={false}
      />
    );
    const status = screen.getByText("Start");
    expect(status).toHaveClass("text-primary");
  });

  it("renders quiz status correctly when not available", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={tomorrow}
        isComplete={false}
      />
    );
    const status = screen.getByAltText("Quiz is locked.");
    expect(status).toHaveClass("h-5 w-auto");
  });

  it("renders quiz description correctly", () => {
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={new Date()}
        isComplete={false}
      />
    );
    const description = screen.getByText("Description 1");
    expect(description).toHaveClass("mt-4 text-sm text-on-surface-variant");
  });

  it("renders countdown when quiz is not available", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    render(
      <Quiz
        id="1234"
        quizTitle="Quiz 1"
        description="Description 1"
        availableDate={tomorrow}
        isComplete={false}
      />
    );
    const countdown = screen.getByText("Opens in 1 day");
    expect(countdown).toHaveClass(
      "self-center mt-6 text-xs font-medium text-on-surface-variant"
    );
  });
});
