import { getDaysBetween } from "@/app/_utils/date/dates";
import Image from "next/image";
import Link from "next/link";
import Lock from "@/public/lock.svg";

type QuizProps = {
  id: string;
  quizTitle: string;
  description: string;
  availableDate: Date;
  isComplete: boolean;
};

function getBorderColor(availableDate: Date, isComplete: boolean): string {
  if (getDaysBetween(new Date(), availableDate) === 0) {
    if (isComplete) {
      return "border-tertiary";
    } else {
      return "border-primary";
    }
  } else {
    return "border-outline-variant";
  }
}

export default function Quiz({
  id,
  quizTitle,
  description,
  availableDate,
  isComplete,
}: QuizProps) {
  return (
    <Link
      href={`/quiz/${id}`}
      onClick={(e) => {
        if (getDaysBetween(new Date(), availableDate) !== 0) e.preventDefault();
      }}
      className={`flex flex-col p-4 w-full bg-surface-container-low border ${getBorderColor(
        availableDate,
        isComplete
      )} rounded-lg ${
        getDaysBetween(new Date(), availableDate) !== 0 && "cursor-not-allowed"
      }`}
    >
      <div className="flex justify-between w-full gap-x-2">
        <h2>{quizTitle}</h2>
        {getDaysBetween(new Date(), availableDate) === 0 && (
          <p className={`${isComplete ? "text-tertiary" : "text-primary"}`}>
            {`${isComplete ? "Complete" : "Start"}`}
          </p>
        )}
        {getDaysBetween(new Date(), availableDate) !== 0 && (
          <Image
            src={Lock}
            alt="Quiz is locked."
            className="h-5 w-auto"
            priority={true}
            unoptimized={true}
          />
        )}
      </div>
      <p className="mt-4 text-sm text-on-surface-variant">{description}</p>
      {getDaysBetween(new Date(), availableDate) !== 0 && (
        <p className="self-center mt-6 text-xs font-medium text-on-surface-variant">{`Opens in ${getDaysBetween(
          new Date(),
          availableDate
        )} ${
          getDaysBetween(new Date(), availableDate) > 1 ? "days" : "day"
        }`}</p>
      )}
    </Link>
  );
}
