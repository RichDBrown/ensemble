import { render, screen, within } from "@testing-library/react";
import LandingPage from "./page";

describe("LandingPage", () => {
  beforeEach(() => render(<LandingPage />));

  it("renders main correctly", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass("flex flex-col gap-y-21 pt-16 px-4");
  });

  it("renders sections correctly", () => {
    const section = screen
      .getByRole("heading", {
        level: 2,
        name: "Never Cram Again",
      })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
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

  it("renders never cram again heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Never Cram Again",
    });
    expect(heading).toHaveClass("mt-16 text-3xl font-medium");
  });

  it("renders a smarter way to study subheading correctly", () => {
    const subheading = screen.getByText(
      "A smarter way to study, built on learning science, not last-minute stress."
    );
    expect(subheading).toHaveClass("mt-4 text-center text-on-surface-variant");
  });

  it("renders get started link correctly", () => {
    const getStartedLink = screen.getByRole("link", {
      name: "Get started",
    });

    expect(getStartedLink).toHaveClass(
      "flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
    );

    expect(getStartedLink).toHaveAttribute("href", "/dashboard");
  });

  it("renders the problems students face section correctly", () => {
    const section = screen
      .getByRole("heading", {
        level: 2,
        name: "The Problems Students Face",
      })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders the problems students face heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "The Problems Students Face",
    });
    expect(heading).toHaveClass("text-center text-3xl font-medium");
  });

  it("renders you've been here before container correctly", () => {
    const container = screen.getByText(
      "You've been here before:"
    ).parentElement;
    expect(container).toHaveClass(
      "flex flex-col w-full gap-y-4 p-6 mt-6 border border-outline-variant rounded-xl"
    );
  });

  it("renders you've been here before text correctly", () => {
    const text = screen.getByText("You've been here before:");
    expect(text).toHaveClass("text-xl");
  });

  it("renders unordered list correctly", () => {
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("list-disc list-inside text-on-surface-variant");
    const listItems = within(ul).getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent(
      "You understand the material until exam week"
    );
    expect(listItems[1]).toHaveTextContent(
      "You reread notes for hours, but nothing sticks"
    );
    expect(listItems[2]).toHaveTextContent(
      "You cram the night before and forget everything a week later"
    );
  });

  it("renders cramming feels productive in the moment text correctly", () => {
    const text = screen.getByText(
      "Cramming feels productive in the moment, but it does not lead to real learning."
    );
    expect(text).toHaveClass("font-medium");
  });

  it("renders the promise section correctly", () => {
    const section = screen
      .getByRole("heading", { level: 2, name: "The Promise" })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders the promise heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "The Promise",
    });
    expect(heading).toHaveClass("text-center text-3xl font-medium");
  });

  it("renders never cram again container correctly", () => {
    const container = screen.getAllByText("Never cram again.")[0].parentElement;
    expect(container).toHaveClass(
      "flex flex-col w-full gap-y-4 p-6 mt-6 border border-outline-variant rounded-xl"
    );
  });

  it("renders never cram again text correctly", () => {
    const text = screen.getAllByText("Never cram again.")[0];
    expect(text).toHaveClass("text-xl");
  });

  it("renders the promise description text correctly", () => {
    const text = screen.getByText(
      "Ensemble helps you study a little at a time, in the right order, and at the right moments. The result is stronger memory, better understanding, and far less stress."
    );
    expect(text).toHaveClass("text-on-surface-variant");
  });

  it("renders how it works section correctly", () => {
    const section = screen
      .getByRole("heading", { level: 2, name: "How It Works" })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders how it works heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "How It Works",
    });
    expect(heading).toHaveClass("text-center text-3xl font-medium");
  });

  it("renders enter your course info text correctly", () => {
    const text = screen.getByText("1. Enter your course info");
    expect(text).toHaveClass("self-start mt-6 text-xl");
  });

  it("renders add your subject, exam date, and topics text correctly", () => {
    const text = screen.getByText("Add your subject, exam date, and topics.");
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders get a smart study plan text correctly", () => {
    const text = screen.getByText("2. Get a smart study plan");
    expect(text).toHaveClass("self-start mt-4 text-xl");
  });

  it("renders ensemble generates a clear, day-by-day plan text correctly", () => {
    const text = screen.getByText(
      "Ensemble generates a clear, day-by-day plan that tells you exactly what to study and when."
    );
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders study smarter, not longer text correctly", () => {
    const text = screen.getByText("3. Study smarter, not longer");
    expect(text).toHaveClass("self-start mt-4 text-xl");
  });

  it("renders each session is short and focused text correctly", () => {
    const text = screen.getByText(
      "Each session is short and focused, helping you make steady progress without burnout."
    );
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders build my study plan link correctly", () => {
    const link = screen.getByRole("link", { name: "Build my study plan" });
    expect(link).toHaveClass(
      "flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
    );
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders how it works section correctly", () => {
    const section = screen
      .getByRole("heading", { level: 2, name: "Why It Works" })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders why it works heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Why It Works",
    });
    expect(heading).toHaveClass("text-center text-3xl font-medium");
  });

  it("renders spaced repetition text correctly", () => {
    const text = screen.getByText("🧠 Spaced repetition");
    expect(text).toHaveClass("self-start mt-6 text-xl");
  });

  it("renders you review material at carefully chosen intervals text correctly", () => {
    const text = screen.getByText(
      "You review material at carefully chosen intervals so it moves into long-term memory."
    );
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders chunking text correctly", () => {
    const text = screen.getByText("🧩 Chunking");
    expect(text).toHaveClass("self-start mt-4 text-xl");
  });

  it("renders large or complex topics are broken into smaller pieces text correctly", () => {
    const text = screen.getByText(
      "Large or complex topics are broken into smaller pieces that are easier to understand and master."
    );
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders interleaved practice text correctly", () => {
    const text = screen.getByText("🔀 Interleaved Practice");
    expect(text).toHaveClass("self-start mt-4 text-xl");
  });

  it("renders related topics are mixed together so you build deeper understanding text correctly", () => {
    const text = screen.getByText(
      "Related topics are mixed together so you build deeper understanding and perform better on exams."
    );
    expect(text).toHaveClass("self-start mt-2 text-on-surface-variant");
  });

  it("renders this approach is not a shortcut text correctly", () => {
    const text = screen.getByText(
      "This approach is not a shortcut. It reflects how the brain actually learns."
    );
    expect(text).toHaveClass("self-start mt-4 font-medium");
  });

  it("renders start studying the way your brain is designed to learn section correctly", () => {
    const section = screen
      .getByRole("heading", {
        level: 2,
        name: "Start Studying the Way Your Brain is Designed to Learn",
      })
      .closest("section");
    expect(section).toHaveClass("flex flex-col items-center w-full");
  });

  it("renders start studying the way your brain is designed to learn heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Start Studying the Way Your Brain is Designed to Learn",
    });
    expect(heading).toHaveClass("text-center text-3xl font-medium");
  });

  it("renders never cram again text correctly", () => {
    const text = screen.getAllByText("Never cram again.")[1];
    expect(text).toHaveClass("mt-4 text-xl text-on-surface-variant");
  });

  it("renders create my study plan link correctly", () => {
    const link = screen.getByRole("link", { name: "Create my study plan" });
    expect(link).toHaveClass(
      "flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
    );
    expect(link).toHaveAttribute("href", "/dashboard");
  });
});
