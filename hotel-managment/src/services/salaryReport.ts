import { RequestFactory } from "./requester"

const baseUrl = `${import.meta.env.VITE_BASE_URL}/SalaryReport`

export const salaryReportServiceFactory = () => {
    const request = RequestFactory()

    return {
        create: (employeeData:FormData) => request.post(baseUrl,employeeData)
    }
}