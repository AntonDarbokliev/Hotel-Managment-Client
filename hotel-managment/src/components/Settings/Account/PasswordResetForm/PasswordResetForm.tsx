import { useResetPass } from "../../../../hooks/Auth/useResetPass"
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations"
import { useForm } from "../../../../hooks/useForm"
import { useFormValidation } from "../../../../hooks/useFormValidation"
import { InputFieldType } from "../../../../types/InputField"
import { useLoginValidations } from "../../../Auth/Login/LoginHook"
import { Button } from "../../../Shared/Button/Button"
import { InfoField } from "../../../Shared/InfoField/InfoField"
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList"
import styles from './PasswordResetForm.module.scss';

export const PasswordResetForm = ()  => {
    const {resetPass} = useResetPass()

    const {formValues,onChangeHandler} = useForm({
        LoginCode: '',
        Password: '',
        ConfirmPassword: '',
    },() => {})

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        LoginCode: false,
        Password: false,
        ConfirmPassword: false,
    })

    const {isPasswordValid,isRepeatPasswordValid} = useGeneralValidations(formValues,validationValues)
    const {isCodeValid} = useLoginValidations(formValues,validationValues)

    const inputs: InputFieldType[] = [
        {name: 'LoginCode', display:'Login Code',type: 'password',validation: !isCodeValid, errorMessage: 'Invalid code'},
        {name: 'Password',display: 'New Password',type: 'password',validation: !isPasswordValid,
        errorMessage: 'Password must be 6 characters with at least one capital letter, one lowercase letter, and one symbol.'
        },
        {name: 'ConfirmPassword', display:'Confirm Password',type: 'password',validation: !isRepeatPasswordValid, 
        errorMessage: 'Passwords not matching'
    },
    ]

    return (
        <div className={styles["container"]}>
        <InfoField height="70%" justify="center">
            <h1>Reset Password</h1>

            <InputFieldslist 
            formValues={formValues}
            inputs={inputs}
            onBlurHandler={onBlurHandler}
            onFocusHandler={onFocusHandler}
            onChangeHandler={onChangeHandler}
            />
            <Button onClick={() => resetPass(formValues)}>Save</Button>
        </InfoField>

        </div>

    )
}