import { SalaryReport } from "./SalaryReport"

export interface ReceivedEmployee {
    firstName:string,
    middleName: string,
    lastName: string,
    egn: string,
    address: string,
    roles: string[],
    email: string
    id: string,
    isActive: boolean,
    salary: number,
    salaryReports: SalaryReport[],
    hotelId: string
}