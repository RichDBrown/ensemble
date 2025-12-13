import { Dispatch, SetStateAction } from "react";
import { GeneratedQuestion } from "../_utils/types";

type NextButtonProps = {
  currentIndex: number;
  questions: GeneratedQuestion[];
  setIsQuizFinished: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<number>>;
};

export default function NextButton({
  currentIndex,
  questions,
  setIsQuizFinished,
  setCurrentIndex,
  setIsSubmitted,
  setSelectedOption,
}: NextButtonProps) {
  return (
    <button
      onClick={() => {
        if (currentIndex === questions.length - 1) {
          setIsQuizFinished(true);
        } else {
          setCurrentIndex(currentIndex + 1);
          setIsSubmitted(false);
          setSelectedOption(-1);
        }
      }}
      className="w-full h-14 font-medium text-on-tertiary bg-tertiary hover:bg-[#C8B2D9] active:bg-[#C8B2D9] rounded-2xl cursor-pointer transition-colors"
    >
      Next
    </button>
  );
}
