"use client";

import { useEffect, useState } from "react";
import AppBar from "../_ui/app-bar";
import FAB from "./_ui/fab";
import StudyPlanDialog from "./_ui/study-plan-dialog";
import { useRouter } from "next/navigation";
import { createClient } from "../_utils/supabase/browser-client";
import StudyPlan from "./_ui/study-plan";
import { StudyPlan as StudyPlanType } from "./_utils/types";

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const [studyPlans, setStudyPlans] = useState<StudyPlanType[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isErrorFetchingStudyPlans, setIsErrorFetchingStudyPlans] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsErrorFetchingStudyPlans(false);

    async function fetchStudyPlans() {
      const supabase = createClient();

      //Redirect to sign-in if not authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/auth/signin");
        return;
      }

      const { data: study_plan, error } = await supabase
        .from("study_plans")
        .select("id,subject,test_date");
      if (error) {
        setIsLoading(false);
        setIsErrorFetchingStudyPlans(true);
        return;
      } else {
        const transformed =
          study_plan?.map((plan) => ({
            id: plan.id,
            subject: plan.subject,
            testDate: plan.test_date,
          })) || [];
        setStudyPlans(transformed);
        setIsLoading(false);
      }
    }

    fetchStudyPlans();
  }, [router, refreshKey]);

  return (
    <main className="flex flex-col items-center">
      <AppBar heading="Study plans" />
      {isLoading && (
        <div className="mt-[48vh] w-10 h-10 border-4 border-secondary-container border-t-primary rounded-full animate-spin" />
      )}
      {!isLoading && !isErrorFetchingStudyPlans && (
        <section className="flex flex-col gap-y-2 w-full pt-27 pb-4 px-4">
          {studyPlans.map((plan, index) => (
            <StudyPlan
              key={index}
              id={plan.id}
              subject={plan.subject}
              testDate={new Date(plan.testDate)}
            />
          ))}
        </section>
      )}
      {!isLoading && isErrorFetchingStudyPlans && (
        <section className="flex flex-col items-center w-full pt-[40vh] px-4">
          <h2 className="text-xl">Something unexpected happened</h2>
          <p className="mt-2 text-error">
            An error has occurred while trying to fetch your study plans.
          </p>
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="mt-6 px-6 h-14 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
          >
            Try again
          </button>
        </section>
      )}
      {isDialogOpen && (
        <StudyPlanDialog
          setIsDialogOpen={setIsDialogOpen}
          setRefreshKey={setRefreshKey}
        />
      )}
      <FAB setIsDialogOpen={setIsDialogOpen} />
    </main>
  );
}
