import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import CreateNewList from "./CreateNewList";

describe("CreateNewList component", () => {
  it("renders without errors", () => {
    render(<CreateNewList />);
  });

  it("changes the input value on typing", () => {
    render(<CreateNewList />);
    const inputElement = screen.getByPlaceholderText("Watchlist Name");
    fireEvent.change(inputElement, { target: { value: "My New List" } });
    expect(inputElement.value).toBe("My New List");
  });

  it("submits the form on clicking the Done button", async () => {
    jest.spyOn(window.sessionStorage, "getItem").mockReturnValue("123");
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "success" }),
      })
    );

    render(<CreateNewList />);
    const inputElement = screen.getByPlaceholderText("Watchlist Name");
    fireEvent.change(inputElement, { target: { value: "My New List" } });
    const doneButton = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneButton);

    await act(async () => {
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith("userId");
      expect(global.fetch).toHaveBeenCalledWith("/api/newList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          watchListName: "My New List",
          forUser: "123",
          isPrivate: false,
        }),
      });
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(inputElement.value).toBe("");
    });
  });
});
