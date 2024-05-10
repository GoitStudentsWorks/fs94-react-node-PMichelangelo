import { useState, useId, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "schemas/registerSchemas";
import icon from "../../images/icons.svg"

import styles from "./registerForm.module.css"

const RegisterForm = ({onSubmit}) => {
    const { pathname } = useLocation();
    const isRegisterForm = pathname === "/auth/register"

    const emailId = useId();
    const passwordId = useId();
    const nameId = useId();

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(registerSchema)
      });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const submitForm = useCallback(async (data) => {
      await trigger();
      onSubmit(data);
  }, [onSubmit, trigger]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(submitForm)();
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleSubmit, submitForm]);

      return (
        <div className={styles.wrap}>
            <form onSubmit={handleSubmit(submitForm)} className={styles.formWrapper} noValidate>
                <div className={styles.contentWrapper}>
                    <div className={styles.switcher}>
                        <button className={styles.button} disabled={isRegisterForm}>Registration</button>
                        <NavLink to="/auth/login">
                            <button className={styles.button} disabled={!isRegisterForm}>Log In</button>
                        </NavLink>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            placeholder="Enter your name"
                            className={styles.input}
                            id={nameId}
                            {...register("name")}
                            name="name"
                            required
                        />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        <input
                            placeholder="Enter your email"
                            className={styles.input}
                            id={emailId}
                            {...register("email")}
                            type="email"
                            name="email"
                            required
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        <div className={styles.passwordContainer}>
                            <input
                                placeholder="Create a password"
                                className={styles.passwordInput}
                                id={passwordId}
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                            />
                            <div className={styles.showPasswordButtonWrap}>
                                <div
                                    className={styles.showPasswordButton}
                                    onClick={togglePasswordVisibility}
                                >
                                    <svg className={styles.logoIconOuterWrap}>
                                        <use href={`${icon}#eye-icon`} className={styles.logoIconOuter}  />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        <button className={styles.registerButton} type="submit">Register Now</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;

