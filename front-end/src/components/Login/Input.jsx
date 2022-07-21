import React from "react";
import Form from "react-bootstrap/Form";

const Input = (props) => {
  return (
    <div className={props.className}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.controlType}
        placeholder={props.controlPlaceHolder}
      />
      {props.text && <Form.Text className="text-muted">{props.text}</Form.Text>}
    </div>
  );
};

export default Input;
