import { Link } from 'react-router-dom'
import { Button } from '../../Shared/Button/Button'
import { InputField } from '../../Shared/InputField/InputField'
import styles from './Register.module.scss'
import { useForm } from '../../../hooks/useForm'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { useRegisterValidations } from './RegisterHook'
import { ConfirmEmail } from './ConfirmEmail/ConfirmEmail'
import { FormEvent, useState } from 'react'
import { authServiceFactory } from '../../../services/auth'

interface Data {
    [key: string]: string | File ;
}

const authService = authServiceFactory()

export const Register = () => {

    const [hasRegistered, setHasRegistered] = useState(false)
    const [hotelImage, setHotelImage ] = useState<File | undefined>()
    const [isImageValid,setIsImageValid] = useState(true)

    const onFormSubmit = async () => {
        if(hotelImage) {
            setIsImageValid(true)
            const data: Data = {
                ...formValues
            }

            const formData = new FormData();

            const array = Object.entries(data)

            for (const [key,value] of array) {
                formData.append(key, value);
            }

            try{
                await authService.register(formData)
                setHasRegistered(true)
            }catch(err){
                throw new Error(String(err))
            }
        }else{
            setIsImageValid(false)
        }

    }

    const {formValues,onChangeHandler,onSubmit} = useForm({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Address: '',
        EGN : '',
        Password: '',
        RepeatPassword:'',
        Email: '',
    },onFormSubmit)

    const onImageChangeHandler = (e: FormEvent) =>{
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        setHotelImage(target.files[0])
    }


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
    
    
    return (
        <div className={styles["register"]}>
    
            {!hasRegistered && 
            <>
            <h1>Welcome!</h1>

            <form className={styles["register-form"]} onSubmit={onSubmit}>

            <div className={styles["register-group-fields-wrapper"]}>

               

                <div className={styles['register-group-input-fields']}>
                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.FirstName} 
                    name='FirstName'
                    onBlurHandler={() => onBlurHandler('FirstName')}
                    onFocusHandler={() => onFocusHandler('FirstName')}
                    isValid={{boolean: !isFirstNameValid, errorMessage: 'First Name should be at least 2 characters long'}}
                    >FirstName</InputField>
                    
                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.MiddleName} 
                    name='MiddleName'
                    onBlurHandler={() => onBlurHandler('MiddleName')}
                    onFocusHandler={() => onFocusHandler('MiddleName')}
                    isValid={{boolean: !isMiddleNameValid, errorMessage: 'MiddleName should be at least 2 characters long'}}
                    >MiddleName</InputField>

                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.LastName} 
                    name='LastName'
                    onBlurHandler={() => onBlurHandler('LastName')}
                    onFocusHandler={() => onFocusHandler('LastName')}
                    isValid={{boolean: !isLastNameValid, errorMessage: 'LastName should be at least 2 characters long'}}
                    
                    >LastName</InputField>

                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.EGN} 
                    name='EGN' type='number'
                    onBlurHandler={() => onBlurHandler('EGN')}
                    onFocusHandler={() => onFocusHandler('EGN')}
                    isValid={{boolean: !isEGNValid, errorMessage: 'EGN should be at least 10 characters long'}}
                    >EGN</InputField>
                </div>


                <div className={styles['register-group-input-fields']}>
                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.Email} 
                    name='Email' type='email'
                    onBlurHandler={() => onBlurHandler('Email')}
                    onFocusHandler={() => onFocusHandler('Email')}
                    isValid={{boolean: !isEmailValid, errorMessage: 'Email should be at least 10 characters long'}}
                    >Email</InputField>

                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.Address}
                    name='Address'
                    onBlurHandler={() => onBlurHandler('Address')}
                    onFocusHandler={() => onFocusHandler('Address')}
                    isValid={{boolean: !isAddressValid, errorMessage: 'Address should be at least 5 characters long'}}
                    >Address</InputField>
                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.Password} 
                    name='Password' type='password'
                    onBlurHandler={() => onBlurHandler('Password')}
                    onFocusHandler={() => onFocusHandler('Password')}
                    isValid={{boolean: !isPasswordValid, errorMessage: 'Password should be at least 5 characters long'}}
                    >Password</InputField>

                    <InputField 
                    onChange={(e) => onChangeHandler(e)} 
                    value={formValues.RepeatPassword} 
                    name='RepeatPassword' type='password'
                    onBlurHandler={() => onBlurHandler('RepeatPassword')}
                    onFocusHandler={() => onFocusHandler('RepeatPassword')}
                    isValid={{boolean: !isRepeatPasswordValid, errorMessage: 'Passwords not matching'}}
                    >Repeat Password</InputField>
                </div>
            </div>
            
                
                <InputField accept="image/*" onChange={onImageChangeHandler} name='hotelImage' isValid= { {boolean: isImageValid, errorMessage: 'Hotel Image is required'}} type='file'>Hotel Image</InputField>

                


                <Button disable={disableButton}>Register</Button>
            </form>
            <p>Already registered your hotel? <Link to="/login">Sign in.</Link></p>
                </>
            }
            {hasRegistered && 
            <ConfirmEmail></ConfirmEmail>
            }
        </div>
    )
}