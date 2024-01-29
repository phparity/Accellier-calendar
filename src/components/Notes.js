
import {useEffect, useState,useContext} from "react";
import axios from "../config/Axios";
import i18n from "../config/i18n"
import {  Trans } from 'react-i18next'
import Dropdown from "react-bootstrap/Dropdown"
import ReactPaginate from 'react-paginate';
import { DropdownButton } from 'react-bootstrap';
import Slider from "react-slick";
import { Link, useParams } from 'react-router-dom'
import "../assets/style/Notes.css"
import {Modal, Button} from "react-bootstrap"
import Moment from 'moment';
import { FaFileInvoice } from 'react-icons/fa'
import {CgListTree} from 'react-icons/cg'
import { ImInfo } from 'react-icons/im'
// import CreateModulePage from "../assets/style/CreateCustomer.css";
import Header from '../layouts/Header';
import { AuthContext } from '../config/Authentications/AuthContext';
import SVG from 'react-inlinesvg';
import useFetch from "../service/GetApiResponse";
import { FIELDSAPI, LISTVIEWAPI } from "../service/ApiPath";
import useStorage from "../service/useStorage"; 
import { recordErrorAPIdata } from "../service/useApiData";



function Comment({ forChange,comment,blocke }) {
    const { authState, setAuthState } = useContext(AuthContext)
    const tenantCname = authState.tenant_cname;
    const [cuslist, setCuslist] = useState({})
    let [add, setAdd] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [isReply2, setIsReply2] = useState(false)
    const [isReply3, setIsReply3] = useState(false)
    let [editid, setEditid] = useState('')
    const [replytoid, setReplytoid] = useState('')
    const [replytoid2, setReplytoid2] = useState('')
    const [afteredit, setAfteredit] = useState(false)
    const [rlist, setRlist] = useState([])
    const [sortby, setSortby] = useState("")
    const [commentsearch, setCommentsearch] = useState("")
    const [parentid, setParentid] = useState("")
    const [autofillnumm, setAutofillnumm] = useState("")
    const [viewall, setViewall] = useState(false)
    const [viewallid, setViewallid] = useState("")
    const [show3, setShow3] = useState(false);
    const [smShowError, setSmShowError] = useState(false);
    const [error_msg, setError_msg] = useState([])
    const [loading,setLoading] = useState(null) // to show error

    let module_name = "comment";
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    let {prev_module_name} = useParams();
    let prevmodule = prev_module_name
    let prevmodule2 = localStorage.getItem('prev_module_name')
    let {pvid} = useParams();
    if(prevmodule === 'customer'){
        prevmodule = 'accounts'
    }else{
        prevmodule = prevmodule
    }

    const handleClose3 = () =>{
        setShow3(false);
    }

    const changeHandle =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setAdd({ ...add, [name]: value })
        if (e.target.type === 'checkbox') {setAdd({ ...add, [name]: e.target.checked ? 1 : 0 })};
    }

    const cdelete=()=>{
        axios.delete("/"+tenantCname+"/api/comments/" + editid, {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            }}
            
            )
        .then(res=>{
            setAfteredit(true)
            handleClose3()
            forChange()
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'comments'}`, 'payload':{'id': editid}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
        .catch(err=>{
            console.log(err) 
            setLoading(err.message)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'comments'}`, 'payload':{'id': editid}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
    }

    let custom = ''
  Object.keys(blocke).map((k)=>(
    blocke[k].map((acc)=>(
      acc.fieldname != [module_name+"_num"] && acc.fieldname != "source" && acc.fieldname != "status" && 
      acc.uitype != 6 && acc.fieldname != "commentby" && acc.fieldname != "related_customer" && acc.fieldname != "related_module" ?
        custom = {...custom, [acc.fieldname]: add[acc.fieldname]} : null,

        acc.fieldname == "commentby" ?
            custom = {...custom,[acc.fieldname] : localStorage.getItem("username")} : null,

        acc.uitype == 6 ?
            custom =  {...custom,[acc.fieldname] : pvid || '2'} : null,

        acc.fieldname == "related_module" ?
            custom =  {...custom,[acc.fieldname] : prevmodule2} : null,

        acc.uitype == 100 ?
         acc.options.map((owner)=>(
            localStorage.getItem("username") == [owner.firstname+" "+owner.lastname] ?
            [custom =  {...custom,[acc.fieldname] : localStorage.getItem("username")},
           custom = {...custom, ["ownerid"] : owner.userid}] : null
         )) : null,
        
         (parentid !== "0" || parentid !== undefined)  ?
            custom = {...custom, ["parent_comment_id"]: parentid}
            : null,

        
            custom = {...custom, ["is_starred"]: add.is_starred}
    ) )
  ))

    const Editing=(com)=>{
        setIsEditing(true)
        setEditid(com.commentid)
        setAdd(com)
        setParentid(com.parent_comment_id)
    }
    const replying=(comid)=>{
        setIsReply(true)
        setReplytoid(comid)
        setParentid(comid)
        setIsReply3(true)
    }

    const postComment=(pid)=>{
        if (custom.hasOwnProperty("is_starred")) {
            delete custom.is_starred;
          }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.get("/"+tenantCname+"/api/fielddata", {
            headers:headers,
            params:{
                "module":"comment"
            }   
        } 
       )
        .then(res=>{
            let autofillnumm = res.data[0];

            logData = [{...viewData, 'module_name': module_name, 'api': `/${'fielddata'}`, 'payload':{ "module":"comment"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            axios.post("/"+tenantCname+"/api/"+module_name, 
            {
              [module_name+"_num"]: autofillnumm,
              "custom": custom,
              "source": "none",
              "status": "1"
            },
          {
              headers: headers
            })
            .then((response) => {
              setAfteredit(true)
              setAdd({comment: "", module_comment: ""})
              setIsReply(false)
              setIsReply3(false)
              setParentid(0)
              forChange()
              if(response.data[0] === undefined){
                Object.keys(response.data).map((keywords)=>(
                  error_msg.push(response.data[keywords])
                ))
                setSmShowError(true)
              }

                logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{[module_name+"_num"]: autofillnumm,
                "custom": custom,
                "source": "none",
                "status": "1"
            }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            .catch((error) => { 
              alert(error)
              setLoading(error.message)
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{[module_name+"_num"]: autofillnumm,
              "custom": custom,
              "source": "none",
              "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })  
        })
        .catch(err=>{
            console.log(err)
            setLoading(err.message)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'fielddata'}`, 'payload':{ "module":"comment"}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        }) 

    }

    const apiediting = (e, gy) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.put("/"+tenantCname+"/api/"+module_name+"s/" + editid, 
          {
            "comment_num": gy,
            "custom": custom,
            "source": "none",
            "status": "1"
          },
          
          {
              headers: headers
            })
            .then((response) => {
              setIsEditing(false)
              setEditid('')
              setAfteredit(true)
              setParentid(0)
              setAdd({comment: '', module_comment: ''})
              forChange()
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{"comment_num": gy,
              "custom": custom,
              "source": "none",
              "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            })
            .catch((error) => {
              console.log(error) 
              alert("Something Went Wrong")
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{"comment_num": gy,
              "custom": custom,
              "source": "none",
              "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
    }

    useEffect(() => {
        if ((typeof(custom.is_starred) == "number")&&(isEditing === false)) {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.put("/"+tenantCname+"/api/"+module_name+"s/" + editid, 
          {
            [module_name+"_num"]: add[module_name+"_num"],
            "custom": {"is_starred": custom.is_starred},
            "source": "none",
            "status": "1"
          },
          
          {
              headers: headers
            })
            .then((response) => {

            if (isEditing === false) {
              setAfteredit(true)
            }
              forChange()
              setParentid(0)

            logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{[module_name+"_num"]: add[module_name+"_num"],
            "custom": {"is_starred": custom.is_starred},
            "source": "none",
            "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
            .catch((error) => {
              console.log(error) 
              alert("Something Went Wrong")
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{[module_name+"_num"]: add[module_name+"_num"],
            "custom": {"is_starred": custom.is_starred},
            "source": "none",
            "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
            }
    }, [custom.is_starred])

    const deletefunc=(delid)=>{
        setEditid(delid)
        setShow3(true)
    }

    const nestedComments = (comment.childs || []).map(comment => {
      return <Comment key={comment.commentid} forChange={forChange} comment={comment} blocke={blocke} type="child" />
    })
  
    return (
        [<div className="boxTop boxTopSub1">
           
            <div className="row">
            
                <div className="col-sm-3 col-md-3 col-lg-2">
                    <div className="imgbox">
                        <div align="center">
                            <img src={comment.commentby[0]} alt="" align="center"></img>
                            <div className="comnt_user_img user_ini">{comment.commentby[0].toUpperCase()+comment.commentby.substring(comment.commentby.indexOf(' ') + 1)[0].toUpperCase()}</div>
                            <span>{comment.commentby}</span>
                            <p className="text-sm"><span>{Moment(comment.createtime).add(Moment().utcOffset(), "minutes").format("DD/MM/YYYY HH:mm")}</span></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-sm-8 col-lg-9">
                    <div className="commentLines">
                        {/* <h6>{comment.comment} </h6> */}
                        <h6></h6>
                       {
                        isEditing && editid == comment.commentid ? 
                        <form id="child-comment" onSubmit={(e)=> apiediting(e, comment.comment_num)}>
                            <input id="child" hidden name="module_comment" defaultValue={add.comment || comment.comment} onChange={changeHandle}></input>
                            <textarea id="child" name="module_comment" defaultValue={add.module_comment || comment.module_comment} onChange={changeHandle}></textarea>
                            <button type="submit" className="update_button mr-2">Update</button>
                            <button onClick={()=> {setIsEditing(false); setAdd({})}} className="btn_cancel reset_button">Cancel</button>
                        </form> :
                        <p>{comment.module_comment}</p>
                        } 
                    </div>
                    <div className="boxBottom2">
                        <ul className="list-group list-group-horizontal msge_btns">
                            <li className="list-group-item" onClick={()=> replying(comment.commentid)}><a>Reply</a> </li>
                            <li className="list-group-item" onClick={()=> Editing(comment)}><a>Edit</a> </li>
                            <li className="list-group-item" onClick={()=> deletefunc(comment.commentid)}><a>Delete</a> </li>
                            
                        </ul>
                    </div>
                </div>
                
                {isReply && replytoid == comment.commentid ? <div className="col-lg-11 col-md-10 ml-5 pl-5">
                    {
                        Object.keys(blocke).map((k)=>(
                            blocke[k].map((acc)=>(
                                acc.show_hide_criteria == 1 && acc.mandatory == 1 ?
                                [acc.uitype != 6 && acc.uitype != 100 && acc.fieldname != "module_comment" && acc.fieldname != [module_name+"_country"] 
                                 && acc.fieldname != [module_name+"_num"] && acc.fieldname != "salutation" && acc.uitype != 5 ?
    
                                [
                                // <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                //     <input name={acc.fieldname} 
                                //     onChange={changeHandle} 
                                //     defaultValue={add[acc.fieldname] == "0" ? "" : add[acc.fieldname]}
                                //     type="text" placeholder="Subject" />
                                // </div>
                                ] : null,
                                acc.fieldname == "module_comment" ?
                                    [<div key={acc.fieldname} className="col-md-12 commentText">
                                      <textarea type="text" rows="3" cols = "10"
                                        name={acc.fieldname} 
                                        defaultValue={add[acc.fieldname]} 
                                        onChange={changeHandle} placeholder="Comment">
                                      </textarea>
                                    </div>] : null,
                                acc.uitype == 100 ?
                                  [<select name={acc.fieldname} defaultValue={add[acc.fieldname]} onChange={changeHandle} hidden>
                                
                                       {/* <option>{add[acc.fieldname]}</option>  */}
                                    {
                                      (acc.options).map((option)=>(
                                      <option key={option.userid} defaultValue={add[acc.fieldname]}>
                                        {option.firstname} {option.lastname}
                                      </option>
                                      ))
                                    }
                                  </select>] : null
                                ] : null
                            ))
                        ))
                    }
    
                    <div className="col-md-12">
                        <div className="btn_space submit-row">
                            <button className="btn_cancel reset_button" onClick={()=> setIsReply(false)}>Cancel</button>
                            <button className="search_button" onClick={()=> postComment(comment.commentid)}>Post Comment</button>
                        </div>
                    </div>
    
                </div> : null}            
            </div>
            {nestedComments}
            {/* modal for delete xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Modal show={show3} onHide={handleClose3} className="modal_delete fade small_modal modal">
                <Modal.Header>
                <Modal.Title>Delete Comment(s)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Do you want to delete the {module_name}(s)?</h5>
                    <h6>All the data related to this {module_name} will be removed</h6>
                    {/* <ProgressBar animated now={progres_value} min={0} /> */}
                </Modal.Body>
                <Modal.Footer>
                <Button className="secondary reset_button" onClick={handleClose3}>
                    Cancel
                </Button>
                <Button variant="danger" className="danger" onClick={cdelete}>
                    Yes Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        ]
    )
  }

function Notes() {
    const storage = useStorage();
    const { authState, setAuthState } = useContext(AuthContext)
    const tenantCname = authState.tenant_cname;

    const [cuslist, setCuslist] = useState({});
    const [details, setDetails] = useState({})
    const [export1, setExport1] = useState('')
    const [valuex, setValuex] = useState({})
    const [search_mobile, setSearch_mobile] = useState('')
    const [input_mobile, setInput_mobile] = useState('')
    const [dybtn, setDybtn] = useState([])
    const [dy_btn_form, setDy_btn_form] = useState([])
    const [snum, setSnum] = useState({})
    let [dy_form_data, setDy_form_data] = useState({})
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [table_header, setTable_header] = useState([])
    const [file, setFile] = useState([])
    const [cusid, setCusid] = useState("")
    const [cus_selected_name, setCus_selected_name] = useState("")
    const [sel_exportdata, setSel_exportdata] = useState("")
    const [exp_cus_id, setExp_cus_id] = useState("")
    const [noofdata, setNoofdata] = useState("")
    const [workf_error, setWorkf_error] = useState("")
    const [progres_value, setProgres_value] = useState("")
    const [isrest, setIsrest] = useState(false)
    const [offset, setOffset] = useState(1);
    const [perPage] = useState(10);
    const [cdetails, setCdetails] = useState([])
    let [blocke, setBlocke] = useState([])
    let [add, setAdd] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [isReply2, setIsReply2] = useState(false)
    const [isReply3, setIsReply3] = useState(false)
    
    let [editid, setEditid] = useState('')
    const [replytoid, setReplytoid] = useState('')
    const [replytoid2, setReplytoid2] = useState('')
    const [afteredit, setAfteredit] = useState(false)
    const [rlist, setRlist] = useState([])
    const [sortby, setSortby] = useState("")
    const [commentsearch, setCommentsearch] = useState("")
    const [parentid, setParentid] = useState("0")
    const [autofillnumm, setAutofillnumm] = useState("")
    const [viewall, setViewall] = useState(false)
    const [viewallid, setViewallid] = useState("")
    const [isChildRef, setIsChildRef] = useState(false)
    const [smShowError, setSmShowError] = useState(false);
    const [error_msg, setError_msg] = useState([])
    const [loading,setLoading] = useState(null) // to show error
    const [commentStar,setCommentStar] = useState(undefined)
    const [currentRowId, setCurrentRowId] = useState(null)


    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    const [dydata, setDydata] = useState([]);
  const [dydataPay, setDydataPay] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataPay();
  }, []);

  const fetchData = () => {
    if(module=="operationalExpense"){
        axios.get("/"+tenantCname+"/api/fields", {
          headers:{
              "Accept": "application/JSON",
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
          params:{
              "module":"operationalExpense"
          }
        } 
      )
      .then(res=>{
        setDydata(res.data.block.Expense_Details)

        logData = [{...viewData, 'module_name': module_name, 'api': `/${'fields'}`, 'payload':{"module":"operationalExpense"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
        // setRlist(res.data.related)
      })
      .catch(err=>{
        console.log(err) 
        setLoading(err.message)
        logData = [{...viewData, 'module_name': module_name, 'api': `/${'fields'}`, 'payload':{"module":"operationalExpense"}, 'response':[], 'error_details': err, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })     
  }
}

  const fetchDataPay = () => {
    if(module=="payrollCosts"){
    axios.get("/"+tenantCname+"/api/fields", {
      headers:{
          "Accept": "application/JSON",
          "Authorization": "Bearer " + localStorage.getItem('token')
      },
      params:{
          "module":"payrollCosts"
      }
    } 
  )
  .then(res=>{
    setDydataPay(res.data.block.Payroll_Details)
    logData = [{...viewData, 'module_name': module_name, 'api': `/${'fields'}`, 'payload':{"module":"payrollCosts"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
    }
    // setRlist(res.data.related)
  })
  .catch(err=>{
    console.log(err) 
    setLoading(err.message)
    logData = [{...viewData, 'module_name': module_name, 'api': `/${'fields'}`, 'payload':{"module":"payrollCosts"}, 'response':[], 'error_details': err, 'status_code':'' }];
    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
    }
  })
}
  }

  const [openModal, setOpenModal] = useState(false);
  const [openModalPay, setOpenModalPay] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }


  const handleOpenModalPay = () => {
    setOpenModalPay(true);
  }

    let module_name = "comment";
    let {prev_module_name} = useParams();
    let prevmodule = prev_module_name
    let prevmodule2 = localStorage.getItem('prev_module_name')
    let {pvid} = useParams();
    if(prevmodule === 'customer'){
        prevmodule = 'accounts'
    }else{
        prevmodule = prevmodule
    }
    let no_Of_Data = [10, 25, 50, 75, 100, 250, 500];

    const lang = localStorage.getItem("language")
        if (lang){
            i18n.changeLanguage(lang)
        }

        const handleClose3 = () =>{
            setShow3(false);
        }

    useFetch(LISTVIEWAPI(tenantCname),setTable_header,(err)=>{setLoading(err.message)},{params:{"module": "comment","importfile": 0}},storage)
    useFetch(FIELDSAPI(tenantCname),(data)=>setBlocke(data.block),(err)=>setLoading(err.message),{params:{"module": "comment"}},storage)
    useFetch(FIELDSAPI(tenantCname),(data)=>setRlist(data.related),(err)=>setLoading(err.message),{params:{"module":localStorage.getItem('prev_module_name')}},storage)

    useEffect(() => {
        if(afteredit){return} 
        axios.get("/"+tenantCname+"/api/relatedmodule", {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params: {
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": pvid,
                "order": "commentid~desc",
                "page": offset,
                "ipp": "10"
            }
        }

        )
            .then(res => {
                setCuslist(res.data.data)
                setDetails(res.data)
                localStorage.removeItem("customerDetails")
                setAfteredit(true)
                localStorage.setItem("ae", "")
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": pvid,
                "order": "commentid~desc",
                "page": offset,
                "ipp": "10"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
              
            })
            .catch(err => {
                console.log(err) 
                setLoading(err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": pvid,
                "order": "commentid~desc",
                "page": offset,
                "ipp": "10"}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                // setCuslist([])
            })
    }, [afteredit, offset])
    

    const changeHandle =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setAdd({ ...add, [name]: value })
        if (e.target.type === 'checkbox') {setAdd({ ...add, [name]: e.target.checked ? 1 : 0 })};
    }


    const cdelete=()=>{
        axios.delete("/"+tenantCname+"/api/comments/" + editid, {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            }}
            
            )
        .then(res=>{
            setAfteredit(false)
            handleClose3()
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'comments'}`, 'payload':{'id': editid}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
        .catch(err=>{
            console.log(err) 
            setLoading(err.message)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'comments'}`, 'payload':{'id': editid}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
    }

    const Editing=(com)=>{
        setAdd(com)
        setIsEditing(true)
        setEditid(com.commentid)
        setParentid(com.parent_comment_id)
    }
    const replying=(comid)=>{
        setIsReply(true)
        setReplytoid(comid)
        setParentid(comid)
        setIsReply3(true)
    }
    const replyingchild=(comid, pid)=>{
        setIsReply2(true)
        setReplytoid2(comid)
        setParentid(pid)
        setIsReply3(true)
    }

    const cancelComment=()=>{
        setAdd({comment: '', module_comment: ''})
    }

    let custom = ''
  Object.keys(blocke).map((k)=>(
    blocke[k].map((acc)=>(
      acc.fieldname != [module_name+"_num"] && acc.fieldname != "source" && acc.fieldname != "status" && 
      acc.uitype != 6 && acc.fieldname != "commentby" && acc.fieldname != "related_customer" && acc.fieldname != "related_module" ?
        custom = {...custom, [acc.fieldname]: add[acc.fieldname]} : null,

        acc.fieldname == "commentby" ?
            custom = {...custom,[acc.fieldname] : localStorage.getItem("username")} : null,

        acc.uitype == 6 ?
            custom =  {...custom,[acc.fieldname] : pvid || '2'} : null,

        acc.fieldname == "related_module" ?
            custom =  {...custom,[acc.fieldname] : prevmodule2} : null,

        acc.uitype == 100 ?
         acc.options.map((owner)=>(
            localStorage.getItem("username") == [owner.firstname+" "+owner.lastname] ?
            [custom =  {...custom,[acc.fieldname] : localStorage.getItem("username")},
           custom = {...custom, ["ownerid"] : owner.userid}] : null
         )) : null,
        (parentid !== "0" || parentid !== undefined) ?
            custom = {...custom, ["parent_comment_id"]: parentid}
            : custom = {...custom, ["parent_comment_id"]: "0"},

        
            custom = {...custom, ["is_starred"]: add.is_starred}
    ) )
  ))

    const postComment=(pid)=>{
        if (custom.hasOwnProperty("is_starred")) {
            delete custom.is_starred;
          }
          
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.get("/"+tenantCname+"/api/fielddata", {
            headers: headers,
            params: {
                "module": "comment"
            }
        }
        )
            .then(res => {
                let autofillnumm = res.data[0]
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'fielddata'}`, 'payload':{"module": "comment"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                axios.post("/"+tenantCname+"/api/"+module_name, 
                {
                  [module_name+"_num"]: autofillnumm,
                  "custom": custom,
                  "source": "none",
                  "status": "1"
                },
              {
                  headers: headers
              
                })
                .then((response) => {
                  setAfteredit(false)
                  setAdd({comment: "", module_comment: ""})
                  setIsReply(false)
                  setIsReply3(false)
                  setParentid(0)
                  if(response.data[0] === undefined){
                    Object.keys(response.data).map((keywords)=>(
                      error_msg.push(response.data[keywords])
                    ))
                    setSmShowError(true)
                  }
                  logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{
                  [module_name+"_num"]: autofillnumm,
                  "custom": custom,
                  "source": "none",
                  "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                  if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                  }
                })
                .catch((error) => {
                  console.log(error) 
                  alert(error)
                  logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{
                  [module_name+"_num"]: autofillnumm,
                  "custom": custom,
                  "source": "none",
                  "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
                  if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                  }
                })
            })
            .catch(err => {
                console.log(err)
                setLoading(err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'fielddata'}`, 'payload':{"module": "comment"}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
    }

    const apiediting = (e, gy) =>{
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.put("/"+tenantCname+"/api/"+module_name+"s/" + editid, 
          {
            "comment_num": gy,
            "custom": custom,
            "source": "none",
            "status": "1"
          },
          
          {
              headers: headers
            })
            .then((response) => {
              setIsEditing(false)
              setEditid('')
              setAfteredit(false)
              setAdd({comment: '', module_comment: ''})
              setParentid(0)
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{"comment_num": gy,
            "custom": custom,
            "source": "none",
            "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
            .catch((error) => {
              console.log(error) 
              alert("Something Went Wrong")
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{"comment_num": gy,
            "custom": custom,
            "source": "none",
            "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
    }


    useEffect(()=>{     
        if(commentStar){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer" + " " + localStorage.getItem('token')
              }
            axios.put("/"+tenantCname+"/api/"+module_name+"s/" + commentStar.comment_id, 
              {
                "custom": {"is_starred": commentStar.is_starred? 0 : 1},
                "source": "none",
                "status": "1"
              },
              
              {
                  headers: headers
                })
                .then((response) => {
                    setAfteredit(false)
                    setParentid(0)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{
                        "custom": {"is_starred": commentStar.is_starred? 0 : 1},
                        "source": "none",
                        "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch((error) => {
                  console.log(error) 
                  alert("Something Went Wrong")
                  logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{
                    "custom": {"is_starred": commentStar.is_starred? 0 : 1},
                    "source": "none",
                    "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
                  if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                  }
                })
            setCommentStar(undefined)
        }
    },[commentStar])

    const starfunc=()=>{
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        axios.put("/"+tenantCname+"/api/"+module_name+"s/" + editid, 
          {
            [module_name+"_num"]: add[module_name+"_num"],
            "custom": custom.is_starred,
            "source": "none",
            "status": "1"
          },
          
          {
              headers: headers
            })
            .then((response) => {
              setIsEditing(false)
              setEditid('')
              setAfteredit(true)
              setParentid(0)
              setAdd({comment: '', module_comment: ''})
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{
            [module_name+"_num"]: add[module_name+"_num"],
            "custom": custom.is_starred,
            "source": "none",
            "status": "1"}, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
            .catch((error) => {
              console.log(error) 
              alert("Something Went Wrong")
              logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}s`, 'payload':{
            [module_name+"_num"]: add[module_name+"_num"],
            "custom": custom.is_starred,
            "source": "none",
            "status": "1"}, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
    }

    const reset = (one)=>{
        axios.get("/"+tenantCname+"/api/"+module_name, {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params:{
                "page": one == null ? localStorage.getItem("page") : one,
                "ipp": localStorage.getItem("line") || details.per_page
            }
        }
            )
            .then(res=>{
                setCuslist(res.data.data)
                setDetails(res.data)
                setIsrest(false)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{
                "page": one == null ? localStorage.getItem("page") : one,
                "ipp": localStorage.getItem("line") || details.per_page}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            .catch(err=>{
                console.log(err) 
                setLoading(err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${module_name}`, 'payload':{
                "page": one == null ? localStorage.getItem("page") : one,
                "ipp": localStorage.getItem("line") || details.per_page}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            setNoofdata(details.per_page)
    }

    const datanum_chnage=(num)=>{
        setNoofdata(num)
        axios.get("/"+tenantCname+"/api/relatedmodule", {
                headers:{
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params:{
                    "module": localStorage.getItem("prev_module_name"),
                    "relatedmodule": "comment",
                    "recordid": pvid,
                    "page": details.current_page,
                    "ipp": num,
                    }
                }  
            ) 
            .then(res=>{
              
                setCuslist(res.data.data)
                setDetails(res.data)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                    "module": localStorage.getItem("prev_module_name"),
                    "relatedmodule": "comment",
                    "recordid": pvid,
                    "page": details.current_page,
                    "ipp": num,}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                 
            })
            .catch(err=>{
                console.log(err) 
                setLoading(err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                    "module": localStorage.getItem("prev_module_name"),
                    "relatedmodule": "comment",
                    "recordid": pvid,
                    "page": details.current_page,
                    "ipp": num,}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            localStorage.setItem("line", num)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 13,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };

    

    const sorting=(sortkey)=>{
        const headers = {
            Accept: "application/JSON",
            'Content-Type': 'application/JSON',
            Authorization: "Bearer" + " " + localStorage.getItem('token')
        }
        const params = {
            order: sortkey,
            module: localStorage.getItem("prev_module_name"),
            relatedmodule: "comment",
            recordid: pvid
        }
        axios.get("/"+tenantCname+"/api/relatedmodule", {
            headers: headers,
            params: params
        }
            
            ) 
            .then(res=>{
                setCuslist(res.data.data)
                setDetails(res.data)
                localStorage.removeItem("customerDetails")
                setAfteredit(true)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                order: sortkey,
                module: localStorage.getItem("prev_module_name"),
                relatedmodule: "comment",
                recordid: pvid
                }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
          
            })
            .catch(err=>{
                console.log(err)
                setLoading(err.message) 
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                order: sortkey,
                module: localStorage.getItem("prev_module_name"),
                relatedmodule: "comment",
                recordid: pvid
                }, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                // setCuslist([])
            })
    }

    const sortchange=(e)=>{
        setSortby({[e.target.name]: e.target.value})
        sorting(e.target.value)
    }

    const searchchange=(e)=>{
        setCommentsearch(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          search();
        }
      };

    const search = ()=>{

        const commentFilter = `comment=${commentsearch}|| module_comment=${commentsearch}`;

        axios.get("/"+tenantCname+"/api/relatedmodule", {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params:{
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": localStorage.getItem("c_id"),
                "filter": commentFilter
            }
        }
            
            )
            .then(res=>{
                if(!res.data.data?.length){
                    alert('No Record Available')
                    return 
                }
                setCuslist(res.data.data)
                setDetails(res.data)
                localStorage.removeItem("customerDetails")
                setAfteredit(true)
                setCommentsearch("")
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": localStorage.getItem("c_id"),
                "filter": commentFilter
                }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                
            })
            .catch(err=>{
                console.log(err) 
                setLoading(err.message)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                "module": localStorage.getItem("prev_module_name"),
                "relatedmodule": "comment",
                "recordid": localStorage.getItem("c_id"),
                "filter": commentFilter
                }, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                // setCuslist([])
            })
    }

    const viewallfunc=(vwaid)=>{
        setCurrentRowId(vwaid)
        setViewall(!viewall)
        setViewallid(vwaid)
    }

    const all_accounts=()=>{
        localStorage.removeItem("relatedmodule")
      }

    const deletefunc=(delid)=>{
        setEditid(delid)
        setShow3(true)
    }

    let xlink = ""
    let related_module = localStorage.getItem("relatedmodule")

        if (related_module == null){
            let markchange = ""
                if(localStorage.getItem("prev_module_name") === "customer"){
                markchange = "accounts"
                }else{
                    markchange = localStorage.getItem("prev_module_name")
                }
            xlink = "/home/"+markchange+"/detail/"+pvid
        }else {
                let markchange = ""
                if(localStorage.getItem("prev_module_name") === "customer"){
                markchange = "accounts"
                }else if(localStorage.getItem("prev_module_name") === "contact"){
                markchange = "contacts"
                }else if(localStorage.getItem("prev_module_name") === "product"){
                    markchange = "inventory"
                }else if(localStorage.getItem("prev_module_name") === "equipment"){
                    markchange = "equipment"
                }else if(localStorage.getItem("prev_module_name") === "evmapping"){
                    markchange = "evmapping"
                }else if(localStorage.getItem("prev_module_name") === "eqchild"){
                    markchange = "eqchild"
                }else if(localStorage.getItem("prev_module_name") === "eqcalendar"){
                    markchange = "eqcalendar"
                }else if(localStorage.getItem("prev_module_name") === "opportunity"){
                markchange = "opportunities"
                }else{
                markchange = localStorage.getItem("prev_module_name")
                }
            xlink = "/home/"+markchange
        }
        
    return (
        loading !==  null ?
        <div className="detail_parent parent_padding">
          <div className="container-fluid col-12 pl-4 pr-4">
            <div id='loader'>
              {loading}
            </div>
          </div>
        </div>
        :
        <><Header/>
        <div className="container-fluid detail_parent notesClass">
                <div className="bread_crumb notesheader"><Link target='_self' to={xlink} onClick={all_accounts}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
                    <Trans>{"All "+localStorage.getItem("prev_module_name")+'s'}</Trans></Link>
                </div>
                <h3 className="recordHeading">{localStorage.getItem("cdetailsName") === "undefined" ? localStorage.getItem("cdetailsNum"):localStorage.getItem("cdetailsName")} </h3>

        <div className="mobile_icons_div mobile_icons_div1">
                  <div className="mobile_icons_left">
                
                  </div>
                
                  <div className="mobile_icons_right">
                    <div className="relatedlist_drpdwn">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Related List
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="related_drop">
                            <Dropdown.Item href={"#/home/"+module_name+"/detail/" + pvid}>
                                <div className="di_icons">
                                    <span className="related_svg_icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF"/><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white"/><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white"/></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2"/><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"/></clipPath></defs></svg>
                                    </span>
                                    <span className="r_name">Details</span>
                                </div>
                            </Dropdown.Item>
                            {
                             
                                    rlist.sort((a, b)=> a.seq - b.seq).map((r)=>(
                                        
                                        <Dropdown.Item key={r.seq} href={"#/home/"+prevmodule+"/relatedlist/"+pvid}>
                                            <div className="di_icons" onClick={()=> localStorage.setItem("relatedmodule", r.name.toLowerCase())}>
                                                <span className="related_svg_icon">{[<SVG src={r.related_icon}/>]}</span>
                                                <span className="r_name">{r.name}</span>
                                            </div>
                                        </Dropdown.Item> 
                                      
                                    ))
                               
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                        </div>
                    </div>
                </div>

                <div className="row">
                <div className="col-12">
                    <div className="view_page_head">
			                <div className="page_head mt-2">
			                    <h3>{cdetails[prevmodule2+"_name"]}</h3>
			                </div>			                
			        </div>
                </div>
                    {rlist[0] == undefined ? null :
                        <div className="col-12">
                            <div className="icons_div relatedBar">
                                <span className="prev_arrow"></span>
                                <Slider {...settings}>
                                    <div className="detail_icons">
                                        <li className='' onClick={()=> localStorage.removeItem("relatedmodule")}>
                                            <a href={"#/home/" + prevmodule + "/detail/" + pvid}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width=  "27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>
                                                <p>Details</p>
                                            </a>
                                        </li>
                                    </div>
                                    {
                                        rlist.sort((a, b)=> a.seq - b.seq).map((r)=>(
                                           
                                                [<div className="detail_icons"><li className='' 
                                                onClick={()=> (localStorage.setItem("relatedmodule", r.name.toLowerCase()))}>
                                                <a key={r.name} href={"#/home/"+prevmodule+"/relatedlist/"+pvid}>{[<SVG src={r.related_icon}/>]}
                                                <p><Trans>{r.name == 'Customer' ? r.relatedlistname : r.name}</Trans></p></a>
                                                </li></div>] 
                                            
                                        ))
                                        } 
                                </Slider>
                                <span className="next_arrow"></span>
                            </div>
                        </div>
                    }
                </div>

            <div className="parent_div">
                <h4 className="acct-info">Add New Comment</h4>
            </div>

        <div className="row">
            <div className="col-sm-2 mainImg" align="center">
                <div className="comnt_user_img user_ini">{localStorage.getItem("username")[0].toUpperCase()+localStorage.getItem("username").substring(localStorage.getItem("username").indexOf(' ') + 1)[0].toUpperCase()}</div>
                <span>{localStorage.getItem("username")}</span>
            </div> 

            <div className="col-sm-10 cmtInpt">
                {
                    Object.keys(blocke).map((k)=>(
                        blocke[k].map((acc)=>(
                            acc.show_hide_criteria == 1 && acc.fieldname == "comment" || acc.fieldname == "module_comment" ?
                            [acc.uitype != 6 && acc.uitype != 100 && acc.fieldname != "module_comment" && acc.fieldname != [module_name+"_country"] 
                             && acc.fieldname != [module_name+"_num"] && acc.fieldname != "salutation" && acc.uitype != 5 ?

                            [
                                <input className="form-control boxsizeComment" name={acc.fieldname} 
                                key={acc.fieldname}
                                onChange={changeHandle} 
                                value={isEditing ? '' : (add[acc.fieldname] == "0" ? "" : add[acc.fieldname])}
                                type="text" placeholder="Subject" />
                            
                            ] : null,
                            acc.fieldname == "module_comment" ?
                                [
                                  <textarea className="form-control boxsizeComment" type="text" rows="3" cols = "10"
                                    id="floatingTextarea"
                                    name={acc.fieldname} 
                                    key={acc.fieldname}
                                    value={isEditing ? '' : isReply3? " " : add[acc.fieldname]} 
                                    onChange={changeHandle} placeholder="Comment">
                                  </textarea>,
                                  <label key={acc.fieldname+"l"} htmlFor="floatingTextarea"></label>
                                ] : null,
                            acc.uitype == 100 ?
                              [<select key={acc.fieldname} name={acc.fieldname} defaultValue={add[acc.fieldname]} onChange={changeHandle} hidden>
                            
                                {
                                  (acc.options).map((option)=>(
                                  <option key={option.userid} defaultValue={add[acc.fieldname]}>
                                    {option.firstname} {option.lastname}
                                  </option>
                                  ))
                                }
                              </select>] : null
                            ] : null
                        ))
                    ))
                }

                    <div className="btn_space submit-row submit-row1 button_row">
                        <button className="btn_cancel reset_button" onClick={cancelComment}>Cancel</button>
                        <button className="search_button" onClick={postComment}>Post Comment</button>
                    </div>

            </div>
        </div>
        {cuslist?.length?
        <div className="row">
            <div className="col-12">
                <div className="top_btns row bottom_row2">
                    <div className="col-sm-2">
                        <div className="bulk_ico">
                            <div className="filters sortBy">
                                <select name="sort" defaultValue={sortby} onChange={sortchange}>
                                    <option hidden>Sort by</option>
                                    <option value="commentid~desc">Latest Comments</option>
                                    <option value="is_starred~desc">Starred</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-sm-10">
                        <div className="search_form_field search_form_field02">
                            <span><i onClick={search}><svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor"></path></svg></i></span>
                            <input type="text" onChange={searchchange}    onKeyPress={handleKeyPress} name="commentsearch" placeholder="" value={commentsearch}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :null}

        <div className="commentsbox">
            {
                   cuslist && Object.keys(cuslist).sort((a, b)=> 
                    sortby.sort === "commentid~desc" ? cuslist[b].commentid - cuslist[a].commentid : sortby.sort === "is_starred~desc" ?
                    (cuslist[b].is_starred&&cuslist[b].commentid) - (cuslist[a].is_starred&&cuslist[a].commentid) : 
                    cuslist[b].commentid - cuslist[a].commentid).map((cus)=>(
            [<div key={cuslist[cus].commentid} className="row">
            <div className="col-12">
            <div className="box1 commentBox">
            <div className="boxTop">
                <span className="starIcon">
                    <label>
                    <input className="mycheckbox" type="checkbox" name="is_starred" 
                        defaultValue={cuslist[cus].is_starred} onChange={changeHandle} 
                        onClick={()=> setCommentStar(cuslist[cus])}></input>
                        <span className={cuslist[cus].is_starred == 1 ? "starBg2" : "starBg"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clipPath="url(#clip0)"><path d="M16.5283 6.73067C16.4208 6.39801 16.1257 6.16174 15.7766 6.13027L11.0349 5.69972L9.1599 1.31108C9.02164 0.989445 8.70678 0.78125 8.35695 0.78125C8.00711 0.78125 7.69225 0.989445 7.554 1.31183L5.67899 5.69972L0.9365 6.13027C0.588046 6.16249 0.29374 6.39801 0.185569 6.73067C0.0773975 7.06333 0.177296 7.4282 0.440893 7.65821L4.02508 10.8016L2.96819 15.4572C2.89085 15.7995 3.02372 16.1533 3.30774 16.3587C3.46041 16.469 3.63903 16.5251 3.81914 16.5251C3.97445 16.5251 4.12849 16.4833 4.26675 16.4005L8.35695 13.956L12.4456 16.4005C12.7448 16.5805 13.122 16.5641 13.4054 16.3587C13.6896 16.1527 13.8223 15.7988 13.745 15.4572L12.6881 10.8016L16.2722 7.65884C16.5358 7.4282 16.6365 7.06396 16.5283 6.73067Z" fill="#ACACAC" className="starB"/></g><defs><clipPath id="clip0"><rect width="16.4286" height="16.4286" fill="white" transform="translate(0.142578 0.428711)"/></clipPath></defs></svg>
                        </span>
                    </label>
                </span>
                <div className="row">
                
                    <div className="col-sm-3 col-md-3 col-lg-2">
                        <div className="imgbox">
                            <div align="center">
                                <img src={cuslist[cus].commentby[0]} alt="" align="center"></img>
                                <div className="comnt_user_img user_ini">{cuslist[cus].commentby[0].toUpperCase()+cuslist[cus].commentby.substring(cuslist[cus].commentby.indexOf(' ') + 1)[0].toUpperCase()}</div>
                                <span>{cuslist[cus].commentby}</span>
                                <p className="text-sm"><span>{Moment(cuslist[cus].createtime).add(Moment().utcOffset(), "minutes").format("DD/MM/YYYY HH:mm")}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 col-sm-8 col-lg-9">
                   
                        <div className="commentLines">
                            <h6>{cuslist[cus].comment} </h6>
                           {
                            isEditing && editid == cuslist[cus].commentid ? 
                            <form onSubmit={(e)=> apiediting(e, cuslist[cus].comment_num)}>
                                <input id="parent" hidden name="module_comment" defaultValue={add.comment || cuslist[cus].comment} onChange={changeHandle}></input>
                                <textarea id="parent" name="module_comment" defaultValue={add.module_comment || cuslist[cus].module_comment} onChange={changeHandle}></textarea>
                                <button type="submit" className="update_button mr-2">Update</button>
                                <button onClick={()=> {setIsEditing(false); setAdd({})}} className="btn_cancel reset_button">Cancel</button>
                            </form> :
                            <p>{cuslist[cus].module_comment}</p>
                            } 
                        </div>
                        <div className="boxBottom2">
                            <ul className="list-group list-group-horizontal msge_btns">
                                <li className="list-group-item" onClick={()=> replying(cuslist[cus].commentid)}><a>Reply</a> </li>
                                <li className="list-group-item" onClick={()=> Editing(cuslist[cus])}><a>Edit</a> </li>
                                <li className="list-group-item" onClick={()=> deletefunc(cuslist[cus].commentid)}><a>Delete</a> </li>
                                <li onClick={()=> viewallfunc(cuslist[cus].commentid)} className="list-group-item view_all_li">
                                    {
                                    cuslist[cus].childs !== undefined ?
                                    <a className="view_all_rep">{(viewall && viewallid == cuslist[cus].commentid ) ? "Hide All Replies": "View All Replies"} <i className="fas fa-sort-down" aria-hidden="true"></i></a>
                                    : null
                                    }
                                </li>
                            </ul>
                        </div>
                   
                    </div>
                    
                    {isReply && replytoid == cuslist[cus].commentid ? <div className="col-lg-11 col-md-10 ml-5 pl-5">
                        {
                            Object.keys(blocke).map((k)=>(
                                blocke[k].map((acc)=>(
                                    acc.show_hide_criteria == 1 && acc.mandatory == 1 ?
                                    [acc.uitype != 6 && acc.uitype != 100 && acc.fieldname != "module_comment" && acc.fieldname != [module_name+"_country"] 
                                     && acc.fieldname != [module_name+"_num"] && acc.fieldname != "salutation" && acc.uitype != 5 ?
        
                                    [
                                    // <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    //     <input name={acc.fieldname} 
                                    //     onChange={changeHandle} 
                                    //     defaultValue={add[acc.fieldname] == "0" ? "" : add[acc.fieldname]}
                                    //     type="text" placeholder="Subject" />
                                    // </div>
                                    ] : null,
                                    acc.fieldname == "module_comment" ?
                                        [<div key={acc.fieldname} className="col-md-12 commentText">
                                          <textarea type="text" rows="3" cols = "10"
                                            name={acc.fieldname} 
                                            defaultValue={add[acc.fieldname]} 
                                            onChange={changeHandle} placeholder="Comment">
                                          </textarea>
                                        </div>] : null,
                                    acc.uitype == 100 ?
                                      [<select name={acc.fieldname} defaultValue={add[acc.fieldname]} onChange={changeHandle} hidden>
                                    
                                           {/* <option>{add[acc.fieldname]}</option>  */}
                                        {
                                          (acc.options).map((option)=>(
                                          <option key={option.userid} defaultValue={add[acc.fieldname]}>
                                            {option.firstname} {option.lastname}
                                          </option>
                                          ))
                                        }
                                      </select>] : null
                                    ] : null 
                                ))
                            ))
                        }
        
                        <div className="col-md-12">
                            <div className="btn_space submit-row">
                                <button className="btn_cancel reset_button" onClick={()=> setIsReply(false)}>Cancel</button>
                                <button className="search_button" onClick={()=> postComment(cuslist[cus].commentid)}>Post Comment</button>
                            </div>
                        </div>
        
                    </div> : null}            
                </div>
            </div>
            
                {viewall && viewallid == cuslist[cus].commentid ?
                    (cuslist[cus].childs || []).map((comment) => {
                    return (
                            <Comment key={comment.commentid} forChange={()=> setAfteredit(false)} comment={comment} blocke={blocke} />
                            )
                        }) : null}
        </div>
        </div>
        </div>
            ]
                ))
            }
        
        </div>
        {cuslist?.length?
        <div className="row">
        <div className="col-lg-5"></div>
        <div className="col-lg-7 col-12">
            <div className="para pageOrder">
                <div className="d-flex show-tab">
                    <label>Show</label>
                    <Dropdown drop='up'>
                        <Dropdown.Toggle className="btn btn-more dropdown-toggle" id="dropdown-basic dropdownShowButton">
                        {details.per_page}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                no_Of_Data.map((number)=>(
                                    <Dropdown.Item key={number} href="#" onClick={()=>datanum_chnage(number)}>{number}</Dropdown.Item>
                                    ))
                            }
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <nav aria-label="pagination">
                    <ul className="pagination">
                        <ul className="pagination">
                            <ReactPaginate
                                disableInitialCallback={false}
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={details.last_page || 0}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/> 
                        </ul>
                    </ul>
                </nav>
                    
            </div>
        </div>
        </div>: null}
        </div> 
{/* xxxxxxxxxxxx Modal for Delete xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Modal show={show3} onHide={handleClose3} className="modal_delete fade small_modal modal">
                <Modal.Header>
                <Modal.Title>Delete Comment(s)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Do you want to delete the {module_name}(s)?</h5>
                    <h6>All the data related to this {module_name} will be removed</h6>
                    {/* <ProgressBar animated now={progres_value} min={0} /> */}
                </Modal.Body>
                <Modal.Footer>
                <Button className="secondary reset_button" onClick={handleClose3}>
                    Cancel
                </Button>
                <Button variant="danger" className="danger" onClick={cdelete}>
                    Yes Delete
                </Button>
                </Modal.Footer>
            </Modal>
{/* Modal for Error message xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                <Modal
                    size="sm"
                    show={smShowError}
                    onHide={() => (setSmShowError(false), setError_msg([]))}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" style={{"color": "red"}}>
                        <Trans>Error</Trans>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error_msg.map((para)=> (<li style={{"color": "brown", "font-size": "12px"}}>{para}</li>))}</Modal.Body>
                </Modal>
{/* Modal for operationExp xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
<Modal show={openModal} onHide={()=>( setOpenModal(false))} size="lg"
                  aria-labelledby="contained-modal-title-vcenter" centered>
                              <Modal.Body>
                                <div className='opexp-modal'>
                                {localStorage.setItem("module_name", "operationalexpense")}
                              {/* <CreateModulePage himmat="operationalexpense" yes={true} closeBox={() => setOpenModal(false)} /> */}
                              </div>
                              </Modal.Body>
                            </Modal>
{/* modal for PayrollCosts xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                            <Modal show={openModalPay} onHide={()=>( setOpenModalPay(false))} size="lg"
                              aria-labelledby="contained-modal-title-vcenter"centered>
                              <Modal.Body>
                              <div className='opexp-modal'>
                              {localStorage.setItem("module_name", "payrollcosts")}
                              {/* <CreateModulePage himmat="payrollcosts" yes={true} closeBox={() => setOpenModalPay(false)} /> */}
                              </div>
                              </Modal.Body>
                            </Modal>

        </>
    )
}

export default Notes
