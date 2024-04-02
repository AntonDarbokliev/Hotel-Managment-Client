export interface ReceivedRoomReservation {
    id: string
    name: string,
    from: string,
    to: string,
    additionalInformation: string,
    price: number,
    guest: {
        id: string,
        egn: number,
        identityDocumentNumber: number,
        firstName: string,
        lastName: string,
        gender: string,
        country: string,
        address: string,
        emailAddress: string | null,
        additionalInformation : string

    }
}