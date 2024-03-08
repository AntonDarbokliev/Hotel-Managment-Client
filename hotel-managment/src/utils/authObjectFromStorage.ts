import { jwtDecode } from 'jwt-decode'
import {AuthInfo}  from '../types/AuthTypes'


export const authObjectFromStorage = () => {
    const token = localStorage.getItem('token')

    if(token){
        const authInfo:AuthInfo = jwtDecode(token)
        return authInfo
    }else {
        return {
            FullName: '',
            nameId: '',
            ProfilePicture: '',
        }
    }
}