import { useNavigate } from "react-router-dom";
import { hotelServiceFactory } from "../../services/hotel";
import { HotelSendType } from "../../types/HotelTypes";
import { makeFormData } from "../../utils/makeFormData";
import { extractErrors } from "../../utils/extractErrors";
import { ErrorObj } from "../../types/ErrorTypes";
import { useToastStore } from "../../stores/ToastStore";

const hotelService = hotelServiceFactory();

export const useAddHotel = (setIsImageValid: React.Dispatch<React.SetStateAction<boolean>>) => {
    const navigate = useNavigate();
    const toastSetter = useToastStore((s) => s.setToastText);

    const addHotel = async (hotelData: HotelSendType) => {

        if (hotelData.profilePicture && hotelData.address) {
            setIsImageValid(true);

            const formData = makeFormData({ ...hotelData });

            try {
                await hotelService.add(formData);
                navigate("/hotels");
            } catch (err) {
                const text = extractErrors(err as ErrorObj);
                toastSetter(text);
            }
        } else {
            setIsImageValid(false);
        }
    };

    return {
        addHotel,
    };
};
