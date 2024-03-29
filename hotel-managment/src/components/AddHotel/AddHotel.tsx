import styles from "./AddHotel.module.scss";
import { useState } from "react";
import { hotelServiceFactory } from "../../services/hotel.ts";
import { useForm } from "../../hooks/useForm.ts";
import { useFormValidation } from "../../hooks/useFormValidation.ts";
import { useAddHotelValidations } from "./AddHotelHook.ts";
import { InputField } from "../Shared/InputField/InputField.tsx";
import { Button } from "../Shared/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { onImageChangeHandler } from "../../utils/imageChangeHandler.ts";
import { extractErrors } from "../../utils/extractErrors.ts";
import { ErrorObj } from "../../types/ErrorTypes.ts";
import { useToastStore } from "../../stores/ToastStore.ts";

interface Data {
  [key: string]: string | File;
}

const hotelService = hotelServiceFactory();

export const AddHotel = () => {
  const navigate = useNavigate();
  const [hotelImage, setHotelImage] = useState<File | undefined>();
  const [isImageValid, setIsImageValid] = useState(true);
  const setToastText = useToastStore(s => s.setToastText)

  const onFormSubmit = async () => {

      if (hotelImage) {

        setIsImageValid(true)

        const data: Data = {
          Name: formValues.Name,
          Email: formValues.Email,
          Address: formValues.Address,
          TelephoneNumber: formValues.TelephoneNumber,
          ProfilePicture: hotelImage,
        };

        const formData = new FormData();

        const array = Object.entries(data);

        for (const [key, value] of array) {
          formData.append(key, value);
        }

        try {
        await hotelService.add(formData)
          navigate("/hotels");
        } catch (err) {
          const text = extractErrors(err as ErrorObj)
          setToastText(text)
        }
      } else {
        setIsImageValid(false);
      }
  };

  const { formValues, onChangeHandler, onSubmit } = useForm(
    {
      Name: "",
      Email: "",
      Address: "",
      TelephoneNumber: "",
    },
    onFormSubmit
  );

  const { onBlurHandler, onFocusHandler, validationValues } = useFormValidation(
    {
      Name: false,
      Email: false,
      Address: false,
      TelephoneNumber: false,
    }
  );

  const {
    isHotelNameValid,
    isEmailValid,
    isAddressValid,
    isTelephoneNumberValid,
    disableButton,
  } = useAddHotelValidations(formValues, validationValues);

  return (
    <div className={styles["add"]}>

          <h1>Add Your Hotel</h1>
          <form className={styles["add-form"]} onSubmit={onSubmit}>
            <InputField
              onChange={(e) => onChangeHandler(e)}
              value={formValues.Name}
              name="Name"
              onBlurHandler={() => onBlurHandler("Name")}
              onFocusHandler={() => onFocusHandler("Name")}
              isValid={{
                boolean: !isHotelNameValid,
                errorMessage: "Hotel Name should be at least 2 characters long",
              }}
            >
              Hotel Name
            </InputField>

            <InputField
              onChange={(e) => onChangeHandler(e)}
              value={formValues.Email}
              name="Email"
              onBlurHandler={() => onBlurHandler("Email")}
              onFocusHandler={() => onFocusHandler("Email")}
              isValid={{
                boolean: !isEmailValid,
                errorMessage: "Invalid Email",
              }}
            >
              E-mail
            </InputField>

            <InputField
              onChange={(e) => onChangeHandler(e)}
              value={formValues.Address}
              name="Address"
              onBlurHandler={() => onBlurHandler("Address")}
              onFocusHandler={() => onFocusHandler("Address")}
              isValid={{
                boolean: !isAddressValid,
                errorMessage: "Address should be at least 5 characters long",
              }}
            >
              Address
            </InputField>

            <InputField
              onChange={(e) => onChangeHandler(e)}
              value={formValues.TelephoneNumber}
              name="TelephoneNumber"
              onBlurHandler={() => onBlurHandler("TelephoneNumber")}
              onFocusHandler={() => onFocusHandler("TelephoneNumber")}
              isValid={{
                boolean: !isTelephoneNumberValid,
                errorMessage: "Telephone Number should be 10 characters long",
              }}
              maxLength={10}
            >
              Telephone Number
            </InputField>

            <InputField
              accept="image/*"
              onChange={(e) => onImageChangeHandler(e, setHotelImage)}
              name="hotelImage"
              isValid={{
                boolean: isImageValid,
                errorMessage: "Hotel Image is required",
              }}
              type="file"
            >
              Hotel Image
            </InputField>

            <Button width="10rem" disable={disableButton}>Add</Button>
          </form>
    </div>
  );
};
