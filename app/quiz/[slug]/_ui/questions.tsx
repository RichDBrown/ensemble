import { GeneratedQuestion } from "../_utils/types";
import Option from "../_ui/option";
import { Dispatch, SetStateAction } from "react";

type QuestionsProps = {
  currentIndex: number;
  questions: GeneratedQuestion[];
  selectedOption: number;
  setSelectedOption: Dispatch<SetStateAction<number>>;
  isSubmitted: boolean;
};

export default function Questions({
  currentIndex,
  questions,
  selectedOption,
  setSelectedOption,
  isSubmitted,
}: QuestionsProps) {
  return (
    <section className="flex flex-col w-full pt-33 pb-22">
      <p className="text-sm font-medium text-tertiary">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2 className="mt-4 text-xl">{questions[currentIndex].question}</h2>
      <div role="radiogroup" className="flex flex-col mt-8 gap-y-4 w-full">
        {questions[currentIndex].options.map((question, index) => (
          <Option
            key={index}
            name={question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            optionIndex={index}
            isSubmitted={isSubmitted}
            correctAnswer={questions[currentIndex].correct_answer}
          />
        ))}
      </div>
    </section>
  );
}
