import { useNavigate } from "react-router-dom";
import { hotelServiceFactory } from "../../services/hotel";
import { HotelSendType } from "../../types/HotelTypes";
import { makeFormData } from "../../utils/makeFormData";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";

const hotelService = hotelServiceFactory();

export const useAddHotel = () => {
    const navigate = useNavigate();
    const toastSetter = useToastStore((s) => s.setToastText);

    const addHotel = async (hotelData: HotelSendType) => {

            const formData = makeFormData({ ...hotelData });

            try {
                await hotelService.add(formData);
                navigate("/hotels");
            } catch (err) {
                const text = extractErrors(err as ErrorObj);
                toastSetter(text);
            }
    };

    return {
        addHotel,
    };
};
