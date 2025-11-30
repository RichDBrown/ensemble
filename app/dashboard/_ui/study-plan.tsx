import Image from "next/image";
import Clock from "@/public/clock.svg";
import { getDaysBetween } from "@/app/_utils/date/dates";
import { useId } from "react";
import Link from "next/link";

type StudyPlanProps = {
  id: string;
  subject: string;
  testDate: Date;
  progress: number;
};

export default function StudyPlan({
  id,
  subject,
  testDate,
  progress,
}: StudyPlanProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const progressId = useId();

  return (
    <Link
      href={`/study-plan/${id}`}
      className="flex flex-col w-full p-4 bg-surface-container-low rounded-xl shadow-sm"
    >
      <div className="flex justify-between items-center">
        <h2>{subject}</h2>
        <div className="flex items-center gap-x-2">
          <Image
            src={Clock}
            alt="Days left before test."
            className="w-5 h-auto"
            unoptimized={true}
          />
          <p className="text-sm text-on-surface-variant">{`${getDaysBetween(
            today,
            testDate
          )} Days left`}</p>
        </div>
      </div>
      <label
        htmlFor={progressId}
        className="mt-8 text-sm text-on-surface-variant"
      >
        Study progress
      </label>
      <progress max={100} value={progress} className="mt-1 w-full h-2" />
    </Link>
  );
}
