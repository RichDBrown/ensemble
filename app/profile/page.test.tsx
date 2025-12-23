import { act, render, screen } from "@testing-library/react";
import ProfilePage from "./page";
import userEvent, { UserEvent } from "@testing-library/user-event";

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { user_metadata: { firstName: "Peter" } } },
      }),
      signOut: jest.fn().mockResolvedValue({ error: "Error signing out" }),
    },
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("ProfilePage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));
  beforeEach(() => act(() => render(<ProfilePage />)));

  it("renders profile icon correctly", () => {
    const profileIcon = screen.getByText("P");
    expect(profileIcon).toHaveClass(
      "flex justify-center items-center h-30 w-30 text-6xl text-on-tertiary bg-tertiary rounded-full"
    );
  });

  it("renders log out button container correctly", () => {
    const container = screen.getByRole("button", {
      name: "Log out",
    }).parentElement;
    expect(container).toHaveClass("px-4 mt-12 w-full");
  });

  it("renders log out button correctly", () => {
    const logoutButton = screen.getByRole("button", { name: "Log out" });
    expect(logoutButton).toHaveClass(
      "w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
    );
  });

  it("renders error message if error occurs when signing out", async () => {
    const logoutButton = screen.getByRole("button", { name: "Log out" });
    await user.click(logoutButton);

    const errorMessage = screen.getByText(
      "An error has occurred please try again later."
    );
    expect(errorMessage).toHaveClass("self-center mt-4 text-sm text-error");
  });
});
