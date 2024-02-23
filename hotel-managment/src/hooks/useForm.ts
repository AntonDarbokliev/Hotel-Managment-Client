import { ChangeEvent, FormEvent, useState } from "react"


export const useForm = <T>(initialValue : T,onSubmitHandler : (values: T) => void) => {
    const [formValues, setFormValues ] = useState(initialValue)

    const onChangeHandler = (e: FormEvent | ChangeEvent) => {
        const element = e.target as HTMLInputElement
        setFormValues((state) => ({...state, [element.name] : element.value }))
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmitHandler(formValues)
    }

    return {
        formValues,
        onSubmit,
        onChangeHandler
    }
}