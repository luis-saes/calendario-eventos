import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Modal.module.css";

const ModalRegister = (props) => {
  const [emailValidated, setEmailValidated] = useState("");
  const [passwordValidated, setpasswordValidated] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = ({ target: { value } }) => setEmail(value);
  const handleChangePassword = ({ target: { value } }) => setPassword(value);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const postUser = async () => {
    try {
      await axios.post("http://localhost:3001/", {
        login: email,
        senha: password,
      });
      handleShow();
    } catch (error) {
      console.log(error);
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

  const handleRegister = (event) => {
    event.preventDefault();
    handleErrors();
    if (!email || !password || password.length < 8 || !validateEmail(email)) {
      return;
    }
    console.log("Foi");
    postUser();
  };

  return (
    <Container fluid style={{ height: "100%" }}>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sua conta foi cadastrada com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className={styles.row}>
        <Col className={styles.modal} xs={4}>
          <div className={`${styles.modalBackground} px-5 py-5`}>
            <div className={`${styles.title} mb-4`}>Cadastro</div>
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
                onClick={() => props.changeScreen("register")}
              >
                Já possuo conta
              </div>
              <Button
                className={styles.button}
                onClick={(event) => handleRegister(event)}
                variant="primary"
                type="submit"
              >
                Cadastrar-se
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ModalRegister;
