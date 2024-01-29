import { Modal, Button } from "react-bootstrap"
import { Trans } from 'react-i18next'


const LineDeleteModal = ({linedeletefrommodal,smShow2,setSmShow2})=>{
    return (
        <div>
                <Modal show={smShow2} onHide={() => setSmShow2(false)} className="modal_delete fade small_modal modal">
                  <Modal.Header closeButton>
                    <Modal.Title><Trans>Delete Item</Trans></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Are you sure that you want to delete the Item?</h5>
                    <h6>All the data related to this item will be deleted.</h6>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="secondary reset_button" onClick={() => setSmShow2(false)}>
                      Cancel
                    </Button>
                    <Button variant="danger" className="danger" onClick={linedeletefrommodal}>
                      Yes Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
        </div>
    )
}

export default LineDeleteModal;