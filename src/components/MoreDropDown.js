
import React, { useState, useEffect, useRef } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Modal } from "react-bootstrap"
import "../assets/style/CustomerList.css"
import { Trans } from 'react-i18next';
import i18n from "../config/i18n"
import Dropdown from "react-bootstrap/Dropdown"
import { RiAddCircleLine } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router';
import Buttons from './Buttons';
import useGetReq from "../service/useGetReq";
import { useContext } from 'react';
import { AuthContext } from '../config/Authentications/AuthContext';
import { WORKFLOWAPI } from '../service/ApiPath';
import { CheckModuleName, Markchange } from '../utils/CheckModuleName';
import useFetch from '../service/GetApiResponse';
import { UpdateDetails } from './DataTable';
import { Param } from './Params';
import useStorage from '../service/useStorage';

const MoreDropDown = (props) => {
    const storage = useStorage();
    const { authState,setAuthState } = useContext(AuthContext)
    const tenantCname = authState.tenant_cname;
    const { details, setDetails}= useContext(UpdateDetails);
    const [dybtn, setDybtn] = useState([])
    const [dy_btn_form, setDy_btn_form] = useState([])
    const [snum, setSnum] = useState({})
    let [dy_form_data, setDy_form_data] = useState({})
    let [dyData, setDydata] = useState({})
    let [dyNum, setDyNum] = useState()
    const [show, setShow] = useState(false);
    const [exp_cus_id, setExp_cus_id] = useState("")
    const [workf_error, setWorkf_error] = useState("")
    const [offset, setOffset] = useState(authState.page || 1);
    const prevModuleValue = useRef("")
    const [selectRows, setSelectRows] = useState([])
    const [duplicateState, setDuplicateState] = useState(true)

    const handleClose = () => setShow(false);
    const lang = authState.language

    if (lang) {
        i18n.changeLanguage(lang)
    }

    let module_name = CheckModuleName();
    const [getData] = useGetReq();
    const [workFlowdata, setWorkFlowData] = useState("")
    const [wsteps, setWsteps] = useState("")
    const [wsteps1, setWsteps1] = useState("")
    const [err, setErr] = useState("")
    const [swid, setSwid] = useState('')

    let data1= Param.data1(module_name,'')
    let data3= ""
    if(swid !="")
    { data3 = Param.data3(module_name,swid,exp_cus_id) } 

    const handleQueryString = useLocation().search;

    let nice = ""

    useEffect(() => {
        prevModuleValue.current = module_name
        nice = handleQueryString.replace('?', '').replace(/%20/g, " ")
    }, [module_name])

    useFetch(WORKFLOWAPI(tenantCname), setWorkFlowData, setErr, data1)

    useEffect(()=>{
        if (workFlowdata){
            setDybtn(workFlowdata)
            if (authState.onClickMenuModule != module_name) {
                setOffset(1);
                setAuthState({...authState,page:1})
            }
        }
        if(wsteps){
            setSnum(wsteps)
            setDy_btn_form(wsteps.fields)      
        }
        
        if(wsteps1){
              //  for dysubmit
              if(dyNum !== 2){ 
              setDy_btn_form(wsteps1.fields)
              setSnum(wsteps1)
        }
        if ((wsteps1.fields == undefined) && (wsteps1.stepnum)) {
            dysubmit(wsteps1.stepnum)
        }
              setWorkf_error("")
              setDy_form_data("")
             
              if (dyNum > 1) {
                  setWorkf_error("Field(s) Required")
              } 
        }
    },[workFlowdata,wsteps,wsteps1])
    
    let linkChangeForOpportunity = ""
    let linkChangeForOpportunity2 = ""
    let linkChangeForOpportunity3 = ""

    let markchange = Markchange(module_name)
    if(markchange == "opportunity"|| markchange == "invoice" || markchange == "supplierorder"|| module_name == "supplierorderreturn"){
        linkChangeForOpportunity3 = "/home/" + markchange + "/add-edit-op"
    } 
    if(markchange == "report"){
        linkChangeForOpportunity = "/home/" + markchange + "/add-edit-report"
    } else {
        linkChangeForOpportunity = "/home/" + markchange + "/add-edit"
    }
    linkChangeForOpportunity2 = "/home/" + markchange + "/detail-op/"

    const dy_changeHandle = (e) => {
        setDy_form_data({ ...dy_form_data, [e.target.name]: e.target.value })
    }
    const handleCreate = () => {
        setDuplicateState(false)
        setAuthState({...authState,customerDetails:'',c_id:''})
        setAuthState({...authState,duplicate:'',dupState:"false"})
        localStorage.removeItem("relatedmodule")
        localStorage.removeItem("c_id")
    }

    useEffect(() => {
        if (swid !== "") {
          getData("/" + tenantCname + "/api/wsteps" , setWsteps, setErr, data3,storage);
        }
      }, [swid])

    const dyclick = (dy, dyt) => {
        setSwid(dy)
        if (dyt == "Webform") {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const dysubmit = (num) => {
        dy_form_data = ({
            ...dy_form_data,
            "module": module_name,
            "view": "index",
            "wid": swid,
            "formtype": "1",
            "stepnum": num,
            "records": exp_cus_id
        })

        let param = {
            params: 
                dy_form_data
            
        }
        setDydata(dy_form_data)
        setDyNum(num)
        getData("/" + tenantCname +"/api/wsteps", setWsteps1, setErr,param,storage);
                  
    }


    {
        return (
            <>
                <div className="crt_btn_div">
                    <div className="jbjb">
                        {dybtn.length >= 1 ?
                            <Dropdown >
                                <Dropdown.Toggle className="btn-more" id="dropdown-basic dropdownMoreButton">
                                    More
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {dybtn.map((dybt, d) => (
                                        <Dropdown.Item
                                            onClick={() => {
                                                dyclick(dybt.workflow_id, dybt.type)
                                            }}
                                            href="#"
                                            key={dybt.workflow_id}>{dybt.button_label}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            : null
                        }
                    </div>
                    {
                        module_name !== "report" ?
                            details.module_access >= 2 ?
                                <Buttons click={handleCreate} class="crt_btn">
                                    <Link target='_self' to={( module_name == "invoice" || module_name == "opportunity" || module_name == "supplierorder"||module_name == "supplierorderreturn") ? linkChangeForOpportunity3 :linkChangeForOpportunity}>
                                        <div><i className="crt_btn_i"><RiAddCircleLine /></i>
                                        <Trans>{window.innerWidth <= 450 ? " Create" : " Create " + module_name}</Trans></div>
                                    </Link>
                                </Buttons> :
                                null :
                                
                            // /*commented out for report module praveen*/ authState.roleid === "1" ?
                                <Buttons click={handleCreate} class="crt_btn">
                                    <Link target='_self' to={linkChangeForOpportunity}>
                                        <div><i className="crt_btn_i"><RiAddCircleLine /></i>
                                            <Trans>{window.innerWidth <= 450 ? " Create" : " Create " + module_name}</Trans></div>
                                    </Link>
                                </Buttons> 
                                ///*commented out for report module praveen*/ : null
                    }
                </div>

                {/* modal for Dynamic BUtton xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                <Modal className="dynmc_btn_mdl" show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton closeLabel="">
                        <Modal.Title>Workflow Title Here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {snum != "run Query{}" && dy_btn_form != null ?  
                            dy_btn_form.map((dbf) => (
                                [
                                    <label key={dbf.fieldlabel}>{dbf.fieldlabel}
                                        {dbf.mandatory == 1 ? <h6>{workf_error}</h6> : null}
                                    </label>, <br></br>,
                                    <input key={dbf.fieldkey} type="text"
                                        name={dbf.fieldkey}
                                        onChange={dy_changeHandle}
                                    ></input>, <br></br>
                                ]
                            )) : null
                        }
                        {
                            snum.stepnum ? dy_btn_form == null ? null :
                                <button type="submit" onClick={() => { dysubmit(snum.stepnum) }} className="dynmc_btn_mdl_sub_btn">
                                    {dy_btn_form == null ? "Submit" : "Next"}
                                </button> :
                                <h4>{snum.commplete}</h4>
                        }
                       

                    </Modal.Body>

                </Modal>
            </>
        )
    }
}

export default MoreDropDown;
