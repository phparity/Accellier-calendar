import React, {useState, useEffect, useMemo, useRef} from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import i18n from "../config/i18n"
import "../assets/style/CustomerList.css"
import "../assets/style/Modale.css"
import {  Trans } from 'react-i18next'
import {Modal, Button} from "react-bootstrap"
import Dropdown from "react-bootstrap/Dropdown"
import {MdModeEdit} from "react-icons/md"
import {MdDelete} from "react-icons/md"
import {BiDownload} from "react-icons/bi"
import {BiUpload} from "react-icons/bi"
import { useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {useLocation} from 'react-router';
import { useContext } from 'react'
import { AuthContext } from '../config/Authentications/AuthContext'
import { CheckModuleName, Markchange, Markchange1 } from '../utils/CheckModuleName'
import useDeleteReq from '../service/useDeleteReq'
import useGetReq from '../service/useGetReq'
import usePostReq from '../service/usePostReq'
import { selecet_Rows, UpdateCustList, UpdateDetails } from './DataTable'
import { DELETERECORD, DELETESELECTRECORD, EXPORTALLRECORDAPI, EXPORTRECORDAPI, IMPORTRECORDAPI } from '../service/ApiPath'
import { Param } from './Params'
import axios from "../config/Axios" 
import { recordErrorAPIdata } from '../service/useApiData'
import *as xlsx from "xlsx"

const ActionDropdown = (props) =>{
    const { authState,setAuthState } = useContext(AuthContext)
    const {selectedFlatRows} = useContext(selecet_Rows)
    const {cuslist, setCuslist} = useContext(UpdateCustList)
    const tenantCname = authState.tenant_cname
    const { details}= useContext(UpdateDetails);
    const [export1, setExport1] = useState('')
    const [exportbutton, setExportbutton] = useState(true)
    const [valuex, setValuex] = useState({})
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [file, setFile] = useState([])
    const [cusid, setCusid] = useState("")
    const [cus_selected_name, setCus_selected_name] = useState("")
    const [sel_exportdata, setSel_exportdata] = useState("Export All Data")
    const [exp_cus_id, setExp_cus_id] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    const [progres_value, setProgres_value] = useState("")
    const [offset, setOffset] = useState(localStorage.getItem("page")||1);
    const [perPage] = useState(10);
    const [importSample, setImportSample] = useState("")
    const prevModuleValue = useRef("")
    const [err, setErr] = useState("")
    const [listView, setListView] = useState()
    const[exportRecord, setExportRecord] = useState()
    const[selectRows, setSelectRows] = useState([])
    const [deleteData] = useDeleteReq();
    const [getData] = useGetReq();
    const [postData] = usePostReq();
    const handleClose4 = () => {
        setShow4(false);
        setSel_exportdata(selectedFlatRows.length>0 ? "Export All Data" : "Selected account info");
        setIsSelected(false)
        setShow3(false);
        setShow2(false);
    }
    const base_url = process.env.REACT_APP_BASE_URL

   const lang = authState.language

    if (lang){
        i18n.changeLanguage(lang)
    }
    
    let module_name = CheckModuleName()
    const handleQueryString = useLocation().search;

    let nice = ""

  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

    useEffect(() => {
      prevModuleValue.current = module_name
      nice = handleQueryString.replace('?','').replace(/%20/g, " ")
    }, [module_name])
    

    localStorage.setItem("prev_module_name", module_name)
    localStorage.setItem("prev_module_name2", module_name)
    const[dtCustList,setDtCustList] =useState()
    const [multiDtCustList, setMultiDtCustList] = useState()
    const [exportRecord1, setExportRecord1] = useState()
    const [exportAllRecord, setExportAllRecord] = useState()
    let data3 = Param.data2(exp_cus_id)

    let multiDeleteId = []
    multiDeleteId = selectRows &&
        selectRows.length >= 1 &&
        selectRows.map((id) => id[module_name + "id"]);

    useEffect(() => {
        if (dtCustList) {
            setShow3(false);
            setProgres_value(98)
            window.location.reload()
        }
        if (multiDtCustList) {
            setShow3(false);
            setProgres_value(98)
            if (multiDtCustList.success === true && multiDeleteId !== false ) {
                setCuslist(cuslist.filter(f=> !multiDeleteId.includes(f[module_name+"id"])))

            }
        }
        if(listView){
            setImportSample(listView.sample_file)
            if (localStorage.getItem("onClickMenuModule") != module_name) {
                setOffset(1);
                localStorage.setItem("page", 1)
            }
        }
        if(exportRecord){
            setExport1(exportRecord)
            setExportbutton(true)
        }
        if(exportAllRecord){
            setExport1(exportAllRecord)
            setExportbutton(true)
        }
    },[dtCustList,exportAllRecord,exportRecord,listView,multiDtCustList])


    const delete_fun=()=>{
        setProgres_value(50)
        let forthis = ""
        if (module_name === "opportunity"){
            forthis = "opportunitie"
        }else{
            forthis = module_name
        }
        if (selectedFlatRows.length >=1){
            selectRows.forEach(original => {
                deleteData( DELETESELECTRECORD(tenantCname,forthis,original[module_name+"id"]),'' ,setMultiDtCustList, setErr);
            });
        }
    }


    const export_customer = () => {
        let exportids = selectedFlatRows
        let export_ids = selectRows && selectRows.length >= 1 &&  selectRows.map((id) => id[module_name + "id"]);
        let expData= export_ids && export_ids.length >= 1 ? export_ids : null
        setExp_cus_id(expData);
      if (exp_cus_id !== null && selectedFlatRows.length>0) {
        setSel_exportdata("Selected account info");
      }
    } 


    const exportApiCall = () =>{
        let forthis = ""
        if (module_name === "opportunity"){
            forthis = "opportunity"
        }else{
            forthis = module_name
        }

        exp_cus_id&&         axios.get("/"+tenantCname+"/api/"+forthis+"export", {
            headers:{
                
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params:{
                "records": exp_cus_id
            }
        }
            
            )
        .then(res => {
            setExport1(res.data)
            setExportbutton(true)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}export`, 'payload':{
                "records": exp_cus_id
            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
        .catch(err => {
            console.log(err) 
            if(module_name !== "calendar"){
            // alert("Error. Please retry")
            }
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}export`, 'payload':{
                "records": exp_cus_id
            }, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })

        !exp_cus_id && axios.get("/"+tenantCname+"/api/"+forthis+"export", {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            }}
            
            )
        .then(res => {
            setExport1(res.data)
            setExportbutton(true)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}export`, 'payload':'', 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
        .catch(err => {
            console.log(err) 
            if(module_name !== "calendar"){
            // alert("Error. Please retry")
            }
            logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}export`, 'payload':'', 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })


    }
 
    
    const bulk_delete = () => {
        if(selectedFlatRows.length > 0){
            setShow3(true)
            setCus_selected_name("selection")
            }
            else {
                alert("No record(s) selected")
            }
    }

    let linkChangeForOpportunity = ""
    let linkChangeForOpportunity2 = ""
    if((module_name === "opportunity") || (module_name === "invoice") || (module_name === "supplierorder")){
        let markchange = Markchange(module_name)
        linkChangeForOpportunity= "/home/"+markchange+"/add-edit-op"
        linkChangeForOpportunity2 = "/home/"+markchange+"/detail-op/"
    }else{
        let markchange = Markchange1(module_name)
        linkChangeForOpportunity = "/home/"+markchange+"/add-edit"
        linkChangeForOpportunity2 = "/home/"+markchange+"/detail/"
    }
    // const changeHandle3 =(e) =>{
    //     setFile(e.target.files)
    // }

    const [fileRec, setFileREc]= useState([])

    const changeHandle3 =async(e) =>{
    const selectedFile = e.target.files[0];
    setFile([selectedFile]);
    const recData = await selectedFile.arrayBuffer(selectedFile)
    const excelFile = xlsx.read(recData);
    const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelSheet)
    setFileREc(exceljson); 
   }
    let valuexy = JSON.stringify(valuex).replace(/[\{\}\"]/g,'').replace(/:/g,"=").replace(/,/g,"&")


    const exportdataChange=(e)=>{
        setSel_exportdata(e.target.value)
        setExportbutton(false)
    }

    const [editids, setEditids] = useState([])
    useEffect(() => {
        selectedFlatRows.map((editid, i) => (
            editids.unshift(editid.original)
        ))
        const editidnew = editids.filter(function (elem, pos) {
            return editids.indexOf(elem) == pos;
        })
        setAuthState({ ...authState, selectedFlatRows: JSON.stringify(editidnew) })
        localStorage.setItem("selectedFlatRows", JSON.stringify(editidnew))

        let newArr = selectedFlatRows.map((item) => {
            return item.original
        })
        setSelectRows(newArr)
    }, [selectedFlatRows.length])

    const bulk_edit=()=>(
        selectedFlatRows.length != 0 ?
        window.location.href = "#"+linkChangeForOpportunity
        : alert("No record(s) selected"),
        localStorage.removeItem("customerDetails"),
        localStorage.removeItem("c_id") 
    )

    let formData = new FormData();

    formData.append("file", file[0]);
    const [import_status, setImport_status] = useState(false)
    const [import_response, setImport_response] = useState([])
    const [importFile, setImportFile] = useState()


    useEffect(() => {
        if (importFile) {
            if (importFile.error && importFile.error.length > 0) {
                const errorMessage = importFile.error.join("\n");
                setImport_response([{ "Import Error": errorMessage }]);
            } else {
                setImport_response([{ "Import": "file uploaded" }]);
            }
    
            setImport_status(true);
            setShow2(false);
        }
    
        if (exportRecord1) {
            setExport1(exportRecord1);
            setExportbutton(true);
        }
    }, [importFile, exportRecord1]);
    
    //    useEffect(()=>{
    //     if(importFile){
    //            setImport_status(true)
    //           setShow2(false)
    //           if(importFile[0][0] === undefined){
    //           importFile.map((keywords)=>(
    //             setImport_response([keywords])
    //           ))
    //           }else{
    //               setImport_response([{"Import": "file uploaded"}])
    //           }
    //     }
    //     if(exportRecord1){
    //         setExport1(exportRecord1)
    //         setExportbutton(true)
    //     }
    //    },[importFile,exportRecord1])

    const import_submit = (e) => {
        e.preventDefault()

        let forthis = ""
        if (module_name === "opportunity") {
            forthis = "opportunity"
        } else {
            forthis = module_name
        }
        if (file[0] === undefined) {
            alert("Please browse a sample file");
          } else {
            postData(IMPORTRECORDAPI(tenantCname,forthis), formData, setImportFile, setErr);
          }
    }

   // eslint-disable-next-line no-lone-blocks
   {
    
    return (
        <div>
                {/* <div className="top_btns"> */}
                    
                {(details.module_access !== 0 && details.module_access < 6 ) &&   <div className="bulk_icons" >
                         {module_name === "report" ?
                         localStorage.getItem("roleid") !== "1" ? null :
                            <Dropdown className="btn_actions" onClick={export_customer}>
                                <Dropdown.Toggle className="btn-more" id="dropdown-basic3">
                                    <Trans>Select Actions</Trans>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item  onClick={() => bulk_edit}><i><MdModeEdit /></i>Edit <Trans>{module_name}</Trans></Dropdown.Item>
                                    <Dropdown.Item onClick={() => setShow2(true)} href="#"><i><BiDownload/></i> Import <Trans>{module_name}</Trans></Dropdown.Item>
                                    <Dropdown.Item onClick={()=> setShow4(true)} href="#"><i><BiUpload/></i> Export <Trans>{module_name}</Trans></Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={bulk_delete}><i><MdDelete/></i> Delete <Trans>{module_name}</Trans></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> :

                            <Dropdown className="btn_actions" onClick={export_customer}>
                                <Dropdown.Toggle className="btn-more" id="dropdown-basic3">
                                    <Trans>Select Actions</Trans>
                                </Dropdown.Toggle>
                
                                {details.module_access !== 1  &&  <Dropdown.Menu>
                                    {
                                        details.module_access === 4 ?
                                        [
                                            <Dropdown.Item className="dropdown-item1" onClick={bulk_edit}><i><MdModeEdit/></i> Edit <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item className="dropdown-item1" onClick={() => setShow2(true)} href="#"><i><BiDownload/></i> Import <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item className="dropdown-item1" onClick={()=> (setShow4(true), exportApiCall())} href="#"><i><BiUpload/></i> Export <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item className="dropdown-item1" href="#" onClick={bulk_delete}><i><MdDelete/></i> Delete <Trans>{module_name}</Trans></Dropdown.Item>
                                        ] : details.module_access === 5 ?
                                        [
                                            <Dropdown.Item onClick={bulk_edit}><i><MdModeEdit/></i> Edit <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item onClick={() => setShow2(true)} href="#"><i><BiDownload/></i> Import <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item className="" href="#" onClick={bulk_delete}><i><MdDelete/></i> Delete <Trans>{module_name}</Trans></Dropdown.Item>
                                        ]: details.module_access === 3 ?
                                        [
                                            <Dropdown.Item onClick={bulk_edit}><i><MdModeEdit/></i> Edit <Trans>{module_name}</Trans></Dropdown.Item>,
                                            <Dropdown.Item onClick={() => setShow2(true)} href="#"><i><BiDownload/></i> Import <Trans>{module_name}</Trans></Dropdown.Item>,
                                        ]: 
                                        [
                                            <Dropdown.Item onClick={() => setShow2(true)} href="#"><i><BiDownload/></i> Import <Trans>{module_name}</Trans></Dropdown.Item>, 
                                        ]
                                    }
                                </Dropdown.Menu>}
                            </Dropdown>
                            }
                        </div>}
                {/* </div>        */}
            <Modal show={show2} onHide={handleClose4} className="import_modal fade small_modal modal">
                <Modal.Header>
                <Modal.Title><h4 className="import_heading">Import <Trans>{module_name}</Trans></h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h5>Please upload the excel file to import <Trans>{module_name}</Trans>.</h5>
                <p>Please ensure that all the fields are properly configured within the file.</p>
                <form className="box" onSubmit={import_submit}>
                    <div className="upload_box">
                        <label className="browse_file">
                        <input type="file" id="file" aria-label="File browser example" onChange={changeHandle3}/>
                        <span className="file-custom"></span>
                        </label>
                        <label className="browse_file" style={{color: "blue"}}>{file[0] !== undefined ? file[0].name : "....."}</label>
                        <Button href={`${process.env.REACT_APP_BASE_URL}`+props.importSample}  style={{width:"117.78px"}} className ="import_button">Sample File</Button>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button className="secondary reset_button" style={{color:"#4e73df"}} onClick={handleClose4}>
                    Cancel
                </Button>
                <Button className="import_button" type="button" onClick={import_submit}>
                    Import
                </Button>
                </Modal.Footer>
            </Modal> 

            <Modal show={show3} onHide={handleClose4} className="modal_delete fade small_modal modal">
                <Modal.Header>
                <Modal.Title> <Trans>Delete {module_name}</Trans>{props.selectflatrows.length <= 1 ? "" : "(s)"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure that you want to delete the selected <Trans>{module_name}</Trans>?</h5>
                    <h6>All data related to this <Trans>{module_name}</Trans> will be deleted (NOTE: this won't automatially delete related to records such as contacts, opportunities etc these will need to be deleted seperately).</h6>
                </Modal.Body>
                <Modal.Footer>
                <Button className="secondary reset_button" onClick={handleClose4}>
                    Cancel
                </Button>
                <Button variant="danger" className="danger" onClick={()=>(delete_fun(),handleClose4())}>
                    Yes Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show4} onHide={handleClose4} className="modal_export fade small_modal modal">
                <Modal.Header>
                    <Modal.Title>Export <Trans>{module_name}</Trans></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Export <Trans>{module_name}</Trans> Information</h5>
                    <form>
                        <div onChange={exportdataChange}>
                            <div className="radio_div">
                                <input type="radio" value={sel_exportdata} name="exportdatas" defaultChecked={exp_cus_id !== null} /> <span>Selected <Trans>{module_name}</Trans> Info</span>
                                {exp_cus_id === null ?
                                    <span style={{ 'color': 'red' }}> (No record is selected)</span> : null
                                }
                            </div>
                            <div className="radio_div">
                                <input type="radio" value={sel_exportdata} defaultChecked={exp_cus_id === null} id="1234" name="exportdatas" /> <span>Export All Data</span>
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="secondary reset_button" onClick={handleClose4}>
                        Cancel
                    </Button>
                    <Button href={base_url + export1.substring(0, export1.indexOf("<"))} className="import_button" onClick={handleClose4}>
                        {exportbutton ? "Export" : "Wait.."}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                    show={import_status}
                    onHide={() => (setImport_status(false))}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        <Trans>Import</Trans>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {import_response.map((para, i)=> (
                            Object.keys(para).map((ara)=>(
                            <li style={{"color": "brown", "font-size": "12px"}}>
                                {ara +": "+ para[ara]}
                            </li>
                            ))
                          ))
                        }
                    </Modal.Body>
                </Modal>
        </div>
    )}
}

export default ActionDropdown;;
