import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { vi, describe, it, expect } from "vitest";

// Mock dynamic imports
vi.mock("./SortableNavigationItem", async () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="sortable-item">{children}</div>
    ),
  };
});

vi.mock("./Expander", async () => {
  return {
    default: ({ addPageHandler }: { addPageHandler(id: string): void }) => (
      <button onClick={() => addPageHandler("mock-id")} data-testid="expander">
        +
      </button>
    ),
  };
});

const mockPages = [
  { id: "page-1", title: "Page 1", icon: "" },
  { id: "page-2", title: "Page 2", icon: "" },
];

describe("Navigation", () => {
  it("renders initial pages", async () => {
    render(<Navigation pages={mockPages} />);

    expect(await screen.findByText("Page 1")).toBeInTheDocument();
    expect(screen.getByText("Page 2")).toBeInTheDocument();
    expect(screen.getByText("Add page")).toBeInTheDocument();
  });

  it("adds new page when 'Add page' button is clicked", async () => {
    render(<Navigation pages={mockPages} />);

    fireEvent.click(await screen.findByText("Add page"));

    // Now we expect to see a third "New Page"
    expect(screen.getAllByText("New Page").length).toBe(1);
  });

  it("adds page via expander button", () => {
    render(<Navigation pages={mockPages} />);

    const expanderButtons = screen.getAllByTestId("expander");
    fireEvent.click(expanderButtons[0]);

    expect(screen.getAllByText("New Page").length).toBe(1);
  });

  it("open settings context menu", async () => {
    render(<Navigation pages={mockPages} />);

    const page = await screen.findByText("Page 1");

    fireEvent.click(page);

    const openMenuBtn = await screen.findByLabelText("Open context menu");

    expect(openMenuBtn).toBeInTheDocument();

    fireEvent.click(openMenuBtn);

    expect(await screen.findByLabelText("Settings menu")).toBeInTheDocument();
  });
});
