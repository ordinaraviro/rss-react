import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const ProblematicComponent = () => {
  throw new Error("Test error");
  return <div>Should not render</div>;
};

describe("ErrorBoundary", () => {
  it("catches errors and displays fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something broke")).toBeInTheDocument();
  });
});