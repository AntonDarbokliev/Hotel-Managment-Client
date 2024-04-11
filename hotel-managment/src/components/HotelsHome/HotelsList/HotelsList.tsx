import { Hotel } from '../../../types/HotelTypes';
import Spinner from '../../Shared/LoadSpinner/LoadSpinner';
import { HotelsHomeCard } from '../HotelsHomeCard/HotelsHomeCard';
import styles from './HotelsList.module.scss';

interface Props {
    hotels: Hotel[],
    isLoading: boolean,
}

export const HotelsList: React.FC<Props> = ({hotels,isLoading}) => {
    return (
    <div className={styles["hotels-list"]}>
        {isLoading && 
            <Spinner></Spinner>
        }
        {!isLoading && 
        <>
            {hotels.map((hotel) => <HotelsHomeCard key={hotel.id} hotel={hotel}/>)}
        </>
        }
      
    </div>
    )
}