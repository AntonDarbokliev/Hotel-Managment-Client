import { useEffect, useState } from "react";
import { hotelServiceFactory } from "../../services/hotel";
import { Hotel } from "../../types/HotelTypes";
import { useLoading } from "../useLoading";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";

const hotelService = hotelServiceFactory();

export const useHotels = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const { isLoading, requestWithLoading } = useLoading();
    const toastSetter = useToastStore(s => s.setToastText)

    useEffect(() => {
        requestWithLoading(() => hotelService.getAll().then((data) => setHotels(data)))
        .catch(err => {
            const errorTxt = extractErrors(err as ErrorObj)
            toastSetter(errorTxt)
        });
    }, []);

    return {
        hotels,
        isLoading
    }
};
