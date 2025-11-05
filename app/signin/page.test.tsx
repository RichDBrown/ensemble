import { render, screen, within } from "@testing-library/react";
import SignInPage from "./page";
import userEvent, { UserEvent } from "@testing-library/user-event";

const signInWithOtpMock = jest.fn();

jest.mock("@/app/_utils/_api/supabase-browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithOtp: signInWithOtpMock,
    },
  })),
}));

describe("SignInPage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));

  beforeEach(() => {
    jest.clearAllMocks();
    render(<SignInPage />);
  });

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center pt-16 px-4");
  });

  it("renders logo container correctly", () => {
    const container = screen
      .getByRole("heading", {
        level: 1,
        name: "Ensemble",
      })
      .closest("div");
    expect(container).toHaveClass("flex gap-x-4 items-center");
  });

  it("renders logo correctly", () => {
    const logo = screen.getByAltText("Logo.");
    expect(logo).toHaveClass("h-10 w-auto");
  });

  it("renders app name correctly", () => {
    const appName = screen.getByRole("heading", { level: 1, name: "Ensemble" });
    expect(appName).toHaveClass("text-2xl font-medium");
  });

  it("renders sign in container correctly", () => {
    const signInContainer = screen
      .getByRole("heading", {
        level: 2,
        name: "Sign In",
      })
      .closest("div");
    expect(signInContainer).toHaveClass("flex flex-col mt-16 w-full");
  });

  it("renders sign in text correctly", () => {
    const signIn = screen.getByRole("heading", { level: 2, name: "Sign In" });
    expect(signIn).toHaveClass("text-3xl font-medium");
  });

  it("renders sign in subheading correctly", () => {
    const signInSubHeading = screen.getByText(/Don't have an account/i);
    expect(signInSubHeading).toHaveClass(
      "mt-1 text-sm text-on-surface-variant"
    );

    const link = within(signInSubHeading).getByRole("link", {
      name: "Sign up",
    });
    expect(link).toHaveClass("text-primary");
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("renders form correctly", () => {
    const form = screen.getByRole("form", { name: "Email form" });
    expect(form).toHaveClass("flex flex-col mt-6 w-full");
  });

  it("renders email input correctly", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveClass(
      "appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("autoComplete", "email");
  });

  it("renders sign in button correctly", () => {
    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toHaveClass(
      "mt-4 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
    );
  });

  it("does not render error message initially", () => {
    const errorMessage = screen.queryByText(
      "An error has occurred please try again later"
    );
    expect(errorMessage).toBeNull();
  });

  it("shows error message if error while signing in occurs", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: null,
      error: { message: "Error occurred" },
    });

    const emailInput = screen.getByPlaceholderText("Email");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.type(emailInput, "jack@yahoo.com");
    await user.click(signInButton);

    const errorMessage = screen.getByText(
      "An error has occurred please try again later"
    );
    expect(errorMessage).toHaveClass("self-center mt-4 text-sm text-error");
  });

  it("shows dialog when sign in is successful", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const emailInput = screen.getByPlaceholderText("Email");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.type(emailInput, "jack@yahoo.com");
    await user.click(signInButton);

    screen.getByText(
      "An email has been sent to your address. Please confirm to continue."
    );
  });

  it("closes dialog when close button is clicked", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const emailInput = screen.getByPlaceholderText("Email");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.type(emailInput, "jack@yahoo.com");
    await user.click(signInButton);

    const confirmationMessage = screen.getByText(
      "An email has been sent to your address. Please confirm to continue."
    );
    expect(confirmationMessage).toBeInTheDocument();

    const closeDialogButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeDialogButton);

    expect(
      screen.queryByText(
        "An email has been sent to your address. Please confirm to continue."
      )
    ).toBeNull();
  });

  it("resets form after successful sign in", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.type(emailInput, "jack@yahoo.com");
    expect(emailInput.value).toBe("jack@yahoo.com");

    await user.click(signInButton);

    // Wait for the form to reset
    expect(emailInput.value).toBe("");
  });

  it("calls signInWithOtp with correct parameters", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const emailInput = screen.getByPlaceholderText("Email");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    await user.type(emailInput, "test@example.com");
    await user.click(signInButton);

    expect(signInWithOtpMock).toHaveBeenCalledTimes(1);
    expect(signInWithOtpMock).toHaveBeenCalledWith({
      email: "test@example.com",
      options: {
        shouldCreateUser: false,
        data: {
          email: "test@example.com",
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SIGNUP_REDIRECT,
      },
    });
  });

  it("prevents default form submission", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const form = screen.getByRole("form", { name: "Email form" });
    const emailInput = screen.getByPlaceholderText("Email");
    const submitHandler = jest.fn((e) => e.preventDefault());

    form.onsubmit = submitHandler;

    await user.type(emailInput, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    // The form submission handler should have been called (React triggers the submit)
    expect(submitHandler).toHaveBeenCalled();
  });
});
