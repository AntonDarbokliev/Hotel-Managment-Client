import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { AmenityCard } from "../AmenityCard/AmenityCard"
import styles from './AmenityModal.module.scss'
import { Amenity } from "../../../../types/AmenityType"
import { Room } from "../../../../types/RoomType"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "../../../../hooks/useForm"
import { useAddAmenity } from "../../../../hooks/Rooms/useAddAmenity"
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner"


interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    currentAmenities: Amenity[],
    roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>
}

const predefinedAmenities = ['Bathtub','Safe','TV','Coffe','AC','Fridge']

export const AmenityModal:React.FC<Props> = ({modalSetter,currentAmenities,roomSetter}) => {

    const initialAmenities = currentAmenities.filter(x => predefinedAmenities.includes(x.name))
    const initialOtherAmenities = currentAmenities.filter(x => !predefinedAmenities.includes(x.name))

    const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities)
    const [otherAmenities, setOtherAmenities] = useState<Amenity[]>(initialOtherAmenities)
    
    const afterAdd = async () => {
        const allAmenities = [...amenities,...otherAmenities]
        
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

    const {addAmenity,isLoading} = useAddAmenity(afterAdd)

    const roomId = useParams().id

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



    return (
        <Modal title="Add Amenities" stateSetter={modalSetter}>

                {isLoading && 
                    <Spinner/>
                }

                {!isLoading && 
                <>
                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Bathtub" ></AmenityCard>

                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Safe" ></AmenityCard>

                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="TV" ></AmenityCard>

                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Coffe" ></AmenityCard>

                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="AC" ></AmenityCard>

                    <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Fridge" ></AmenityCard>
                    
                        <form action=""className={styles["other"]} onSubmit={onSubmit}>
                            <InputField name="other" value={formValues.other} onChange={onChangeHandler}>Other: </InputField>
                            <Button width="2rem" >+</Button>  
                        </form>
                    <div className={styles["other-amenities"]}>
                        {otherAmenities.map(x => <p key={x.name}>{x.name}</p>)}
                    </div>
                    
                    <Button width="13rem" onClick={() => addAmenity([...otherAmenities,...amenities])}>Save</Button>
                </>
                }
                
            </Modal>
    )
}