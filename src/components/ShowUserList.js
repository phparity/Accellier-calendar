import { useContext } from "react"
import { Modal, Button } from "react-bootstrap"
import { opCreatePageData } from "../navigation/PageRoutes"


const ShowUserList = ({selectedUserList,setShowUserlist,custom,userListState,showUserlist})=>{
    const {add, setAdd} = useContext(opCreatePageData)

    
  const userlistChange = (e) => {
    if (e.target.type === 'checkbox' && e.target.checked == true) {
      selectedUserList.push(e.target.value)
    } else {
      selectedUserList.splice(selectedUserList.indexOf(e.target.value), 1)
    }
  }

    const settoadd = () => {
        setAdd({ ...add, "report_users": selectedUserList })
        setShowUserlist(false)
      }
    return (
        <div>
               <Modal show={showUserlist} onHide={() => setShowUserlist(false)} className="fade small_modal modal userlist">
                  <Modal.Header>
                    <Modal.Title>Select User's</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <table className="table table-bordered table-hover">
                        <tbody>
                          {
                            userListState.map((list, index) => (
                              <tr className="usertr" key={index}>
                                {
                                  custom.ownerid === list.usrid ?
                                    <td>
                                      <input type="checkbox" key={list.userid} value={list.usrid} onChange={userlistChange} checked></input>
                                      <label>{list.full_name}</label>
                                    </td> :
                                    <td>
                                      <input type="checkbox" key={list.userid} value={list.usrid}
                                        defaultChecked={(add.report_users || []).indexOf(list.usrid) > -1 ? true : false} onChange={userlistChange}></input>
                                      <label>{list.full_name}</label>
                                    </td>
                                }
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn_save_user" onClick={() => setShowUserlist(false)}>
                      Cancel
                    </Button>
                    <Button className="btn_save import_button" onClick={settoadd}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
        </div>
    )
}
export default ShowUserList;