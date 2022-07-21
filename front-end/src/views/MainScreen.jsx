import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "./MainScreen.module.css";

const localizer = momentLocalizer(moment);

const MainScreen = () => {
  const onSelectSlot = useCallback((slotInfo) => {
    console.log(slotInfo.start);
    handleShowModal();
  }, []);

  const [myEventsList, setMyEventsList] = useState([
    {
      title: "Reunião na TokenLab",
      start: new Date("2022-07-22T11:30:00"),
      end: new Date("2022-07-22T12:30:00"),
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className={styles.screenBackground}>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="text1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date1">
              <Form.Label>Dia</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time1">
              <Form.Label>Hora de início</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time2">
              <Form.Label>Hora de término</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          selectable
          onSelectSlot={onSelectSlot}
          startAccessor="start"
          endAcessor="end"
        />
      </div>
    </div>
  );
};

export default MainScreen;
