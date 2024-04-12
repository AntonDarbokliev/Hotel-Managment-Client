import { it, expect, describe, beforeEach } from "vitest";
import { ReceivedEmployee } from "../../../../types/ReceivedEmployee";
import { render, screen, waitFor } from "@testing-library/react";
import { EmployeeList } from "../../../../components/HotelDetails/Employees/EmployeeList/EmployeeList";
import userEvent from "@testing-library/user-event";


vi.mock("../../../../stores/EmployeeStore", () => ({
    useEmployeeStore: (passedFunction?: (data: object) => void) => {
        const data = {
            employees: [
                {
                    address: "Test Address",
                    egn: "123456789",
                    email: "test@gmail.com",
                    firstName: "FirstName test1",
                    middleName: "Test",
                    lastName: "Test",
                    hotelId: "134566789",
                    id: "1235667869",
                    isActive: true,
                    phoneNumber: "08896719554",
                    roles: ["Receptionist"],
                    salary: 1200,
                    salaryReports: [
                        {
                            date: new Date(),
                            id: "125125",
                            isPaid: true,
                            salary: 1200,
                        },
                    ],
                },
                {
                    address: "Test Address",
                    egn: "123456789",
                    email: "test@gmail.com",
                    firstName: "FirstName test2",
                    middleName: "Test2",
                    lastName: "Test2",
                    hotelId: "134566789",
                    id: "1235667869",
                    isActive: false,
                    phoneNumber: "08896719554",
                    roles: ["Accountant"],
                    salary: 1300,
                    salaryReports: [
                        {
                            date: new Date(),
                            id: "125125",
                            isPaid: true,
                            salary: 1300,
                        },
                    ],
                },
            ] as ReceivedEmployee[],
        };

        if (passedFunction) {
            return passedFunction(data);
        }
        return data;
    },
}));

vi.mock("../../../../hooks/Employees/useSingleEmployee", () =>( {

    useSingleEmployee: (employeeId:string) => {
        
        const employee = {
            address: "Test Address",
            egn: "123456789",
            email: "test@gmail.com",
            firstName: "FirstName test1",
            middleName: "Test",
            lastName: "Test",
            hotelId: "134566789",
            id: employeeId,
            isActive: true,
            phoneNumber: "08896719554",
            roles: ["Receptionist"],
            salary: 1200,
            salaryReports: [
                {
                    date: new Date(),
                    id: "125125",
                    isPaid: true,
                    salary: 1200,
                },
            ],
        };
        return {employee}
    }
 
}));

describe("Employees List page", () => {
    beforeAll(() => {
        localStorage.setItem(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZGEzMjc2NC00NDA5LTRkNmUtOTgzMi1mMzFlYTY4M2Y4MjAiLCJQcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4eGp5cWJ6dC9yYXcvYXV0aGVudGljYXRlZC9zLS1QX2k4QWZjci0tL3YxNzExNTY2NzMxL1Byb2ZpbGVQaWN0dXJlcy83MTdkYThmNC01N2ViLTQxOTEtODg3Yi03ZmY5NGJmZjI3ZjYucG5nIiwiRnVsbE5hbWUiOiJBbnRvbiBEYXJib2tsaWV2Iiwicm9sZSI6Ik93bmVyIiwibmJmIjoxNzEyOTA2NTUyLCJleHAiOjE3MTI5MTczNTIsImlhdCI6MTcxMjkwNjU1MiwiaXNzIjoibXlpc3N1ZXIiLCJhdWQiOiJteWF1ZGllbmNlIn0.r2KphLWSpvfm2SArcyhrEiX0FGOQECyffCagzdR2Vjk"
        );
    });

    beforeEach(() => {
        render(<EmployeeList />);
    });

    it("shows correct number of employees", async () => {
        await waitFor(() => {
            expect(screen.getAllByText(/FirstName/i)).toHaveLength(2);
        });
    });

    it("shows correct info about employees", () => {
        const employeeNames = screen.getAllByText(/FirstName*/i);
        const employeeActivity = screen.getAllByTestId("activity-circle");
        const employeeRoles = screen.getAllByTestId("roles");

        expect(employeeNames[0]).toHaveTextContent("FirstName test1");
        expect(employeeNames[1]).toHaveTextContent("FirstName test2");
        expect(employeeActivity[0]).toHaveClass(/active/i);
        expect(employeeActivity[1]).toHaveClass(/inactive/i);
        expect(employeeRoles[0]).toHaveTextContent(/receptionist/i);
        expect(employeeRoles[1]).toHaveTextContent(/accountant/i);
    });

    it("shows details modal when clicking on card", async () => {
        const employeeNames = screen.getAllByText(/FirstName*/i);
        const user = userEvent.setup();

        user.click(employeeNames[0]);

        await waitFor(() => {
            screen.getByText(/Details/i);
        });
        expect(screen.getByText(/Details/i)).toBeTruthy();
    });

    it("shows correct details info",async () => {

        const employeeNames = screen.getAllByText(/FirstName*/i);
        const user = userEvent.setup();

        user.click(employeeNames[0]);

        await waitFor(() => {
            screen.getByText(/test@gmail.com/i);
        });
        expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument()
        expect(screen.getByText(/Test Address/i)).toBeInTheDocument()
        expect(screen.getByText(/123456789/i)).toBeInTheDocument()
        expect(screen.getByText(/08896719554/i)).toBeInTheDocument()

    });
});
