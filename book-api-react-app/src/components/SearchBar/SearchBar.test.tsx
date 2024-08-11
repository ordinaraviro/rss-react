import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("SearchBar", () => {
  const setLoading = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/test");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the SearchBar component", () => {
    render(
      <ThemeProvider>
        <SearchBar setLoading={setLoading} />
      </ThemeProvider>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });

  it("loads the stored search term from localStorage and updates the input value", () => {
    localStorage.setItem("searchTerm", "testTerm");
    render(
      <ThemeProvider>
        <SearchBar setLoading={setLoading} />
      </ThemeProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("testTerm");
  });

  it("calls router.push with the correct query on component mount if query does not match", () => {
    localStorage.setItem("searchTerm", "testTerm");
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("q=wrongTerm"),
    );

    render(
      <ThemeProvider>
        <SearchBar setLoading={setLoading} />
      </ThemeProvider>,
    );

    expect(mockPush).toHaveBeenCalledWith("/test?q=testTerm");
  });

  it("updates input value on change", () => {
    render(
      <ThemeProvider>
        <SearchBar setLoading={setLoading} />
      </ThemeProvider>,
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "newTerm" } });

    expect(input).toHaveValue("newTerm");
  });

  it("calls setLoading and router.push with the correct query on search", () => {
    render(
      <ThemeProvider>
        <SearchBar setLoading={setLoading} />
      </ThemeProvider>,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "newTerm" } });

    fireEvent.click(screen.getByText("Search"));

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(mockPush).toHaveBeenCalledWith("/test?q=newTerm");
    expect(localStorage.getItem("searchTerm")).toBe("newTerm");
  });
});
