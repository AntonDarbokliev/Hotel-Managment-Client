import { ReactNode } from "react"
import styles from './TabButton.module.scss'
import { useNavigate, useParams } from "react-router-dom"
interface Props {
    children:ReactNode,
    to:string
}


export const TabButton:React.FC<Props> = ({children,to}) => {
    const navigate = useNavigate()
    const params = useParams()

    return (
        <button style={params['*']!.includes(String(children).toLocaleLowerCase()) ? {color: "#4844bf" } : {}} 
        className={`${styles["tab"]} ${params['*']!.includes(String(children).toLocaleLowerCase()) ? styles['active'] : ''}`} 
        onClick={() => navigate(`/${to}${ params.id ?  '/' + params.id : ''}/${String(children).toLocaleLowerCase()}`)}>
            {children}
        </button>
    )
}