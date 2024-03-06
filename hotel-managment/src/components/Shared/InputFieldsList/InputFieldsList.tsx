import { FormEvent } from "react"
import { InputField } from "../InputField/InputField"
import { InputFieldType } from "../../../types/InputField"


interface Props {
    inputs: InputFieldType[],
    formValues : {[key:string] : string},
    onChangeHandler: (e:FormEvent) => void,
    onBlurHandler: (name:string) => void,
    onFocusHandler: (name:string) => void
}

export const InputFieldslist:React.FC<Props> = ({formValues,inputs,onBlurHandler,onChangeHandler,onFocusHandler}) => {

    const change = (e:FormEvent) => onChangeHandler(e)

    return (
        <>
        {inputs.map(input => 
        <InputField 
        key={input.name}
        onChange={change}
        onBlurHandler={() =>  onBlurHandler(input.name)}
        onFocusHandler={() => onFocusHandler(input.name)}
        isValid={{boolean: input.validation!, errorMessage: input.errorMessage!} }
        value={formValues[input.name]} 
        name={input.name}
        maxLength={input.maxLength}
        accept={input.accept}
        type={input.type}
        >{input.name}</InputField>)}
        </>
    )
}