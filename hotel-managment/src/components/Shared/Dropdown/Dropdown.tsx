import { ReactNode } from 'react'
import styles from './Dropdown.module.scss'

interface Props {
    children: ReactNode,
    options: number[]
}

export const Dropdown: React.FC<Props> = ({options,children}) => {
    return (
        <select name="" id="" className={styles['dropdown']}>
            <option value="blank">{children}</option>
            {options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
    )
}