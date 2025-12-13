import { render, screen } from "@testing-library/react";
import TryAgainButton from "./try-again-button";
import { useState } from "react";

function TryAgainButtonWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(19);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(true);

  return (
    <TryAgainButton
      setSelectedOption={setSelectedOption}
      setCurrentIndex={setCurrentIndex}
      setIsSubmitted={setIsSubmitted}
      setIsQuizFinished={setIsQuizFinished}
    />
  );
}

describe("TryAgainButton", () => {
  beforeEach(() => render(<TryAgainButtonWrapper />));

  it("renders button correctly", () => {
    const button = screen.getByRole("button", { name: "Try again" });
    expect(button).toHaveClass(
      "w-full h-14 font-medium text-on-primary bg-primary hover:bg-[#AFCFFB] active:bg-[#AFCFFB] rounded-2xl cursor-pointer transition-colors"
    );
  });
});
