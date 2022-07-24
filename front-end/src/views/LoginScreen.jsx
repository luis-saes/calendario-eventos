import React, { useState } from "react";
import ModalLogin from "../components/Login/ModalLogin";
import ModalRegister from "../components/Login/ModalRegister";
import styles from "./LoginScreen.module.css";

const LoginScreen = () => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  const changeScreen = (mString) => {
    if (mString === "login") {
      setLoginOrRegister("register");
    } else {
      setLoginOrRegister("login");
    }
  };

  return (
    <div className={styles.screenBackground}>
      {loginOrRegister === "login" ? (
        <ModalLogin changeScreen={changeScreen} />
      ) : (
        <ModalRegister changeScreen={changeScreen} />
      )}
    </div>
  );
};

export default LoginScreen;
