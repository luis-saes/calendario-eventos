import React, { useState } from "react";
import Input from "./Input";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Modal.module.css";

const ModalLogin = () => {
  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className={styles.row}>
        <Col className={styles.modal} xs={4}>
          <div className={`${styles.modalBackground} px-5 py-5`}>
            <div className={`${styles.title} mb-4`}>Login</div>
            <Form>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
              </Form.Group>
              <Button className={styles.button} variant="primary" type="submit">
                Entrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ModalLogin;
