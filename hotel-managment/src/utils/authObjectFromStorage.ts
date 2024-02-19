import { jwtDecode } from 'jwt-decode'
import {AuthInfo}  from '../types/AuthTypes'


export const authObjectFromStorage = () => {
    const token = localStorage.getItem('token')

    if(token){
        const authInfo:AuthInfo = jwtDecode(token)
        console.log("Decoded token: " ,authInfo)
        return authInfo
    }else {
        return {
            FullName: '',
            nameId: '',
            ProfilePicture: '',
        }
    }
}