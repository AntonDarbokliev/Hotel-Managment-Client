import { useNavigate } from "react-router-dom"
import { useChangeEmail } from "../../../../hooks/Auth/useChangeEmail"
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations"
import { useForm } from "../../../../hooks/useForm"
import { useFormValidation } from "../../../../hooks/useFormValidation"
import { InputFieldType } from "../../../../types/InputField"
import { Button } from "../../../Shared/Button/Button"
import { InfoField } from "../../../Shared/InfoField/InfoField"
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList"
import styles from './EmailResetForm.module.scss';
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner"
import { useGetTokenFromUrl } from "../../../../hooks/useTokenFromUrl"

export const EmailResetForm = ()  => {

    const navigate = useNavigate()
    const { changeEmail,isLoading} = useChangeEmail(() => navigate('/settings/account'))

    const {formValues,onChangeHandler} = useForm({
        newEmail: ''
    },() => {})

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        newEmail: false
    })

    const {isNewEmailValid} = useGeneralValidations(formValues,validationValues)

    const { token } = useGetTokenFromUrl()

    const inputs: InputFieldType[] = [
        {name: 'newEmail', display:'New Email', validation: !isNewEmailValid, errorMessage: 'Invalid email'},
    ]

    return (
        <div className={styles["container"]}>
        <InfoField height="70%" justify="center">
            <h1>Change Email</h1>
            {!isLoading && 
            <>
                <InputFieldslist 
                formValues={formValues}
                inputs={inputs}
                onBlurHandler={onBlurHandler}
                onFocusHandler={onFocusHandler}
                onChangeHandler={onChangeHandler}
                />
                <Button onClick={() => changeEmail(formValues.newEmail,token)}>Save</Button>
            </>
            }
            {isLoading && 
                <Spinner/>
            }
        </InfoField>

        </div>

    )
}