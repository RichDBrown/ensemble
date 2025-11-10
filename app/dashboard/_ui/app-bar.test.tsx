import { render, screen } from "@testing-library/react";
import { act } from "react";
import AppBar from "./app-bar";

const mockGetUser = jest.fn().mockResolvedValue({
  data: { user: { user_metadata: { firstName: "Peter" } } },
});

jest.mock("@/app/_utils/supabase/browser-client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

describe("AppBar", () => {
  beforeEach(() =>
    act(() => {
      render(<AppBar />);
    })
  );

  it("renders app bar correctly", () => {
    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "grid grid-cols-3 items-center w-full pb-4.5 pt-10.5"
    );

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveClass("bg-surface-container");
  });

  it("renders app bar heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Study plans",
    });
    expect(heading).toHaveClass("justify-self-center text-xl");
  });

  it("renders profile icon correctly", () => {
    const profileIcon = screen.getByText("P");
    expect(profileIcon).toHaveClass(
      "flex justify-center items-center justify-self-end mr-3 w-8 h-8 text-xl text-on-tertiary rounded-full bg-tertiary"
    );
  });
});
