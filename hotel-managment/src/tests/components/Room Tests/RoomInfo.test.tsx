import { render, screen, waitFor } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { RoomInfo } from "../../../components/RoomDetails/RoomInfo/RoomInfo";
import { BrowserRouter, createMemoryRouter } from "react-router-dom";
import { Room } from "../../../types/RoomType";
import userEvent from "@testing-library/user-event";

vi.mock("../../../services/room", () => ({
    roomServiceFactory: () => ({
        getSingle: vi.fn().mockImplementation((roomId: string) => {
            const room: Room = {
                floor: {
                    floorNumber: 1,
                    id: "1",
                },
                id: roomId,
                isBooked: true,
                isCleaned: true,
                roomExtras: [{ name: "Fridge", roomId: roomId }],
                roomNumber: 1,
            };

            return Promise.resolve({ room });
        }),
    }),
}));

describe("Room Info ", () => {
    beforeAll(() => {
        localStorage.setItem("token", "test");
    });

    beforeEach(() => {
        const router = createMemoryRouter(
            [
                {
                    path: "/room/1234567/info",
                    element: <RoomInfo />,
                },
            ],
            {
                initialEntries: ["/room/1234567/info"],
            }
        );

        expect(router.state.location.pathname).toEqual("/room/1234567/info");

        render(<RoomInfo />, { wrapper: BrowserRouter });
    });

    it("renders", async () => {
        await waitFor(() => {
            expect(screen.getByText(/Floor/i)).toBeInTheDocument();
            expect(screen.getByText(/Number/i)).toBeInTheDocument();
            expect(screen.getByText(/Status/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /add amenities/i })).toBeInTheDocument();
        });
    });

    it("shows correct info", async () => {
        await waitFor(() => {
            expect(screen.getByText(/Floor: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Number: 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Status: Occupied/i)).toBeInTheDocument();
            expect(screen.getByText(/Cleaned: Yes/i)).toBeInTheDocument();
        });
    });

    it("opens amenities modal", async () => {
        const user = userEvent.setup();
        await waitFor(() => {
            screen.getByRole("button", { name: /add amenities/i })
        });

        await user.click(screen.getByRole("button", { name: /add amenities/i }));

        await waitFor(() => {
            expect(screen.getByText('x')).toBeInTheDocument();

        });
    });

    it("shows amenities in modal", async () => {
        const user = userEvent.setup();
        await waitFor(() => {
            screen.getByRole("button", { name: /add amenities/i })
        });

        await user.click(screen.getByRole("button", { name: /add amenities/i }));

        await waitFor(() => {
            expect(screen.getAllByTestId('amenity-card')).toHaveLength(7);
            expect(screen.getAllByTestId('check')).toHaveLength(1);
            expect(screen.getByRole("button",{name: /save/i})).toBeInTheDocument();
        });
    });

    // it("opens edit modal", async () => {
    //     const user = userEvent.setup();
    //     await waitFor(() => {
    //         screen.getByTestId('edit-btn')
    //     });

    //     await user.click(screen.getByTestId('edit-btn'));

    //     await waitFor(() => {
    //         expect(screen.getByText('x')).toBeInTheDocument();
    //     });
    // });

//     it("shows correct info in edit modal", async () => {
//         const user = userEvent.setup();
//         await waitFor(() => {
//             screen.getByTestId('edit-btn')
//         });

//         await user.click(screen.getByTestId('edit-btn'));

//         await waitFor(() => {
//             expect(screen.getByText('x')).toBeInTheDocument();
//         });
//    expect( screen.getByRole("textbox", { name: /room number/i })).toHaveValue('1')


//     });
});


