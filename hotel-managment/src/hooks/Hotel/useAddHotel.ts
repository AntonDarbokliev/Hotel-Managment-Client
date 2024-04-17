import { useNavigate } from "react-router-dom";
import { hotelServiceFactory } from "../../services/hotel";
import { HotelSendType } from "../../types/HotelTypes";
import { makeFormData } from "../../utils/makeFormData";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";
import { useLoading } from "../useLoading";

const hotelService = hotelServiceFactory();

export const useAddHotel = () => {
    const navigate = useNavigate();
    const toastSetter = useToastStore((s) => s.setToastText);
    const {isLoading,requestWithLoading} = useLoading()

    const addHotel = async (hotelData: HotelSendType) => {

            const formData = makeFormData({ ...hotelData });

            try {
                await requestWithLoading(() => hotelService.add(formData));
                navigate("/hotels");
                toastSetter('Added Hotel',true);

            } catch (err) {
                const text = extractErrors(err as ErrorObj);
                toastSetter(text);
            }
    };

    return {
        addHotel,
        isLoading
    };
};
