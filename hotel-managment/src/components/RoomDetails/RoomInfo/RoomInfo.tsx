import { useEffect, useState } from "react";
import { roomServiceFactory } from "../../../services/room";
import { useParams } from "react-router-dom";
import { AmenityCard } from "./AmenityCard/AmenityCard";
import { faCircleInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./RoomInfo.module.scss";
import { Button } from "../../Shared/Button/Button";
import { AmenityModal } from "./AmenityModal/AmenityModal";
import { useLoading } from "../../../hooks/useLoading";
import Spinner from "../../Shared/LoadSpinner/LoadSpinner";
import { Room } from "../../../types/RoomType";
import { InfoField } from "../../Shared/InfoField/InfoField";
import { EditModal } from "./EditModal/EditModal";

export const RoomInfo = () => {
    const roomService = roomServiceFactory();
    const params = useParams();
    const [room, setRoom] = useState<Room>();
    const [amenityModal, setAmenityModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { requestWithLoading, isLoading } = useLoading();

    useEffect(() => {
        requestWithLoading(() =>
            roomService
                .getSingle(params.id!)
                .then((data: { room: Room }) => setRoom(data.room))
        );
    }, []);

    return (
        <>
            <div className={styles["container"]}>
                <AnimatePresence>
                    {amenityModal && (
                        <AmenityModal
                            currentAmenities={room!.roomExtras}
                            roomSetter={setRoom}
                            modalSetter={setAmenityModal}
                        />
                    )}
                    {editModal && (
                        <EditModal roomSetter={setRoom} room={room!} modalSetter={setEditModal} />
                    )}
                </AnimatePresence>

                {!isLoading && (
                    <div className={styles["room-info"]}>
                        <span className={styles["edit-button"]}>
                            <Button data-testid='edit-btn' onClick={() => setEditModal(true)}>
                                <FontAwesomeIcon  icon={faPenToSquare} />
                            </Button>
                        </span>

                        <InfoField>
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                color="#4844bf"
                            />
                            <p>Floor: {room?.floor.floorNumber}</p>
                            <p>Number: {room?.roomNumber}</p>
                            <p>
                                Status: {room?.isBooked ? "Occupied" : "Free"}
                            </p>
                            <p>Cleaned: {room?.isCleaned ? "Yes" : "No"}</p>
                        </InfoField>

                        <h1>Amenities</h1>
                        <div className={styles["amenities"]}>
                            {room?.roomExtras.map((extra) => (
                                <AmenityCard
                                    key={extra.name}
                                    name={extra.name}
                                />
                            ))}
                        </div>
                        <Button onClick={() => setAmenityModal(true)}>
                            Add Amenities
                        </Button>
                        <br />
                    </div>
                )}

                {isLoading && <Spinner />}
            </div>
        </>
    );
};
