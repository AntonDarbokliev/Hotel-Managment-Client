import { Link } from "react-router-dom"
import { Button } from "../../Shared/Button/Button"
import { InputField } from "../../Shared/InputField/InputField"
import styles from './Login.module.scss'
import { useForm } from "../../../hooks/useForm"

export const Login = () => {

    const onFormSubmit = () => {
        console.log('Submitted')
    }

    const {formValues, onChangeHandler, onSubmit} = useForm({
        hotelCode: '',
        password: '',
    },onFormSubmit)

    return (
        <div className={styles["login"]}>
    

            <h1>Welocome back!</h1>

            <form className={styles["login-form"]} onSubmit={onSubmit}>
                <InputField onChange={(e) => onChangeHandler(e)} name="hotelCode" value={formValues.hotelCode} type="password">Hotel Code</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} name="password" value={formValues.password} type="password">Password</InputField>
                <Button>Login</Button>
            </form>
            <p>Don't have a registration? <Link  to="/register">Sign up.</Link></p>
        </div>
    )
} 