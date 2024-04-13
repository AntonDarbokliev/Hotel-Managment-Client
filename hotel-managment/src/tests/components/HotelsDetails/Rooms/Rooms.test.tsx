import { render, screen, waitFor } from "@testing-library/react";
import { it, expect, describe, beforeEach } from "vitest";
import { Rooms } from "../../../../components/HotelDetails/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Floor } from "../../../../types/FloorType";
import { Room } from "../../../../types/RoomType";

vi.mock("../../../../services/room", () => ({
    roomServiceFactory: () => ({        
  
        get: vi.fn().mockImplementationOnce((floorId: string) => {
            console.log('IN GET FUNC');

            const rooms: Room[] = [
                {
                    floor: {
                        floorNumber: 1,
                        id: "1",
                    },
                    id: "5126hrn1cm91h9",
                    isBooked: false,
                    isCleaned: false,
                    roomExtras: [],
                    roomNumber: 1,
                },

                {
                    floor: {
                        floorNumber: 1,
                        id: "1",
                    },
                    id: "5126hrn1cm91h9",
                    isBooked: true,
                    isCleaned: true,
                    roomExtras: [{ name: "Extra", roomId: "5126hrn1cm91h9" }],
                    roomNumber: 2,
                },
                {
                    floor: {
                        floorNumber: 2,
                        id: "2",
                    },
                    id: "5126hrn1cm91h9",
                    isBooked: true,
                    isCleaned: true,
                    roomExtras: [{ name: "Extra", roomId: "5126hrn1cm91h9" }],
                    roomNumber: 1,
                },
            ];

            return new Promise( (res) => res(rooms.filter(x => x.floor.id == floorId)))
            
        }),
    }),
}));



vi.mock("../../../../hooks/Floors/useFloors", () => ({
    useFloors: () => {
        const floors: Floor[] = [
            {
                floorNumber: 1,
                id: "1",
            },
            {
                floorNumber: 2,
                id: "2",
            },
            {
                floorNumber: 3,
                id: "3",
            },
        ];

        return {
            floors,
        };
    },
}));

describe("Rooms page ", () => {

    beforeEach(() => {
        render(<Rooms />, { wrapper: BrowserRouter });
    });

    it("renders", () => {
        expect(screen.getByRole("button", { name: /add a room/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add a floor/i })).toBeInTheDocument();
    });

    it("shows correct floors in dropdown", () => {
        expect(screen.getByRole("option", { name: /1/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /2/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /3/i })).toBeInTheDocument();
    });

    it("renders rooms when selecting a floor", async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole("option", { name: /1/i }));
        // await waitFor(() => {
        //     screen.getByRole("heading", { name: "1" })
        // })
        
        // expect(screen.getByRole("heading", { name: "1" })).toBeInTheDocument();
        // expect(screen.getByRole("heading", { name: "2" })).toBeInTheDocument();
    });

    it('opens add a floor modal', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: /add a floor/i }));

        await waitFor(() => {
            expect(screen.getByRole('button',{name: /yes/i})).toBeInTheDocument()
            expect(screen.getByRole('button',{name: /cancel/i})).toBeInTheDocument()
        })
    })

});
