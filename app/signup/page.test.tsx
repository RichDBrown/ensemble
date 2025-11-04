import { render, screen, within } from "@testing-library/react";
import SignUpPage from "./page";
import userEvent, { UserEvent } from "@testing-library/user-event";

const signInWithOtpMock = jest.fn();

jest.mock("@/app/_utils/_api/supabase-browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithOtp: signInWithOtpMock,
    },
  })),
}));

describe("SignUpPage", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));

  beforeEach(() => {
    jest.clearAllMocks();
    render(<SignUpPage />);
  });

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center pt-16 px-4");
  });

  it("renders logo container container", () => {
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

  it("renders sign up container correctly", () => {
    const signUpContainer = screen
      .getByRole("heading", {
        level: 2,
        name: "Sign Up",
      })
      .closest("div");
    expect(signUpContainer).toHaveClass("flex flex-col mt-16 w-full");
  });

  it("renders sign up text correctly", () => {
    const signUp = screen.getByRole("heading", { level: 2, name: "Sign Up" });
    expect(signUp).toHaveClass("text-3xl font-medium");
  });

  it("renders sign up subheading correctly", () => {
    const signUpSubHeading = screen.getByText(/Already have an account/i);
    expect(signUpSubHeading).toHaveClass(
      "mt-1 text-sm text-on-surface-variant"
    );

    const link = within(signUpSubHeading).getByRole("link", {
      name: "Sign in",
    });
    expect(link).toHaveClass("text-primary");
  });

  it("renders form correctly", () => {
    const form = screen.getByRole("form", { name: "Email form" });
    expect(form).toHaveClass("flex flex-col mt-6 w-full");
  });

  it("renders first name input correctly", () => {
    const firstNameInput = screen.getByPlaceholderText("First name");
    expect(firstNameInput).toHaveClass(
      "appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect;
    expect(firstNameInput).toHaveAttribute("name", "firstName");
    expect(firstNameInput).toHaveAttribute("required");
  });

  it("renders email input correctly", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveClass(
      "appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect;
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("autoComplete", "email");
  });

  it("renders sign up button correctly", () => {
    const signUpButton = screen.getByRole("button", { name: "Sign up" });
    expect(signUpButton).toHaveClass(
      "mt-4 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
    );
  });

  it("shows error message if error while signing up occurs", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: null,
      error: { message: "Error occurred" },
    });

    const firstNameInput = screen.getByPlaceholderText("First name");
    const emailInput = screen.getByPlaceholderText("Email");
    const signUpButton = screen.getByRole("button", { name: "Sign up" });

    await user.type(firstNameInput, "Jack");
    await user.type(emailInput, "jack@yahoo.com");
    await user.click(signUpButton);

    const errorMessage = screen.getByText(
      "An error has occurred please try again later"
    );
    expect(errorMessage).toHaveClass("self-center mt-4 text-sm text-error");
  });

  it("shows model when sign up is successful", async () => {
    signInWithOtpMock.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const firstNameInput = screen.getByPlaceholderText("First name");
    const emailInput = screen.getByPlaceholderText("Email");
    const signUpButton = screen.getByRole("button", { name: "Sign up" });

    await user.type(firstNameInput, "Jack");
    await user.type(emailInput, "jack@yahoo.com");
    await user.click(signUpButton);

    screen.getByText(
      "An email has been sent to your address. Please confirm to continue."
    );

    const closeDialogButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeDialogButton);
    expect(
      screen.queryByText(
        "An email has been sent to your address. Please confirm to continue."
      )
    ).toBeNull();
  });
});
