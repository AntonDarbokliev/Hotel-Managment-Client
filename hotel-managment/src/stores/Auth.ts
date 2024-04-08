import { create } from "zustand";
import { authObjectFromStorage } from "../utils/authObjectFromStorage";

interface User {
    fullName: string;
    picture: string;
    id: string;
    role: string
}

interface AuthStore {
    user: User;
    isLoggedIn: boolean;
    updateUser: () => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: {
        fullName: "",
        picture: "",
        id: "",
        role: ""
    },
    isLoggedIn: false,
    clearUser: () => {
        set(() => ({
            user: {
                fullName: "",
                id: "",
                picture: "",
                role: "",
            },
            isLoggedIn: false,
        }));

        localStorage.removeItem("token");
    },

    updateUser: () => {
        const newUser = authObjectFromStorage();
                
        const currentTime = Math.floor(Date.now() / 1000);

        if (newUser && currentTime < newUser.exp!) {
            set((state) => ({
                ...state,
                user: {
                    fullName: newUser.FullName,
                    id: newUser.nameid,
                    picture: newUser.ProfilePicture,
                    role: newUser.role,
                },
                isLoggedIn: true,
            }));
        } else {
            set((state) => ({
                ...state,
                user: {
                    fullName: "",
                    id: "",
                    picture: "",
                    role: "",
                },
                isLoggedIn: false,
            }));
            localStorage.removeItem("token");
        }
    },
}));
