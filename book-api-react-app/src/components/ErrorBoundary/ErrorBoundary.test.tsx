import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const ProblematicComponent = () => {
  throw new Error("Test error");
  return <div>Should not render</div>;
};

describe("ErrorBoundary", () => {
  it("catches errors and displays fallback UI", () => {

    // Suppress React error boundary logging to avoid noise in the console
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something broke")).toBeInTheDocument();

    // Restore console.error after test
    consoleError.mockRestore();
  });
});
