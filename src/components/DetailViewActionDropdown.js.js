import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext } from "react";
import { AuthContext } from "../config/Authentications/AuthContext";
import { createContext } from "react";
import DeleteModal from "./DeleteModal";
import { Modal, Button } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { useNavigate, useParams } from "react-router-dom";
import { SINGLETEMPLATE, TEMPLATE, TEMPLATELIST } from "../service/ApiPath";
import useGetReq from "../service/useGetReq";
import usePostReq from "../service/usePostReq";
import useDeleteReq from "../service/useDeleteReq";
import { CheckModuleName } from "../utils/CheckModuleName";
import axios from "../config/Axios"
import { r_value } from "../navigation/PageRoutes";
import useStorage from "../service/useStorage";
import { recordErrorAPIdata } from "../service/useApiData";

export const deleteState = createContext();

const DetailViewActionDropDown = (props)=>{
  const storage = useStorage();
  const { authState,setAuthState } = useContext(AuthContext)
  const tenantCname = authState.tenant_cname
  const {rlist, setRlist} = useContext(r_value)
  const [show1, setShow1] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [template_pdf, setTemplate_pdf] = useState("")
  const [cdetails, setCdetails] = useState([])
  const [iseditorstate, setIseditorstate] = useState(false)
  const [templateStatus, setTemplateStatus] = useState("default")
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [tempid, setTempid] = useState("")
  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty(),
);


    const [getData] = useGetReq();
    const [postData] = usePostReq();
    const [deleteData] = useDeleteReq();
    const [template,setTemplate] = useState("")    
    const [templateList,setTemplateList] = useState("")
    const [singleTemplate2,setSingleTemplate2] = useState("");
    const [tempErr, setTempErr] = useState("")
    const [err, setErr] = useState("")

    // let {module_name}= CheckModuleName()
    let useParamsValues = useParams()
    let module_name = useParamsValues.module_name
    let pdfDownloadOption = props.pdfOption

    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    useEffect(()=>{
      if(template){
        window.open(template.substring(0, template.indexOf("<")))
        window.location.reload();
        }
      if(tempErr){
          alert("Something went wrong", err.message)
        }
      if(templateList){
        setTemplate_pdf(templateList);
      }
      if(singleTemplate2){
        setEditorState(EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(singleTemplate2.body)
          )
        ))
        setContent(singleTemplate2.body)
        // setIseditorstate(true)
      }
    },[template,tempErr,templateList,singleTemplate2])
    

let { id } = useParams();
const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "left",
    "center",
    "right",
    "justify",
    "|",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "fullsize",
  ],
  buttonsMD: [
    "source",
    "|",
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "left",
    "center",
    "right",
    "justify",
    "|",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "fullsize",
  ],
  buttonsXS: [
    "source",
    "|",
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "left",
    "center",
    "right",
    "justify",
    "|",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "fullsize",
  ],
};

