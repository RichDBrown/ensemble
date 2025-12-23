"use client";

import AppBar from "@/app/_ui/app-bar";
import { createClient } from "@/app/_utils/supabase/browser-client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { generateQuizzes } from "./_server-actions/actions";
import { getFormattedDate } from "@/app/_utils/date/dates";
import { GeneratedQuiz, Quiz as QuizType } from "./_utils/types";
import Quiz from "./_ui/quiz";

type StudyPlanPageProps = {
  params: Promise<{ slug: string }>;
};

export default function StudyPlanPage({ params }: StudyPlanPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [heading, setHeading] = useState<string>("");
  const [isErrorFetchingData, setIsErrorFetchingData] =
    useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<QuizType[]>();

  useEffect(() => {
    setIsErrorFetchingData(false);
    setIsLoading(true);
    const supabase = createClient();

    async function fetchData() {
      //Redirect to sign-in if not authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/auth/signin");
        return;
      }

      loadQuizzes();
    }

    async function loadQuizzes() {
      const { data: study_plan, error } = await supabase
        .from("study_plans")
        .select("subject,test_date,topics,is_first_load")
        .eq("id", slug)
        .single();
      if (error) {
        setIsLoading(false);
        setIsErrorFetchingData(true);
        return;
      } else {
        setHeading(study_plan.subject);
        if (study_plan.is_first_load) {
          try {
            const quizzesJSON = await generateQuizzes(
              study_plan.subject,
              study_plan.test_date,
              study_plan.topics,
              getFormattedDate(new Date())
            );
            const quizzes = JSON.parse(quizzesJSON!) as GeneratedQuiz[];
            await uploadQuizzes(quizzes);
            await fetchQuizzes();
          } catch {
            setIsLoading(false);
            setIsErrorFetchingData(true);
          }
        } else {
          await fetchQuizzes();
        }
      }
    }

    async function fetchQuizzes() {
      const { data: quizzes, error } = await supabase
        .from("quizzes")
        .select("id,quiz_title,description,available_date,is_complete")
        .eq("study_plan_id", slug);
      if (error) {
        setIsLoading(false);
        setIsErrorFetchingData(true);
      } else {
        const sorted = quizzes.sort(
          (a, b) =>
            new Date(a.available_date).getTime() -
            new Date(b.available_date).getTime()
        );
        setIsLoading(false);
        setQuizzes(sorted);
      }
    }

    async function uploadQuizzes(quizzes: GeneratedQuiz[]) {
      for (const quiz of quizzes) {
        const { error } = await supabase.from("quizzes").insert([
          {
            study_plan_id: slug,
            quiz_title: quiz.quiz_title,
            description: quiz.description,
            available_date: quiz.available_date,
          },
        ]);
        if (error) {
          setIsLoading(false);
          setIsErrorFetchingData(true);
          return;
        }
      }
      await supabase
        .from("study_plans")
        .update({ is_first_load: false })
        .eq("id", slug);
    }

    fetchData();
  }, [router, refreshKey]);

  return (
    <>
      <AppBar heading={heading} />
      {isLoading && (
        <div className="mt-[48vh] w-10 h-10 border-4 border-secondary-container border-t-primary rounded-full animate-spin" />
      )}
      {!isLoading && isErrorFetchingData && (
        <section className="flex flex-col items-center w-full pt-[40vh]">
          <h2 className="text-xl">Something unexpected happened</h2>
          <p className="mt-2 text-center text-error">
            An error has occurred while trying to fetch your quizzes.
          </p>
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="mt-6 px-6 h-14 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
          >
            Try again
          </button>
        </section>
      )}
      {!isLoading && !isErrorFetchingData && (
        <section className="flex flex-col gap-y-2 w-full pt-33 pb-4">
          {quizzes?.map((quiz, index) => (
            <Quiz
              key={index}
              id={quiz.id}
              quizTitle={quiz.quiz_title}
              description={quiz.description}
              availableDate={new Date(quiz.available_date)}
              isComplete={quiz.is_complete}
            />
          ))}
        </section>
      )}
    </>
  );
}
