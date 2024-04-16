import { Button } from "../../../Shared/Button/Button";
import { Modal } from "../../../Shared/Modal/Modal";
import { useForm } from "../../../../hooks/useForm";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations";
import { InputFieldType } from "../../../../types/InputField";
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList";
import { useChangeAuth } from "../../../../hooks/Auth/useChangeAuth";
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner";

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
    userEmail: string;
}

export const ChangePassword: React.FC<Props> = ({ modalSetter }) => {

    const {formValues,onChangeHandler} = useForm({
        CurrentPassword: '',
        NewPassword: '',
        ConfirmPassword: '',
    },() => {})

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        CurrentPassword: false,
        NewPassword: false,
        ConfirmPassword: false,
    })

    const {isPasswordValid,isRepeatPasswordValid} = useGeneralValidations(formValues,validationValues)

    const {isLoading,resetPass} = useChangeAuth('password')

    const inputs: InputFieldType[] = [
        {name: 'CurrentPassword', display:'Current Password',type: 'password' },
        {name: 'NewPassword',display: 'New Password',type: 'password',validation: !isPasswordValid,
        errorMessage: '6 characters, 1 capital letter, 1 lowercase letter, and 1 symbol are required.'
        },
        {name: 'ConfirmPassword', display:'Confirm Password',type: 'password',validation: !isRepeatPasswordValid, 
        errorMessage: 'Passwords not matching'
    },
    ]
    
    return (
        <Modal stateSetter={modalSetter} title="Change Account Password">
                <>
                    {!isLoading && 
                    <> 
                        <InputFieldslist
                        formValues={formValues}
                        inputs={inputs}
                        onBlurHandler={onBlurHandler}
                        onFocusHandler={onFocusHandler}
                        onChangeHandler={onChangeHandler}
                        />
                        <Button onClick={() => resetPass(formValues)}>Confrim</Button>
                    </>
                }

                {isLoading && 
                    <Spinner/>
                }
                </>
        </Modal>
    );
};
