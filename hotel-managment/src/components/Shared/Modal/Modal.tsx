import { ReactNode } from "react"
import styles from './Modal.module.scss';

interface Props {
    title: string,
    children: ReactNode,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Modal:React.FC<Props> = ({title,children,stateSetter}) => {

    return (
        <div className={styles["modal-backdrop"]} onClick={() => stateSetter(false)}>
            <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
                <p className={styles["close-button"]} onClick={() => stateSetter(false)}>x</p>
                <h1>{title}</h1>
                <div className={styles["modal-content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}