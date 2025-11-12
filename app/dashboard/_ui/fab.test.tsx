import { render, screen } from "@testing-library/react";
import FAB from "./fab";
import { useState } from "react";

function FABWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return <FAB setIsDialogOpen={setIsDialogOpen} />;
}

describe("FAB", () => {
  beforeEach(() => render(<FABWrapper />));

  it("renders button correctly", () => {
    const button = screen.getByRole("button", {
      name: "Create new study plan.",
    });
    expect(button).toHaveClass(
      "fixed flex justify-center items-center bottom-4 right-4 z-10 w-14 h-14 rounded-2xl bg-primary-container cursor-pointer hover:bg-[#174875] active:bg-[#174875] transition-colors"
    );
  });

  it("renders add icon correctly", () => {
    const icon = screen.getByAltText("Create new study plan.");
    expect(icon).toHaveClass("w-3.5 h-3.5");
  });
});
