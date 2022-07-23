import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Modal.module.css";

const ModalRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = ({ target: { value } }) => setEmail(value);
  const handleChangePassword = ({ target: { value } }) => setPassword(value);

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const handleRegister = () => {
    console.log("e");
  };

  return (
    <Container fluid style={{ height: "100%" }}>
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
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <Button
                className={styles.button}
                onClick={handleRegister}
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
