import { render, screen } from "@testing-library/react";
import ConfirmEmailDialog from "./confirm-email-dialog";
import { useState } from "react";

function ConfirmEmailDialogWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  return <ConfirmEmailDialog setIsDialogOpen={setIsDialogOpen} />;
}

describe("ConfirmEmailDialog", () => {
  beforeEach(() => render(<ConfirmEmailDialogWrapper />));

  it("renders scrim correctly", () => {
    const scrim = screen.getByRole("dialog").parentElement;
    expect(scrim).toHaveClass(
      "fixed flex justify-center items-center z-20 px-4 top-0 w-full h-screen bg-scrim/32"
    );
  });

  it("renders dialog correctly", () => {
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass(
      "flex flex-col w-full px-6 pt-6 pb-5 bg-surface-container-high rounded-3xl"
    );
  });

  it("renders dialog heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Confirm email",
    });
    expect(heading).toHaveClass("text-2xl");
  });

  it("renders dialog description correctly", () => {
    const description = screen.getByText(
      "An email has been sent to your address. Please confirm to continue."
    );
    expect(description).toHaveClass("mt-4 text-sm text-on-surface-variant");
  });

  it("renders close button correctly", () => {
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveClass(
      "h-12 px-4 text-sm font-medium text-primary cursor-pointer"
    );
  });
});
