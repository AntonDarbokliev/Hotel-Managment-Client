import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError ] = useState<Error | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestMethod = async (callback: () => Promise<any>) => {
        setIsLoading(true)
        try {
            const result = await callback()
            setIsLoading(false)
            return result
        } catch (error) {
            if(error instanceof Error)
            setError(error)
            setIsLoading(false)
        } 
    }

    return {
        isLoading,
        error,
        requestMethod
    }
}
