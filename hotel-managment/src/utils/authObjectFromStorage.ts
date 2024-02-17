import { jwtDecode } from 'jwt-decode'

export const authObjectFromStorage = () => {
    const token = localStorage.getItem('token')
    if(token){
        const authInfo = jwtDecode(token)
        console.log("Decoded token: " ,authInfo)
        return authInfo
    }else {
        return {}
    }
}