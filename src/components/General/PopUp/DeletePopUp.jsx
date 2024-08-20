import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeletePopUp = ({ show, handleClose, onConfirm, title }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">DİKKAT!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Şuanda <span>{title}</span> isimli filmi silmek istiyorsunuz.
          Onaylıyorsanız{" "}
          <span className="text-danger fw-bold">Eminim, Sil</span> butonuna
          tıklayın.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Vazgeç
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eminim, Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePopUp;
