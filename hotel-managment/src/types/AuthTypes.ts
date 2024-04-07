export interface RegisterData {
    HotelName: string,
    HotelLocation: string,
    HotelTelephoneNumber: string,
    HotelPicture: File,
    HotelEmailAddress: string,
    Password: string
}

export interface AuthInfo {
    nameid: string,
    FullName: string,
    ProfilePicture: string,
    role: string,
    exp? : number
}
