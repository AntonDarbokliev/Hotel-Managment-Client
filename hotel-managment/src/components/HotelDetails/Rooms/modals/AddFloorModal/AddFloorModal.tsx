import { useAddFloor } from "../../../../../hooks/Floors/useAddFloor"
import { useToastStore } from "../../../../../stores/ToastStore"
import { Floor } from "../../../../../types/FloorType"
import { Button } from "../../../../Shared/Button/Button"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './AddFloorModal.module.scss'

interface Props {
    floorModalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    floors: Floor[],
    floorsSetter: React.Dispatch<React.SetStateAction<Floor[]>>;
}

export const AddFloorModal: React.FC<Props> = ({floorModalSetter,floors,floorsSetter}) => {
    const toastSetter = useToastStore(s => s.setToastText)

    const onAddFloorSuccess = (data:Floor) => {
        floorsSetter((state) => [...state,data])
        floorModalSetter(false)
    }
    const onAddFloorFail = () => {toastSetter('An error occured while adding a floor, please try again later')}
    const {onAddFloor} = useAddFloor(floors.length + 1,onAddFloorSuccess,onAddFloorFail)

    return (
        <Modal key={'floor-modal'} stateSetter={floorModalSetter} title="Are you sure you want to add a Floor?">
            <div className={styles["floor-modal-buttons"]}>
                <Button width="8rem" onClick={onAddFloor}>Yes</Button>
                <Button width="8rem" onClick={() => floorModalSetter(false)}>Cancel</Button>
            </div>
        </Modal>
    )
}