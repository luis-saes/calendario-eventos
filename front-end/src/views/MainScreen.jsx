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
  const [description, setDescription] = useState("");
  const handleChangeDescription = ({ target: { value } }) =>
    setDescription(value);
  const [day, setDay] = useState();
  const handleChangeDay = ({ target: { value } }) => setDay(value);
  const [startTime, setStartTime] = useState();
  const handleChangeStartTime = ({ target: { value } }) => setStartTime(value);
  const [endTime, setEndTime] = useState();
  const handleChangeEndTime = ({ target: { value } }) => setEndTime(value);

  const padTo2Digits = (num) => {
    return String(num).padStart(2, "0");
  };

  const onSelectSlot = (slotInfo) => {
    handleShowModal();
    setDay(slotInfo.start.toISOString().split("T")[0]);
    setStartTime(
      `${padTo2Digits(slotInfo.start.getHours())}:${padTo2Digits(
        slotInfo.start.getMinutes()
      )}`
    );
    setEndTime(
      `${padTo2Digits(slotInfo.end.getHours())}:${padTo2Digits(
        slotInfo.end.getMinutes()
      )}`
    );
  };

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
  const handleConfirmModal = () => {
    const eventObject = {
      title: description,
      start: new Date(`${day}T${startTime}`),
      end: new Date(`${day}T${endTime}`),
    };
    setMyEventsList([...myEventsList, eventObject]);
    console.log(eventObject);
    setShowModal(false);
  };

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
              <Form.Control
                type="text"
                value={description}
                onChange={handleChangeDescription}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date1">
              <Form.Label>Dia</Form.Label>
              <Form.Control
                type="date"
                value={day}
                onChange={handleChangeDay}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time1">
              <Form.Label>Hora de início</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={handleChangeStartTime}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time2">
              <Form.Label>Hora de término</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={handleChangeEndTime}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleConfirmModal}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          selectable
          onSelectSlot={(slotInfo) => onSelectSlot(slotInfo)}
          startAccessor="start"
          endAcessor="end"
        />
      </div>
    </div>
  );
};

export default MainScreen;
