import { Outlet } from "react-router-dom"
import { Navigation } from "../Navigation/Navigation"
import styles from './Root.module.scss'
import { useToastStore } from "../../stores/ToastStore"
import { ToastNotification } from "../Shared/ToastNotification/ToastNotification"
import { AnimatePresence } from "framer-motion"

export const Root = () => {
    const toastText = useToastStore(s => s.toastText)
    const setToastText = useToastStore(s => s.setToastText)
    const positive = useToastStore(s => s.positive)

    return (
        <>
        <AnimatePresence>
        {toastText && 
        <ToastNotification text={toastText} positive={positive} setText={setToastText} timer={3000}/>
        }
        </AnimatePresence>
        <Navigation/>
        <div id={styles["main"]}>
            <Outlet/>
        </div>
        </>
    )
}