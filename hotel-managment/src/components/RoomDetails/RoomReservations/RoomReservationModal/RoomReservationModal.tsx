import { useState } from "react"
import { Modal } from "../../../Shared/Modal/Modal"
import { Button } from "../../../Shared/Button/Button"
import { InputFieldslist } from "../../../Shared/InputFieldsList/InputFieldsList"
import { useForm } from "../../../../hooks/useForm"
import { useFormValidation } from "../../../../hooks/useFormValidation"
import { InputFieldType } from "../../../../types/InputField"
import { useReserveValidations } from "../../../../hooks/Validations/useReserveValidations"
import {faCalendarDays,faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles  from './RoomReservationModal.module.scss'

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    date: {month:number,year:number, from: number,to : number}
}

export const RoomReservationModal:React.FC<Props> = ({modalSetter,date}) => {
    const [modalStage, setModalStage ] = useState(1)

    const {formValues,onChangeHandler,onSubmit} = useForm({
        'EGN/FPN': '',
        PhoneNumber: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        Address: '',
        ICN: '',
        Country: '',
        AdditionalInformation: '(optional)'
    },() => {})

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        'EGN/FPN': false,
        PhoneNumber: false,
        FirstName: false,
        LastName: false,
        Gender: false,
        Address: false,
        ICN: false,
        Country: false,
        AdditionalInformation: true

    })

    const {
        disableButton,
        isAddressValid,
        isEGNFPNValid,
        isFirstNameValid,
        isLastNameValid,
        isCountryValid,
        isPhoneNumberValid,
        isGenderValid,
        isICNValid
    } = useReserveValidations(formValues,validationValues)

    const listProps = {
        formValues,
        onChangeHandler,
        onBlurHandler,
        onFocusHandler,
        inputs: [
        { name: 'FirstName',errorMessage: 'First Name should be at least 2 characters long' ,validation: !isFirstNameValid, display: 'First Name'},
        { name: 'LastName',errorMessage: 'LastName should be at least 2 characters long' ,validation: !isLastNameValid, display: 'Last Name'},
        { name: 'PhoneNumber',errorMessage: 'Phone Number should be at least 5 characters long' ,validation: !isPhoneNumberValid, display: 'Phone Number'},
        { name: 'Gender',errorMessage: 'Gender is required' ,validation: !isGenderValid},
        { name: 'EGN/FPN',errorMessage: 'EGN should be at least 10 characters long' ,validation: !isEGNFPNValid,maxLength: 10},
        { name: 'Address',errorMessage: 'Address should be at least 5 characters long' ,validation: !isAddressValid,},
        { name: 'ICN',errorMessage: 'ICN should be at least 5 characters long' ,validation: !isICNValid, maxLength: 10},
        { name: 'Country',errorMessage: 'Country name should be at least 4 characters long' ,validation: !isCountryValid},
        { name: 'AdditionalInformation',errorMessage: 'First Name should be at least 2 characters long' ,validation: true,display:'Additional Information'},
        ] as InputFieldType[]
    }
    return (
        <Modal stateSetter={modalSetter} title="Reserve">
            {modalStage == 1 && 
            <>
                <InputFieldslist {...listProps} ></InputFieldslist>
                <Button onClick={() => setModalStage(state => state + 1)} disable={disableButton}>Next</Button>
            </>

            }

            {modalStage == 2 && 
            <>
            <div className={styles["stage-2"]}>
                    <p><FontAwesomeIcon color="#4844bf" icon={faUser}/> Name: {formValues.FirstName} {formValues.LastName}</p>
                    <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> From: {date.month}/{date.from}/{date.year}</p>
                    <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> To: {date.month}/{date.to}/{date.year}</p>
                    <Button>Finish</Button>
            </div>
            </>
            }

        </Modal>
    )
}