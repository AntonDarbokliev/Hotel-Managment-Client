import { createStore } from "zustand"
import { authObjectFromStorage } from "../utils/authObjectFromStorage"
// import { AuthInfo } from '../types/AuthTypes'

interface User {
    fullName: string,
    picture: string,
    id: string
}

interface AuthStore  {
    user: User
    isLoggedIn: boolean,
    updateUser: () => void
}


export const useAuthStore = createStore<AuthStore>((set) => ({
    user: {
        fullName: '',
        picture: '',
        id: '',
    },
    isLoggedIn: false,
    updateUser: () => {
        const newUser = authObjectFromStorage()
        if(newUser.FullName.length > 0){
            set((state) => ({
                ...state,
                user: {
                    ...state.user,
                    fullName: newUser.FullName,
                    id: newUser.nameId,
                    picture: newUser.ProfilePicture
                },
                isLoggedIn: true
            }));
        }
    }
}))

    
            