const template_change = (e) => {
  setTempid(e.target.value)
  let param = {
    params: {
      "type": "pdf",
      "templateid": e.target.value
    }
  }
  getData(SINGLETEMPLATE(tenantCname),setSingleTemplate2,setErr,param,storage)
  
}

  const templateStatusChange = (e) => {
    setTemplateStatus(e.target.value);
  };
  const handleClose1 = () => {
    setShow1(false);
    // setIseditorstate(false);
    setContent("");
    setTemplateStatus("default");
  };

  const pdf_maker = () => {
    iseditorstate
      ? axios
          .post(
            "/" + tenantCname + "/api/template",
            {
              custom_body: "<html>" + content + "</html>",
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id: authState.company_id,
            },
            {
              headers: {
                Accept: "application/JSON",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            window.open(res.data.substring(0, res.data.indexOf("<")));
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              custom_body: "<html>" + content + "</html>",
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id: authState.company_id,
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong", err);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              custom_body: "<html>" + content + "</html>",
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id: authState.company_id,
            }, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
      : tempid === ""
      ? axios
          .post(
            "/" + tenantCname + "/api/template",
            {
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            },
            {
              headers: {
                Accept: "application/JSON",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            window.open(res.data.substring(0, res.data.indexOf("<")));
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong", err);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            }, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
      : axios
          .post(
            "/" + tenantCname + "/api/template",
            {
              templateid: tempid,
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            },
            {
              headers: {
                Accept: "application/JSON",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            window.open(res.data.substring(0, res.data.indexOf("<")));
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              templateid: tempid,
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong", err);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              templateid: tempid,
              recordid: id,
              type: "pdf",
              moduleid: rlist[0].moduleid,
              company_id:  authState.company_id,
            }, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          });

    handleClose1();
  };


  const pdf_temp_call = () => {
    setShow1(true);
    axios
      .get("/" + tenantCname + "/api/templatelist", {
        headers: {
          Accept: "application/JSON",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          type: "pdf",
          moduleid: rlist[0]&&rlist[0].moduleid,
        },
      })
      .then((res) => {
        setTemplate_pdf(res.data);
        logData = [{...viewData, 'module_name': module_name, 'api': `/${'templatelist'}`, 'payload':{
          type: "pdf",
          moduleid: rlist[0]&&rlist[0].moduleid,
        }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })
      .catch((err) => {
        console.log(err);
        logData = [{...viewData, 'module_name': module_name, 'api': `/${'templatelist'}`, 'payload':{
          type: "pdf",
          moduleid: rlist[0]&&rlist[0].moduleid,
        }, 'response':[], 'error_details': err, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      });
  };
    return (
       <deleteState.Provider value= {{showDelete, setShowDelete}}>
            <Dropdown className="btn_actions_right">
                      <Dropdown.Toggle
                        variant="success"
                        className="btn-more"
                        id="dropdown-basic dropdownMoreButton"
                      >
                        Actions
                      </Dropdown.Toggle>
                     
                      <Dropdown.Menu>
                        {/* <Dropdown.Item>
                                            <i>
	                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.3333 2.5H1.66668C0.747461 2.5 0 3.24746 0 4.16668V15.8334C0 16.7525 0.747461 17.5 1.66668 17.5H18.3334C19.2525 17.5 20 16.7525 20 15.8333V4.16668C20 3.24746 19.2525 2.5 18.3333 2.5ZM1.66668 3.33332H18.3334C18.3948 3.33332 18.4489 3.3557 18.5065 3.36836C17.0636 4.68895 12.279 9.06598 10.6047 10.5745C10.4737 10.6925 10.2625 10.8333 10 10.8333C9.73758 10.8333 9.52641 10.6925 9.39496 10.5741C7.72078 9.06582 2.93598 4.68855 1.49328 3.36844C1.55102 3.35578 1.60523 3.33332 1.66668 3.33332ZM0.83332 15.8333V4.16668C0.83332 4.08504 0.85793 4.01098 0.879961 3.93637C1.98434 4.94715 5.32277 8.00121 7.48746 9.96969C5.3298 11.8231 1.99051 14.989 0.877344 16.0505C0.857695 15.9796 0.83332 15.9104 0.83332 15.8333ZM18.3333 16.6667H1.66668C1.60012 16.6667 1.54094 16.6435 1.47879 16.6286C2.62906 15.5321 5.98961 12.3479 8.10934 10.5345C8.38566 10.7852 8.63809 11.0138 8.83707 11.193C9.18051 11.5031 9.5825 11.6667 10 11.6667C10.4175 11.6667 10.8195 11.5031 11.1625 11.1934C11.3616 11.0141 11.6142 10.7853 11.8907 10.5345C14.0105 12.3477 17.3706 15.5316 18.5212 16.6286C18.4591 16.6435 18.4 16.6667 18.3333 16.6667ZM19.1667 15.8333C19.1667 15.9103 19.1423 15.9796 19.1227 16.0505C18.0091 14.9885 14.6702 11.8229 12.5126 9.96973C14.6773 8.00125 18.0153 4.94746 19.12 3.93629C19.1421 4.0109 19.1667 4.085 19.1667 4.16664V15.8333Z" fill="#7B8593"/></svg>
	                                       </i>
	                                       Send Email
                                            </Dropdown.Item> */}
                                            { pdfDownloadOption === true ? 
                                              props.detailViewFiles  
                                             && <Dropdown.Item onClick={pdf_temp_call}>
                          <i> 
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.2471 5.95362L15.6423 0.12968C15.5625 0.0468359 15.4524 0 15.3374 0H6.98384C6.04897 0 5.28838 0.760289 5.28838 1.69477V7.61539H1.903C1.20356 7.61539 0.634521 8.18426 0.634521 8.88353V15.2319C0.634521 15.9311 1.20356 16.5 1.903 16.5H5.28838V20.3082C5.28838 21.241 6.04897 22 6.98384 22H19.6699C20.6047 22 21.3653 21.2415 21.3653 20.3091V6.24701C21.3653 6.13761 21.3229 6.03247 21.2471 5.95362ZM15.4422 1.14215L20.0433 5.92307H15.4422V1.14215ZM1.903 15.6539C1.67011 15.6539 1.48071 15.4646 1.48071 15.2319V8.88353C1.48071 8.65086 1.67015 8.46154 1.903 8.46154H13.3276C13.5605 8.46154 13.7499 8.65086 13.7499 8.88353V15.2319C13.7499 15.4646 13.5605 15.6539 13.3276 15.6539H1.903ZM20.5191 20.3091C20.5191 20.7749 20.1381 21.1539 19.6698 21.1539H6.98384C6.51553 21.1539 6.13452 20.7745 6.13452 20.3082V16.5H13.3276C14.0271 16.5 14.5961 15.9311 14.5961 15.2319V8.88353C14.5961 8.18426 14.0271 7.61539 13.3276 7.61539H6.13452V1.69477C6.13452 1.2268 6.51553 0.846141 6.98384 0.846141H14.5961V6.34614C14.5961 6.5798 14.7855 6.76921 15.0191 6.76921H20.5191V20.3091Z"
                                fill="#7B8593"
                              />
                              <path
                                d="M5.69232 10.7374C5.55185 10.5548 5.37749 10.4362 5.16926 10.3817C5.03374 10.3453 4.74288 10.3271 4.29665 10.3271H3.11914V13.9613H3.85292V12.5904H4.33137C4.66356 12.5904 4.91725 12.5731 5.09243 12.5384C5.22134 12.5103 5.34818 12.4528 5.47296 12.3661C5.59774 12.2793 5.70061 12.1599 5.78161 12.0079C5.8626 11.8558 5.90308 11.6682 5.90308 11.4451C5.90304 11.1559 5.83278 10.92 5.69232 10.7374ZM5.0639 11.7377C5.00856 11.8187 4.93212 11.8781 4.83458 11.9162C4.73704 11.9542 4.54372 11.9732 4.2545 11.9732H3.85292V10.9419H4.20741C4.47184 10.9419 4.64784 10.9502 4.73541 10.9667C4.85439 10.9882 4.95274 11.0419 5.03039 11.1279C5.10807 11.2138 5.14692 11.3229 5.14692 11.4551C5.14696 11.5625 5.11924 11.6567 5.0639 11.7377Z"
                                fill="#7B8593"
                              />
                              <path
                                d="M9.43061 11.32C9.35129 11.0878 9.23557 10.8915 9.08355 10.7312C8.93152 10.5709 8.74886 10.4594 8.5357 10.3965C8.37706 10.3503 8.14648 10.3271 7.84407 10.3271H6.50293V13.9613H7.88373C8.15478 13.9613 8.37125 13.9357 8.5332 13.8844C8.74972 13.815 8.9216 13.7184 9.04883 13.5944C9.21739 13.4308 9.34712 13.2168 9.43804 12.9524C9.51242 12.7358 9.54959 12.478 9.54959 12.1789C9.54959 11.8385 9.50993 11.5522 9.43061 11.32ZM8.71664 12.8123C8.66705 12.9751 8.60303 13.092 8.52452 13.1631C8.44602 13.2341 8.34728 13.2845 8.2283 13.3143C8.13742 13.3374 7.98948 13.349 7.78456 13.349H7.23671V10.9419H7.56641C7.86551 10.9419 8.06635 10.9535 8.16879 10.9767C8.30594 11.0064 8.41916 11.0634 8.50841 11.1477C8.59766 11.232 8.66705 11.3493 8.71664 11.4997C8.76622 11.6501 8.79102 11.8658 8.79102 12.1467C8.79102 12.4277 8.76622 12.6495 8.71664 12.8123Z"
                                fill="#7B8593"
                              />
                              <path
                                d="M12.6681 10.9419V10.3271H10.1768V13.9613H10.9105V12.4169H12.4277V11.8021H10.9105V10.9419H12.6681Z"
                                fill="#7B8593"
                              />
                            </svg>
                          </i>
                          Download PDF
                        </Dropdown.Item>
                        : null
                        }
                        
                        {
                        cdetails.type <= 3 ? null : (
                          <Dropdown.Item onClick={() => setShowDelete(true)}>
                            <i className="biggerdelete">
                              <MdDelete />
                            </i>
                            Delete
                          </Dropdown.Item>
                        )
}
                                            
                        
                      </Dropdown.Menu>
            </Dropdown>

            <Modal
                  show={show1}
                  onHide={handleClose1}
                  className="small_modal modal plus_modal pdf_modal pdfmodalwidth"
                  scrollable={true}
                  
                >
                  <Modal.Header>
                    <Modal.Title>
                      <div className="detail_div1 mt-0">
                        <h4 className="cst_inf">Download PDF</h4>
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="parent_div newClass">
                      <div className="detail_div2">
                        <div className="details_field_1 popup_details_field">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                              <label>Template:</label>
                            </div>
                            <div
                              onChange={templateStatusChange}
                              className="col-lg-9 col-md-6 col-12"
                            >
                              <input
                                value={"default"}
                                defaultChecked={true}
                                type="radio"
                                name="default"
                                id="d1"
                                onClick={() => setIseditorstate(false)}
                              ></input>
                              <label
                                htmlFor="d1"
                                className="ml-2 pdfcss2"
                                onClick={() => setIseditorstate(false)}
                              >
                                Default PDF Template
                              </label>
                            {((module_name === "opportunity")|| (module_name === "invoice")|| (module_name === "supplierorder") || ((module_name === "supplierorderreturn"))) &&<div className="pdfCss"> <input
                                value={"custom"}
                                type="radio"
                                name="default"
                                id="d2"
                                className="ml-5"
                                onClick={() => setIseditorstate(true)}
                              ></input>
                              <label
                                htmlFor="d2"
                                className="ml-2 pdfcss2"
                                onClick={() => setIseditorstate(true)}
                              >
                                Custom PDF Template
                              </label></div>}
                            </div>
                            {templateStatus === "custom"
                              ? [
                                  <div
                                    className="col-lg-9 col-md-6 col-12"
                                    onClick={() => setIseditorstate(false)}
                                  >
                                    <select onChange={template_change}>
                                      <option>Select</option>
                                      {template_pdf.length != 0
                                        ? template_pdf.map((temp, t) => (
                                            <option
                                              value={temp.templateid}
                                              key={t}
                                            >
                                              {temp.template_title}
                                            </option>
                                          ))
                                        : null}
                                    </select>
                                  </div>,
                                  <div className="col-lg-12 col-md-12 col-12 text_editor">
                                    <JoditEditor
                                      ref={editor}
                                      value={content}
                                      config={config}
                                      tabIndex={0} // tabIndex of textarea
                                      onBlur={(newContent) =>
                                        setContent(newContent)
                                      } 
                                      onChange={(newContent) => {}}
                                    />
                                  </div>,
                                ]
                              : null}
                          </div>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="button"
                      className="btn reset_button"
                      onClick={handleClose1}
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Button>
                    <Button className="btn import_button" onClick={pdf_maker}>
                      Download PDF
                    </Button>
                  </Modal.Footer>
                </Modal>

            <DeleteModal showDelete={showDelete}/>

        </deleteState.Provider>
        
    );
}
export default DetailViewActionDropDown;