import { render, screen } from "@testing-library/react";
import Option from "./option";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

function DefaultOptionWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  return (
    <Option
      name="Au"
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      optionIndex={0}
      isSubmitted={false}
      correctAnswer={1}
    />
  );
}

function SelectedOptionWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  return (
    <Option
      name="Au"
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      optionIndex={0}
      isSubmitted={false}
      correctAnswer={1}
    />
  );
}

function CorrectOptionWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  return (
    <Option
      name="Au"
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      optionIndex={0}
      isSubmitted={true}
      correctAnswer={0}
    />
  );
}

function IncorrectOptionWrapper() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  return (
    <Option
      name="Au"
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      optionIndex={0}
      isSubmitted={true}
      correctAnswer={1}
    />
  );
}

describe("Option", () => {
  it("renders radio button correctly when not selected nor is the correct answer", () => {
    render(<DefaultOptionWrapper />);
    const radioButton = screen.getByRole("radio");
    expect(radioButton).toHaveClass(
      "flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border border-outline rounded-sm cursor-pointer"
    );
    expect(radioButton).toHaveAttribute("aria-checked", "false");
  });

  it("renders radio button name", () => {
    render(<DefaultOptionWrapper />);
    screen.getByText("Au");
  });

  it("renders trailing icon correctly when is not selected nor is the correct answer", () => {
    render(<DefaultOptionWrapper />);
    const trailingIcon = screen.getByRole("radio").lastElementChild;
    expect(trailingIcon).toHaveClass(
      "h-5 w-5 border border-on-surface-variant rounded-full"
    );
  });

  it("renders radio button correctly when selected but not submitted", () => {
    render(<SelectedOptionWrapper />);
    const radioButton = screen.getByRole("radio");
    expect(radioButton).toHaveClass(
      "flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border border-primary rounded-sm cursor-pointer"
    );
    expect(radioButton).toHaveAttribute("aria-checked", "true");
  });

  it("renders trailing icon correctly when selected but not submitted", () => {
    render(<SelectedOptionWrapper />);
    const trailingIcon = screen.getByAltText("Selected.");
    expect(trailingIcon).toHaveClass("w-5 h-auto");
  });

  it("renders radio button correctly when correct and is submitted", () => {
    render(<CorrectOptionWrapper />);
    const radioButton = screen.getByRole("radio");
    expect(radioButton).toHaveClass(
      "flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border border-tertiary rounded-sm cursor-not-allowed"
    );
    expect(radioButton).toHaveAttribute("aria-checked", "true");
  });

  it("renders trailing icon correctly when correct and is submitted", () => {
    render(<CorrectOptionWrapper />);
    const trailingIcon = screen.getByAltText("Correct answer.");
    expect(trailingIcon).toHaveClass("w-5 h-auto");
  });

  it("renders radio button correctly when selected, submitted, and incorrect", () => {
    render(<IncorrectOptionWrapper />);
    const radioButton = screen.getByRole("radio");
    expect(radioButton).toHaveClass(
      "flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border border-error rounded-sm cursor-not-allowed"
    );
    expect(radioButton).toHaveAttribute("aria-checked", "true");
  });

  it("renders trailing icon correctly when selected, submitted, and incorrect", () => {
    render(<IncorrectOptionWrapper />);
    const trailingIcon = screen.getByAltText("Incorrect answer.");
    expect(trailingIcon).toHaveClass("w-5 h-auto");
  });

  it("changes selected option when use clicks on radio button", async () => {
    const user = userEvent.setup();
    render(<DefaultOptionWrapper />);
    const radioButton = screen.getByRole("radio");
    await user.click(radioButton);
    expect(radioButton).toHaveClass(
      "flex justify-between items-center w-full gap-x-2 py-4 pl-4 pr-3.5 border border-primary rounded-sm cursor-pointer"
    );
  });
});
