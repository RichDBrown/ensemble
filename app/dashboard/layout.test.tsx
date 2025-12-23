import { render, screen } from "@testing-library/react";
import DashboardLayout from "./layout";

describe("DashboardLayout", () => {
  beforeEach(() => render(<DashboardLayout />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col items-center");
  });
});
