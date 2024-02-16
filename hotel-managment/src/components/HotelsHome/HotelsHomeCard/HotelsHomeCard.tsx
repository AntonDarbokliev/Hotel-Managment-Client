import { Hotel } from '../../../types/HotelTypes'
import styles from './HotelsHomeCard.module.scss'
import testImage from '../../../assets/hotel-test.jpg'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// export const HotelsHomeCard = (hotel: Hotel) => {

    const testHotel: Hotel = {
        name: 'Hotel Bulgaria',
        email: 'hotelbulgariaaaaaaaaaaaaaaaaaaa@gmail.com',
        location: 'Sofia, Bulgaria',
        photo: testImage
    }

        export const HotelsHomeCard = () => {
    return (
        <>
        <div className={styles['hotel-card']}>
            
            <div className={styles['hotel-card-image__div']}>
            <img className={styles['hotel-card__image']} src={testHotel.photo} alt="" />
            </div>

            <div className={styles['hotel-card-info__div']}>
                <h4>{testHotel.name}</h4>
                <div className={styles['hotel-card-info-email']}>
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <p>{testHotel.email}</p>
                </div>
                <div className={styles['hotel-card-info-address']}>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <p>{testHotel.location}</p>
                </div>
            </div>
        </div>
        </>
    )
}