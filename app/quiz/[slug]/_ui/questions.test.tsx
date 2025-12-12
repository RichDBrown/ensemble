import { render, screen } from "@testing-library/react";
import { useState } from "react";
import Questions from "./questions";
import { Question } from "../_utils/types";

const questionsMock: Question[] = [
  {
    question: "What is 2+2",
    options: ["3", "4", "5", "6"],
    correct_answer: 1,
    answeredCorrectly: false,
  },
];

function QuestionsWrapper() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>(questionsMock);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (
    <Questions
      currentIndex={currentIndex}
      questions={questions}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      isSubmitted={isSubmitted}
    />
  );
}

describe("Questions", () => {
  beforeEach(() => render(<QuestionsWrapper />));

  it("renders section correctly", () => {
    const section = screen.getByText("Question 1 of 1").parentElement;
    expect(section).toHaveClass("flex flex-col w-full pt-33 pb-22");
  });

  it("renders question number correctly", () => {
    const questionNumber = screen.getByText("Question 1 of 1");
    expect(questionNumber).toHaveClass("text-sm font-medium text-tertiary");
  });

  it("renders question heading correctly", () => {
    const questionNumber = screen.getByRole("heading", {
      level: 2,
      name: "What is 2+2",
    });
    expect(questionNumber).toHaveClass("mt-4 text-xl");
  });

  it("renders option container correctly", () => {
    const optionContainer = screen.getByRole("radiogroup");
    expect(optionContainer).toHaveClass("flex flex-col mt-8 gap-y-4 w-full");
  });
});
