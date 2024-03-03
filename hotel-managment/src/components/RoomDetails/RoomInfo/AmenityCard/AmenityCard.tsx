import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
// import { faBath } from '@fortawesome/free-solid-svg-icons'
// import { faMugHot } from '@fortawesome/free-solid-svg-icons'
// import { faTv } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCertificate } from '@fortawesome/free-solid-svg-icons'
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

export const AmenityCard: React.FC<Props> = ({name, icon,onClick,amenities}) => {
    return (
        <div  onClick={onClick} id={name} className={styles['amenity-card']}>
            {icon && 
            <FontAwesomeIcon size='2x' color='#4844bf' icon={icon}/>
            }

            {!icon && 
            <FontAwesomeIcon size='2x' color='#4844bf' icon={faCertificate}/>
            }
            <p>{name}</p>
            {amenities?.some(x => x.name === name) && 
                <FontAwesomeIcon className={styles['check']} color='#4844bf' icon={faCheck}/>
            }
        </div>
    )
}