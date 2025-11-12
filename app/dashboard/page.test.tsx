import { act, render, screen } from "@testing-library/react";
import DashboardPage from "./page";
import userEvent, { UserEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const getUserMock = jest.fn().mockResolvedValue({
  data: { user: { user_metadata: { firstName: "Peter" } } },
});

const insertMock = jest.fn();
const selectMock = jest.fn().mockResolvedValue({
  data: [
    { id: "1", subject: "Math", test_date: "2025-11-13" },
    { id: "2", subject: "Biology", test_date: "2025-12-01" },
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
  beforeEach(() => render(<DashboardPage />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center");
  });

  it("renders section correctly", () => {
    const section = screen.getByRole("heading", {
      level: 1,
      name: "Study plans",
    }).parentElement?.nextElementSibling;

    expect(section).toHaveClass("flex flex-col gap-y-2 w-full pt-27 pb-4 px-4");
  });

  it("opens dialog when user presses fab", async () => {
    const fab = screen.getByRole("button", { name: "Create new study plan." });
    await user.click(fab);
    screen.getByPlaceholderText("What are you studying for?");
  });

  it("closes dialog when user successfully creates new study plan", async () => {
    insertMock.mockResolvedValue({ error: null });

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
});
