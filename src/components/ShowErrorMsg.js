import { useContext } from "react"
import { Modal, Button } from "react-bootstrap"
import { Trans } from 'react-i18next'
import { searchTableModuleValue } from "../navigation/PageRoutes"



const ShowErrorMsg = () => {
    const {smShowError, setSmShowError,error_msg, setError_msg } = useContext(searchTableModuleValue)

    return (
        <div>
            <Modal
                size="sm"
                show={smShowError}
                onHide={() => (setSmShowError(false), setError_msg([]))}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" style={{ "color": "red" }}>
                        <Trans>Error</Trans>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{error_msg&&error_msg.map((para) => (<li style={{ "color": "brown", "font-size": "12px" }}>{para}</li>))}</Modal.Body>
                {/* <Modal.Body><span style={{ "color": "brown", "font-size": "12px" }}>{error_msg}</span></Modal.Body> */}
            </Modal>
        </div>
    )
}
export default ShowErrorMsg;