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
    [key: string]: string | File;
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
                HotelName: formValues.hotelName,
                HotelLocation: formValues.location,
                HotelTelephoneNumber: formValues.phoneNumber,
                HotelPicture: hotelImage,
                HotelEmailAddress: formValues.email,
                Password: formValues.password,
                
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
        email: '',
        phoneNumber: '',
        location: '',
        hotelName: '',
        password: '',
        repeatPassword:''
    },onFormSubmit)

    const onImageChangeHandler = (e: FormEvent) =>{
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        setHotelImage(target.files[0])
    }


    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        email : false,
        phoneNumber : false,
        location : false,
        hotelName : false,
        password: false,
        repeatPassword : false,

    })

    const { 
        isEmailValid, 
        isHotelNameValid, 
        isLocationValid, 
        isPasswordValid, 
        isPhoneNumberValid, 
        isRepeatPasswordValid,
        disableButton
    } = useRegisterValidations(formValues, validationValues)
    
    
    return (
        <div className={styles["login"]}>
    
            {!hasRegistered && 
            <>
            <h1>Welcome!</h1>

            <form className={styles["login-form"]} onSubmit={onSubmit}>
                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.email} 
                name='email'
                onBlurHandler={() => onBlurHandler('email')}
                onFocusHandler={() => onFocusHandler('email')}
                isValid={{boolean: !isEmailValid, errorMessage: 'Invalid Email'}}
                >E-mail</InputField>
                
                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.phoneNumber} 
                name='phoneNumber' type='number'
                onBlurHandler={() => onBlurHandler('phoneNumber')}
                onFocusHandler={() => onFocusHandler('phoneNumber')}
                isValid={{boolean: !isPhoneNumberValid, errorMessage: 'Phone Number should be at least 7 characters long'}}
                >Phone Number</InputField>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.location} 
                name='location'
                onBlurHandler={() => onBlurHandler('location')}
                onFocusHandler={() => onFocusHandler('location')}
                isValid={{boolean: !isLocationValid, errorMessage: 'Location should be at least 3 characters long'}}
                
                >Country, City, Address</InputField>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.hotelName} 
                name='hotelName'
                onBlurHandler={() => onBlurHandler('hotelName')}
                onFocusHandler={() => onFocusHandler('hotelName')}
                isValid={{boolean: !isHotelNameValid, errorMessage: 'Hotel Name should be at least 3 characters long'}}
                >Hotel Name</InputField>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.password}
                name='password' type='password'
                onBlurHandler={() => onBlurHandler('password')}
                onFocusHandler={() => onFocusHandler('password')}
                isValid={{boolean: !isPasswordValid, errorMessage: 'Password should be at least 5 characters long'}}
                >Password</InputField>

                <InputField 
                onChange={(e) => onChangeHandler(e)} 
                value={formValues.repeatPassword} 
                name='repeatPassword' type='password'
                onBlurHandler={() => onBlurHandler('repeatPassword')}
                onFocusHandler={() => onFocusHandler('repeatPassword')}
                isValid={{boolean: !isRepeatPasswordValid, errorMessage: 'Passwords not matching'}}
                >Repeat-Password</InputField>

                <InputField accept="image/*" onChange={onImageChangeHandler} name='hotelImage' isValid= { {boolean: isImageValid, errorMessage: 'Hotel Image is required'}} type='file'>Hotel Image</InputField>
                {/* <input type="file" name='hotelImage' className='hotel-image' onChange={onImageChangeHandler} /> */}

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