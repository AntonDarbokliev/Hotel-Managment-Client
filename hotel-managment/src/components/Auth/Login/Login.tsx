import { Link } from "react-router-dom"
import { Button } from "../../Shared/Button/Button"
import { InputField } from "../../Shared/InputField/InputField"
import styles from './Login.module.scss'


export const Login = () => {
    return (
        <div className={styles["login"]}>
    

            <h1>Welocome back!</h1>

            <form className={styles["login-form"]}>
                <InputField>E-mail</InputField>
                <InputField>Hotel code</InputField>
                <Button>Login</Button>
            </form>
            <p>Don't have a registration? <Link  to="/register">Sign up.</Link></p>
        </div>
    )
} 