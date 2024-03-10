import { Outlet } from 'react-router-dom'
import { TabButton } from '../../HotelDetails/TabButton/TabButton'
import styles from  './Details.module.scss' 
import Spinner from '../LoadSpinner/LoadSpinner'

interface Props {
    isLoading: boolean,
    tabs: string[]
    title?: string,
}


export const Details: React.FC<Props> = ({isLoading,title,tabs}) => {
    return (
        <div className={styles['container']}>
        {!isLoading && 
        <>
            <h1>{title}</h1>
        <div className={styles["details"]}>
            <div className={styles["tabs"]}>
                {tabs.map(x => <TabButton to={ title =='Room panel' ? 'room' : 'hotels'} key={x}>{x}</TabButton>)}
            </div>
            <div className={styles["tab-content"]}>
                <Outlet/>
            </div>
        </div>
        </>
        }

        {isLoading && 
            <Spinner/>
        }

    </div>
    )
}