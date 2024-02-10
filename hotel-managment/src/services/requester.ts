import { RegisterData } from "../types/AuthTypes"

interface RequestProps {
    method: 'GET' | 'POST' | 'DELETE',
    url : string,
    data : RegisterData | null
}

interface Options {
    headers: {
        "Content-Type"? : string
    },
    body:string,
}
const request = async ({method, url, data}: RequestProps) =>  {

    const options: Options = {
        headers: {},
        body: ''
    };

    
    if(method != 'GET' && method != 'DELETE') {
        options.headers = {
            'Content-Type' : 'application/json'
        }
        options.body = JSON.stringify(data)
    }
    
    const response = await fetch(url,options)

    if(!response.ok){
        throw new Error(response.statusText)
    }

    if(response.status == 204) {
        return {}
    } 

    return await response.json()

}

export const RequestFactory = ( ) => {
    const getRequest = (url:string, data: null) => request({method:'GET', url,data})
    const postRequest =  (url:string, data: RegisterData) => request({method:'POST', url,data})

    return {
        get: getRequest,
        post: postRequest
    }
}