import { Dispatch, SetStateAction } from "react";

type TryAgainButtonProps = {
  setSelectedOption: Dispatch<SetStateAction<number>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setIsQuizFinished: Dispatch<SetStateAction<boolean>>;
};

export default function TryAgainButton({
  setSelectedOption,
  setCurrentIndex,
  setIsSubmitted,
  setIsQuizFinished,
}: TryAgainButtonProps) {
  return (
    <button
      onClick={() => {
        setSelectedOption(-1);
        setCurrentIndex(0);
        setIsSubmitted(false);
        setIsQuizFinished(false);
      }}
      className="w-full h-14 font-medium text-on-primary bg-primary hover:bg-[#AFCFFB] active:bg-[#AFCFFB] rounded-2xl cursor-pointer transition-colors"
    >
      Try again
    </button>
  );
}
