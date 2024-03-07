import { useParams } from "react-router-dom"
import { Amenity } from "../../../../types/AmenityType"
import { useForm } from "../../../../hooks/useForm"
import { useState } from "react"
import { roomServiceFactory } from "../../../../services/room"
import { Room } from "../../../../types/RoomType"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    initialAmenities: Amenity[],
    initialOtherAmenities: Amenity [],
    roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>,
}
const roomService = roomServiceFactory()

export const useAmenityModal  = ({modalSetter,initialAmenities, initialOtherAmenities,roomSetter}:Props) => {


    const roomId = useParams().id

    const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities)
    const [otherAmenities, setOtherAmenities] = useState<Amenity[]>(initialOtherAmenities)



    const onOtherAdd = () => {
        const amenity = {
            name: formValues.other,
            roomId: roomId!
        }
        if(!otherAmenities.some(x => x.name === amenity.name) && amenity.name !== '' ) {
            setOtherAmenities(state => [...state,amenity])
            resetForm()
        }
    }

    const {formValues,onChangeHandler,onSubmit,resetForm } = useForm({
        other: '',
    },onOtherAdd)

    const amenityOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
        const amenity:Amenity = {
            name: e.currentTarget.id,
            roomId: roomId!
        }
        
        if(!amenities.some(x => x.name === amenity.name)){
            setAmenities(state => [...state,amenity])
        }else {
            setAmenities(state => state.filter(x => x.name !== amenity.name))

        }
    }

    const onSave = async () => {
        const allAmenities = [...amenities,...otherAmenities]
        
         await roomService.addAmenities(allAmenities)
        roomSetter(state => {
            if(state)
            return {
                floor: state.floor,
                floorId: state.floorId,
                id:  state.id,
                roomNumber: state.roomNumber,
                roomExtras: allAmenities,
            }
        })
        modalSetter(false)
    }

    return {
        amenityOnClick,
        onSave,
        onChangeHandler,
        onSubmit,
        amenities,
        otherAmenities,
        formValues
    }
}