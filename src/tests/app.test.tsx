import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
