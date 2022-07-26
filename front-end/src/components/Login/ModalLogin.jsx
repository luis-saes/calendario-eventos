import React, { useState } from "react";
import { useAuth } from "../../helpers/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Modal.module.css";

const ModalLogin = (props) => {
  const [emailValidated, setEmailValidated] = useState("");
  const [passwordValidated, setpasswordValidated] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = ({ target: { value } }) => setEmail(value);
  const handleChangePassword = ({ target: { value } }) => setPassword(value);

  const auth = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const getOneLogin = async () => {
    try {
      const res = await axios.get("http://localhost:3001/", {
        params: {
          email,
          password,
        },
      });
      if (res.status === 200) {
        setLoginErrorMessage("");
        auth.login(email);
        navigate("/calendar");
      }
    } catch (err) {
      console.error(err);
      setLoginErrorMessage("Email ou senha incorretos.");
    }
  };

  const handleErrors = () => {
    if (!email) {
      setEmailValidated("Email deve ser preenchido");
    } else if (!validateEmail(email)) {
      setEmailValidated("Email deve possuir um formato válido");
    } else {
      setEmailValidated("");
    }
    if (!password) {
      setpasswordValidated("Senha deve ser preenchida.");
    } else {
      setpasswordValidated("");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    handleErrors();
    if (!email || !password || !validateEmail(email)) {
      return;
    }
    getOneLogin();
  };

  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className={styles.row}>
        <Col className={styles.modal} xs={4}>
          <div className={`${styles.modalBackground} px-5 py-5`}>
            <div className={`${styles.title} mb-4`}>Login</div>
            <Form>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={handleChangeEmail}
                  isInvalid={emailValidated ? true : false}
                />
                {emailValidated && (
                  <Form.Text className="text-muted">{emailValidated}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={handleChangePassword}
                  isInvalid={passwordValidated ? true : false}
                />
                {passwordValidated && (
                  <Form.Text className="text-muted">
                    {passwordValidated}
                  </Form.Text>
                )}
              </Form.Group>
              <div
                className={`${styles.mLink} mb-2`}
                onClick={() => props.changeScreen("login")}
              >
                Não possuo conta
              </div>
              <Button
                className={styles.button}
                variant="primary"
                type="submit"
                onClick={(event) => handleLogin(event)}
              >
                Entrar
              </Button>
              {loginErrorMessage && (
                <Form.Text style={{ color: "red" }}>
                  {loginErrorMessage}
                </Form.Text>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ModalLogin;
