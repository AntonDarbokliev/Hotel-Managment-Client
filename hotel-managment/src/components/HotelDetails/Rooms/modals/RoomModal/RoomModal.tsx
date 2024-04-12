import { useAddRoom } from "../../../../../hooks/Rooms/useAddRoom";
import { useForm } from "../../../../../hooks/useForm";
import { Floor } from "../../../../../types/FloorType";
import { Button } from "../../../../Shared/Button/Button";
import { InputField } from "../../../../Shared/InputField/InputField";
import { Modal } from "../../../../Shared/Modal/Modal";
import styles from "./RoomModal.module.scss";

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
    roomsSetter: React.Dispatch<
        React.SetStateAction<
            {
                roomNumber: number;
                id: string;
            }[]
        >
    >;
    floor: Floor;
}

export const RoomModal: React.FC<Props> = ({ floor, modalSetter, roomsSetter }) => {
    const afterAdd = () => {
        modalSetter(false);
    };

    const { addRoom } = useAddRoom(roomsSetter, afterAdd);

    const { formValues, onChangeHandler } = useForm(
        {
            roomNumber: "",
        }, () => addRoom
    );

    return (
        <Modal key={"room-modal"} stateSetter={modalSetter} title="Add a Room">
            <form action="" className={styles["room-modal-form"]}>
                <InputField type="number" name="roomNumber" value={formValues.roomNumber} onChange={onChangeHandler}>
                    Room Number
                </InputField>
                <p>Floor: {floor.floorNumber}</p>
                <br />
            </form>
                <Button
                    width="12rem"
                    disable={formValues.roomNumber == ""}
                    onClick={() => addRoom( floor.id, formValues.roomNumber)}
                >
                    Add Room
                </Button>
        </Modal>
    );
};
