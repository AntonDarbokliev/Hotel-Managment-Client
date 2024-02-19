import { Hotel } from '../../../types/HotelTypes'
import styles from './HotelsHomeCard.module.scss'
import testImage from '../../../assets/hotel-test.jpg'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

    interface Props {
       hotel:Hotel
    }

        export const HotelsHomeCard:React.FC<Props> = ({ hotel }) => {
    return (
        <>
        <div className={styles['hotel-card']}>
            
            <div className={styles['hotel-card-image__div']}>
            <img className={styles['hotel-card__image']} src={testImage} alt="" />
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