import { useContext } from "react";
import { Modal } from "react-bootstrap"
import { opCreatePageData } from "../../navigation/PageRoutes";


const EditModal = ({module_name,submit, showEditOption, setShowEditOption,editOptionChange})=>{
    const {add,setAdd} = useContext(opCreatePageData)
    const handleCloseEditOption = () => setShowEditOption(false);

    return(
        <Modal show={showEditOption} onHide={handleCloseEditOption} className="modal_delete fade small_modal modal">
        <Modal.Header>
          <Modal.Title>
            <div class="modal-title h4">Edit {module_name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Do you want to edit {add[module_name + '_name']}?</h5>
          <div onChange={editOptionChange}>
            <div className="form-check">
              <input className="form-check-input" value="1" type="radio" defaultChecked={true} name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Edit this {module_name}
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" value="2" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Edit this and all following opportunities
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" value="9" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Edit all opportunities in series
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseEditOption} type="button" className="secondary reset_button btn btn-primary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="reset_button" onClick={submit}>Okay</button>
        </Modal.Footer>
      </Modal>
    )
}
export default EditModal;