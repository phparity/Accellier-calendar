import React, { useState, createContext } from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from "../service/Axios";
import { Trans } from 'react-i18next';
import { CheckModuleName } from '../utils/CheckModuleName';
import { useContext } from 'react';
import { AuthContext } from '../config/Authentications/AuthContext';
import { useParams } from 'react-router-dom';
import { action_Delete_State, deleteState } from './DetailViewActionDropdown.js';
import { recordErrorAPIdata } from '../service/useApiData.js';
 const DeleteModal = (props)=>{
    const { authState,setAuthState } = useContext(AuthContext)
    const{showDelete, setShowDelete} = useContext(deleteState)
    const tenantCname = authState.tenant_cname
    // const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    let module_name = CheckModuleName()

  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    let { id } = useParams();
    let related_list_link = module_name;
    if(related_list_link == "customer"){
      related_list_link = "accounts"
    }
    const deleteByOption = () => {
        let apiPath = "";
        
        if (module_name === "payrollcosts") {
          apiPath = "/api/" + module_name + "/" + id;
        }
 
        else if (module_name == "opportunity"){
          apiPath = "/api/" + "opportunities" +"/" + id;
        }
        else {
          apiPath = "/api/" + module_name + "s/" + id;
        }
    
        let newApiPath = apiPath.split("/");
        let pathName = newApiPath[newApiPath.length - 1];
        axios
          .delete("/" + tenantCname + apiPath, {
            headers: {
              Accept: "application/JSON",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (
              module_name === "operationalexpense" ||
              module_name === "payrollcosts"
            ) {
              window.location.href =
                "#/home/opportunities/detail-op/" +
                localStorage.getItem("prev_c_id");
            } else {
              window.location.href = "#/home/" + related_list_link;
            }
            logData = [{...viewData, 'module_name': module_name, 'api': `/${pathName}`, 'payload':'', 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((err) => {
            console.log(err);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${pathName}`, 'payload':'', 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          });
      };
    return (
<>      <Modal
                  show={showDelete}
                  onHide={handleCloseDelete}
                  className="modal_delete fade small_modal modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title >
                      <Trans>Delete {module_name}</Trans>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>
                      Are you sure that you want to delete the selected{" "}
                      <Trans>{module_name}</Trans>?
                    </h5>
                    <h6>
                      All the data related to <Trans>this {module_name}</Trans>{" "}
                      will be deleted (NOTE: this won't automatially delete
                      related to records such as contacts, opportunities etc
                      these will need to be deleted seperately).
                    </h6>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="secondary reset_button"
                      onClick={handleCloseDelete}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      className="danger"
                      onClick={deleteByOption}
                    >
                      Yes Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
</>
    );
 }


 export default DeleteModal