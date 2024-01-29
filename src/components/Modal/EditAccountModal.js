import { Modal, Button, ModalFooter } from "react-bootstrap"

const EditAccountModal =({show4,submit,handleClose4})=>{
    return (
        <Modal show={show4} onHide={handleClose4} className="modal_delete fade small_modal modal">
        <Modal.Header>
          <Modal.Title>Edit Account(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Do you want to Edit the account(s)</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button className="secondary reset_button" onClick={handleClose4}>
            Cancel
          </Button>
          <Button className="btn_save import_button" onClick={submit}>
            Yes Edit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default EditAccountModal;