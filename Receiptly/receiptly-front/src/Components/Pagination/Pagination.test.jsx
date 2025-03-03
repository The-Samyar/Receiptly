import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import "@testing-library/jest-dom";

describe("Pagination Component", () => {
    test("does not render if there's only one page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={10} />);
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    test("renders correct number of pages when pages are fewer than 6", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={50} />);
        const pageButtons = screen.getAllByRole("button");
        expect(pageButtons.length).toBe(7); // 5 pages + prev + next
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    test("renders ellipsis when pages are greater than 6", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        expect(screen.getByText("...")).toBeInTheDocument();
    });

    test("previous button is disabled on first page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        expect(screen.getByTestId("Prev")).toBeDisabled();
    });

    test("next button is disabled on last page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        fireEvent.click(screen.getByText("10")); // Go to last page
        expect(screen.getByTestId("Next")).toBeDisabled();
    });

    test("clicking on a page number updates the active page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        fireEvent.click(screen.getByText("3"));
        expect(screen.getByText("3")).toHaveClass("activeItem");
    });

    test("clicking next moves to the next page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        fireEvent.click(screen.getByTestId("Next"));
        expect(screen.getByText("2")).toHaveClass("activeItem");
    });

    test("clicking previous moves to the previous page", () => {
        render(<Pagination numberOfItemsPerPage={10} numberOfItems={100} />);
        fireEvent.click(screen.getByText("3"));
        fireEvent.click(screen.getByTestId("Prev"));
        expect(screen.getByText("2")).toHaveClass("activeItem");
    });
});
