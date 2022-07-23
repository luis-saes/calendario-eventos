import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "./MainScreen.module.css";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const MainScreen = () => {
  const [currentId, setCurrentId] = useState();
  const [description, setDescription] = useState("");
  const handleChangeDescription = ({ target: { value } }) =>
    setDescription(value);
  const [day, setDay] = useState();
  const handleChangeDay = ({ target: { value } }) => setDay(value);
  const [startTime, setStartTime] = useState();
  const handleChangeStartTime = ({ target: { value } }) => setStartTime(value);
  const [endTime, setEndTime] = useState();
  const handleChangeEndTime = ({ target: { value } }) => setEndTime(value);
  const [editingOrCreating, setEditingOrCreating] = useState();
  const [editingId, setEditingId] = useState();

  const renameKey = (object, oldKey, newKey) => {
    object[newKey] = object[oldKey];
    delete object[oldKey];
  };

  const convertToTime = (object, key) => {
    object[key] = new Date(Date.parse(object[key]));
  };

  useEffect(() => {
    axios.get("http://localhost:3001/calendar").then((res) => {
      const resJson = res.data;
      resJson.forEach((object) => renameKey(object, "_id", "id"));
      resJson.forEach((object) => renameKey(object, "descricao", "title"));
      resJson.forEach((object) => renameKey(object, "data_inicio", "start"));
      resJson.forEach((object) => renameKey(object, "data_fim", "end"));

      resJson.forEach((object) => convertToTime(object, "start"));
      resJson.forEach((object) => convertToTime(object, "end"));

      setMyEventsList(resJson);
    });
  }, []);

  const postEvent = async (object) => {
    try {
      await axios.post("http://localhost:3001/calendar", {
        descricao: object.title,
        data_inicio: object.start,
        data_fim: object.end,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [modalTitle, setModalTitle] = useState("Adicionar Novo Evento");

  const setData = (eventInfo) => {
    const currentElement = myEventsList.filter(
      (el) => el.id === eventInfo.id
    )[0];

    setCurrentId(currentElement.id);
    setDescription(currentElement.title);
    setDay(currentElement.start.toISOString().split("T")[0]);
    setStartTime(
      `${padTo2Digits(currentElement.start.getHours())}:${padTo2Digits(
        currentElement.start.getMinutes()
      )}`
    );
    setEndTime(
      `${padTo2Digits(currentElement.end.getHours())}:${padTo2Digits(
        currentElement.end.getMinutes()
      )}`
    );
    setModalTitle("Editar Evento");
    setEditingId(currentElement.id);
  };

  const handleDeleteEvent = () => {
    setMyEventsList(myEventsList.filter((el) => el.id !== currentId));
    handleCloseModal();
  };

  const padTo2Digits = (num) => {
    return String(num).padStart(2, "0");
  };

  const onSelectSlot = (slotInfo) => {
    setEditingOrCreating("creating");
    setModalTitle("Adicionar Novo Evento");
    setDescription("");
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
    handleShowModal();
  };

  const onSelectEvent = (eventInfo) => {
    setEditingOrCreating("editing");
    setData(eventInfo);
    handleShowModal();
  };

  const [myEventsList, setMyEventsList] = useState([
    {
      id: uuidv4(),
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
    if (editingOrCreating === "creating") {
      eventObject.id = uuidv4();
      setMyEventsList([...myEventsList, eventObject]);
      setShowModal(false);
      postEvent(eventObject);
    } else if (editingOrCreating === "editing") {
      const currentEvent = myEventsList.filter((el) => el.id === editingId)[0];
      eventObject.id = currentEvent.id;
      setMyEventsList([
        ...myEventsList.filter((el) => el.id !== editingId),
        eventObject,
      ]);
      setShowModal(false);
    }
  };

  const removeButton = (
    <Button variant="danger" onClick={handleDeleteEvent}>
      Deletar Evento
    </Button>
  );

  return (
    <div className={styles.screenBackground}>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
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
          {editingOrCreating === "editing" && removeButton}
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
          onSelectEvent={(eventInfo) => onSelectEvent(eventInfo)}
          startAccessor="start"
          endAcessor="end"
          messages={{
            date: "Data",
            time: "Tempo",
            event: "Evento",
            allDay: "Dia Todo",
            week: "Semana",
            work_week: "Semana de Trabalho",
            day: "Dia",
            month: "Mês",
            previous: "Anterior",
            next: "Próximo",
            yesterday: "Ontem",
            tomorrow: "Amanhã",
            today: "Hoje",
            agenda: "Agenda",

            noEventsInRange: "Não há eventos neste intervalo.",

            showMore: (total) => `+${total} mais`,
          }}
        />
      </div>
    </div>
  );
};

export default MainScreen;
