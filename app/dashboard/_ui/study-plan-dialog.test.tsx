import { render, screen, waitFor } from "@testing-library/react";
import StudyPlanDialog from "./study-plan-dialog";
import { useState } from "react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { createClient } from "@/app/_utils/supabase/browser-client";

jest.mock("@/app/_utils/supabase/browser-client");

function StudyPlanDialogWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  return (
    <StudyPlanDialog
      setIsDialogOpen={setIsDialogOpen}
      setRefreshKey={setRefreshKey}
    />
  );
}

describe("StudyPlanDialog", () => {
  let user: UserEvent;
  beforeAll(() => (user = userEvent.setup()));

  beforeEach(() => render(<StudyPlanDialogWrapper />));

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

  it("renders form correctly", () => {
    const form = screen.getByRole("form", { name: "Study plan form" });
    expect(form).toHaveClass("flex flex-col");
  });

  it("renders subject label correctly", () => {
    const subjectLabel = screen.getByText("Subject");
    expect(subjectLabel).toHaveClass(
      "ml-1 text-xs font-medium text-on-surface-variant"
    );
  });

  it("renders subject input correctly", () => {
    const subjectInput = screen.getByPlaceholderText(
      "What are you studying for?"
    );
    expect(subjectInput).toHaveClass(
      "appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect(subjectInput).toHaveAttribute("name", "subject");
    expect(subjectInput).toHaveAttribute("required");
  });

  it("renders test date label correctly", () => {
    const testDateLabel = screen.getByText("Test date");
    expect(testDateLabel).toHaveClass(
      "mt-4 ml-1 text-xs font-medium text-on-surface-variant"
    );
  });

  it("renders test date input correctly", () => {
    const testDateInput = screen.getByText("Test date").nextElementSibling;
    expect(testDateInput).toHaveClass(
      "appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect(testDateInput).toHaveAttribute("name", "testDate");
    expect(testDateInput).toHaveAttribute("required");
    expect(testDateInput).toHaveAttribute("type", "date");
  });

  it("renders topics label correctly", () => {
    const topicsLabel = screen.getByText("Topics");
    expect(topicsLabel).toHaveClass(
      "mt-4 ml-1 text-xs font-medium text-on-surface-variant"
    );
  });

  it("renders topics textarea correctly", () => {
    const topicsTextArea = screen.getByPlaceholderText(
      "What topics are being tested? Be as specific as possible."
    );
    expect(topicsTextArea).toHaveClass(
      "appearance-none w-full mt-2 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
    );
    expect(topicsTextArea).toHaveAttribute("name", "topics");
    expect(topicsTextArea).toHaveAttribute("required");
    expect(topicsTextArea).toHaveAttribute("rows", "3");
  });

  it("renders buttons container correctly", () => {
    const buttonsContainer = screen.getByRole("button", {
      name: "Create",
    }).parentElement;
    expect(buttonsContainer).toHaveClass(
      "flex self-end items-center mt-5 gap-x-2"
    );
  });

  it("renders create button correctly", () => {
    const createButton = screen.getByRole("button", { name: "Create" });
    expect(createButton).toHaveClass(
      "h-12 px-4 text-sm font-medium text-primary cursor-pointer"
    );
  });

  it("renders cancel button correctly", () => {
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toHaveClass(
      "h-12 px-4 text-sm font-medium text-primary cursor-pointer"
    );
    expect(cancelButton).toHaveAttribute("type", "button");
  });

  it("shows error message if error occurs when creating study plan", async () => {
    const mockInsert = jest
      .fn()
      .mockResolvedValue({ error: "Error submitting data" });
    const mockFrom = jest.fn(() => ({ insert: mockInsert }));

    (createClient as jest.Mock).mockReturnValue({
      from: mockFrom,
    });

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

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "An error has occurred please try again later."
      );
      expect(errorMessage).toHaveClass("self-center mt-6 text-sm text-error");
    });
  });
});
