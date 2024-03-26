import styles from './ConfirmEmail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export const ConfirmEmail = () => {
    return (
        <>
        <div className={styles['confirm-email']}>
            
        <FontAwesomeIcon size='10x' icon={faEnvelope} style={{color: "#4844bf",}} />  
        <h2 className={styles['confirm-text']}>Email sent!</h2>
        <h2 className={styles['confirm-text']}>Please check your <span className='highlight'>inbox</span> to view your hotel code.</h2>
        <p style={{fontSize:'1.5rem',marginTop:'2rem'}}>Go to <Link to={'/login'}><span className='highlight'>Login</span></Link></p>
        </div>
        </>
    )
}