
import { FormValues } from "../../../types/FormValues";


export const useRooms = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    formValues: FormValues,
    // toastSetter:React.Dispatch<React.SetStateAction<string>>,
    toastSetter: (toastText: string) => void
    ) => {

    const onAddRoomClick = () => {
        if(formValues.floorValue !== ''){
            modalSetter(true)
        }else {
            toastSetter('Plase select a Floor before adding a Room')
            modalSetter(false)
        }
    }



    return {
        onAddRoomClick,
    }

} 