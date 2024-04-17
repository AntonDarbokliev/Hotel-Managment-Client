import { Hotel } from '../../../types/HotelTypes'
import styles from './HotelsHomeCard.module.scss'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

    interface Props {
       hotel:Hotel
    }

    export const HotelsHomeCard:React.FC<Props> = ({ hotel }) => {
        const navigate = useNavigate();

        return (
            <>
            <div className={styles['hotel-card']} onClick={() => {
                navigate('/hotels/' + hotel.id + '/rooms')
                
            } }>
                
                <div className={styles['hotel-card-image__div']}>
                    <img className={styles['hotel-card__image']} src={hotel.profilePicture} alt="hotel picture" />
                </div>

                <div className={styles['hotel-card-info__div']}>
                    <h4>{hotel.name}</h4>
                    <div className={styles['hotel-card-info-address']}>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <p>{hotel.address}</p>
                    </div>
                </div>
            </div>
            </>
        )
    }