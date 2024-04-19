import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { InputFieldType } from "../../../types/InputField";
import { Button } from "../../Shared/Button/Button";
import { InputFieldslist } from "../../Shared/InputFieldsList/InputFieldsList";
import { ConfirmEmail } from "../ConfirmEmail/ConfirmEmail";
import { useGeneralValidations } from "../../../hooks/Validations/useGeneralValidations";
import styles from "./ForgotPassword.module.scss";
import { useSendResetEmail } from "../../../hooks/Auth/useSendResetEmail";
import Spinner from "../../Shared/LoadSpinner/LoadSpinner";

export const ForgotPassword = () => {
    const [stage, setStage] = useState(1);

    const { formValues, onChangeHandler } = useForm(
        {
            loginCode: "",
        },
        () => {}
    );

    const { onBlurHandler, onFocusHandler, validationValues } = useFormValidation({
        loginCode: false,
    });
    const { isCodeValid } = useGeneralValidations(formValues, validationValues);

    const inputs = [
        { name: "loginCode", display: "Login Code", errorMessage: "Invalid Login code", type: "password", validation: !isCodeValid },
    ] as InputFieldType[];

    const { isLoading, sendResetEmail } = useSendResetEmail();

    const sendEmail = async () => {
        await sendResetEmail(formValues.loginCode);
        setStage(2);
    };

    return (
        <div className={styles["forgot-password"]}>
            {stage == 1 && (
                <>
                    <h1>Reset password</h1>
                    <form action="">
                        <InputFieldslist
                            inputs={inputs}
                            formValues={formValues}
                            onBlurHandler={onBlurHandler}
                            onChangeHandler={onChangeHandler}
                            onFocusHandler={onFocusHandler}
                        />
                    </form>
                    <Button onClick={sendEmail} >Done</Button>
                </>
            )}

            {stage == 2 && (
                <>
                    {!isLoading && <ConfirmEmail message="reset your password" />}
                    {isLoading && <Spinner />}
                </>
            )}
        </div>
    );
};
