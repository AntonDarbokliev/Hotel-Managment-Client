import { Link } from 'react-router-dom'
import { Button } from '../../Shared/Button/Button'
import { InputField } from '../../Shared/InputField/InputField'
import styles from './Register.module.scss'

export const Register = () => {
    return (
        <div className={styles["login"]}>
    

            <h1>Welcome!</h1>

            <form className={styles["login-form"]}>
                <InputField>E-mail</InputField>
                <InputField>Phone Number</InputField>
                <InputField>Country, City, Address</InputField>
                <InputField>Password</InputField>
                <InputField>Repeat-Password</InputField>
                <Button>Register</Button>
            </form>
            <p>Already registered your hotel? <Link  to="/login">Sign in.</Link></p>
        </div>
    )
}