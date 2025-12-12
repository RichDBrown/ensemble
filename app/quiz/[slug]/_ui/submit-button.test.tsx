import { render, screen } from "@testing-library/react";
import SubmitButton from "./submit-button";
import { useState } from "react";
import { Question } from "../_utils/types";

function SubmitButtonWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <SubmitButton
      selectedOption={selectedOption}
      setIsSubmitted={setIsSubmitted}
      questions={questions}
      currentIndex={currentIndex}
    />
  );
}

describe("SubmitButton", () => {
  beforeEach(() => render(<SubmitButtonWrapper />));

  it("renders button correctly", () => {
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toHaveClass(
      "w-full h-14 font-medium text-on-primary disabled:text-on-surface bg-primary hover:bg-[#90BFEE] active:bg-[#90BFEE] disabled:bg-on-surface/10 rounded-2xl cursor-pointer disabled:cursor-not-allowed transition-colors"
    );
  });
});
