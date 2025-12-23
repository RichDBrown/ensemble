import { render, screen } from "@testing-library/react";
import SubmitButton from "./submit-button";
import { useState } from "react";
import { Question } from "../_utils/types";

type SubmitButtonWrapperProps = {
  userSelectedOption: number;
};

function SubmitButtonWrapper({ userSelectedOption }: SubmitButtonWrapperProps) {
  const [selectedOption, setSelectedOption] =
    useState<number>(userSelectedOption);
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
  it("renders button correctly", () => {
    render(<SubmitButtonWrapper userSelectedOption={1} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toHaveClass(
      "w-full h-14 font-medium text-on-primary disabled:text-on-surface bg-primary hover:bg-[#90BFEE] active:bg-[#90BFEE] disabled:bg-on-surface/10 rounded-2xl cursor-pointer disabled:cursor-not-allowed transition-colors"
    );
    expect(submitButton).toBeEnabled();
  });

  it("disables button when no option is selected", () => {
    render(<SubmitButtonWrapper userSelectedOption={-1} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });
});
