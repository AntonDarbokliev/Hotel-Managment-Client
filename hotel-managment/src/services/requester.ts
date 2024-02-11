
interface RequestProps {
    method: 'GET' | 'POST' | 'DELETE',
    url : string,
    data : FormData | null
}

interface Options {
    headers: {
        "Content-Type"? : string
    },
    body?:FormData,
    method: 'GET' | 'POST' | 'DELETE'
}
const request = async ({method, url, data}: RequestProps) =>  {

    const options: Options = {
        headers: {},
        method
    };

    
    if(method != 'GET' && method != 'DELETE') {
        // options.headers = {
        //     'Content-Type' : 'multipart/form-data'   // Server returns 400 when the headers are being set manually 
        // }                                            // https://stackoverflow.com/questions/64139168/formdata-not-added-properly-to-the-post-request
        console.log("Testing Data",data)
        options.body = data!
    }
    
    const response = await fetch(url,options)

    if(!response.ok){
        throw new Error(response.statusText)
    }

    if(response.status == 204) {
        return {}
    } 

    if(url.includes('Register')){
        return response
    }else {
        return response.json()
    }

}

export const RequestFactory = ( ) => {
    const getRequest = (url:string, data: null) => request({method:'GET', url,data})
    const postRequest =  (url:string, data: FormData) => request({method:'POST', url,data})

    return {
        get: getRequest,
        post: postRequest
    }
}