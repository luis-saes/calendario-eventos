import React from "react";
import ModalLogin from "../components/Login/ModalLogin";
import ModalRegister from "../components/Login/ModalRegister";
import styles from "./LoginScreen.module.css";

const LoginScreen = () => {
  return (
    <div className={styles.screenBackground}>
      <ModalRegister />
    </div>
  );
};

export default LoginScreen;
