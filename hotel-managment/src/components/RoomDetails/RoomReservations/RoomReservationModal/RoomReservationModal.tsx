import { FormEvent, useState } from "react"
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
import { useToastStore } from "../../../../stores/ToastStore"
import Spinner from "../../../Shared/LoadSpinner/LoadSpinner"
import { useNavigate, useParams } from "react-router-dom"
import { useGeneralValidations } from "../../../../hooks/Validations/useGeneralValidations"
import { Dropdown } from "../../../Shared/Dropdown/Dropdown"
import { useAreThereEmptyFields } from "../../../../hooks/useAreThereEmptyFields"

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
    date: { from: FromTo,to : FromTo},
}

export const RoomReservationModal:React.FC<Props> = ({modalSetter,date}) => {
    const [modalStage, setModalStage ] = useState(1)
    const from = `${date.from.year}-${date.from.month}-${date.from.day}`
    const to= `${date.to.year}-${date.to.month}-${date.to.day}`
    const setToastText = useToastStore(s => s.setToastText)
    const navigate = useNavigate()
    const params = useParams()

    const onFail= () => setToastText('An error occured while adding a reservation')
    const { reserveRoom,isLoading } = useReserveRoom(onFail,(data: {id:string}) => navigate(`/room/${params.id}/reservations/${data.id}`))

    enum GenderSelection {
        Female = 1,
        Other = 2,
        Male = 0,
    }
    const [selectedGender,setSelectedGender] = useState(0)

    const {formValues,onChangeHandler,onSubmit} = useForm({
        EGN: '',
        PhoneNumber: '',
        FirstName: '',
        LastName: '',
        EmailAddress: '',
        Address: '',
        IDN: '',
        Country: '',
        AdditionalInformation: ''
    },() => {
        reserveRoom({
            ...formValues,
            Gender: selectedGender,
            EGN: Number(formValues.EGN),
            From: from,
            To: to,
            IdentityDocumentNumber: Number(formValues.IDN)
        })
    })

    const { areThereEmptyFields } = useAreThereEmptyFields(formValues)
 
    const {onBlurHandler,onFocusHandler,validationValues} = useFormValidation({
        EGN: false,
        PhoneNumber: false,
        EmailAddress: false,
        FirstName: false,
        LastName: false,
        Gender: false,
        Address: false,
        IDN: false,
        Country: false,
        AdditionalInformation: true

    })

    const {
        isCountryValid,
        isPhoneNumberValid,
        isIDNValid
    } = useReserveValidations(formValues,validationValues)

    const {
        isAddressValid,
        isEGNValid,
        isFirstNameValid,
        isLastNameValid,
        isEmailAddressValid
    } = useGeneralValidations(formValues,validationValues)
    
    const listProps = {
        formValues,
        onChangeHandler,
        onBlurHandler,
        onFocusHandler,
        inputs: [
        { name: 'FirstName',errorMessage: 'First Name should be at least 2 characters long' ,validation: !isFirstNameValid, display: 'First Name'},
        { name: 'LastName',errorMessage: 'LastName should be at least 2 characters long' ,validation: !isLastNameValid, display: 'Last Name'},
        { name: 'PhoneNumber',errorMessage: 'Phone Number should be at least 5 characters long' ,validation: !isPhoneNumberValid, display: 'Phone Number', maxLength: 10},
        { name: 'EGN',errorMessage: 'EGN should be at least 10 characters long' ,validation: !isEGNValid,maxLength: 10,display: 'EGN/FPN'},
        { name: 'Address',errorMessage: 'Address should be at least 5 characters long' ,validation: !isAddressValid,},
        { name: 'IDN',errorMessage: 'IDN should be at least 5 characters long' ,validation: !isIDNValid, maxLength: 10},
        { name: 'Country',errorMessage: 'Country name should be at least 4 characters long' ,validation: !isCountryValid},
        { name: 'EmailAddress',errorMessage: 'Invalid Email' ,validation: !isEmailAddressValid,display: 'Email'},
        { name: 'AdditionalInformation',errorMessage: 'First Name should be at least 2 characters long' ,validation: true,display:'Additional Information (optional)'},
        ] as InputFieldType[]
    }
    return (
        <Modal stateSetter={modalSetter} title="Reserve">
            { !isLoading && 
            <>
            {modalStage == 1 && 
                <>
                <InputFieldslist {...listProps} ></InputFieldslist>
                <p>Gender</p>
                <Dropdown onChange={e => setSelectedGender(Number(e.target.value))}>
                    <option value=''>Select gender</option>
                    <option value={GenderSelection.Male}>Male</option>
                    <option value={GenderSelection.Female}>Female</option>
                    <option value={GenderSelection.Other}>Other</option>
                </Dropdown>
                <Button onClick={() => setModalStage(state => state + 1)} disable={areThereEmptyFields} >Next</Button>
                </>
            }

            {modalStage == 2 && 
                <>
                <div className={styles["stage-2"]}>
                <p><FontAwesomeIcon color="#4844bf" icon={faUser}/> Name: {formValues.FirstName} {formValues.LastName}</p>
                <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> From: {from}</p>
                <p><FontAwesomeIcon color="#4844bf" icon={faCalendarDays}/> To: {to}</p>
                <Button onClick={ (e?:FormEvent) => e ? onSubmit(e) : {}}>Finish</Button>
                </div>
                </>
            }
            
            </>
        }

        {isLoading && <Spinner/>}
            

        </Modal>
    )
}