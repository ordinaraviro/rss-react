import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loader } from "./Loader";

describe("Loading", () => {
  it('Loading is displayed', async () => {
    render(
        <Loader />
    );

    await waitFor(() =>
      expect(screen.getByText("Loading")).toBeInTheDocument(),
    );
  });
});
