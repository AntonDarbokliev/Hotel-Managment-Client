import { ChangeEvent, FormEvent, useCallback, useState } from "react"


export const useForm = <T>(initialValue : T,onSubmitHandler : (values: T) => void) => {
    const [formValues, setFormValues ] = useState(initialValue)

    const onChangeHandler = useCallback( (e: FormEvent | ChangeEvent) => {
        const element = e.target as HTMLInputElement
        setFormValues((state) => ({...state, [element.name] : element.value }))
    },[])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmitHandler(formValues)
    }

    const resetForm = () => {
        setFormValues(initialValue)
    }

    return {
        formValues,
        onSubmit,
        onChangeHandler,
        resetForm
    }
}