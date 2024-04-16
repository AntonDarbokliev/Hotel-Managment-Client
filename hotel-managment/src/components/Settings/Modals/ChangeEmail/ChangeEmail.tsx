import { useState } from "react";
import { Button } from "../../../Shared/Button/Button";
import { Modal } from "../../../Shared/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../../../../hooks/useForm";
import { InputFieldType } from "../../../../types/InputField";
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList";
import { useSendResetEmail } from "../../../../hooks/Auth/useSendResetEmail";
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner";

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangeEmail: React.FC<Props> = ({ modalSetter }) => {
    const [stage, setStage] = useState(1);

    const { isLoading, sendResetEmail } = useSendResetEmail();
    const { formValues, onChangeHandler } = useForm({
        email: "",
        newEmail: "",
    });

    const { onBlurHandler, onFocusHandler, validationValues } = useFormValidation({
        email: false,
        newEmail: false,
    });

    const { isEmailValid, isNewEmailValid } = useGeneralValidations(formValues, validationValues);

    const onNext = async () => {
        await sendResetEmail(formValues.newEmail);
        setStage(2);        
    };

    const inputs = [
        { name: "email", display: "Current Email", validation: !isEmailValid, errorMessage: "Invalid Email" },
        { name: "newEmail", display: "New Email", validation: !isNewEmailValid, errorMessage: "Invalid Email" },
    ] as InputFieldType[];

    return (
        <Modal stateSetter={modalSetter} title="Change Email">
            <>
                {!isLoading && (
                    <>
                        {stage == 1 && (
                            <>
                                <form action="">
                                    <InputFieldslist
                                        formValues={formValues}
                                        inputs={inputs}
                                        onBlurHandler={onBlurHandler}
                                        onFocusHandler={onFocusHandler}
                                        onChangeHandler={onChangeHandler}
                                    />
                                </form>
                                <Button onClick={onNext}>Next</Button>
                            </>
                        )}

                        {stage == 2 && (
                            <>
                                <FontAwesomeIcon size="6x" icon={faEnvelope} />
                                <p>
                                    An email has been sent to <span className="highlight">{formValues.email}</span>
                                </p>
                                <Button onClick={() => modalSetter(false)}>Close</Button>
                            </>
                        )}
                    </>
                )}

                {isLoading && 
                    <Spinner/>
                }
            </>
        </Modal>
    );
};
