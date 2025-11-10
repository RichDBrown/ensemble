import { act, render, screen, waitFor } from "@testing-library/react";
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

const fromMock = jest.fn();

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: getUserMock,
    },
    from: fromMock,
  })),
}));

describe("DashboardPage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));
  beforeEach(() =>
    act(() => {
      render(<DashboardPage />);
    })
  );

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center");
  });

  it("opens dialog when user presses fab", async () => {
    const fab = screen.getByRole("button", { name: "Create new study plan." });
    await user.click(fab);
    screen.getByPlaceholderText("What are you studying for?");
  });

  it("closes dialog when user successfully creates new study plan", async () => {
    const insertMock = jest.fn().mockResolvedValue({ error: null });
    fromMock.mockReturnValue({ insert: insertMock });

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
