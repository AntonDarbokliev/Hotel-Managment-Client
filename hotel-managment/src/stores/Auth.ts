import { create } from "zustand"
import { authObjectFromStorage } from "../utils/authObjectFromStorage"

interface User {
    fullName: string,
    picture: string,
    id: string
}

interface AuthStore  {
    user: User
    isLoggedIn: boolean,
    updateUser: () => void,
    clearUser: () => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: {
        fullName: '',
        picture: '',
        id: '',
    },
    isLoggedIn: false,
    clearUser: () => {
        set(() => ({
            user: {
                fullName: "",
                id: "",
                picture: "",
            },
            isLoggedIn: false,
        }))

        localStorage.removeItem('token')
    },

    updateUser: () => {
        const newUser = authObjectFromStorage()
        
        if(newUser.FullName.length > 0){
            set((state) => ({
                ...state,
                user: {
                    fullName: newUser.FullName,
                    id: newUser.nameId,
                    picture: newUser.ProfilePicture
                },
                isLoggedIn: true
            }));
        } else {
            set((state) => ({
                ...state,
                user: {
                    fullName: '',
                    id: '',
                    picture: ''
                },
                isLoggedIn: false
            }));
        }
    },
    
}))

    
            
