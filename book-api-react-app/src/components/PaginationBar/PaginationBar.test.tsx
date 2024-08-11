import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationBar from "./PaginationBar";
import { vi } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";

// Mock the hooks from next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("PaginationBar", () => {
  const mockPush = vi.fn();
  const mockHandleClick = vi.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/test-path");
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1"),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to the previous page when 'Previous page' is clicked", () => {
    render(
      <ThemeProvider>
        <PaginationBar handleClick={mockHandleClick} />
      </ThemeProvider>,
    );

    const prevButton = screen.getByText(/← Previous page/i);
    fireEvent.click(prevButton);

    expect(mockHandleClick).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/test-path?page=1");
  });

  it("navigates to the next page when 'Next page' is clicked", () => {
    render(
      <ThemeProvider>
        <PaginationBar handleClick={mockHandleClick} />
      </ThemeProvider>,
    );

    const nextButton = screen.getByText(/Next page →/i);
    fireEvent.click(nextButton);

    expect(mockHandleClick).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/test-path?page=2");
  });
});
