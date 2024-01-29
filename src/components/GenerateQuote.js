import { CheckModuleName } from "../utils/CheckModuleName";
import React, { useState, useEffect, useRef, useContext } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi"
import { cDetails2, gen_pdf } from "../pages/DetailedView";
import { ImFilePdf } from "react-icons/im"
import Moment from 'moment';
import { MdDelete } from "react-icons/md"
import axios from "../service/Axios";
import { AuthContext } from "../config/Authentications/AuthContext";
import { useParams } from "react-router-dom";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import "../assets/style/OpCreateEdit.css";
import { Trans } from 'react-i18next';
import { r_value } from "../navigation/PageRoutes";
import { Modal, Button } from "react-bootstrap";
import JoditEditor from "jodit-react"; 
import { recordErrorAPIdata } from "../service/useApiData";


const GenerateQuote = (props)=>{
    const {authState,setAuthState} = useContext(AuthContext)
    const tenantCname = authState.tenant_cname
    // const { rlist}= useContext(rlist1);
    const {rlist} = useContext(r_value)
    const [iseditorstate, setIseditorstate] = useState(false)
    const [template_pdf, setTemplate_pdf] = useState("")
    const { cdetails, setCdetails}= useContext(cDetails2);
    const {generatePdf, setGeneratePdf} = useContext(gen_pdf)
    const editor = useRef(null)
    const [c_id, setC_id] = useState('')
    const [tempid, setTempid] = useState("")
    const [show1, setShow1] = useState(false);
    const [templateStatus, setTemplateStatus] = useState("default")
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [content, setContent] = useState('')
    let module_name = CheckModuleName()
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

  let [showPdfAlert,setShowPdfAlert] = useState(false)
    let { id } = useParams();

    const handleClose1 = () => {
        setShow1(false);
        setIseditorstate(false);
        setContent('')
        setTemplateStatus('default')
      }
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
    useEffect(() => {
        // let str = window.location.href
        // let separator ="_";
        // let sepPos = str.indexOf(separator)+1;
        // setC_id(str.substring(sepPos, str.length))
        // setC_id(window.location.href.slice(45))
    
        setC_id(id)
      }, [id])

useEffect(()=> {
    props.generatePdf&& axios.get("/"+tenantCname+"/api/templatelist", {
      headers: {
        "Accept": "application/JSON",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      params: {
        "type": "pdf",
        "moduleid": props.generatePdf[0]&&props.generatePdf[0].moduleid
      }
    }
    )
      .then(res => {
        
        setTemplate_pdf(res.data)
        console.log(res.data)
        setTempid(res.data[0]?.templateid)
        logData = [{...viewData, 'module_name': module_name, 'api': `/${'templatelist'}`, 'payload':{
        "type": "pdf",
        "moduleid": props.generatePdf[0]&&props.generatePdf[0].moduleid
      }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })
      .catch(err => {
        console.log(err)
        logData = [{...viewData, 'module_name': module_name, 'api': `/${'templatelist'}`, 'payload':{
        "type": "pdf",
        "moduleid": props.generatePdf[0]&&props.generatePdf[0].moduleid
      }, 'response':[], 'error_details': err, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })

}, [props?.generatePdf])    

    const templateStatusChange = (e) => {
        // setTemplateStatus(e.target.value)
        setTemplateStatus("custom")
       
        setShow1(true)
        setIseditorstate(true)
        if (tempid === 5) {
          axios.get("/"+tenantCname+"/api/singletemplate", {
            headers: {
              "Accept": "application/JSON",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            params: {
              "type": "pdf",
              "templateid": 5
            }
          }
          )
            .then(res => {
              setEditorState(EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(res.data.body)
                )
              ))
              setContent(res.data.body)
              // setIseditorstate(true)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'singletemplate'}`, 'payload':{
              "type": "pdf",
              "templateid": 5
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
    
            })
            .catch(err => { 
                console.log(err)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'singletemplate'}`, 'payload':{
              "type": "pdf",
              "templateid": 5
            }, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
        }
      }

    const template_change = (e) => {
        setTempid(e.target.value)
        axios.get("/"+tenantCname+"/api/singletemplate", {
          headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          params: {
            "type": "pdf",
            "templateid": e.target.value
          }
        }
        )
          .then(res => {
            setEditorState(EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(res.data.body)
              )
            ))
            setContent(res.data.body)
            // setIseditorstate(true)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'singletemplate'}`, 'payload':{
            "type": "pdf",
            "templateid": e.target.value
          }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
    
          })
          .catch(err => { 
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'singletemplate'}`, 'payload':{
            "type": "pdf",
            "templateid": e.target.value
          }, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
      }
      

      const pdf_maker = () => {
        let templateData = {}
        iseditorstate ?
          axios.post("/"+tenantCname+"/api/template",
            {
              "custom_body": "<html>" + content + "</html>",
              "recordid": c_id,
              "type": "pdf",
              "moduleid": rlist[0].moduleid,
              "company_id": authState.companyId
            },
            {
              headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer " + localStorage.getItem('token')
              }
    
            }
          )
            .then(res => {
              console.log("1st")
              window.open(res.data.substring(0, res.data.indexOf("<")))
              window.location.reload();
              logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              "custom_body": "<html>" + content + "</html>",
              "recordid": c_id,
              "type": "pdf",
              "moduleid": rlist[0].moduleid,
              "company_id": authState.companyId
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
            .catch(err => {
              console.log(err) 
              alert("Something went wrong", err.message)
              logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
              "custom_body": "<html>" + content + "</html>",
              "recordid": c_id,
              "type": "pdf",
              "moduleid": rlist[0].moduleid,
              "company_id": authState.companyId
            }, 'response':[], 'error_details': err, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
          :
    
          tempid === "" ?
    
            axios.post("/"+tenantCname+"/api/template",
              {
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              },
              {
                headers: {
                  "Accept": "application/JSON",
                  "Authorization": "Bearer " + localStorage.getItem('token')
                }
    
              }
            )
              .then(res => {
                console.log("2st")
                window.open(res.data.substring(0, res.data.indexOf("<")))
                window.location.reload();
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
              })
              .catch(err => {
                console.log(err) 
                alert("Something went wrong", err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              }, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
              })
            :
            axios.post("/"+tenantCname+"/api/template",
              {
                "templateid": tempid,
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              },
              {
                headers: {
                  "Accept": "application/JSON",
                  "Authorization": "Bearer " + localStorage.getItem('token')
                }
    
              }
            )
              .then(res => {
                console.log("3st")
                window.open(res.data.substring(0, res.data.indexOf("<")))
                window.location.reload();
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
                "templateid": tempid,
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
              })
              .catch(err => {
                console.log(err) 
                alert("Something went wrong", err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'template'}`, 'payload':{
                "templateid": tempid,
                "recordid": c_id,
                "type": "pdf",
                "moduleid": rlist[0].moduleid,
                "company_id": authState.companyId
              }, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
              });
    
        handleClose1();
      }

      const deletePdf = () => {
        let forthis = ""
        if (module_name === "opportunity") {
          forthis = "opportunitie"
        } else {
          forthis = module_name
        }
        axios.put("/"+tenantCname+"/api/" + forthis + "s/" + c_id,
          {
            [module_name + "_num"]: cdetails[module_name + "_num"],
            "source": "none",
            "status": "1",
            "deletefile": 1,
            "updateall": 1
          },
    
          {
            headers: {
              "Accept": "application/JSON",
              "Authorization": "Bearer " + localStorage.getItem('token')
            }
          })
          .then((res) => {
            setCdetails(res.data[0])
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{
            [module_name + "_num"]: cdetails[module_name + "_num"],
            "source": "none",
            "status": "1",
            "deletefile": 1,
            "updateall": 1
          }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((error) => {
            console.log(error) 
            alert(error)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{
            [module_name + "_num"]: cdetails[module_name + "_num"],
            "source": "none",
            "status": "1",
            "deletefile": 1,
            "updateall": 1
          }, 'response':[], 'error_details': error, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          closePdfWarning()
      }
    
      const deletePdfWarning =()=>{
        setShowPdfAlert(true)
      }

      const closePdfWarning =( )=>{
        setShowPdfAlert(false)
      }

    
    return (
        <div className="main mt-3 col-lg-6 col-md-12 col-sm-12">
        <h4>{module_name === "invoice" ? "Generate Invoice" :module_name === "supplierorder"  ? "Generate Supplier Order" : module_name === "supplierorderreturn"? "Generate Supplier Order Return" :  "Generate Quote"}</h4>
       
          <div className="inner-main">
            <div className="dropdown" onClick={() => setIseditorstate(false)}>
              <select onChange={template_change} className="button1">
                {
                  template_pdf.length != 0 ? (template_pdf || []).map((temp) => (
                    <option value={temp.templateid} selected={temp.templateid === "" ? true : false}>
                     <Trans>{temp.template_title}</Trans> 
                    </option>
                  )) : null
                }
              </select>
            </div> 
            <div className='dbtn2'><button type="button" onClick={pdf_maker} className="button2">Generate</button></div>
            <div className='dbtn3'>
              <button type="button" onClick={templateStatusChange} className="button3">
                <span>
                  <i><HiOutlinePencilAlt /></i>
                </span>
                Edit
              </button>
              </div>
            {/* <span className="text1">Select Template</span> */}
          </div>

          {((cdetails.files === undefined) || (cdetails.files[0].file_name === undefined)) ? "No Record!" :
            (cdetails.files || []).map((vgt) => (
              <div className="btm-bg">
                <div className="data-export">
                  <div>
                    <span>
                      <i><ImFilePdf /></i>
                    </span>
                    <span className="text1"><a href={vgt.file_url} target='_self' >{"  " + vgt.file_name}</a></span>
                  </div>
                  <div className='date-sm'>
                    <span className="text2">{Moment.unix(vgt.timestamp).format("DD/MM/YYYY HH:mm")}</span>
                    <span onClick={deletePdfWarning} className="delete">
                      <i><MdDelete /></i>
                    </span>
                  </div>
                </div>
              </div>
            ))

          }
          {/* popup for confimtion of delete when clicked on delete icon at bottom  */}
          <Modal show={showPdfAlert} onHide={closePdfWarning} className="modal_delete fade small_modal modal" scrollable={true} >
          <Modal.Header closeButton>
                    <Modal.Title >
                      <Trans>Warning</Trans>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>
                      Are you sure that you want to delete the selected Pdf ?
                    </h5>
                  </Modal.Body>

                <Modal.Footer>
                  <Button type="button"  className="secondary reset_button" onClick={closePdfWarning}>Cancel</Button>
                  <Button  variant="danger"
                      className="danger" onClick={deletePdf}>
                   Continue
                  </Button>
                </Modal.Footer>
              </Modal>

         <Modal show={show1} onHide={handleClose1} className="small_modal modal plus_modal pdf_modal" scrollable={true}>
                <Modal.Header>
                  <Modal.Title>
                    <div className="detail_div1 mt-0">
                      <h4 className="cst_inf">Download PDF</h4>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="parent_div">
                    <div className="detail_div2">
                      <div className="details_field_1 popup_details_field">
                        <div className="row">
                          <div className="col-lg-3 col-md-6 col-12">
                            <label>Template:</label>
                          </div>
                       
                          {((templateStatus === "custom") && (tempid !== "")) ?
                            [
                                                 
                              <div className="col-lg-12 col-md-12 col-12 text_editor">
                                {/* <Editor editorState={editorState} onEditorStateChange={setEditorState} /> */}
                                <JoditEditor
                                  ref={editor}
                                  value={content}
                                  config={config}
                                  tabIndex={1} // tabIndex of textarea
                                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                  onChange={newContent => { }}
                                />
                              </div>] : <div id='loader'>No Template is selected. Please Select Template!</div>
                          }
                        </div>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="button" className="btn reset_button" onClick={handleClose1} data-bs-dismiss="modal">Cancel</Button>
                  <Button className="btn import_button" onClick={pdf_maker}>
                    Download PDF
                  </Button>
                </Modal.Footer>
              </Modal>
        </div>
    );
}
export default GenerateQuote;