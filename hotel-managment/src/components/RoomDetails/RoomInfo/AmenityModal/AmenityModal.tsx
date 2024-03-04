import { Button } from "../../../Shared/Button/Button"
import { InputField } from "../../../Shared/InputField/InputField"
import { Modal } from "../../../Shared/Modal/Modal"
import { AmenityCard } from "../AmenityCard/AmenityCard"
import { faVault } from '@fortawesome/free-solid-svg-icons'
import { faBath } from '@fortawesome/free-solid-svg-icons'
import styles from './AmenityModal.module.scss'
import { Amenity } from "../../../../types/AmenityType"
import { Room } from "../../../../types/RoomType"
import { useAmenityModal } from "./AmenityModalHook"


interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    currentAmenities: Amenity[],
    roomSetter: React.Dispatch<React.SetStateAction<Room | undefined>>
}

const preDefinedAmenities = ['Bathtub','Safe']

export const AmenityModal:React.FC<Props> = ({modalSetter,currentAmenities,roomSetter}) => {

    const initialAmenities = currentAmenities.filter(x => preDefinedAmenities.includes(x.name))
    const initialOtherAmenities = currentAmenities.filter(x => !preDefinedAmenities.includes(x.name))

    const { amenityOnClick, 
        onChangeHandler,
        onSave,
        onSubmit,
        amenities,
        otherAmenities,
        formValues } = useAmenityModal({modalSetter,initialAmenities,initialOtherAmenities,roomSetter})

    return (
        <Modal title="Add Amenities" stateSetter={modalSetter}>
                
                <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Bathtub" icon={faBath}></AmenityCard>

                <AmenityCard amenities={amenities} onClick={amenityOnClick} name="Safe" icon={faVault}></AmenityCard>
                
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