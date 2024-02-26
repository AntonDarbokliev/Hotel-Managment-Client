import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Shared/Button/Button";
import { InputField } from "../../Shared/InputField/InputField";
import styles from "./Login.module.scss";
import { useForm } from "../../../hooks/useForm";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useLoginValidations } from "./LoginHook";
import { authServiceFactory } from "../../../services/auth.ts";
import { useState } from "react";
import { useAuthStore } from "../../../stores/Auth.ts";
import { useLoading } from "../../../hooks/useLoading.ts";
import Spinner from "../../Shared/LoadSpinner/LoadSpinner.tsx";
import { ToastNotification } from "../../Shared/ToastNotification/ToastNotification.tsx";

const authService = authServiceFactory();


export const Login = () => {

  const [toastText,setToastText] = useState('')
  const updateUser = useAuthStore((s) => s.updateUser)

  const navigate = useNavigate();

  const {isLoading,requestWithLoading} =  useLoading()
  
  const onFormSubmit = async () => {
    const data = new FormData();
    data.append("LoginCode", formValues.hotelCode);
    data.append("Password", formValues.password);
    try {
      const response =  await requestWithLoading( () => authService.login(data));
      const token = response.success; 
      localStorage.setItem("token", token);
      
      updateUser()
      
      navigate("/hotels");
    } catch (error) {
      if(typeof error == 'object'){
        setToastText((error as {error:string}).error)
        resetForm()
      }
    }
  };

  const { formValues, onChangeHandler, onSubmit,resetForm } = useForm(
    {
      hotelCode: "",
      password: "",
    },
    onFormSubmit
  );

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

  return (
    <div className={styles["login"]}>
      {toastText !== '' && 
      <ToastNotification text={toastText} timer={3000} setText={setToastText}></ToastNotification>
      }

      {!isLoading && 
      <>
      <h1>Welcome back!</h1>

      <form className={styles["login-form"]} onSubmit={onSubmit}>
        <InputField
          onChange={(e) => onChangeHandler(e)}
          name="hotelCode"
          value={formValues.hotelCode}
          type="password"
          onBlurHandler={() => onBlurHandler("hotelCode")}
          onFocusHandler={() => onFocusHandler("hotelCode")}
          isValid={{
            boolean: !isCodeValid,
            errorMessage: "Hotel Code should be at least 3 characters long",
          }}
        >
          Hotel Code
        </InputField>

        <InputField
          onChange={(e) => onChangeHandler(e)}
          name="password"
          value={formValues.password}
          type="password"
          onBlurHandler={() => onBlurHandler("password")}
          onFocusHandler={() => onFocusHandler("password")}
          isValid={{
            boolean: !isPasswordValid,
            errorMessage: "Password should be at least 5 characters long",
          }}
        >
          Password
        </InputField>

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
