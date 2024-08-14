import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentSection from "../components/CommentSection/CommentSection";

// Mocking the data import
vi.mock("../data/data.json", () => ({
  default: {
    comments: [
      {
        id: 1,
        content: "This is a test comment",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: {
            png: "/avatar-1.png",
            webp: "/avatar-1.webp",
          },
          username: "testuser",
        },
      },
    ],
  },
}));

describe("CommentSection", () => {
  beforeEach(() => {
    render(<CommentSection />);
  });

  it("renders the component", () => {
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  it("displays correct username", () => {
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("displays correct score", () => {
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("displays correct creation time", () => {
    expect(screen.getByText("1 month ago")).toBeInTheDocument();
  });

  it("renders reply button", () => {
    expect(screen.getByText("Reply")).toBeInTheDocument();
  });

  it("renders avatar image", () => {
    const avatar = screen.getByAltText("testuser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/avatar-1.webp");
  });

  it("renders score buttons", () => {
    expect(screen.getByLabelText("Increase score")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrease score")).toBeInTheDocument();
  });

  it("increases score when plus button is clicked", () => {
    const plusButton = screen.getByLabelText("Increase score");
    fireEvent.click(plusButton);
    expect(screen.getByText("13")).toBeInTheDocument();
  });

  it("decreases score when minus button is clicked", () => {
    const minusButton = screen.getByLabelText("Decrease score");
    fireEvent.click(minusButton);
    expect(screen.getByText("11")).toBeInTheDocument();
  });

  it("does not decrease score below 0", () => {
    const minusButton = screen.getByLabelText("Decrease score");
    for (let i = 0; i < 15; i++) {
      fireEvent.click(minusButton);
    }
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the comment in the correct layout", () => {
    const commentElement = screen
      .getByText("This is a test comment")
      .closest(".comment-section__comment");
    expect(commentElement).toHaveClass("comment-section__comment");

    const headerElement = commentElement?.querySelector(
      ".comment-section__header",
    );
    expect(headerElement).toBeInTheDocument();

    const contentElement = commentElement?.querySelector(
      ".comment-section__content",
    );
    expect(contentElement).toBeInTheDocument();

    const footerElement = commentElement?.querySelector(
      ".comment-section__footer",
    );
    expect(footerElement).toBeInTheDocument();
  });
});
