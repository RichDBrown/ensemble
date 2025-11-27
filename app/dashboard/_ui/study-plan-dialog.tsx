import { createClient } from "@/app/_utils/supabase/browser-client";
import { Dispatch, FormEvent, SetStateAction, useId, useState } from "react";

type StudyPlanDialogProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRefreshKey: Dispatch<SetStateAction<number>>;
};

export default function StudyPlanDialog({
  setIsDialogOpen,
  setRefreshKey,
}: StudyPlanDialogProps) {
  const subjectId = useId();
  const testDateId = useId();
  const topicsId = useId();
  const [isErrorCreatingStudyPlan, setIsErrorCreatingStudyPlan] =
    useState<boolean>(false);

  async function createStudyPlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)
      .value;
    const testDate = (form.elements.namedItem("testDate") as HTMLInputElement)
      .value;
    const topics = (form.elements.namedItem("topics") as HTMLTextAreaElement)
      .value;

    const supabase = createClient();
    const { error } = await supabase.from("study_plans").insert([
      {
        subject: subject,
        test_date: testDate,
        topics: topics,
      },
    ]);
    if (error) {
      setIsErrorCreatingStudyPlan(true);
    } else {
      setRefreshKey((prev) => prev + 1);
      setIsDialogOpen(false);
    }
  }

  return (
    <div className="fixed flex justify-center items-center z-20 px-4 top-0 w-full h-screen bg-scrim/32">
      <div
        role="dialog"
        className="flex flex-col w-full px-6 pt-6 pb-5 bg-surface-container-high rounded-3xl"
      >
        <form
          onSubmit={createStudyPlan}
          className="flex flex-col"
          aria-label="Study plan form"
        >
          <label
            htmlFor={subjectId}
            className="ml-1 text-xs font-medium text-on-surface-variant"
          >
            Subject
          </label>
          <input
            id={subjectId}
            name="subject"
            required
            placeholder="What are you studying for?"
            className="appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          <label
            htmlFor={testDateId}
            className="mt-4 ml-1 text-xs font-medium text-on-surface-variant"
          >
            Test date
          </label>
          <input
            id={testDateId}
            name="testDate"
            required
            type="date"
            className="appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          <label
            htmlFor={topicsId}
            className="mt-4 ml-1 text-xs font-medium text-on-surface-variant"
          >
            Topics
          </label>
          <textarea
            id={topicsId}
            name="topics"
            rows={3}
            required
            placeholder="What topics are being tested? Be as specific as possible."
            className="appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          {isErrorCreatingStudyPlan && (
            <p className="self-center mt-6 text-sm text-error">
              An error has occurred please try again later.
            </p>
          )}
          <div className="flex self-end items-center mt-5 gap-x-2">
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="h-12 px-4 text-sm font-medium text-primary cursor-pointer"
            >
              Cancel
            </button>
            <button className="h-12 px-4 text-sm font-medium text-primary cursor-pointer">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
