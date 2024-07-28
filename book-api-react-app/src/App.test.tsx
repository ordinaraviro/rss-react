import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("renders Main page on root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Something broke")).toBeInTheDocument();
  });

  it("renders CardDetails page on /details path", () => {
    render(
      <MemoryRouter initialEntries={["/details"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Something broke")).toBeInTheDocument();
  });

  it("renders Page404 on unknown path", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
