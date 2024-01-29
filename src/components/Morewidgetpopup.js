import React, { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { useContext } from 'react';
import { Modal, Button } from "react-bootstrap"

const Morewidgetspopup =()=>{
    const {show3, setShow3} = useContext(stateSend);
    const handleClose3 = () => {
        setShow3(false);
    }

    return(
        
        <div>
        <Modal show={show3} onHide={handleClose3} className="modal_delete fade morewidget modal">
        <Modal.Header> 
            <Modal.Title>Widgets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>No Widgets available</h6>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button className="secondary reset_button btn btn-primary" onClick={handleClose3}>
                Cancel
            </Button>
            <Button variant="danger" className="danger" onClick={delete_fun}>
                Yes Delete
            </Button> */}
        </Modal.Footer>
    </Modal></div>
    )
}
export default Morewidgetspopup;
