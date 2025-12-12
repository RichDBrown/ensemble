import { render, screen } from "@testing-library/react";
import CompleteButton from "./complete-button";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("CompleteButton", () => {
  beforeEach(() => render(<CompleteButton slug="1234" />));

  it("renders button correctly", () => {
    const button = screen.getByRole("button", { name: "Complete" });
    expect(button).toHaveClass(
      "w-full h-14 font-medium text-on-primary bg-primary hover:bg-[#AFCFFB] active:bg-[#AFCFFB] rounded-2xl cursor-pointer transition-colors"
    );
  });
});
