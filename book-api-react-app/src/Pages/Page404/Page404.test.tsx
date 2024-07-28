import { render, screen } from "@testing-library/react";
import Page404 from "./Page404";
import { describe, expect, it } from "vitest";

describe("Page 404", () => {
  it("renders the 404 text", () => {
    render(<Page404 />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
