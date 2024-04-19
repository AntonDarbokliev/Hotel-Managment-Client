import { useDeleteFloor } from "../../../../../hooks/Floors/useDeleteFloor";
import { useToastStore } from "../../../../../stores/ToastStore";
import { Floor } from "../../../../../types/FloorType";
import { Button } from "../../../../Shared/Button/Button"
import { Modal } from "../../../../Shared/Modal/Modal"
import styles from './DeleteFloor.module.scss';

interface Props {
    deleteFloorModalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    floor: Floor,
    floorsSetter: React.Dispatch<React.SetStateAction<Floor[]>>
}

export const DeleteFloorModal:React.FC<Props> = ({deleteFloorModalSetter,floor,floorsSetter}) => {

    const toastSetter = useToastStore(s => s.setToastText)

    const onDeleteFloorSuccess = () => {
        floorsSetter(state => state.filter(x => x.id !== floor!.id))
        deleteFloorModalSetter(false)
    }
    const onDeleteFloorFail = () => {toastSetter('An error occured while removing this floor, please try again later')}
    const { deleteFloor } = useDeleteFloor(floor.id,onDeleteFloorSuccess,onDeleteFloorFail)

    return (
        <Modal key={'delete-floor-modal'} title="Are you sure you want to delete this Floor?" stateSetter={deleteFloorModalSetter}>
            <p className={styles["delete-warning"]} >This will delete the current floor, along with all the rooms inside it.</p>
            <Button width="8rem" onClick={deleteFloor}>Yes</Button>
            <br />
            <Button width="8rem" onClick={() => deleteFloorModalSetter(false)}>Cancel</Button>
        </Modal>
    )
}