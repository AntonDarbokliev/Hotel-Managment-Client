import { Link } from 'react-router-dom'
import { Button } from '../../Shared/Button/Button'
import { InputField } from '../../Shared/InputField/InputField'
import styles from './Register.module.scss'
import { useForm } from '../../../hooks/useForm'

export const Register = () => {

    const onFormSubmit = () => {
        console.log('Submitted')
    }


    const {formValues,onChangeHandler,onSubmit} = useForm({
        email: '',
        phoneNumber: '',
        location: '',
        hotelName: '',
        password: '',
        repeatPassword:''
    },onFormSubmit)

    return (
        <div className={styles["login"]}>
    

            <h1>Welcome!</h1>

            <form className={styles["login-form"]} onSubmit={onSubmit}>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.email} name='email'>E-mail</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.phoneNumber} name='phoneNumber' type='number'>Phone Number</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.location} name='location'>Country, City, Address</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.hotelName} name='hotelName'>Hotel Name</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.password} name='password' type='password'>Password</InputField>
                <InputField onChange={(e) => onChangeHandler(e)} value={formValues.repeatPassword} name='repeatPassword' type='password'>Repeat-Password</InputField>
                <Button>Register</Button>
            </form>
            <p>Already registered your hotel? <Link to="/login">Sign in.</Link></p>
        </div>
    )
}