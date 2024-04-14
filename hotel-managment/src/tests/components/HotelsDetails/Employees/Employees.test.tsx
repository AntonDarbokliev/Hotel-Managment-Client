import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Employees } from "../../../../components/HotelDetails/Employees/Employees";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

let lastMount: RenderResult;
describe("Employees page", () => {
    beforeAll(() => {
        localStorage.setItem(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZGEzMjc2NC00NDA5LTRkNmUtOTgzMi1mMzFlYTY4M2Y4MjAiLCJQcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4eGp5cWJ6dC9yYXcvYXV0aGVudGljYXRlZC9zLS1QX2k4QWZjci0tL3YxNzExNTY2NzMxL1Byb2ZpbGVQaWN0dXJlcy83MTdkYThmNC01N2ViLTQxOTEtODg3Yi03ZmY5NGJmZjI3ZjYucG5nIiwiRnVsbE5hbWUiOiJBbnRvbiBEYXJib2tsaWV2Iiwicm9sZSI6Ik93bmVyIiwibmJmIjoxNzEyODUxMDMwLCJleHAiOjE3MTI4NjE4MzAsImlhdCI6MTcxMjg1MTAzMCwiaXNzIjoibXlpc3N1ZXIiLCJhdWQiOiJteWF1ZGllbmNlIn0.2A27wbbW3TvumaWIduKbp2JjBxS_5T1jyuhTraPqKHw"
        );
    });

    beforeEach(() => {
        lastMount = render(<Employees />);
    });

    afterEach(() => {
        lastMount.unmount();
    });

    it("renders", () => {
        expect(screen.getByText("Employees")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    });

    it("opens add an employee modal", async () => {
        lastMount.unmount();
        const router = createMemoryRouter(
            [
                {
                    path: "/hotels/:id/employees",
                    element: <Employees />,
                },
            ],
            {
                initialEntries: ["/hotels/123456789/employees"],
            }
        );
        render(<RouterProvider router={router} />);
        const user = userEvent.setup();

        user.click(screen.getByText(/add/i));

        await waitFor(() => {
            screen.getByText(/x/i);
        });

        expect(screen.getByText(/x/i)).toBeInTheDocument();
        expect(screen.getByText(/salary/i)).toBeInTheDocument();
        expect(screen.getByText(/address/i)).toBeInTheDocument();
        expect(screen.getByText(/phoneNumber/i)).toBeInTheDocument();
    });
});
