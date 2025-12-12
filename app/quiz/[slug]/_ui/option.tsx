import { Dispatch, JSX, SetStateAction } from "react";
import CheckmarkPrimary from "@/public/checkmark-primary.svg";
import Image from "next/image";
import CheckmarkTertiary from "@/public/checkmark-tertiary.svg";
import Error from "@/public/error.svg";

type OptionProps = {
  name: string;
  selectedOption: number;
  setSelectedOption: Dispatch<SetStateAction<number>>;
  optionIndex: number;
  isSubmitted: boolean;
  correctAnswer: number;
};

export default function Option({
  name,
  selectedOption,
  setSelectedOption,
  optionIndex,
  isSubmitted,
  correctAnswer,
}: OptionProps) {
  function getBorderColor(): string {
    if (!isSubmitted && selectedOption === optionIndex) {
      return "border-primary";
    } else if (isSubmitted && optionIndex === correctAnswer) {
      return "border-tertiary";
    } else if (
      isSubmitted &&
      selectedOption === optionIndex &&
      selectedOption !== correctAnswer
    ) {
      return "border-error";
    } else {
      return "border-outline";
    }
  }

  function getTrailingIcon(): JSX.Element {
    if (!isSubmitted && selectedOption === optionIndex) {
      return (
        <Image
          src={CheckmarkPrimary}
          alt="Selected."
          className="w-5 h-auto"
          unoptimized={true}
        />
      );
    } else if (isSubmitted && optionIndex === correctAnswer) {
      return (
        <Image
          src={CheckmarkTertiary}
          alt="Correct answer."
          className="w-5 h-auto"
          unoptimized={true}
        />
      );
    } else if (
      isSubmitted &&
      selectedOption === optionIndex &&
      selectedOption !== correctAnswer
    ) {
      return (
        <Image
          src={Error}
          alt="Incorrect answer."
          className="w-5 h-auto"
          unoptimized={true}
        />
      );
    } else {
      return (
        <div className="h-5 w-5 border border-on-surface-variant rounded-full" />
      );
    }
  }

  return (
    <div
      role="radio"
      aria-checked={selectedOption === optionIndex}
      onClick={() => {
        if (!isSubmitted) setSelectedOption(optionIndex);
      }}
      className={`flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border ${getBorderColor()} rounded-sm ${
        isSubmitted ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <p>{name}</p>
      {getTrailingIcon()}
    </div>
  );
}
