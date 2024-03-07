import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Shared/Button/Button";
import styles from "./Login.module.scss";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useLoginValidations } from "./LoginHook";
import { useState } from "react";
import Spinner from "../../Shared/LoadSpinner/LoadSpinner.tsx";
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification.tsx";
import { useLogin } from "../../../hooks/useLogin.ts";
import { InputFieldType } from "../../../types/InputField.ts";
import { InputFieldslist } from "../../Shared/InputFieldsList/InputFieldsList.tsx";


export const Login = () => {

  const [toastText,setToastText] = useState('')

  const navigate = useNavigate();
  const onSuccess = () => { navigate("/hotels")} 
  const onFail = (text:string) => { setToastText(text) }

  const { isLoading, onChangeHandler, onSubmit, formValues} = useLogin(onSuccess,onFail)


  const { onBlurHandler, onFocusHandler, validationValues } = useFormValidation(
    {
      hotelCode: false,
      password: false,
    }
  );

  const { isCodeValid, isPasswordValid, disableButton } = useLoginValidations(
    formValues,
    validationValues
  );

  const listProps = {
    formValues,
    onChangeHandler,
    onBlurHandler,
    onFocusHandler,
    inputs: [
      { name: 'hotelCode',errorMessage: 'Hotel Code should be at least 3 characters long' ,
      validation: !isCodeValid, type: 'password',display: 'Hotel Code'},
      { name: 'password',errorMessage: 'Password should be at least 5 characters long' ,
      validation: !isPasswordValid, type: 'password',display: 'Password'},

    ] as InputFieldType[]
  }

  return (
    <div className={styles["login"]}>
      {toastText !== '' && 
      <ToastNotification text={toastText} timer={3000} setText={setToastText}></ToastNotification>
      }

      {!isLoading && 
      <>
      <h1>Welcome back!</h1>

      <form className={styles["login-form"]} onSubmit={onSubmit}>
        <InputFieldslist {...listProps}/>
        <Button width='10rem' disable={disableButton}>Login</Button>
      </form>

      <p>
        Don't have a registration? <Link to="/register">Sign up.</Link>
      </p>
      </>
      }

      {isLoading && 
      <Spinner/> 
      }
    </div>
  );
};
