import { Amenity } from "../types/AmenityType";

interface RequestProps {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    url : string,
    data? : FormData | null | Amenity[] 
}

interface Options {
    headers: {
        "Content-Type"? : string,
        "Authorization"?:string,
    },
    body?:FormData |string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT'
}
const request = async ({method, url, data}: RequestProps) =>  {

    const options: Options = {
        headers: {},
        method
    };


    if( !url.includes('Login') && !url.includes('Register')) {
        const token = localStorage.getItem('token');
        if(!token) {
            throw new Error('Token is missing');
        }
        options.headers['Authorization'] = `Bearer ${token}`;
    }


        // options.headers = {
        //     'Content-Type' : 'multipart/form-data'   // Server returns 400 when the headers are being set manually 
        // }                                            // https://stackoverflow.com/questions/64139168/formdata-not-added-properly-to-the-post-request
       if(data){
        if(Array.isArray(data)){
           options.body = JSON.stringify(data)
           options.headers['Content-Type'] = 'application/json';
        }else{
            options.body = data
        }
       }
    
    const response = await fetch(url,options)

    if(!response.ok){
        throw ( await response.json())
    }

    if(response.status == 204) {
        return {}
    } 

    if(url.includes('Register') || url.includes('ChangePassword')){
        return response
    }else {
        return response.json() 
    }

}

export const RequestFactory = ( ) => {
    const getRequest = (url:string) => request({ method: 'GET', url })
    const postRequest =  (url:string, data: FormData | Amenity[]) => request({method:'POST', url,data})
    const deleteRequest = (url:string) => request({ method: 'DELETE', url })
    const putRequest = (url:string, data: FormData) => request({method: 'PUT',url,data})

    return {
        get: getRequest,
        post: postRequest,
        delete: deleteRequest,
        put: putRequest
    }
}