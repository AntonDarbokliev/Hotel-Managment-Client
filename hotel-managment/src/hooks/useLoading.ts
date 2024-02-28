import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestWithLoading = async (callback: () => Promise<any>) => {
        setIsLoading(true)
        try {
            const result = await callback()
            return result
        } catch (error) {
            console.log('Error from loading',error)
            throw error
    }finally{
        setIsLoading(false)
    }
    }

    return {
        isLoading,
        requestWithLoading
    }
}
