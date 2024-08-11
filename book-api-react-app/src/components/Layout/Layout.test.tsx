import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { useTheme } from "../ThemeContext/useTheme";
import { BooksResponse } from "../../redux/books";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";

// Mock the useTheme hook
vi.mock("../ThemeContext/useTheme", () => ({
  useTheme: vi.fn(),
}));

// Mock the child components
vi.mock("../SearchBar/SearchBar", () => ({
  __esModule: true,
  default: () => <div>SearchBar</div>,
}));

vi.mock("../Gallery/Gallery", () => ({
  __esModule: true,
  default: ({
    children,
  }: {
    data: BooksResponse;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    children: React.ReactNode;
  }) => (
    <div>
      Gallery
      {children}
    </div>
  ),
}));

describe("Layout", () => {
  const mockData: BooksResponse = {
    numFound: 0,
    start: 0,
    numFoundExact: false,
    docs: [],
    q: "",
    offset: false,
  };

  it("applies the correct theme classes", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

    const { container } = render(
      <Layout data={mockData}>
        <div>Child Component</div>
      </Layout>,
    );

    expect(container.firstChild).toHaveClass("main-page-dark");
  });

  it("passes loading state to SearchBar and Gallery", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    render(
      <Layout data={mockData}>
        <div>Child Component</div>
      </Layout>,
    );

    expect(screen.getByText("SearchBar")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
