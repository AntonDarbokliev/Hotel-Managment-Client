import { Hotel } from '../../../types/HotelTypes'
import styles from './HotelsHomeCard.module.scss'
import testImage from '../../../assets/hotel-test.jpg'

// export const HotelsHomeCard = (hotel: Hotel) => {

    const testHotel: Hotel = {
        name: 'Hotel Bulgaria',
        email: 'test@gmail.com',
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
                <p>{testHotel.email}</p>
                <p>{testHotel.location}</p>
            </div>
        </div>
        </>
    )
}