import { act, render, screen } from "@testing-library/react";
import QuizPage from "./page";
import userEvent, { UserEvent } from "@testing-library/user-event";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("@/app/quiz/[slug]/_server-actions/actions", () => ({
  generateQuizzes: jest.fn().mockResolvedValue(`
  [
    {
      "question": "What is the primary purpose of photosynthesis?",
      "options": ["To convert light energy into chemical energy", "To break down glucose for energy"],
      "correct_answer": 0
    },
    {
      "question": "Where do the light-dependent reactions of photosynthesis occur?",
      "options": ["Stroma", "Thylakoid membranes"],
      "correct_answer": 1
    },
    {
      "question": "Which molecule produced in the light-dependent reactions acts as an energy carrier?",
      "options": ["ATP", "Lactic acid"],
      "correct_answer": 0
    }
  ]`),
}));

const singleMock = jest.fn().mockResolvedValue({
  data: {
    quiz_title: "Biology Basics",
    description: "Intro to biology concepts",
    is_first_load: false,
  },
  error: null,
});

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: "123" } },
      }),
    },
    from: jest.fn((tableName) => {
      if (tableName === "questions") {
        return {
          select: jest.fn(() => ({
            eq: jest.fn(() =>
              Promise.resolve({
                data: [
                  {
                    question: "What is 2 + 2?",
                    options: ["3", "4", "5"],
                    correct_answer: 1,
                  },
                  {
                    question: "What is the capital of France?",
                    options: ["Berlin", "Paris", "Madrid"],
                    correct_answer: 1,
                  },
                ],
                error: null,
              })
            ),
          })),
        };
      }
      return {
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: singleMock,
          })),
          insert: jest.fn(),
          update: jest.fn(),
        })),
      };
    }),
  })),
}));

describe("QuizPage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));

  it("renders main correctly", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center px-4");
  });

  it("renders error message if fails to fetch data", async () => {
    singleMock.mockResolvedValueOnce({
      data: null,
      error: { message: "Database error occurred" },
    });

    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    const section = screen.getByRole("heading", {
      level: 2,
      name: "Something unexpected happened",
    }).parentElement;
    expect(section).toHaveClass("flex flex-col items-center w-full pt-[40vh]");

    const errorHeading = screen.getByRole("heading", {
      level: 2,
      name: "Something unexpected happened",
    });
    expect(errorHeading).toHaveClass("text-xl");

    const errorText = screen.getByText(
      "An error has occurred while trying to fetch your questions."
    );
    expect(errorText).toHaveClass("mt-2 text-center text-error");

    const retryButton = screen.getByRole("button", { name: "Try again" });
    expect(retryButton).toHaveClass(
      "mt-6 px-6 h-14 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
    );
  });

  it("renders questions", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    screen.getByRole("heading", {
      level: 2,
      name: "What is 2 + 2?",
    });
  });

  it("renders container for submit and next buttons correctly", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    const buttonContainer = screen.getByRole("button", {
      name: "Submit",
    }).parentElement;
    expect(buttonContainer).toHaveClass("fixed bottom-4 w-full z-10 px-4");
  });

  it("renders submit button by default", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });
    expect(submitButton).toBeDisabled();
  });

  it("renders next button after user submits an answer", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );
    const option1 = screen.getAllByRole("radio")[0];
    await user.click(option1);
    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });
    await user.click(submitButton);

    screen.getByRole("button", {
      name: "Next",
    });
  });

  it("renders the results after user finishes the quiz", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    await user.click(screen.getAllByRole("radio")[1]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    await user.click(screen.getAllByRole("radio")[1]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    screen.getByText("100%");
  });

  it("renders the complete button if user scores greater than or equal to 80%", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    await user.click(screen.getAllByRole("radio")[1]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    await user.click(screen.getAllByRole("radio")[1]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    screen.getByText("100%");
    screen.getByRole("button", { name: "Complete" });
  });

  it("renders the try again button if user scores below 80%", async () => {
    await act(async () =>
      render(<QuizPage params={Promise.resolve({ slug: "12345" })} />)
    );

    await user.click(screen.getAllByRole("radio")[0]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    await user.click(screen.getAllByRole("radio")[1]);
    await user.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: "Next",
      })
    );

    screen.getByText("50%");
    screen.getByRole("button", { name: "Try again" });
  });
});
