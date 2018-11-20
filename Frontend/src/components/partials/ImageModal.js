import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

export default function ImageModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.open}
        contentLabel="Example Modal"
        onRequestClose={props.onClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        {props.content}
      </Modal>
    </div>
  );
}
