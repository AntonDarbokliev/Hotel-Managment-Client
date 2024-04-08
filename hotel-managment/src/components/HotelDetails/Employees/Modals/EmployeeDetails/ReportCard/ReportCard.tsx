import { SalaryReport } from "../../../../../../types/SalaryReport";
import styles from './ReportCard.module.scss';

interface Props {
    report: SalaryReport 
}

export const ReportCard:React.FC<Props> = ({report}) => {
    return (
        <div className={styles["salary-report"]}>
            <table>
                <tbody>
                    <tr><th>Salary</th><td>{report.salary}</td></tr>  
                    <tr><th>Report Date</th><td>{String(report.date)}</td></tr>  
                    <tr><th>Has been payed</th><td>{report.isPaid ? 'Yes': 'No'}</td></tr>  
                </tbody>
            </table>
        </div>
    )
    }