import { Modal, ProgressBar } from "react-bootstrap"
import { Trans } from 'react-i18next'

const ProgressBarFile = ({progres_value,smShow,setSmShow}) => {
    return (
        <div>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        <Trans>Updating...</Trans>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><ProgressBar animated now={progres_value} min={0} /></Modal.Body>
            </Modal>
        </div>
    )
}
export default ProgressBarFile;