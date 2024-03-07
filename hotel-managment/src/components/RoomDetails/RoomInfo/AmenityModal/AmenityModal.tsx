import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { AmenityCard } from "../AmenityCard/AmenityCard"
import styles from './AmenityModal.module.scss'
import { Amenity } from "../../../../types/AmenityType"
import { Room } from "../../../../types/RoomType"
import { useAmenityModal } from "./AmenityModalHook"


interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    currentAmenities: Amenity[],
    roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>
}

const predefinedAmenities = ['Bathtub','Safe','TV','Coffe','AC','Fridge']

export const AmenityModal:React.FC<Props> = ({modalSetter,currentAmenities,roomSetter}) => {

    const initialAmenities = currentAmenities.filter(x => predefinedAmenities.includes(x.name))
    const initialOtherAmenities = currentAmenities.filter(x => !predefinedAmenities.includes(x.name))

    const { amenityOnClick, 
        onChangeHandler,
        onSave,
        onSubmit,
        amenities,
        otherAmenities,
        formValues } = useAmenityModal({modalSetter,initialAmenities,initialOtherAmenities,roomSetter})

    return (
        <Modal title="Add Amenities" stateSetter={modalSetter}>
                
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
                
                <Button width="13rem" onClick={onSave}>Save</Button>
            </Modal>
    )
}