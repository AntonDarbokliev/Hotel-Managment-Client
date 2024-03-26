import { useState } from "react"
import { Button } from "../../../Shared/Button/Button"
import { Modal } from "../../../Shared/Modal/Modal"
import styles from './ResetPassword.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface Props {
    modalSetter:  React.Dispatch<React.SetStateAction<boolean>>,
    userEmail: string;
}

export const ResetPassword:React.FC<Props> = ({modalSetter,userEmail}) => {
    const [stage,setStage] = useState(1)

    const closeModal = () => modalSetter(false)
    return (
            <Modal stateSetter={modalSetter} title="Reset Account Password">
                {stage == 1 && 
                <>
                    <p>An email containing a link to reset your password will be sent to you.</p>
                    <div className={styles["buttons"]}>
                    <Button onClick={() => setStage(2)}>Okay</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                    </div>
                </>
                }

                {stage == 2 && 
                <>
                    <FontAwesomeIcon size='6x' icon={faEnvelope}/>
                    <p>An email has been sent to <span className="highlight">{userEmail}</span></p>
                    <Button onClick={closeModal} >Close</Button>
                </>
                }
            </Modal>
    )
} 