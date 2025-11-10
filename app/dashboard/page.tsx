"use client";

import { useEffect, useState } from "react";
import AppBar from "./_ui/app-bar";
import FAB from "./_ui/fab";
import StudyPlanDialog from "./_ui/study-plan-dialog";
import { useRouter } from "next/navigation";
import { createClient } from "../_utils/supabase/browser-client";

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/signin");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <main className="flex flex-col items-center">
      <AppBar />
      {isDialogOpen && <StudyPlanDialog setIsDialogOpen={setIsDialogOpen} />}
      <FAB setIsDialogOpen={setIsDialogOpen} />
    </main>
  );
}
