 export interface Hotel {
    name:string,
    email: string,
    address: string,
    profilePicture: string 
    id: string ,
    telephoneNumber: string
}

export interface HotelSendType {
    name:string,
    email: string,
    address: string,
    profilePicture: File ,
    telephoneNumber: string,
}