import styles from "./AddHotel.module.scss";
import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useFormValidation } from "../../hooks/useFormValidation.ts";
import { useAddHotelValidations } from "./AddHotelHook.ts";
import { InputField } from "../Shared/InputField/InputField.tsx";
import { Button } from "../Shared/Button/Button.tsx";
import { onImageChangeHandler } from "../../utils/imageChangeHandler.ts";
import { MapWindow } from "../Shared/Map/MapWindow.tsx";
import { HotelSendType } from "../../types/HotelTypes.ts";
import { useAddHotel } from "../../hooks/Hotel/useAddHotel.ts";
import { InputFieldType } from "../../types/InputField.ts";
import { InputFieldslist } from "../Shared/InputFieldsList/InputFieldsList.tsx";

export const AddHotel = () => {
  const [hotelImage, setHotelImage] = useState<File | undefined>();
  const [isImageValid, setIsImageValid] = useState(true);
  const [location,setLocation] = useState<string>('Please select an address')
  const {addHotel} = useAddHotel(setIsImageValid)

  const onAddHotel = async () => {

    if(hotelImage) {

      const data: HotelSendType = {
        name: formValues.Name,
        email: formValues.Email,
        address: location,
        telephoneNumber: formValues.TelephoneNumber,
        profilePicture: hotelImage,
      };
     await addHotel(data)

    }
  }

  const { formValues, onChangeHandler } = useForm(
    {
      Name: "",
      Email: "",
      TelephoneNumber: "",
    });

  const { onBlurHandler, onFocusHandler, validationValues } = useFormValidation(
    {
      Name: false,
      Email: false,
      TelephoneNumber: false,
    }
  );

  const {
    isHotelNameValid,
    isEmailValid,
    isTelephoneNumberValid,
    disableButton,
  } = useAddHotelValidations(formValues, validationValues);

  const fieldsProps = {

    inputs: [
     {name: 'Name', validation: !isHotelNameValid, errorMessage: "Hotel Name should be at least 2 characters long", display: "Hotel Name"},
     {name: 'Email', validation: !isEmailValid, errorMessage: "Invalid Email", display: "E-mail"},
     {name: 'TelephoneNumber', validation: !isTelephoneNumberValid, errorMessage: "Telephone Number should be 10 characters long", display: "Telephone Number"},
 
 
   ] as InputFieldType[],
   formValues,
   onBlurHandler,
   onChangeHandler,
   onFocusHandler

  }

  return (
    <div className={styles["add"]}>

          <h1>Add Your Hotel</h1>
          <form className={styles["add-form"]}>
            <InputFieldslist {...fieldsProps}/>

            <InputField
              accept="image/*"
              onChange={(e) => onImageChangeHandler(e, setHotelImage)}
              name="hotelImage"
              isValid={{
                boolean: isImageValid,
                errorMessage: "Hotel Image is required",
              }}
              type="file"
            >Hotel Image</InputField>

              <p>Address</p>
              {location && 
                <p>{location}</p>
              }
            <MapWindow setLocation={setLocation} clickable={true}/>

          </form>
            <Button width="10rem" onClick={onAddHotel}  disable={disableButton}>Add</Button>
    </div>
  );
};
