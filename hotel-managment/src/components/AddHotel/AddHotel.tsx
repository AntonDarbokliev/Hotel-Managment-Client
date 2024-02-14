import { FormEvent, useState } from "react";
import { hotelServiceFactory } from "../../services/hotel.ts";
import { useForm } from "../../hooks/useForm.ts";
import { useFormValidation } from "../../hooks/useFormValidation.ts";
import { addHotelValidations } from "./AddHotelHook.ts";
import styles from './AddHotel.module.scss';
import { InputField } from "../Shared/InputField/InputField.tsx";
import { Button } from "../Shared/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

interface Data {
    [key:string]:string | File;
}

const authService = hotelServiceFactory();

export const AddHotel = () => {
    const [hasAddHotel, hasSetAddHotel] = useState(false);
    const [hotelImage, setHotelImage] = useState<File | undefined>();
    const [isImageValid, setIsImageValid] = useState(true);

    const navigate = useNavigate();

    const onFormSubmit = async() => {
        if(hotelImage) {
            setIsImageValid(true);
            const data: Data = {  
                HotelName: formValues.hotelName,
                HotelEmailAddress: formValues.email,
                HotelLocaion: formValues.location,
                HotelAddInfo: formValues.addInfo,
            }

            const formData = new FormData();

            const array = Object.entries(data);

            for (const [key, value] of array) {
                formData.append(key, value);
            }

            try{
                await authService.add(formData);
                hasSetAddHotel(true);
                navigate("/");

            } catch (err) {
                throw new Error(String(err));
            }
        } else {
            setIsImageValid(false);
        }
    };

    const {formValues, onChangeHandler, onSubmit} = useForm({
        hotelName: '',
        email: '',
        location: '',
        addInfo: ''
    }, onFormSubmit);

    const onImageChangeHandler = (e:FormEvent) => {
        const target = e.target as HTMLInputElement & {
            files:FileList
        }
        setHotelImage(target.files[0]);
    }

    const {onBlurHandler, onFocusHandler, validationValues} = useFormValidation({
        hotelName: false, 
        email: false, 
        location: false, 
        addInfo: false,
    })

    const {
        isHotelNameValid,
        isEmailValid, 
        isLocationValid,
        isAddInfoValid,
        disableButton
    } = addHotelValidations(formValues, validationValues);

    return (
        <div className={styles["add"]}>
            {!hasAddHotel && 
            <>
                <h1>Add Your Hotel</h1>
                <form className={styles["add-form"]} onSubmit={onSubmit}>
                    <InputField
                    onChange={(e) => onChangeHandler(e)}
                    value={formValues.hotelName}
                    name="hotelName"
                    onBlurHandler={() => onBlurHandler('hotelName')}
                    onFocusHandler={() => onFocusHandler('hotelName')}
                    isValid={{boolean: !isHotelNameValid, errorMessage: 'Invalid Hotel Name'}}
                    > Hotel Name
                    </InputField>

                    <InputField
                    onChange={(e) => onChangeHandler(e)}
                    value={formValues.email}
                    name="email"
                    onBlurHandler={() => onBlurHandler('email')}
                    onFocusHandler={() => onFocusHandler('email')}
                    isValid={{boolean: !isEmailValid, errorMessage: 'Invalid Email Address'}}
                    > E-mail
                    </InputField>

                    <InputField
                    onChange={(e) => onChangeHandler(e)}
                    value={formValues.location}
                    name="location"
                    onBlurHandler={() => onBlurHandler('location')}
                    onFocusHandler={() => onFocusHandler('location')}
                    isValid={{boolean: !isLocationValid, errorMessage: 'Invalid Location Place'}}
                    > Location
                    </InputField>

                    <InputField
                    onChange={(e) => onChangeHandler(e)}
                    value={formValues.addInfo}
                    name="addInfo"
                    onBlurHandler={() => onBlurHandler('addInfo')}
                    onFocusHandler={() => onFocusHandler('addInfo')}
                    isValid={{boolean: !isAddInfoValid, errorMessage: 'Invalid Additional Information'}}
                    > Additional Information
                    </InputField>

                    <InputField accept="image/*" onChange={onImageChangeHandler} name="hotelImage" isValid={{boolean:isImageValid, errorMessage:'Hotel Image is required'}} type='file'>Hotel Image</InputField>

                    <Button disable={disableButton}>Add</Button>
                </form>
            </>}
        </div>
    )
}