import { 
    IconDefinition, 
    faBath, 
    faTv, 
    faVault,
    faCheck, 
    faCertificate,
    faMugHot,
    faFan,
    faLemon
} from '@fortawesome/free-solid-svg-icons'
// import { faBath } from '@fortawesome/free-solid-svg-icons'
// import { faTv } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AmenityCard.module.scss'
import { Amenity } from '../../../../types/AmenityType'

interface Props {
    name: string,
    id?: string,
    icon?: IconDefinition,
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    amenities?: Amenity[]
}

export const AmenityCard: React.FC<Props> = ({name,onClick,amenities}) => {
    
    const extrasLib: Record<string, IconDefinition> = {
        Safe: faVault,
        Bathtub: faBath,
        TV: faTv,
        Coffe: faMugHot,
        AC: faFan,
        Fridge: faLemon
   }


    return (
        <div  onClick={onClick} id={name} className={styles['amenity-card']}>
            {extrasLib[name] && 
            <FontAwesomeIcon size='2x' color='#4844bf' icon={extrasLib[name]}/>
            }

            {!extrasLib[name] && 
            <FontAwesomeIcon size='2x' color='#4844bf' icon={faCertificate}/>
            }
            <p>{name}</p>
            {amenities?.some(x => x.name === name) && 
                <FontAwesomeIcon className={styles['check']} color='#4844bf' icon={faCheck}/>
            }
        </div>
    )
}