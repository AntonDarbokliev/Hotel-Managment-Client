interface FormValues {
    [key: string]: string;
}

export const checkLengthValidation = <K extends keyof FormValues>(
    formValue: K,
    desiredLength: number,
    formValues: FormValues
): boolean => {
    const regex = new RegExp(`^.{0,${desiredLength - 1}}$`);
    return formValues[formValue] !== '' && regex.test(String(formValues[formValue]));
};