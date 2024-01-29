import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"
import { Trans } from 'react-i18next'


const LeavePageWarning = ({module_name,relatedModuleName,smLeaveEditWarn,setSmLeaveEditWarn,rediLinkRel})=>{
    let navigate = useNavigate();
    const pervidfuction = () => {
        if (relatedModuleName === "") {
          localStorage.removeItem("relatedmodule")
        } else {
          localStorage.setItem("relatedmodule", relatedModuleName)
        }
        localStorage.setItem("c_id",localStorage.getItem('c_id')||localStorage.getItem("prev_c_id"))
        localStorage.setItem("prev_c_id", localStorage.getItem('c_id'))
        localStorage.setItem("prev_module_name", module_name)
        navigate(1)
      }
      
    return (
        <div>
                <Modal show={smLeaveEditWarn} onHide={() => setSmLeaveEditWarn(false)} className="modal_delete fade small_modal modal">
                  <Modal.Header>
                    <Modal.Title><Trans>{module_name === "customer" ? "Leave Edit Account" : `Leave Edit ${module_name}`}</Trans></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Are you sure you want to leave this page?</h5>
                    <h6>There are some unsaved changes.</h6>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="secondary reset_button" onClick={() => setSmLeaveEditWarn(false)}>
                      Cancel
                    </Button>
                    <a href={rediLinkRel}>
                      <Button variant="danger" className="danger" onClick={pervidfuction}>
                        Leave Page
                      </Button>
                    </a>
                  </Modal.Footer>
                </Modal>
        </div>
    )
}
export default LeavePageWarning;