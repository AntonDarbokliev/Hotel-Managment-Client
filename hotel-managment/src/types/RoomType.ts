import { Amenity } from "./AmenityType";

export interface Room {
    id: string,
    roomNumber: number,
    roomExtras: Amenity[],
    isBooked: boolean,
    isCleaned: boolean,
    floor: {
        floorNumber:number,
        id: string,
    },
    pricePerNight: number,
    peopleCapacity: number,
}
    