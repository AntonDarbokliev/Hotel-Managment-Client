import { Button } from "../../../../../Shared/Button/Button"
import styles from './CreateSalaryReport.module.scss';

interface Props {
    createReport: () => void,
    onCancel: () => void
}

export const CreateSalaryReport:React.FC<Props> = ({createReport,onCancel}) => {
    return (
        <>
        <form action="">
            <h1>Create Report?</h1>
        </form>
            <div className={styles["buttons-div"]}>
            <Button onClick={createReport}>Create</Button><Button onClick={onCancel}>Cancel</Button>
            </div>
        </>
    )
}