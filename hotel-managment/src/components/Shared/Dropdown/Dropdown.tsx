import { ChangeEvent, ReactNode } from 'react'
import styles from './Dropdown.module.scss'

interface Props {
    children: ReactNode,
    onChange? : (e:ChangeEvent<HTMLSelectElement>) => void,
    value?:string,
    name? :string,
}

export const Dropdown: React.FC<Props> = ({children,onChange,value,name}) => {
    return (
        <select name={name} className={styles['dropdown']} onChange={onChange} value={value}>
            {children}
        </select>
    )
}