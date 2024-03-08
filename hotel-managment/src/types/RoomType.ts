import { Amenity } from "./AmenityType";

export interface Room {
    floor: number,
    floorId: string,
    id: string,
    roomNumber: number,
    roomExtras: Amenity[],
}
    