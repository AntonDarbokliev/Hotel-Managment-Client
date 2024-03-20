export const checkLengthValidation = (
    formValue: string,
    formValues: {[key:string]: string},
    desiredLength: number
) => {
    const regex = new RegExp(`^.{0,${desiredLength - 1}}$`);
    return (
        formValues[formValue] !== "" &&
        regex.test(String(formValues[formValue]))
    );
};