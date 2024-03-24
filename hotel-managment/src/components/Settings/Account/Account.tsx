import { useAuthStore } from "../../../stores/Auth"

export const Account = () => {
    const user = useAuthStore.getState().user

    return (
        <>
        <h1>{user.fullName}</h1>
        </>
    )
}