export interface ReserveRoom {
    EGN: number,
    IdentityDocumentNumber: number,
    FirstName: string,
    LastName: string,
    Gender?: number,
    Country: string,
    Address: string,
    EmailAddress?: string,
    AdditionalInformation?: string,
    From: string,
    To: string,
    // RoomId: string
}