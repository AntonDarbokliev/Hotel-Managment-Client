import { useNavigate } from "react-router-dom";
import { authServiceFactory } from "../../services/auth";
import { makeFormData } from "../../utils/makeFormData";
import { useToastStore } from "../../stores/ToastStore";
import { extractErrors } from "../../utils/extractErrors"
import { ErrorObj } from "../../types/ErrorTypes"
import { useAuthStore } from "../../stores/Auth";
import { useLoading } from "../useLoading";

const authService = authServiceFactory();

export const useChangeAuth = (change: "email" | "password") => {
    const navigate = useNavigate();
    const clearUser = useAuthStore((s) => s.clearUser);

    const setToast = useToastStore((s) => s.setToastText);

    const { isLoading, requestWithLoading } = useLoading();

    const resetPass = async (formValues: { [key: string]: string }) => {
        const formData = makeFormData(formValues);

        try {
            if (change == "password") {
                await requestWithLoading(() => authService.changePass(formData));

                clearUser();

                navigate("/login");
            } else if (change == "email") {
                await requestWithLoading(() => authService.changeEmail(formData));
            }
        } catch (error) {
            const errorTxt = extractErrors(error as ErrorObj)
            setToast(errorTxt);
        }
    };
    return {
        resetPass,
        isLoading,
    };
};
