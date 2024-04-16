export const makeFormData = (data: {[key:string] : string | number | boolean | File}) => {
    const formData = new FormData();

    const array = Object.entries(data)

    for (const [key,value] of array) {
        if( value instanceof File) {
            formData.append(key, value);
        }else {
            formData.append(key, String(value));
        }
    }    

    return formData
}