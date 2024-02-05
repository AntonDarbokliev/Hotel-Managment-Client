import { Outlet } from "react-router-dom"
import { Navigation } from "../Navigation/Navigation"
import styles from './Root.module.scss'

export const Root = () => {
    return (
        <>
        <Navigation/>
        <div id={styles["main"]}>
            <Outlet/>
        </div>
        </>
    )
}