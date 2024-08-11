import { render, screen, fireEvent } from "@testing-library/react";
import CardDetails from "./CardDetails";
import { usePathname, useSearchParams } from "next/navigation";
import { describe, it, expect, vi } from "vitest";
import { mockData } from "../../../tests/mockData";

// Mock next/navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe("CardDetails", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/books/details");
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === "bookId") return "0";
        if (key === "page") return "1";
        if (key === "q") return "test";
        return null;
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders book details correctly", () => {
    render(<CardDetails data={mockData} />);

    expect(
      screen.getByText("Title: The lord of the rings"),
    ).toBeInTheDocument();
  });

  it("hides card details when the close button is clicked", () => {
    render(<CardDetails data={mockData} />);

    const closeButton = screen.getByText("Close details");
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("Title: The lord of the rings"),
    ).not.toBeInTheDocument();
  });
});
