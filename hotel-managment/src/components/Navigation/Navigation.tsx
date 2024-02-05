import styles from './Navigation.module.scss';

export const Navigation = () => {
    return (
        <>
            <div className={styles["sideBar"]}>
                <div className={styles['hotelImage-container']}>
                    <img src="" alt="" className={styles['hotelImage']} />
                </div>
                    <p>Hotel Bulgaria</p>

                <ul className={styles['sideBar-list']}>
                    <li><a href="">Home</a></li>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                </ul>
            </div>
        </>
    )
} 