export interface RegisterData {
    HotelName: string,
    HotelLocation: string,
    HotelTelephoneNumber: string,
    HotelPicture: File,
    HotelEmailAddress: string,
    Password: string
}

export interface AuthInfo {
    nameId: string,
    FullName: string,
    ProfilePicture: string,
    exp? : number
}
