import { useAddFloor } from "../../../../../hooks/Floors/useAddFloor";
import { Floor } from "../../../../../types/FloorType";
import { Button } from "../../../../Shared/Button/Button";
import { Modal } from "../../../../Shared/Modal/Modal";
import styles from "./FloorModal.module.scss";

interface Props {
    totalFloors: number,
    floorSetter: React.Dispatch<React.SetStateAction<Floor[]>>,
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
}

export const FloorModal: React.FC<Props> = ({totalFloors,floorSetter,modalSetter}) => {


    const onAddFloorSuccess = (data:Floor) => {
        floorSetter((state) => [...state,data])
        modalSetter(false)
    }
    const {onAddFloor} = useAddFloor(totalFloors,onAddFloorSuccess)

    return (
        <Modal key={"floor-modal"} stateSetter={modalSetter} title="Are you sure you want to add a Floor?">
            <div className={styles["floor-modal-buttons"]}>
                <Button width="8rem" onClick={onAddFloor}>
                    Yes
                </Button>
                <Button width="8rem" onClick={() => modalSetter(false)}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};
