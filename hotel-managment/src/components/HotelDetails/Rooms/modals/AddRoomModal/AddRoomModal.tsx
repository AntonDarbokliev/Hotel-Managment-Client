import { useAddRoom } from "../../../../../hooks/Rooms/useAddRoom";
import { useForm } from "../../../../../hooks/useForm";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useToastStore } from "../../../../../stores/ToastStore";
import { Floor } from "../../../../../types/FloorType";
import { InputFieldType } from "../../../../../types/InputField";
import { Room } from "../../../../../types/RoomType";
import { SentRoom } from "../../../../../types/SentRoom";
import { Button } from "../../../../Shared/Button/Button";
import { InputFieldslist } from "../../../../Shared/InputFieldsList/InputFieldsList";
import Spinner from "../../../../Shared/LoadSpinner/LoadSpinner";
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './AddRoomModal.module.scss';

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    roomSetter: React.Dispatch<React.SetStateAction<SentRoom[]>>,
    floor: Floor
}

export const AddRoomModal:React.FC<Props> = ({modalSetter,roomSetter,floor}) => {
    
    
    const {formValues,onChangeHandler} = useForm({
        roomNumber: '',
        pricePerNight: '',
        peopleCapacity: '',
        },() => {})

    const toastSetter = useToastStore(s => s.setToastText)

    const onAddFail = (error:string) => {toastSetter(error)}
    const afterAdd = (data: {room: Room}) => {
        modalSetter(false);
        roomSetter(state => [...state,data.room])
    }
    const {addRoom,isLoading} = useAddRoom(onAddFail,afterAdd)

    const inputs = [
        { name: 'roomNumber',type: 'number', display: 'Room Number'},
        { name: 'pricePerNight',type: 'number', display: 'Price per night'},
        { name: 'peopleCapacity',type: 'number', display: 'Capacity'},
    ] as InputFieldType[]
    const { onBlurHandler,onFocusHandler}  =useFormValidation({})
    return (
        <Modal key={'room-modal'} stateSetter={modalSetter} title="Add a Room">
            {!isLoading && 
            <>
                <form action="" className={styles["room-modal-form"]}>
                    <InputFieldslist 
                    onChangeHandler={onChangeHandler} 
                    formValues={formValues} 
                    inputs={inputs}
                    onBlurHandler={onBlurHandler}
                    onFocusHandler={onFocusHandler}
                    />
                    <p>Floor: {floor.floorNumber}</p>
                    <br />
                </form>
                    <Button width="12rem"  disable = {formValues.roomNumber == ''}
                    onClick={() => addRoom(floor.id,formValues)}>
                    Add Room
                    </Button>
            </>
            }

            {isLoading && 
                <Spinner/>
            }
            </Modal>
    )
}