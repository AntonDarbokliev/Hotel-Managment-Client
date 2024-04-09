import { useState } from "react"
import { Button } from "../../../Shared/Button/Button"
import { Modal } from "../../../Shared/Modal/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "../../../../hooks/useForm"
import { InputFieldType } from "../../../../types/InputField"
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations"
import { useFormValidation } from "../../../../hooks/useFormValidation"
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList"


interface Props {
    modalSetter:  React.Dispatch<React.SetStateAction<boolean>>,
}

export const ChangeEmail:React.FC<Props> = ({modalSetter}) => {
    const [stage,setStage ] = useState(1)
    const {formValues,onChangeHandler} = useForm({
        Email: '',
        newEmail: ''
    },() => {})
    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        email: false,
        newEmail: false
    })

    const {isEmailValid} = useGeneralValidations(formValues,validationValues)

    const inputs = [
        {name: 'Email',display: 'Current Email',validation: !isEmailValid,errorMessage: 'Invalid Email'},
        {name: 'newEmail',display: 'New Email'},
    ] as InputFieldType[]

  return (
    <Modal stateSetter={modalSetter} title="Change Email">
          {stage == 1 && 
                <>
                    <form action="">
                        <InputFieldslist 
                        formValues={formValues} 
                        inputs={inputs} 
                        onBlurHandler={onBlurHandler} 
                        onFocusHandler={onFocusHandler}
                        onChangeHandler={onChangeHandler}
                        />
                    </form>
                    <Button onClick={() => setStage(2)}>Done</Button>
                </>
                }

                {stage == 2 && 
                <>
                    <FontAwesomeIcon size='6x' icon={faEnvelope}/>
                    <p>An email has been sent to <span className="highlight">{formValues.Email}</span></p>
                    <Button onClick={() => modalSetter(false)} >Close</Button>
                </>
                }
    </Modal>
  )
}

