import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from './SettingsOption.module.scss'

interface Props {
    children:ReactNode,
    icon?: IconDefinition,
    onClick?: () => void,
    redirectTo?: string;
}

export const SettingsOption: React.FC<Props> = ({children,icon,onClick,redirectTo}) => {
    return (
        <div className={styles["option"]} onClick={onClick}>
            <Link  to={redirectTo ?? ''}>
                <p> {icon && <FontAwesomeIcon icon={icon}/> } {children} </p>
            </Link>
        </div>
    )
}