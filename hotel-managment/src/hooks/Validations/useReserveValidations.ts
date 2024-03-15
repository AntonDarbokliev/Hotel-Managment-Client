import { checkLengthValidation } from "../../utils/sharedValidations";
import { useDisableValidations } from "./useDisableValidations";

interface FormValues {
    [key: string]: string;
}

interface ValidationValues {
    [key: string]: boolean;
}

export const useReserveValidations = (
    formValues: FormValues,
    validationValues: ValidationValues
) => {

    const isFirstNameValid =
        checkLengthValidation("FirstName",formValues,2) &&
        validationValues.FirstName === true;

    const isLastNameValid =
        checkLengthValidation("LastName",formValues, 2) &&
        validationValues.LastName === true;
        
    const isPhoneNumberValid =
        checkLengthValidation("PhoneNumber",formValues, 5) &&
        validationValues.PhoneNumber === true &&
        formValues.PhoneNumber.length <= 15;

    const isCountryValid =
        checkLengthValidation("Country",formValues, 4) &&
        validationValues.Country === true;

    const isEGNFPNValid =
        checkLengthValidation("EGN",formValues, 10) &&
        validationValues["EGN"] === true;

    const isIDNValid =
        checkLengthValidation("IDN",formValues, 5) && validationValues["IDN"] === true;

    const isGenderValid =
        checkLengthValidation("Gender",formValues, 1) &&
        validationValues["Gender"] === true;

    const isAddressValid =
        checkLengthValidation("Address",formValues, 5) &&
        validationValues.Address === true;

    const validations = [
        isAddressValid,
        isCountryValid,
        isEGNFPNValid,
        isFirstNameValid,
        isGenderValid,
        isIDNValid,
        isLastNameValid,
        isPhoneNumberValid,
    ];

    const { disableButton } = useDisableValidations(formValues, validations);

    return {
        isFirstNameValid,
        isLastNameValid,
        isEGNFPNValid,
        isAddressValid,
        isCountryValid,
        isPhoneNumberValid,
        isGenderValid,
        isIDNValid,
        disableButton,
    };
};
