import { Details } from "../Shared/Details/Details"

export const RoomDetails = () => {
    // Temporary variables
    const isLoading = false
    const title = 'Room panel'
    
    const tabs = ['Info', 'Reservations','History']

    return (
        <Details root="room" isLoading={isLoading} title={title} tabs={tabs}></Details>
    )
}