import { render, screen } from "@testing-library/react";
import NextButton from "./next-button";
import { useState } from "react";
import { Question } from "../_utils/types";

function NextButtonWrapper() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<number>(1);
  return (
    <NextButton
      currentIndex={currentIndex}
      questions={questions}
      setIsQuizFinished={setIsQuizFinished}
      setCurrentIndex={setCurrentIndex}
      setIsSubmitted={setIsSubmitted}
      setSelectedOption={setSelectedOption}
    />
  );
}

describe("NextButton", () => {
  beforeEach(() => render(<NextButtonWrapper />));

  it("renders button correctly", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toHaveClass(
      "w-full h-14 font-medium text-on-tertiary bg-tertiary hover:bg-[#C8B2D9] active:bg-[#C8B2D9] rounded-2xl cursor-pointer transition-colors"
    );
  });
});
