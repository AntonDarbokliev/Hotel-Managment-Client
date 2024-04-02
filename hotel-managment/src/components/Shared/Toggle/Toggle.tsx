import styles from './Toggle.module.scss'

export const Toggle = () => {
    return (
        <label className={styles["toggle"]}>
            <input type="checkbox" />
            <span className={styles["slider"]}/>
        </label>
    )
}