import { Dispatch, SetStateAction } from "react";
import { Question } from "../_utils/types";

type SubmitButtonProps = {
  selectedOption: number;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  questions: Question[];
  currentIndex: number;
};

export default function SubmitButton({
  selectedOption,
  setIsSubmitted,
  questions,
  currentIndex,
}: SubmitButtonProps) {
  return (
    <button
      disabled={selectedOption === -1}
      onClick={() => {
        setIsSubmitted(true);
        if (selectedOption === questions[currentIndex].correct_answer)
          questions[currentIndex].answeredCorrectly = true;
      }}
      className="w-full h-14 font-medium text-on-primary disabled:text-on-surface bg-primary hover:bg-[#90BFEE] active:bg-[#90BFEE] disabled:bg-on-surface/10 rounded-2xl cursor-pointer disabled:cursor-not-allowed transition-colors"
    >
      Submit
    </button>
  );
}
