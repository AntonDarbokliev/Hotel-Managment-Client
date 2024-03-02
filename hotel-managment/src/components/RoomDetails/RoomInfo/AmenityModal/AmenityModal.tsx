import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { AmenityCard } from "../AmenityCard/AmenityCard"
import { faVault } from '@fortawesome/free-solid-svg-icons'
import { faBath } from '@fortawesome/free-solid-svg-icons'

import styles from './AmenityModal.module.scss'
import { useState } from "react"
import { useForm } from "../../../../hooks/useForm"
import { Amenity } from "../../../../types/AmenityType"
import { useParams } from "react-router-dom"
import { roomServiceFactory } from "../../../../services/room"


interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>
}

export const AmenityModal:React.FC<Props> = ({modalSetter}) => {

    const [amenities, setAmenities] = useState<Amenity[]>([])
    // const [otherInput, setOtherInput ] = useState('')
    const [otherAmenities, setOtherAmenities] = useState<Amenity[]>([])
    const params =  useParams()

    const roomService = roomServiceFactory()

    const onAdd = () => {

        const amenity = {
            name: formValues.other,
            roomId: params.id!
        }


        if(!otherAmenities.some(x => x.name === amenity.name) && amenity.name !== '') {
            setOtherAmenities(state => [...state,amenity])
            resetForm()
        }
    }

    const {formValues,onChangeHandler,onSubmit,resetForm } = useForm({
        other: '',
    },onAdd)


    const amenityOnClick = (e) => {
        
        const amenity:Amenity = {
            name: e.currentTarget.id,
            roomId: params.id!
        }
        
        if(!amenities.some(x => x.name === amenity.name)){
            setAmenities(state => [...state,amenity])
        }else {
            setAmenities(state => state.filter(x => x.name !== amenity.name))

        }
    }

    const onSave = () => {
        const allAmenities = [...amenities,...otherAmenities]
        roomService.addAmenities(allAmenities)
        console.log(allAmenities)
    }

    return (
        <Modal title="Add Amenities" stateSetter={modalSetter}>
                
                <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Bathtub" icon={faBath}></AmenityCard>

                <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Safe" icon={faVault}></AmenityCard>
                
                
                {/* <div> */}
                    <form action=""className={styles["other"]} onSubmit={onSubmit}>
                        <InputField name="other" value={formValues.other} onChange={onChangeHandler}>Other: </InputField>
                        <Button width="2rem" >+</Button>  
                    </form>
                {/* </div> */}

                <div className={styles["other-amenities"]}>
                    {otherAmenities.map(x => <p key={x.name}>{x.name}</p>)}
                </div>
                
                <Button width="13rem" onClick={onSave}>Save</Button>


            </Modal>
    )
}