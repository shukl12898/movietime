import React from "react";
import {
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Suggestions from "./pages/Suggestions";

// Mock the API response
const mockFetch = () =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/testposter.jpg",
            overview: "Test movie overview",
          },
        ],
      }),
  });

function render(ui, { route = "/suggestions/1", ...renderOptions } = {}) {
  window.history.pushState({}, "Test page", route);

  return rtlRender(ui, { wrapper: Router, ...renderOptions });
}

describe("Suggestions", () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders movie suggestions", async () => {
    render(
      <Routes>
        <Route path="/suggestions/:num" element={<Suggestions />} />
      </Routes>
    );

    await waitFor(() => expect(screen.getByText("These are the 1 movies that we suggest!")).toBeInTheDocument());

    // Wait for the movie information to be displayed
    await waitFor(() => expect(screen.getByText("Test Movie")).toBeInTheDocument());
    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test movie overview")).toBeInTheDocument();
  });

    test("handles unsuccessful fetch", async () => {
      // Mock a failed fetch with a non-200 status code
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      );

      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      render(
        <Routes>
          <Route path="/suggestions/:num" element={<Suggestions />} />
        </Routes>
      );

      await waitFor(() => expect(screen.getByText("These are the 0 movies that we suggest!")).toBeInTheDocument());

      // Check if the console.error was called with the appropriate error message
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching movies:",
        new Error("Network response was not ok")
      );

      // Clean up the consoleSpy mock
      consoleSpy.mockRestore();
    });






});





