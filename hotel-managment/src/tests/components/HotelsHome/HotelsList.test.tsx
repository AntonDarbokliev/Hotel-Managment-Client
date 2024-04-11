import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { HotelsList } from "../../../components/HotelsHome/HotelsList/HotelsList";
import { BrowserRouter } from "react-router-dom";
import { Hotel } from "../../../types/HotelTypes";

describe("Hotels list page", () => {
    
    it("shows hotels", () => {
        const hotels: Hotel[] = [
            {
                address: "Test Address 1",
                email: "test@gmail.com",
                id: "123456789",
                name: "Test Hotel",
                profilePicture: "https://test",
            },
            {
                address: "Test Address 2",
                email: "test@gmail.com",
                id: "123456789",
                name: "Test Hotel",
                profilePicture: "https://test",
            },
        ];

        render(<HotelsList isLoading={false} hotels={hotels} />, { wrapper: BrowserRouter });

        expect(screen.getAllByRole("img")).toHaveLength(2);
    });

    it("doesn't show hotels when loading", () => {
        const hotels: Hotel[] = [
            {
                address: "Test Address 1",
                email: "test@gmail.com",
                id: "123456789",
                name: "Test Hotel",
                profilePicture: "https://test",
            },
            {
                address: "Test Address 2",
                email: "test@gmail.com",
                id: "123456789",
                name: "Test Hotel",
                profilePicture: "https://test",
            },
        ];

        render(<HotelsList isLoading={true} hotels={hotels} />);

        expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    it("doesn't show hotels when given no hotels ", () => {
        const hotels: Hotel[] = [];

        render(<HotelsList isLoading={false} hotels={hotels} />);

        expect(screen.queryAllByRole("img")).toHaveLength(0);
    });
});
