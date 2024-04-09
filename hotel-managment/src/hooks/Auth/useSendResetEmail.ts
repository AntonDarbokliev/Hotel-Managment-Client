import { authServiceFactory } from "../../services/auth";
import { useToastStore } from "../../stores/ToastStore";
import { ErrorObj } from "../../types/ErrorTypes";
import { extractErrors } from "../../utils/extractErrors";
import { makeFormData } from "../../utils/makeFormData";
import { useLoading } from "../useLoading";

const authService = authServiceFactory()

export const useSendResetEmail = () => {
    const { isLoading, requestWithLoading } = useLoading();
    const toastSetter = useToastStore(s => s.setToastText)

    const sendResetEmail = async (loginCode: string) => {
        try {
            const formData = makeFormData({loginCode})
            await requestWithLoading( () => authService.sendResetEmail(formData))
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj)
            toastSetter(errorTxt)
        }
    } 

    return {
        isLoading,
        sendResetEmail
    }
};
