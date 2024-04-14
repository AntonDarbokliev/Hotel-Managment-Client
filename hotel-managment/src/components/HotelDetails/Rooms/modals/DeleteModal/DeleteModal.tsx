import { useDeleteFloor } from "../../../../../hooks/Floors/useDeleteFloor";
import { Floor } from "../../../../../types/FloorType";
import { Button } from "../../../../Shared/Button/Button";
import { Modal } from "../../../../Shared/Modal/Modal";
import styles from "./DeleteModal.module.scss";

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    floorId: string,
    floorsSetter: React.Dispatch<React.SetStateAction<Floor[]>>
}

export const DeleteModal: React.FC<Props> = ({modalSetter,floorId,floorsSetter}) => {

    const onDeleteFloorSuccess = () => {
        floorsSetter(state => state.filter(x => x.id !== floorId))
        modalSetter(false)
    }

    const { deleteFloor } = useDeleteFloor(floorId,onDeleteFloorSuccess)

    return (
        <Modal title="Are you sure you want to delete this Floor?" stateSetter={modalSetter}>
            <p className={styles["delete-warning"]}>This will delete the current floor, along with all the rooms inside it.</p>
            <Button width="8rem" onClick={deleteFloor}>
                Yes
            </Button>
            <br />
            <Button width="8rem" onClick={() => modalSetter(false)}>
                Cancel
            </Button>
        </Modal>
    );
};
