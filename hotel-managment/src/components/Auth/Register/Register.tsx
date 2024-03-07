import { Link } from 'react-router-dom'
import { Button } from '../../Shared/Button/Button'
import { InputField } from '../../Shared/InputField/InputField'
import styles from './Register.module.scss'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { useRegisterValidations } from './RegisterHook'
import { ConfirmEmail } from './ConfirmEmail/ConfirmEmail'
import {  useState } from 'react'
import { onImageChangeHandler } from '../../../utils/imageChangeHandler'
import Spinner from '../../Shared/LoadSpinner/LoadSpinner'
import { ToastNotification } from '../../Shared/ToastNotification/ToastNotification'
import { useRegister } from '../../../hooks/useRegister'
import { InputFieldslist } from '../../Shared/InputFieldsList/InputFieldsList'
import { InputFieldType } from '../../../types/InputField'

export const Register = () => {
    
    const [hasRegistered, setHasRegistered] = useState(false)
    const [toastText,setToastText] = useState('')

    const onSuccess = () => setHasRegistered(true)
    const onFail = (text:string) => setToastText(text)

    const {isLoading,onChangeHandler, onSubmit,setUserImage,formValues} = useRegister(onSuccess,onFail)

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        FirstName : false,
        MiddleName : false,
        LastName : false,
        EGN : false,
        Address : false,
        Password: false,
        Email : false,
        RepeatPassword : false,

    })

    const { 
        isFirstNameValid,
        isMiddleNameValid,
        isLastNameValid,
        isEGNValid,
        isAddressValid,
        isPasswordValid,
        isRepeatPasswordValid,
        isEmailValid,
        disableButton
    } = useRegisterValidations(formValues, validationValues)
    
    
    const inputGroup1 = [
        { name: 'FirstName',errorMessage: 'First Name should be at least 2 characters long' ,validation: !isFirstNameValid, display: 'First Name'},
        { name: 'MiddleName',errorMessage: 'MiddleName should be at least 2 characters long' ,validation: !isMiddleNameValid, display: 'Middle Name'},
        { name: 'LastName',errorMessage: 'LastName should be at least 2 characters long' ,validation: !isLastNameValid, display: 'Last Name'},
        { name: 'EGN',errorMessage: 'EGN should be at least 10 characters long' ,validation: !isEGNValid, maxLength: 10},
    ] as InputFieldType[]

    const inputGroup2 = [
        { name: 'Email',errorMessage: 'Invalid Email' ,validation: !isEmailValid},
        { name: 'Address',errorMessage: 'Address should be at least 5 characters long' ,validation: !isAddressValid},
        { name: 'Password',
        errorMessage: 'Password must be 6 characters with at least one capital letter, one lowercase letter, and one symbol.' ,
        type: 'password',
        validation: !isPasswordValid},
        { name: 'RepeatPassword',errorMessage: 'Passwords not matching' ,validation: !isRepeatPasswordValid, type: 'password',display: 'Repeat Password'},
    ] as InputFieldType[]

    const listProps = {
        formValues,
        onChangeHandler,
        onBlurHandler,
        onFocusHandler
    }

    return (
        <div className={styles["register"]}>

            {toastText !== '' && 
                <ToastNotification text={toastText} setText={setToastText} timer={3000}/>
            }

            {!hasRegistered && !isLoading && 
            <>
            <h1>Welcome!</h1>

            <form className={styles["register-form"]} onSubmit={onSubmit}>

            <div className={styles["register-group-fields-wrapper"]}>

                <div className={styles['register-group-input-fields']}>
                    <InputFieldslist {...listProps} inputs={inputGroup1} ></InputFieldslist>
                </div>


                <div className={styles['register-group-input-fields']}>
                    <InputFieldslist {...listProps} inputs={inputGroup2} ></InputFieldslist>
                </div>
            </div>
            
                <InputField 
                accept="image/*" 
                onChange={(e) => onImageChangeHandler(e,setUserImage)} 
                name='userImage' 
                type='file'
                >Hotel Image</InputField>


                <Button width='10rem' disable={disableButton}>Register</Button>
            </form>
            <p>Already registered your hotel? <Link to="/login">Sign in.</Link></p>
                </>
            }
            {hasRegistered && 
            <ConfirmEmail/>
            }

            { isLoading &&
                <Spinner/>
            }
        </div>
    )
}