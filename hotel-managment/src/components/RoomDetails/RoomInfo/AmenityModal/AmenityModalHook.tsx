// import { useParams } from "react-router-dom"
// import { Amenity } from "../../../../types/AmenityType"
// import { useForm } from "../../../../hooks/useForm"
// import { useState } from "react"
// import { roomServiceFactory } from "../../../../services/room"
// import { Room } from "../../../../types/RoomType"

// interface Props {
//     modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
//     initialAmenities: Amenity[],
//     initialOtherAmenities: Amenity [],
//     roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>,
// }
// const roomService = roomServiceFactory()

// export const useAmenityModal  = ({modalSetter,initialAmenities, initialOtherAmenities,roomSetter}:Props) => {




   
//     const amenityOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
//         const amenity:Amenity = {
//             name: e.currentTarget.id,
//             roomId: roomId!
//         }
        
//         if(!amenities.some(x => x.name === amenity.name)){
//             setAmenities(state => [...state,amenity])
//         }else {
//             setAmenities(state => state.filter(x => x.name !== amenity.name))

//         }
//     }


//     return {
//         amenityOnClick,
//         onChangeHandler,
//         onSubmit,
//         amenities,
//         otherAmenities,
//         formValues
//     }
// }