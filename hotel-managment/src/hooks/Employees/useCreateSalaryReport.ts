import { salaryReportServiceFactory } from "../../services/salaryReport"
import { useToastStore } from "../../stores/ToastStore"
import { ErrorObj } from "../../types/ErrorTypes"
import { extractErrors } from "../../utils/extractErrors"
import { makeFormData } from "../../utils/makeFormData"

const salaryReportService = salaryReportServiceFactory()

export const useCreateSalaryReport = (employeeId: string) => {
    const setToast = useToastStore(s => s.setToastText)

    const createReport = async (afterCreate: ( ) => void) => {
        try {
            const dataObject = {EmployeeId: employeeId}
            const formData = makeFormData(dataObject)
            await salaryReportService.create(formData)
            afterCreate()
        } catch (error) {
            const text = extractErrors(error as ErrorObj)
            setToast(text)        
        }
    }
    return {
        createReport
    }
}
