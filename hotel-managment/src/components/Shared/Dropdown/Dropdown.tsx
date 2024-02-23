import { ChangeEvent, ReactNode } from 'react'
import styles from './Dropdown.module.scss'

interface Props {
    children: ReactNode,
    options: number[],
    onChange? : (e:ChangeEvent) => void,
    value?:string,
    name? :string,
}

export const Dropdown: React.FC<Props> = ({options,children,onChange,value,name}) => {
    return (
        <select name={name} className={styles['dropdown']} onChange={onChange} value={value}>
            <option value="">{children}</option>
            {options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
    )
}