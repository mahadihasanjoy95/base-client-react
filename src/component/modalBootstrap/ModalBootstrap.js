import React from 'react';
import Modal from "react-bootstrap/Modal";
import "./styles/modalBootstrap.scss"

const ModalBootstrap = (props) => {

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                size={props.size}
                dialogClassName={props.class}
            >
                {!props.header? 
                    <Modal.Header closeButton>
                        <Modal.Title className="w-100">{props.title}</Modal.Title>
                    </Modal.Header> : ""
                }
                {props.children}
            </Modal>
        </>
    );
};

export default ModalBootstrap;
