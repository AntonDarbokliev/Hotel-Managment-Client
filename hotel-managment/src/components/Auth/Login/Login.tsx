import { Link } from "react-router-dom"
import { Button } from "../../Shared/Button/Button"
import { InputField } from "../../Shared/InputField/InputField"
import styles from './Login.module.scss'
import { useForm } from "../../../hooks/useForm"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { useLoginValidations } from "./LoginHook"


export const Login = () => {

    const onFormSubmit = () => {
        console.log('Submitted')
    }

    const {formValues, onChangeHandler, onSubmit} = useForm({
        hotelCode: '',
        password: '',
    },onFormSubmit)

    
    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        hotelCode : false,
        password: false
    })

   const {isCodeValid, isPasswordValid,disableButton} = useLoginValidations(formValues,validationValues)

    return (
        <div className={styles["login"]}>
    
            <h1>Welcome back!</h1>

            <form className={styles["login-form"]} onSubmit={onSubmit}>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                name="hotelCode" 
                value={formValues.hotelCode} 
                type="password"
                onBlurHandler={() => onBlurHandler('hotelCode')}
                onFocusHandler={() => onFocusHandler('hotelCode')}
                isValid = {{ boolean: !isCodeValid, errorMessage: 'Hotel Code should be at least 3 characters long'}}
                >Hotel Code</InputField>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                name="password" 
                value={formValues.password} 
                type="password"
                onBlurHandler={() => onBlurHandler('password')}
                onFocusHandler={() => onFocusHandler('password')}
                isValid={{boolean: !isPasswordValid, errorMessage: 'Password should be at least 5 characters long' }}
                >Password</InputField>

                <Button disable={disableButton}>Login</Button>

            </form>
            <p>Don't have a registration? <Link  to="/register">Sign up.</Link></p>
        </div>
    )
} 