import { render, screen } from "@testing-library/react";
import { act } from "react";
import StudyPlanPage from "./page";

const singleMock = jest.fn().mockResolvedValue({
  data: {
    subject: "Math",
    test_date: "2025-12-01",
    topics: ["Algebra", "Geometry"],
    is_first_load: false,
  },
  error: null,
});

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: () => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: {
            id: "1",
            user_metadata: { firstName: "Richie" },
          },
        },
      }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => {
          if (table === "study_plans") {
            return { single: singleMock };
          }
          if (table === "quizzes") {
            return {
              data: [
                {
                  id: 1,
                  quiz_title: "Sample Quiz 1",
                  description: "This is a sample quiz description 1.",
                  available_date: "2025-11-26",
                  is_complete: false,
                },
                {
                  id: 2,
                  quiz_title: "Sample Quiz 2",
                  description: "This is a sample quiz description 2.",
                  available_date: "2025-12-01",
                  is_complete: false,
                },
              ],
              error: null,
            };
          }
        },
      }),
    }),
  }),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("@/app/study-plan/[slug]/_server-actions/actions", () => ({
  generateQuizzes: jest.fn().mockResolvedValue(`
  [
    {
      "quiz_title": "Sample Quiz 1",
      "description": "This is a sample quiz description 1.",
      "available_date": "2025-11-26"
    },
    {
      "quiz_title": "Sample Quiz 2",
      "description": "This is a sample quiz description 2.",
      "available_date": "2025-12-01"
    },
    {
      "quiz_title": "Sample Quiz 3",
      "description": "This is a sample quiz description 3.",
      "available_date": "2025-12-08"
    }
  ]`),
}));

describe("StudyPlanPage", () => {
  it("renders main correctly", async () => {
    await act(async () =>
      render(<StudyPlanPage params={Promise.resolve({ slug: "12345" })} />)
    );
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center px-4");
  });

  it("renders error message if error occurs when fetching quizzes", async () => {
    singleMock.mockResolvedValueOnce({
      data: null,
      error: { message: "error fetching data" },
    });
    await act(async () =>
      render(<StudyPlanPage params={Promise.resolve({ slug: "12345" })} />)
    );
    const errorHeading = screen.getByRole("heading", {
      level: 2,
      name: "Something unexpected happened",
    });
    expect(errorHeading).toHaveClass("text-xl");
    const errorMessage = screen.getByText(
      "An error has occurred while trying to fetch your quizzes."
    );
    expect(errorMessage).toHaveClass("mt-2 text-center text-error");
    const tryAgainButton = screen.getByRole("button", { name: "Try again" });
    expect(tryAgainButton).toHaveClass(
      "mt-6 px-6 h-14 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
    );
    const section = screen.getByRole("heading", {
      level: 2,
      name: "Something unexpected happened",
    }).parentElement;
    expect(section).toHaveClass("flex flex-col items-center w-full pt-[40vh]");
  });

  it("renders quizzes section correctly", async () => {
    await act(async () =>
      render(<StudyPlanPage params={Promise.resolve({ slug: "12345" })} />)
    );
    const quizzesSection = screen.getByRole("main").lastElementChild;
    expect(quizzesSection).toHaveClass(
      "flex flex-col gap-y-2 w-full pt-33 pb-4"
    );
  });
});
