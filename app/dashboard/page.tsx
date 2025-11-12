"use client";

import { useEffect, useState } from "react";
import AppBar from "./_ui/app-bar";
import FAB from "./_ui/fab";
import StudyPlanDialog from "./_ui/study-plan-dialog";
import { useRouter } from "next/navigation";
import { createClient } from "../_utils/supabase/browser-client";
import StudyPlan from "./_ui/study-plan";
import { StudyPlan as StudyPlanType } from "./_utils/type/study-plan";

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const [studyPlans, setStudyPlans] = useState<StudyPlanType[]>([]);
  const [isCreatingNewStudyPlan, setIsCreatingNewStudyPlan] =
    useState<boolean>(false);

  useEffect(() => {
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
        .from("study_plan")
        .select("id,subject,test_date");
      if (error) {
        console.error("Error fetching study plans:", error);
      } else {
        const transformed =
          study_plan?.map((plan) => ({
            id: plan.id,
            subject: plan.subject,
            testDate: plan.test_date,
          })) || [];
        setStudyPlans(transformed);
      }
    }

    fetchStudyPlans();
  }, [router, isCreatingNewStudyPlan]);

  return (
    <main className="flex flex-col items-center">
      <AppBar />
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
      {isDialogOpen && (
        <StudyPlanDialog
          setIsDialogOpen={setIsDialogOpen}
          setIsCreatingNewStudyPlan={setIsCreatingNewStudyPlan}
        />
      )}
      <FAB setIsDialogOpen={setIsDialogOpen} />
    </main>
  );
}
