export const makeFormData = (data: {[key:string] : string | number}) => {
    const formData = new FormData();

    const array = Object.entries(data)

    for (const [key,value] of array) {
        formData.append(key, String(value));
    }

    console.log(formData);
    

    return formData
}