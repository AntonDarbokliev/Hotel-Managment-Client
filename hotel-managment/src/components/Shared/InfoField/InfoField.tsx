import { ReactNode } from 'react';
import styles from './InfoField.module.scss';

interface Props {
    children: ReactNode,
    height?: string,
    width?: string,
    align?: string,
    justify?: string
}

export const InfoField: React.FC<Props> = ({children,height,width,align,justify}) => {
    return (
        <div style={{height:height,width: width,alignItems: align,justifyContent: justify}} className={styles["room-info"]}>
            {children}
        </div>

    )
}