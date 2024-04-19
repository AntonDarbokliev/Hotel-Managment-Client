import styles from './SearchBar.module.scss';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
    searchText: string,
    setSearchText: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<Props> = ({searchText,setSearchText}) => {
    return (
        <div className={styles["search-bar"]}>
            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className={styles["search"]} placeholder="search..."></input>
            <FontAwesomeIcon color='#4844bf' icon={faMagnifyingGlass}/>
        </div>
    )
}