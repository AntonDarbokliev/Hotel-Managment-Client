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
import { useReserveRoom } from "../../../../hooks/Rooms/useReserveRoom"
import { FromTo } from "../../../../types/CalendarFromTo"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    date: { from: FromTo,to : FromTo}
}

export const RoomReservationModal:React.FC<Props> = ({modalSetter,date}) => {
    const [modalStage, setModalStage ] = useState(1)
    const from = `${date.from.year}-${date.from.month}-${date.from.day}`
    const to= `${date.to.year}-${date.to.month}-${date.to.day}`

    const onFail= () => console.log('err')
    const { reserveRoom } = useReserveRoom(onFail)

    const {formValues,onChangeHandler,onSubmit} = useForm({
        EGN: '',
        PhoneNumber: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        Address: '',
        IDN: '',
        Country: '',
        AdditionalInformation: '(optional)'
    },() => {
        reserveRoom({
            ...formValues,
            Gender: Number(formValues.Gender),
            EGN: Number(formValues.EGN),
            From: from,
            To: to,
            IdentityDocumentNumber: Number(formValues.IDN)
        })
    })

    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        EGN: false,
        PhoneNumber: false,
        FirstName: false,
        LastName: false,
        Gender: false,
        Address: false,
        IDN: false,
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
        isIDNValid
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
        { name: 'EGN',errorMessage: 'EGN should be at least 10 characters long' ,validation: !isEGNFPNValid,maxLength: 10,display: 'EGN/FPN'},
        { name: 'Address',errorMessage: 'Address should be at least 5 characters long' ,validation: !isAddressValid,},
        { name: 'IDN',errorMessage: 'IDN should be at least 5 characters long' ,validation: !isIDNValid, maxLength: 10,type: 'number'},
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
                    <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> From: {from}</p>
                    <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> To: {to}</p>
                    <Button onClick={onSubmit}>Finish</Button>
            </div>
            </>
            }

        </Modal>
    )
}