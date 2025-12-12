import { act, render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "./page";
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

const getUserMock = jest.fn().mockResolvedValue({
  data: {
    user: {
      id: "1",
      user_metadata: {
        firstName: "Richie",
      },
    },
  },
});

const insertMock = jest.fn();

const selectMock = jest.fn().mockResolvedValue({
  data: [
    {
      id: "1",
      subject: "Math",
      test_date: "2025-11-13",
      quizzes: [{ is_complete: true }, { is_complete: false }],
    },
    {
      id: "2",
      subject: "Biology",
      test_date: "2025-12-01",
      quizzes: [{ is_complete: false }, { is_complete: false }],
    },
  ],
  error: null,
});

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: getUserMock,
    },
    from: jest.fn().mockReturnValue({ insert: insertMock, select: selectMock }),
  })),
}));

describe("DashboardPage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));

  it("renders main correctly", async () => {
    await act(async () => render(<DashboardPage />));
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center");
  });

  it("renders study plans section correctly", async () => {
    await act(async () => render(<DashboardPage />));
    const section = screen
      .getByRole("heading", {
        level: 2,
        name: "Math",
      })
      .closest("section");
    expect(section).toHaveClass("flex flex-col gap-y-2 w-full pt-27 pb-4 px-4");
  });

  it("opens dialog when user presses fab", async () => {
    await act(async () => render(<DashboardPage />));
    const fab = screen.getByRole("button", { name: "Create new study plan." });
    await user.click(fab);
    screen.getByPlaceholderText("What are you studying for?");
  });

  it("closes dialog when user successfully creates new study plan", async () => {
    insertMock.mockResolvedValue({ error: null });
    await act(async () => render(<DashboardPage />));

    const fab = screen.getByRole("button", { name: "Create new study plan." });
    await user.click(fab);

    const subjectInput = screen.getByPlaceholderText(
      "What are you studying for?"
    );
    const testDateInput = screen.getByText("Test date").nextElementSibling;
    const topicsTextArea = screen.getByPlaceholderText(
      "What topics are being tested? Be as specific as possible."
    );
    const createButton = screen.getByRole("button", { name: "Create" });

    await user.type(subjectInput, "Calculus");
    await user.type(testDateInput!, "2025-12-07");
    await user.type(topicsTextArea, "Derivatives and integrals.");
    await user.click(createButton);

    expect(insertMock).toHaveBeenCalledWith([
      {
        subject: "Calculus",
        test_date: "2025-12-07",
        topics: "Derivatives and integrals.",
      },
    ]);

    expect(
      screen.queryByPlaceholderText("What are you studying for?")
    ).toBeNull();
  });

  it("renders error message if error occurs when fetching study plans", async () => {
    selectMock.mockResolvedValueOnce({
      data: null,
      error: "Error fetching data",
    });
    await act(async () => render(<DashboardPage />));

    const errorHeading = screen.getByRole("heading", {
      level: 2,
      name: "Something unexpected happened",
    });
    expect(errorHeading).toHaveClass("text-xl");
    const errorMessage = screen.getByText(
      "An error has occurred while trying to fetch your study plans."
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
    expect(section).toHaveClass(
      "flex flex-col items-center w-full pt-[40vh] px-4"
    );
  });
});
