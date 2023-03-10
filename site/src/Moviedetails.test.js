import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  fetch.resetMocks();
});

// Reset the browser history after each test
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

test("that math works", async () => {
  expect(5 + 5).toBe(10);
});