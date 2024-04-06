export const makeFormData = (data: {[key:string] : string | number | boolean}) => {
    const formData = new FormData();

    const array = Object.entries(data)

    for (const [key,value] of array) {
        formData.append(key, String(value));
    }    

    return formData
}