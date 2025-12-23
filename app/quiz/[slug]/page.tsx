"use client";

import { use, useEffect, useState } from "react";
import AppBar from "./_ui/app-bar";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_utils/supabase/browser-client";
import { generateQuestions } from "./_server-actions/actions";
import { GeneratedQuestion, Question } from "./_utils/types";
import Questions from "./_ui/questions";
import Results from "./_ui/results";
import NextButton from "./_ui/next-button";
import SubmitButton from "./_ui/submit-button";
import CompleteButton from "./_ui/complete-button";
import TryAgainButton from "./_ui/try-again-button";

type QuizPageProps = {
  params: Promise<{ slug: string }>;
};

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrorFetchingData, setIsErrorFetchingData] =
    useState<Boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  function calculateScore(): number {
    let totalCorrect = 0;
    const totalQuestions = questions.length;
    questions.forEach((question) => {
      if (question.answeredCorrectly) totalCorrect++;
    });
    return Math.round((totalCorrect / totalQuestions) * 100);
  }

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

      loadQuestions();
    }

    async function loadQuestions() {
      const { data: quiz, error } = await supabase
        .from("quizzes")
        .select("quiz_title,description,is_first_load")
        .eq("id", slug)
        .single();
      if (error) {
        setIsLoading(false);
        setIsErrorFetchingData(true);
        return;
      } else {
        setTitle(quiz.quiz_title);
        if (quiz.is_first_load) {
          try {
            const questionsJSON = await generateQuestions(
              quiz.quiz_title,
              quiz.description
            );
            const questions = JSON.parse(questionsJSON!) as GeneratedQuestion[];
            await uploadQuestions(questions);
            await fetchQuestions();
          } catch {
            setIsLoading(false);
            setIsErrorFetchingData(true);
          }
        } else {
          await fetchQuestions();
        }
      }
    }

    async function fetchQuestions() {
      const { data: questions, error } = await supabase
        .from("questions")
        .select("question,options,correct_answer")
        .eq("quiz_id", slug);
      if (error) {
        setIsLoading(false);
        setIsErrorFetchingData(true);
      } else {
        const questionsSet: Question[] = questions.map((question) => ({
          ...question,
          answeredCorrectly: false,
        }));
        setQuestions(questionsSet);
        setIsLoading(false);
      }
    }

    async function uploadQuestions(questions: GeneratedQuestion[]) {
      for (const question of questions) {
        const { error } = await supabase.from("questions").insert([
          {
            quiz_id: slug,
            question: question.question,
            options: question.options,
            correct_answer: question.correct_answer,
          },
        ]);
        if (error) {
          setIsLoading(false);
          setIsErrorFetchingData(true);
          return;
        }
      }
      await supabase
        .from("quizzes")
        .update({ is_first_load: false })
        .eq("id", slug);
    }

    fetchData();
  }, [router, refreshKey]);

  return (
    <>
      <AppBar title={title} />
      {isLoading && (
        <div className="mt-[48vh] w-10 h-10 border-4 border-secondary-container border-t-primary rounded-full animate-spin" />
      )}
      {!isLoading && isErrorFetchingData && (
        <section className="flex flex-col items-center w-full pt-[40vh]">
          <h2 className="text-xl">Something unexpected happened</h2>
          <p className="mt-2 text-center text-error">
            An error has occurred while trying to fetch your questions.
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
        <>
          {!isQuizFinished ? (
            <Questions
              currentIndex={currentIndex}
              questions={questions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isSubmitted={isSubmitted}
            />
          ) : (
            <Results grade={calculateScore()} />
          )}
          <div className="fixed bottom-4 w-full z-10 px-4">
            {!isSubmitted && !isQuizFinished && (
              <SubmitButton
                selectedOption={selectedOption}
                setIsSubmitted={setIsSubmitted}
                questions={questions}
                currentIndex={currentIndex}
              />
            )}
            {isSubmitted && !isQuizFinished && (
              <NextButton
                currentIndex={currentIndex}
                questions={questions}
                setIsQuizFinished={setIsQuizFinished}
                setCurrentIndex={setCurrentIndex}
                setIsSubmitted={setIsSubmitted}
                setSelectedOption={setSelectedOption}
              />
            )}
            {isQuizFinished && calculateScore() >= 80 && (
              <CompleteButton slug={slug} />
            )}
            {isQuizFinished && calculateScore() < 80 && (
              <TryAgainButton
                setSelectedOption={setSelectedOption}
                setCurrentIndex={setCurrentIndex}
                setIsSubmitted={setIsSubmitted}
                setIsQuizFinished={setIsQuizFinished}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
