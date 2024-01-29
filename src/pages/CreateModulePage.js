/* eslint-disable */
import React, { useState, useEffect, createContext, useContext } from 'react'
import { Modal } from "react-bootstrap"
import "../assets/style/CreateCustomer.css"
import "../assets/style/Header.css";
import { useNavigate } from "react-router-dom"
import i18n from "../config/i18n"
import Header from '../layouts/Header';
import { Trans } from 'react-i18next'
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import Moment from 'moment';
import { AuthContext } from '../config/Authentications/AuthContext';
import { groupCheck, linee_value, opCreatePageData, r_value, searchTableModuleValue } from '../navigation/PageRoutes';
import SupplierorderReceiptLines from '../components/SupplierorderReceiptLines';
import Footer from '../layouts/Footer';
import { usePayload } from '../service/usePayload';
import { CheckModuleName } from '../utils/CheckModuleName';
import { allUserListApi, editapi, getDuplicateApiData, getEditApiData, getRelatedModuleApiData, op_and_payroll_editapi, postapi, put_api_forall_module, soreceipt_module_post_api, getFieldDataApiData, getFieldsApiData, workFlowDySubmit, multiedit_api_forall_module } from '../service/useApiData';
import Uitype14 from '../components/UitypeComponents/Uitype14';
import Uitype6 from '../components/UitypeComponents/Uitype6';
import Uitype2 from '../components/UitypeComponents/Uitype2';
import RelatedListForCreateRecord from '../components/RelatedListForCreateRecord';
import LeavePageWarning from '../components/LeavePageWarning';
import ProgressBarFile from '../components/ProgressBarFile';
import ShowUserList from '../components/ShowUserList';
import CreateRecordTime from '../components/CreateRecordTime';
import ShowErrorMsg from '../components/ShowErrorMsg';
import LineDeleteModal from '../components/LineDeleteModal';
import Uitype9 from '../components/UitypeComponents/Uitype9';
import Uitype8 from '../components/UitypeComponents/Uitype8';
import Uitype7 from '../components/UitypeComponents/Uitype7';
import Checkbox from '../components/UitypeComponents/Checkbox';
import ForSalutation from '../components/UitypeComponents/ForSalutation';
import Uitype100 from '../components/UitypeComponents/Uitype100';
import RadioButtons from '../components/UitypeComponents/RadioButtons';
import Uitype3 from '../components/UitypeComponents/Uitype3';
import Uitype102 from '../components/UitypeComponents/Uitype102';
import Uitype101 from '../components/UitypeComponents/Uitype101';
import Buttons from '../components/Buttons';
import BackToLinks from '../components/UitypeComponents/BackToLinks';
import EditAccountModal from '../components/Modal/EditAccountModal';
import Uitype103 from '../components/UitypeComponents/Uitype103';
import FieldData from '../components/UitypeComponents/FieldData';
import TextField from '../components/UitypeComponents/TextField';
import CurrencyInput from 'react-currency-input-field';
import Uitype11 from '../components/UitypeComponents/Uitype11';
import { selecet_Rows } from '../components/DataTable';

import useStorage from '../service/useStorage';
export const blocke_value = createContext();

const CreateModulePage = (props) => {
  const storage = useStorage()
  const [apiPathData,setapiPathData] = useState([])
  const { authState, setAuthState } = useContext(AuthContext)
  const tenantCname = authState.tenant_cname;
  const { add, setAdd, addForMulti, setAddForMulti, setDep_dropdown_value, country, setCountry, salutation, setSalutation } = useContext(opCreatePageData)
  const { line, setLine } = useContext(linee_value)
  const { searchTableModule, searchRelatedTo, setSearchRelatedTo, uitype_module, setUitype_module,smShowError, setSmShowError,error_msg, setError_msg } = useContext(searchTableModuleValue)
  let { row_value, setRow_value, product_Table, setProduct_Table, blocke, setBlocke, related_record, setRelated_record, uitype6_value, setuitype6_value, add_forName, setAdd_forName } = useContext(r_value)
  const {supplierorder_num, setSupplierOrder_num} = useContext(groupCheck)
  const [show2, setShow2] = useState(false);
  const [show4, setShow4] = useState(false);
  const [showUserlist, setShowUserlist] = useState(false);
  const [rlist, setRlist] = useState([])
  let [mand_error, setMand_error] = useState("")
  const [autofillnumm, setAutofillnumm] = useState("")
  let [selectedUserList, setSelectedUserList] = useState([localStorage.getItem("userid")])
  const [userListState, setUserListState] = useState([])
  const [progres_value, setProgres_value] = useState("")
  const [smShow, setSmShow] = useState(false);
  const [warehouse_multiple_record, setWarehouse_multiple_record] = useState("")
  const [isreadonly, setIsreadonly] = useState(false)
  const [loading, setLoading] = useState(null) // to show error
  let [linee, setLinee] = useState([])
  const [lineDeleteId, setLineDeleteId] = useState({})
  const [groupName, setGroupName] = useState([])
  // const [supplierorder_num, setSupplierOrder_num] = useState("")
  const [show9, setShow9] = useState(false);
  const [show10, setShow10] = useState(false);
  const [smShow2, setSmShow2] = useState(false);
  let [linearray, setLinearray] = useState([])
  const [amount, setAmount] = useState("")
  let [rajya, setRajya] = useState({})
  const [relatedModuleName, setRelatedModuleName] = useState('')
  const [rediLinkRel, setRediLinkRel] = useState('')
  const [smLeaveEditWarn, setSmLeaveEditWarn] = useState(false);
  const [parent,setParent] = useState('')
  const relatedPopUp = props.relatedPopUp
  const main_module = localStorage.getItem("prev_module_name")
  let related_module = localStorage.getItem("relatedmodule")
  const [multiField, setMultiField] = useState(2)
  const lang = localStorage.getItem("language")
  if (lang) {
    i18n.changeLanguage(lang)
  }
  const [isEmailValid, setIsEmailValid] = useState(true);
  let navigate = useNavigate();
  const handleClose4 = () => setShow4(false);
  const handleClose5 = () => setShow2(false);
  const handleClose9 = () => setShow9(false);
  const handleClose10 = () => setShow10(false);
  const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  let module_name = CheckModuleName(props);

   let selectedFlatRows = authState.selectedFlatRows
  let selectedFlatRowsmy = selectedFlatRows && JSON.parse(selectedFlatRows)
  // let selectedFlatRowsmy = selectedFlatRows 
  const customerDetailsss = authState.customerDetails
  const customerDetails = customerDetailsss && JSON.parse(customerDetailsss)
  
  const getDataFromEditApi = (apiPath) => {

    (async () => {

      const data = await getEditApiData(tenantCname, authState, apiPath)
      if (data && props.yes !== true) {

        // console.log(data,"reponse3")
        if (module_name === "embedding") {
          let modifyEmbed_value = data[0]["embedding_value"];
          let replaced_Value = "";
  
          if (modifyEmbed_value) {
            const currentHostname = window.location.origin;// Remove trailing slash
            if(modifyEmbed_value.indexOf('trimmedValue') !== -1){
                replaced_Value = currentHostname + '/#/home' + modifyEmbed_value.split('trimmedValue')[1]; 
                let newEmbeddedValue = {};
                newEmbeddedValue = {...data[0], "embedding_value" : replaced_Value};
                setAdd_forName(newEmbeddedValue)
                // console.log(newEmbeddedValue, "url has no trimmedValue", replaced_Value);
            } else {
                setAdd_forName(data[0])
            }
          }
        } else {
          setAdd_forName(data[0])
        }
        setapiPathData(data)
        setAutofillnumm(data[0][module_name + "_num"])
        resfunc(data[0]);
        setSalutation(data[0].salutationid)
        setCountry(data[0][module_name + "_countryid"])
        if(setLine){
          setLine({ ...line, [module_name + "lineid"]: "0" })
        }
      
          (related_module == null ? localStorage.setItem("prev_c_id", e_id) : null)
        if (add["operationalexpense_num"] === null || add["operationalexpense_num"] === undefined) {
          add["operationalexpense_num"] = data[0].operationalexpense_num
        }
        if (add["payrollcosts_num"] === null || add["payrollcosts_num"] === undefined) {
          add["payrollcosts_num"] = data[0].payrollcosts_num
        }
        if (module_name == "supplierorderreceipt") {
          setGroupName(data && data[0].lines.Group)
        }
      } else {
        setLoading(err.message)
      }
    })()
  }
  const getDataFromDuplicateApi = (apiPath) => {

    (async () => {

      const data = await getDuplicateApiData(tenantCname, authState, apiPath)
     
      if (data) {
        console.log(data,"duplicate apidata")
        setAdd_forName(data[0])
        resfunc(data[0]);
        setSalutation(data[0].salutationid)
        duplicate_errorfunc(data[0])
        setCountry(data[0][module_name + "_countryid"])
        setRajya({ label: (data[0][module_name + "_county"] === 0 ? " " : data[0][module_name + "_county"]), value: data[0][module_name + "_countyid"] })
        if (add["operationalexpense_num"] === null || add["operationalexpense_num"] === undefined) {
          add["operationalexpense_num"] = data[0].operationalexpense_num
        }
        if (add["payrollcosts_num"] === null || add["payrollcosts_num"] === undefined) {
          add["payrollcosts_num"] = data[0].payrollcosts_num
        }
        if (module_name == "supplierorderreceipt") {
          setGroupName(data && data[0]?.lines.Group)
        }

      } else {
        setLoading(err.message)
      }
      setAuthState({ ...authState, customerDetails: "" })
    })()
  }

  const relatedData_func=(data)=>{
   let a= 0;
   data&& Object.keys(data.block).map((k)=>{
  data.block[k].map((acc)=>{
     if (acc.fieldname.match(/_record$/g)){
     a +=1
      setMultiField(a)
     }
    })
   })
  }

  const getRelatedModuleData = (forChange) => {

    (async () => {

      const data = await getRelatedModuleApiData(tenantCname, forChange, authState)
      if (data) {
        console.log(main_module,data,"CreateGetApi DAta",data[0])
        setSearchRelatedTo(main_module)
        setRelated_record(main_module)
        if(localStorage.getItem("prev_c_id") && relatedPopUp == true && module_name !== "customer"){
          setParent(data[0])
        }
        
        if(main_module === "supplier"){
          setRow_value(
            {
              ...row_value,
              ['related_' + main_module]: data[0][main_module + "_name" || data[0][main_module + "_num"]],
              ['related_' + main_module + 'id']: localStorage.getItem("prev_c_id"),
              [main_module + '_country']:data[0][main_module + '_country'],
              [main_module + '_county']:data[0][main_module + '_county']
            }
          )
        }else{
          setRow_value(
            {
              ...row_value,
              ['related_' + main_module]: data[0][main_module + "_name" || data[0][main_module + "_num"]],
              ['related_' + main_module + 'id']: localStorage.getItem("prev_c_id")
            }
          )
        }
        setuitype6_value(
          {
            ...uitype6_value,
            ['related_' + main_module]: data[0][main_module + "_name" || data[0][main_module + "_num"]],
            ['related_' + main_module + 'id']: localStorage.getItem("prev_c_id")
          }
        )
      } else {
        setLoading(err.message)
      }

    })()
  }

  useEffect(() => {
    (async () => {
      if ( module_name && (module_name != "calendar" || related_module == "calendar")){
        const data = await getFieldsApiData(tenantCname, module_name,storage)
        if (data) {
          setBlocke(data.block)
          setRlist(data.related)
          relatedData_func(data)
          if (module_name === "supplierorderreceipt") {
            setLinee(data.line.block)
          }
        }else {
          setLoading(err.message)
        }
      }
    })()
  }, [module_name])

  useEffect(() => {
    // when we create record or duplicate
    (async () => {
      if (!e_id) {
        const data = await getFieldDataApiData(tenantCname, module_name)
        if (data) {
          setAutofillnumm(data[0])

          setAdd({ ...add, [module_name + "_num"]: data[0] })
          setAdd_forName({ ...add_forName, [module_name + "_num"]: data[0] })

          if (props.module_name === null || props.module_name === undefined) {
            if ((customerDetails === null || e_id === null) && (selectedFlatRowsmy).length < 1) {
              setAdd({ ...add, [module_name + "_num"]: data[0] })
            } else if (props.apiForOpPayModal === "true") {
              setAdd({ ...add, [module_name + "_num"]: data[0] })
            }
          }else {
            setAdd({ ...add, [module_name + "_num"]: data[0] })
          }

          if (module_name == "comment") {
            setAdd({ ...add, [module_name + "_num"]: data[0] })
          }

          if (add[module_name + "_id"] == null && selectedFlatRowsmy && (selectedFlatRowsmy).length < 1) {
            add.assign_to = authState.username
          }

        }else {
          setLoading(err.message)
        }
      }
    })()

  }, [])

  let e_id = ""
  // console.log("3006666",authState,"222",customerDetails)
  if (customerDetails && customerDetails[module_name + "_id"]) {
    e_id = customerDetails[module_name + "_id"] || customerDetails[module_name + "id"]
  }

  let duplicate = authState.duplicate

  useEffect(() => {
    setAddForMulti({})
  }, [module_name])

  const duplicate_errorfunc = (def) => {

    (async () => {

      const data = await getFieldDataApiData(tenantCname, module_name)
      if (data) {
        setAdd_forName({ ...def, [module_name + "_num"]: data[0] })
        setAutofillnumm(data[0])
      } else {
        setLoading(err.message)
      }

    })()
  }

  useEffect(() => {

     const urlFetch = window.location.hash;
      let urlModule_name = "";
      const match = urlFetch.match(/\/home\/(\w+)\//);
      if (match) {
        urlModule_name = match[1];
      }
      // console.log("xxxxx",urlModule_name)
      let forChange = ""
      if (urlModule_name === "opportunities" || urlModule_name === "opportunity") {
        forChange = 'opportunitie'
      }
      else if(urlModule_name ==="accounts" || urlModule_name === "customer"){
        forChange = "customer"
      } else if( urlModule_name ==="inventory" || urlModule_name === "products"){
        forChange = "inventory"
      }
      else{
        forChange= urlModule_name.replace(/s$/, '');
      }
  // commmented because nowgetting module name from url
    // let forChange = localStorage.getItem("prev_module_name2")
    // if (localStorage.getItem("prev_module_name2") === "opportunity") {
    //   forChange = 'opportunitie'
    // }

    if (customerDetails && e_id != null || customerDetails && e_id != '' && !related_module) {
      let apiPath = '';
      if (module_name === "payrollcosts") {
        apiPath = "/api/" + module_name + "/" + e_id;
      } else {
        apiPath = "/api/" + module_name + "s/" + e_id
      }
      e_id && getDataFromEditApi(apiPath)
    }

    else if (duplicate != '' ) {
      let apiPath = '';
      if (module_name === "payrollcosts") {
        apiPath = "/api/" + module_name + "/" + duplicate;
      } else {
        apiPath = "/api/" + module_name + "s/" + duplicate
      }
      duplicate && getDataFromDuplicateApi(apiPath)
    }

    if (localStorage.getItem("prev_c_id") && relatedPopUp == true) {
      getRelatedModuleData(forChange)
    }
    if (props.yes == false) {
      setCountry(1)
    }
  }, [props.yes])

  const openSmLeaveEditWarn = (name, link) => {
    setRelatedModuleName(name)
    setRediLinkRel(link)
    setSmLeaveEditWarn(true)
  }

  const changeHandle = (changeHandleProps) => {
    // const name = e.target.name;
    // const value = e.target.value;
    let { name, value, type, checked } = changeHandleProps
    if (name == "salutation") {
      setSalutation(value)
    }
    setAdd({ ...add, [name]: value })
    setAdd_forName({ ...add_forName, [name]: value })
    setAddForMulti({ ...addForMulti, [name]: value })
    if (type === 'checkbox') {
      setAdd({ ...add, [name]: checked })
      setAddForMulti({ ...addForMulti, [name]: checked })
    };
  }

  useEffect(() => {
    setLine({ "product_id": 0, [module_name + "_product"]: "", "ordered_qty": "0", "pending_qty": "0", "qty_received": "0", "warehouse_multiple_module": "", "warehouse_multiple_record": "", "batch_or_serial": "", "batch_expiry": "" })
  }, [])

  const linedeletefrommodal = () => {
    product_Table.splice(product_Table.indexOf(lineDeleteId.id), 1)

    setSmShow2(false)
  }

  const resfunc = (data) => {

    let payload = { ...data }
    Object.keys(payload).forEach((item) => {
      if (item.slice(-2) === 'id') {
        Object.keys(payload).map((sub_item) => {
          if (item.slice(0, -2) === sub_item) {
            payload[sub_item] = payload[item]
          }
        })
      }
    })
    setAdd(payload)

    data.dependant && data.dependant.map(el => {
      if (data[Object.values(el)[0]]) {
        setDep_dropdown_value({ [Object.keys(el)[0]]: data[Object.keys(el)[0] + 'id'] })
      }
    })

    let temp = {}

    Object.keys(data).map((k) => {
      let matchField = k.match(/_module$/g)
      if (matchField != null) {
        setSearchRelatedTo(data[k])
        temp[k] = data[k]
        uitype_module[k.replace(/_module$/g, "_record")] = data[k]
      }
      setAdd({ ...payload, temp })
    })

  }
  

  // for sending data to edit api dynamically xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const { customPayload: custom, boot: loadPayload } = usePayload({
    blocke,
    module_name,
    row_value,
    add,
    related_record,
    rajya,
    selectedUserList,
    customerDetails,
    e_id,
    searchTableModule,
    authState,
    country,
    salutation,
    searchRelatedTo,
    add_forName,
    uitype_module,
    relatedPopUp,
    main_module,
    related_module,
    uitype6_value,
    multiField,
    supplierorder_num
  });
  // console.log(custom)

  useEffect(() => {
    loadPayload()
  }, [add, row_value, uitype6_value, multiField])


  let data2 = { "linegroup": { "nogrp": [] } }
  if (module_name == "supplierorderreceipt") {
    product_Table && product_Table.map((m, index) => {
      if (m.lines && m.lines.Group) {
        return Object.keys(m.lines.Group).map((linesGroup, lineId) => {

          return m.lines.Group[linesGroup].map((group_nogrpLines, group_nogrpId) => {

            if (group_nogrpLines) {

              data2.linegroup.nogrp.push((group_nogrpLines
              ))
            }
            if (group_nogrpLines.inputRowArr) {

              group_nogrpLines.inputRowArr.map((inputRowArr, inputRowID) => {
                data2.linegroup.nogrp.push((inputRowArr))
              })

            }
          })
        })
      }
    })
  }
  const deleteExtraFields = (p) => {
    let flag = 1
    let linesData = data2.linegroup.nogrp
    linesData.map((e) => {
      let key = Object.keys(e)
      for (let i = 0; i < key.length; i++) {
        let temp = key[i]
        if ('discount' === temp || "discount_type" === temp || "discount_typeid" === temp || "sales_price" === temp || "line_group_id" === temp || "line_total" === temp || "total_without_tax" === temp || "vat_code" === temp || "vat_codeid" === temp || "inputRowArr" === temp || "group_name" === temp || "ownerid" === temp || "cost_price" === temp || "supplierorderlineid" === temp || "supplierorder_id" === temp) {
          delete e[temp]
        }
        if ("qty" === temp) {
          delete Object.assign(e, { "ordered_qty": e.qty })["qty"];
        }
        if ("supplierorder_product" === temp) {
          delete Object.assign(e, { "supplierorderreceipt_product": e.supplierorder_product })["supplierorder_product"];
        }
      }
      e['line_order'] = flag;
      flag += 1;
    })
  }

  const postApiForSoReceiptModule = (headers) => {
    deleteExtraFields();
    (async () => {

      const data = await soreceipt_module_post_api(tenantCname, add, custom, data2, headers)
      if (data) {
        if (data[0] === undefined) {
          setSmShowError(true)
          setSaveButtonDisabled(false);
        }
        else {
          if (data[0] !== undefined) {
            // window.location.reload()
            window.location.href = "#/home/" + "supplierorderreceipt" + "/detail/" + data[0]["supplierorderreceipt" + "id"]

          }
        }
      } else {
        console.log(err)
        setMand_error("Field(s) Required")

      }

    })()
  }

  const putApiForEditRecord = (headers) => {
      if (module_name === "embedding") {
        let newEmbeddng_value = add["embedding_value"];
        let trimEmbedded_Value = "";

        if (newEmbeddng_value) {
          const currentHostname = window.location.origin;
          trimEmbedded_Value = newEmbeddng_value.split('#/home/')[0].replace(/\/$/, ''); // Remove trailing slash
          // console.log("723", trimEmbedded_Value, "555", currentHostname);

          if (trimEmbedded_Value.toLowerCase() === currentHostname.toLowerCase()) {

            const trimmedValue = newEmbeddng_value.split('#/home/')[0] + '#/home/';
            const remainingValue = newEmbeddng_value.substring(trimmedValue.length);

            // Update the embedding_value
            custom["embedding_value"] = `trimmedValue/${remainingValue}`;
            // console.log("Trimmed Value:=======", trimmedValue, "2222", remainingValue);
          }
        }
      }

    (async () => {
      const data = await put_api_forall_module(tenantCname, module_name, add, custom, e_id, headers)
      if (data) {
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        }
        if(data[0] !== undefined){
          clear();
        }

        if (module_name == "customer") {    
          window.location.href = "#/home/" + "accounts" + "/detail/" + data[0][module_name + "id"]

        } else {
          window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
        }
        localStorage.removeItem("duplicate")
        setCountry(1) 
      //   setAuthState({ ...authState, customerDetails: '' })
      //  console.log('first', authState,"1122",customerDetails)
      
      } else {
        console.log(err)
        setMand_error("Field(s) Required")
      }
      
    })()
  }

  const putApiForMultipleRecord = (headers, medit, mutliids, i) => {

    (async () => {

      const data = await multiedit_api_forall_module(tenantCname, module_name, medit, addForMulti, mutliids, headers)
      if (data) {
        if(data[0] !== undefined){
          clear();
        }
        localStorage.removeItem("duplicate")
        setProgres_value(15 * (i + 1))
        if (i === ((selectedFlatRowsmy).length - 1)) {
          setProgres_value(100)
          setSmShow(false)
          setSaveButtonDisabled(false);
          if(module_name === "customer"){
            window.location.href = "#/home/" + "accounts"
          }  
          else{
            window.location.href = "#/home/" +  module_name
          }
                  
        }
      } else {
        console.log(err)
        setSmShow(false)
        setMand_error("Field(s) Required")
        setLoading(err.message)
      }
    setCountry(1) 
    })()
  }

  const forOpAndPayroll = (headers) => {
    (async () => {

      const data = await op_and_payroll_editapi(tenantCname, module_name, add, custom, apiPath, headers)
      if (data) {
        if(data[0] !== undefined){
          clear();
        }
        if (props.himmat === "operationalexpense") {
          localStorage.setItem("expense_updated", data[0].amount)
          setAmount(data[0].amount);
          updateApi()
        }
        else if (props.himmat === "payrollcosts") {
          localStorage.setItem("payroll_updated", data[0].amount)
          setAmount(data[0].amount)
          updateApi()
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        } else if (props.yes !== true) {
          window.location.href = "#/home/" + data[0].module_name + "/relatedlist/" + data[0].related_opportunityid
        } else {
          if (props.himmat === "operationalexpense") {
            props.closeBox(true)
          }
          else if (props.himmat === "payrollcosts") {
            props.closeBox(true)
          }
          else {
            window.location.reload()
          }
        }
        localStorage.removeItem("duplicate")
        props.refreshList(true);
      } else {
        console.log(err)
        setMand_error("Field(s) Required")
      }

    })()
  }

  const editRecords = (apiPath, headers) => {
    (async () => {

      const data = await editapi(tenantCname, module_name, add, custom, apiPath, headers)
      if (data) {
        if (data[0] !== undefined) {
          clear();
        }
        if (props.himmat === "operationalexpense") {
          localStorage.setItem("expense_updated", data[0].amount)
          setAmount(data[0].amount);
          updateApi()
        }
        else if (props.himmat === "payrollcosts") {
          localStorage.setItem("payroll_updated", data[0].amount)
          setAmount(data[0].amount)
          updateApi()
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        } else if (props.yes !== true) {
          if (module_name == "customer") {    
            window.location.href = "#/home/" + "accounts" + "/detail/" + data[0][module_name + "id"]
  
          } else {
            window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
          }
        } else {
          if (props.himmat === "operationalexpense") {
            props.closeBox(true)
          }
          else if (props.himmat === "payrollcosts") {
            props.closeBox(true)
          }
          else {
            window.location.reload()
          }
        }
    
        localStorage.removeItem("duplicate")
        props.refreshList(true);
        // setAuthState({ ...authState, customerDetails: '' ,c_id:'',prev_c_id:""})
 
        
      } else {
        console.log(err)
        setMand_error("Field(s) Required")

      }
    })()

  }

  const clear = () => {
    setAdd_forName({})
    setuitype6_value({})
    setUitype_module({})
    setAdd({})
  }

  const postApiForAllModule = (headers) => {
    (async () => {
      if(module_name==="operationalexpense" || module_name==="payrollcosts"){
        if (!Object.keys(custom).includes("related_opportunity")){
          custom["related_opportunity"] = localStorage.getItem('prev_c_id')
        }
      }

      if (module_name === "embedding") {
        let newEmbeddng_value = add_forName["embedding_value"];
        let trimEmbedded_Value = "";

        if (newEmbeddng_value) {
          const currentHostname = window.location.origin;
          trimEmbedded_Value = newEmbeddng_value.split('#/home/')[0].replace(/\/$/, ''); // Remove trailing slash

          if (trimEmbedded_Value.toLowerCase() === currentHostname.toLowerCase()) {

            const trimmedValue = newEmbeddng_value.split('#/home/')[0] + '#/home/';
            const remainingValue = newEmbeddng_value.substring(trimmedValue.length);

            // Update the embedding_value
            custom["embedding_value"] = `trimmedValue/${remainingValue}`;
          }
        }
      }

      const data = await postapi(tenantCname, module_name, custom, add_forName, headers, autofillnumm)
      if (data) {
        if (data[0] != undefined) {
          clear();
        }
        if (props.himmat === "operationalexpense") {
          localStorage.setItem("expense_updated", data[0].amount)

          setAmount(data[0].amount);
          updateApi()
        }
        else if (props.himmat === "payrollcosts") {
          localStorage.setItem("payroll_updated", data[0].amount)
          setAmount(data[0].amount)
          updateApi()
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        } else if (props.yes !== true) {
          window.location.href = "#/home/" + (module_name == "accounts" || module_name == "customer" ? 'accounts' : module_name) + "/detail/" + data[0][module_name + "id"]
          if (data[0].warning !== undefined) {
            localStorage.setItem("warning", data[0].warning)
          }

        } else {
          if (props.himmat === "operationalexpense") {
            props.closeBox(true)
          }
          else if (props.himmat === "payrollcosts") {
            props.closeBox(true)
          }
          else {
            window.location.reload()
          }
        }
    
      localStorage.removeItem("duplicate")
      }
      else {
        console.log(err)
        setMand_error("Field(s) Required")

      }
    })()
    setAuthState({ ...authState,duplicate: '',customerDetails:''})
  }

  const isEmail = (value) => {
    const validFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return validFormat.test(value);
  };

  const submit = async (e) => {
    e.preventDefault()

    if (add_forName && add_forName["email"] && !isEmail(add_forName["email"])) {
      setIsEmailValid(false);
      error_msg.push("Invalid email format")
      setSmShowError(true)
      return; // Prevent saving the data
    } else {
      setIsEmailValid(true);
    }


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }

    if (related_module == "supplierorderreceipt" || module_name == "supplierorderreceipt") {
      postApiForSoReceiptModule(headers)
    }

    if ((!duplicate && customerDetails && !related_module && (e_id !== "" || e_id !== undefined || e_id !== null))) {
    
      e_id && putApiForEditRecord(headers)
    }

    else if (selectedFlatRowsmy && (selectedFlatRowsmy).length >= 1) {

      setSmShow(true);
      let mutliids = [];
      (selectedFlatRowsmy || []).map((mids) => (
        mutliids.push(mids[module_name + "id"])
      ));

      (selectedFlatRowsmy || []).forEach((medit, i) => (
        // for matching the country id in multi accounts edit
        // Object.keys(medit).map((matchkey) => {
        //   let match = matchkey.match(/_country$/g)
        //   if (match) {
        //     addForMulti[module_name + '_country'] = country
        //   }
        // }),

        setTimeout(() => {
          putApiForMultipleRecord(headers, medit, mutliids, i)
        }, 1000 * i)
      ),
      setAuthState({ ...authState, customerDetails: '', duplicate: '', selectedFlatRows: '' })

      )

    } else if (cusDetails != undefined) {
      console.log("3 else if")
      let cusId;
      let endPart;
      if (cusDetails.operationalexpenseid) {
        cusId = cusDetails.operationalexpenseid;
      } else {
        cusId = cusDetails.payrollcostsid;
      }
      if (module_name === 'operationalexpense') {
        endPart = module_name + "s/" + cusId
      } else {
        endPart = module_name + "/" + cusId
      }
      custom["related_opportunity"] = localStorage.getItem('prev_c_id')
      !duplicate && forOpAndPayroll(endPart, headers)
    }

    else if (e_id && props.apiForOpPayModal != "true" && !duplicate) { // api for edit payroll, edit op exp, edit contact, edit account
      console.log("4444 else if")
      if (module_name === "operationalexpense") {
        for (let i = 0; i < blocke.Expense_Details.length; i++) {
          if (blocke.Expense_Details[i].fieldname === "expense_type") {
            for (let j = 0; j < blocke.Expense_Details[i].options.length; j++) {
              if (blocke.Expense_Details[i].options[j].picklistlabel === custom.expense_type) {
                custom['expense_type'] = blocke.Expense_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
        }
      }
      if (module_name === "payrollcosts") {
        for (let i = 0; i < blocke.Payroll_Details.length; i++) {
          if (blocke.Payroll_Details[i].fieldname === "resource_type") {
            for (let j = 0; j < blocke.Payroll_Details[i].options.length; j++) {
              if (blocke.Payroll_Details[i].options[j].picklistlabel === custom.resource_type) {
                custom['resource_type'] = blocke.Payroll_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
          if (blocke.Payroll_Details[i].fieldname === "agency") {
            for (let j = 0; j < blocke.Payroll_Details[i].options.length; j++) {
              if (blocke.Payroll_Details[i].options[j].picklistlabel === custom.agency) {
                custom['agency'] = blocke.Payroll_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
        }
      }

      let apiPath = ""
      if (module_name === "payrollcosts") {
        apiPath = "/api/" + module_name + "/" + e_id
      } else {
        apiPath = "/api/" + module_name + "s/" + e_id
      }

      if (module_name == "stockmovement" && module_name != "currentstock") {
        custom["stock_move_qty"] = parseInt(custom["stock_move_qty"])
      }

      if (module_name != "supplierorderreceipt") {
        e_id && !duplicate && editRecords(apiPath, headers)
      }
    }
    else {
      console.log("5 else")

      var cusDetails = JSON.parse(localStorage.getItem('customerDetails'));
      if (module_name == "operationalexpense" || module_name == "payrollcosts") {//amount field not needed in "create account", "create contact", "create venue" and "create product" but need in op exp and payroll cost
        if (cusDetails === null) {
          if (custom.amount === undefined) {
            custom["amount"] = "0"
          }
          custom["related_opportunity"] = localStorage.getItem('prev_c_id')
        }
      }

      if (module_name === "operationalexpense") {
        for (let i = 0; i < blocke.Expense_Details.length; i++) {
          if (blocke.Expense_Details[i].fieldname === "expense_type") {
            for (let j = 0; j < blocke.Expense_Details[i].options.length; j++) {
              if (blocke.Expense_Details[i].options[j].picklistlabel === custom.expense_type) {
                custom['expense_type'] = blocke.Expense_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
        }
      }
      if (module_name === "payrollcosts") {
        for (let i = 0; i < blocke.Payroll_Details.length; i++) {
          if (blocke.Payroll_Details[i].fieldname === "resource_type") {
            for (let j = 0; j < blocke.Payroll_Details[i].options.length; j++) {
              if (blocke.Payroll_Details[i].options[j].picklistlabel === custom.resource_type) {
                custom['resource_type'] = blocke.Payroll_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
          if (blocke.Payroll_Details[i].fieldname === "agency") {
            for (let j = 0; j < blocke.Payroll_Details[i].options.length; j++) {
              if (blocke.Payroll_Details[i].options[j].picklistlabel === custom.agency) {
                custom['agency'] = blocke.Payroll_Details[i].options[j].picklistvalue.toString()
              }
            }
          }
        }
      }

      if (duplicate && custom["createtime"]) {
        custom["createtime"] = Moment().format("YYYY-MM-DD HH:mm:ss")
      }

      if (module_name != "supplierorderreceipt" || related_module != "supplierorderreceipt") {
        !e_id && postApiForAllModule(headers)
      }

    } 
    // setAuthState({ ...authState, customerDetails: "" })
    handleClose4()
    setSaveButtonDisabled(true);
  }

  const updateApi = async (e) => {

    e_id = localStorage.getItem('prev_c_id');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    let customtemp = JSON.parse(localStorage.getItem("initial_op"))
    let custoupdate = {}
    custoupdate["opportunity_name"] = customtemp["opportunity_name"]
    custoupdate["close_date"] = customtemp["close_date"]
    custoupdate["createtime"] = customtemp["createtime"]
    custoupdate["modifiedtime"] = Moment().format("YYYY-MM-DD HH:mm")

    if (parseInt(customtemp["operational_expenses"]).toString() === "NaN") {
      custoupdate["operational_expenses"] = parseInt(localStorage.getItem("expense_updated")).toString();
    } else {
      custoupdate["operational_expenses"] = (parseInt(customtemp["operational_expenses"]) + parseInt(localStorage.getItem("expense_updated"))).toString()
    }

    if (parseInt(customtemp["payroll_costs"]).toString() === "NaN") {
      custoupdate["payroll_costs"] = parseInt(localStorage.getItem("payroll_updated")).toString()
    } else {
      custoupdate["payroll_costs"] = (parseInt(customtemp["payroll_costs"]) + parseInt(localStorage.getItem("payroll_updated"))).toString()
    }

    localStorage.setItem("updated_exp", custoupdate["operational_expenses"])
    localStorage.setItem("updated_payroll", custoupdate["payroll_costs"])
    !duplicate && (async () => {

        const data = await for_updating_calculation(tenantCname, e_id, customtemp, custoupdate, headers)
        if (data) {
          if (data[0] === undefined) {
            Object.keys(data).map((keywords) => (
              error_msg.push(data[keywords])
            ))
            setSmShowError(true)
          }
          if (data[0].lines !== []) {
            Object.keys(data[0].lines.Group || {}).map((mergre => (
              groupName.push({ ["groupInArray"]: mergre, ["groupitem"]: data[0].lines.Group[mergre] })
            )))

            Object.keys(data[0].lines.Group || {}).map((mergre => (
              linearray.push(...data[0].lines.Group[mergre])
            )))
          }
        } else {
          console.log(err)
          setMand_error("Field(s) Required")
        }

      })()

  }

  const cancel = () => {
    if (props.yes === true) {
      props.closeBox()
    }
    else if (module_name == "supplierorderreceipt") {
      navigate("/home/supplierorder")
    }
    else {
      navigate(-1)
    }
    setTimeout(() => {
      localStorage.removeItem("customerDetails")
      localStorage.setItem("selectedFlatRows", "[]")
      localStorage.removeItem("duplicate")
      setAuthState({ ...authState, customerDetails: '', duplicate: '', selectedFlatRows: '' })
      setAdd_forName({})
      setuitype6_value({})
      setUitype_module({})
      setAdd({})
      setRow_value({})
      setCountry(1)
      setRelated_record('')
      setSearchRelatedTo()
    }, 500);

  }

  const all_accounts = () => {
    localStorage.removeItem("duplicate")
  }


  const userlistClick = () => {
    if (customerDetails && e_id != null) {
      setSelectedUserList(add.report_users)
    } else {
      setSelectedUserList([custom.ownerid])
    }

    (async () => {

      const data = await allUserListApi(tenantCname)
      if (data) {
        setShowUserlist(true)
        setUserListState(data)
      } else {
        setLoading(err.message)
      }

    })()
  }

  let xlink = ""

  if (related_module != null) {
    let markchange = ""
    if (localStorage.getItem("prev_module_name2") === "customer") {
      markchange = "accounts"
    } else {
      markchange = localStorage.getItem("prev_module_name2")
    }
    if (localStorage.getItem("prev_module_name2") === "opportunity") {
      xlink = "/home/" + markchange + "/detail-op/" + localStorage.getItem("prev_c_id")
    } else {
      xlink = "/home/" + markchange + "/detail/" + (localStorage.getItem("prev_c_id") || '')
    }
    if ((localStorage.getItem('relatedmodule') === "operationalexpense") || (localStorage.getItem('relatedmodule') === "payrollcosts")) {
      localStorage.setItem('prev_c_id', localStorage.getItem('prev_c_id'))
      localStorage.setItem('prev_module_name', 'opportunity')
      xlink = "/home/opportunity/relatedlist/" + localStorage.getItem('prev_c_id')
    }

  } else {
    let markchange = ""
    if (localStorage.getItem("prev_module_name") === "customer") {
      markchange = "accounts"
    } else if (localStorage.getItem("prev_module_name") === "contact") {
      markchange = "contacts"
    } else if (localStorage.getItem("prev_module_name") === "product") {
      markchange = "inventory"
    } else if (localStorage.getItem("prev_module_name") === "equipment") {
      markchange = "equipment"
    } else if (localStorage.getItem("prev_module_name") === "evmapping") {
      markchange = "evmapping"
    } else if (localStorage.getItem("prev_module_name") === "eqchild") {
      markchange = "eqchild"
    } else if (localStorage.getItem("prev_module_name") === "eqcalendar") {
      markchange = "eqcalendar"
    } else if (localStorage.getItem("prev_module_name") === "opportunity") {
      markchange = "opportunities"
    } else {
      markchange = localStorage.getItem("prev_module_name")
    }
    xlink = "/home/" + markchange
  }

  let nam = ""
  if (customerDetails && e_id != null) {
    if (module_name !== "report") {
      nam = add[module_name + "_name"]
    } else {
      nam = add["report_display_name"]
    }
  } else if (selectedFlatRowsmy && (selectedFlatRowsmy).length >= 1) {
    // console.log("111411 edit",selectedFlatRowsmy,"222",(selectedFlatRowsmy).length )
    nam = "Edit Selected Records"
  }
  else {
    if(module_name === "customer" && localStorage.getItem("prev_c_id") && relatedPopUp == true){
      nam = "Create New Subsidiary"
    }else{
      nam = "Create New " + module_name
    }

  }
  return (
    loading !== null ?
      <div className="detail_parent parent_padding">
        <div className="container-fluid col-12 pl-4 pr-4">
          <div id='loader'>
            {loading}
          </div>
        </div>
      </div>
      :
      <blocke_value.Provider value={{groupName, setGroupName, linee, setLinee, show2, setShow2, warehouse_multiple_record, setWarehouse_multiple_record,apiPathData }}> <>
      {!props.hide && <Header />}
        <div className="detail_parent parent_padding">
          <div className="container-fluid col-12 pl-4 pr-4">
            {blocke != "[]" ? <div className="row pr-1">
              <div className="col-12">
                {props.yes === true ? null :
                  <BackToLinks module_name={module_name} all_accounts={all_accounts} related_module={related_module} xlink={xlink} clear={cancel} />
                }

                <div className="view_page_head">
                  <div className="page_head mt-2">
                    <h3 className="h33"><Trans>{nam}</Trans>
                    </h3>
                  </div>
                  <div className="crt_btn_div crt_btn_div_tab_margin">
                    {
                      (props.himmat == "operationalexpense") ||(!relatedPopUp && module_name === "supplierorderreceipt")|| (props.himmat == "payrollcosts") ? null :
                        <><Buttons type="button" class="btn_cancel reset_button" onClick={cancel}>Cancel</Buttons>
                          <Buttons type="button" class="btn_save crt_btn edit_btn" disabled={isSaveButtonDisabled} onClick={submit}>Save</Buttons></>
                    }

                  </div>
                </div>

                {e_id && <RelatedListForCreateRecord module_name={module_name} openSmLeaveEditWarn={openSmLeaveEditWarn} e_id={e_id} rlist={rlist} />}
              </div>
              <div className="parent_div col-12">
                <form>
                  {
                    blocke && Object.keys(blocke).map((k, index) => (
                      [
                        <div className="detail_div1"><h4 className="cst_inf" key={k}>{props.apiForOpPayModal === "true" ? module_name === "operationalexpense" ? "Create New Operational Expense" : "Create New Payroll Cost" : k.replace(/_/g, " ")}</h4></div>,
                        <div className={k === "Contact_Information" ? "detail_div2 with_salutation" : "detail_div2"}>
                          <div className="details_field_1">
                            <div className="row">
                              {
                                blocke[k].map((acc, i) => (
                                  acc.show_hide_criteria == 1 ?
                                    [
                                      acc.uitype !== 10 ?
                                        <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">

                                          <label><Trans>{acc.fieldlabel.replace('&pound;', '£')}</Trans>{acc.mandatory == 1 ? <span>*</span> : null}</label>
                                          {acc.mandatory == 1 && mand_error != null && add[acc.fieldname] == null ? <h6 className="mand_error">{mand_error}</h6> : null}

                                        </div> : null,
                                      acc.uitype != 6 && acc.uitype != 100 && acc.uitype != 3 && acc.fieldname != [module_name + "_country"] && acc.uitype !== 7
                                        && acc.fieldname != "salutation" && acc.uitype != 5 && acc.uitype !== 8 && acc.uitype !== 102
                                        && acc.uitype != 101 &&  acc.uitype !== 2 && acc.uitype !== 9 && acc.uitype !== 10 && acc.uitype !== 11&& acc.uitype !== 4 && acc.uitype !== 103 && acc.uitype !== 14 ?
                                        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                          {
                                            acc.fieldname == [module_name + "_num"] ?
                                              <FieldData acc={acc} autofillnumm={autofillnumm} changeHandle={changeHandle} /> :
                                              // <TextField acc={acc} changeHandle={changeHandle} selectedFlatRowsmy={selectedFlatRowsmy} add={add} module_name={module_name} />
                                              <TextField acc={acc} changeHandle={changeHandle} parent={parent} selectedFlatRowsmy={selectedFlatRowsmy} module_name={module_name} fieldname="email" isValid={isEmailValid} setIsValid={setIsEmailValid} /> 
                                        }
                                        </div> : null,
                                      acc.uitype == 11 ?
                                        <Uitype11 acc={acc} changeHandle={changeHandle} />
                                        : null,

                                      acc.uitype == 4 ?
                                        <RadioButtons acc={acc} changeHandle={changeHandle} />
                                        : null,

                                      acc.uitype == 6 ?
                                        <Uitype6 acc={acc} add={add} i={i} supplierorder_num={supplierorder_num} relatedPopUp={relatedPopUp} />
                                        : null,

                                      acc.uitype == 14 ?
                                        <Uitype14 acc={acc} add={add}  parent={parent}  setShow2={setShow2} isreadonly={isreadonly} relatedPopUp={relatedPopUp} e_id={e_id} duplicate={duplicate} />
                                        : null,

                                      acc.uitype == 102 ?
                                        <Uitype102 acc={acc} changeHandle={changeHandle} />
                                        : null,

                                      acc.uitype == 7 ?
                                        <Uitype7 acc={acc} parent={parent}/> : null,

                                      acc.uitype == 8 ?
                                        <Uitype8 acc={acc} /> : null,

                                      acc.uitype == 9 ?
                                        <Uitype9 acc={acc} /> : null,

                                      acc.uitype == 100 ?
                                        <Uitype100 acc={acc} changeHandle={changeHandle} module_name={module_name} userlistClick={userlistClick} />
                                        : null,

                                      acc.uitype == 101 ?
                                        <Uitype101 acc={acc} changeHandle={changeHandle} />
                                        : null,

                                      acc.uitype == 3 ?
                                        <Uitype3 acc={acc} changeHandle={changeHandle} parent={parent} />
                                        : null,

                                      acc.fieldname == "salutation" ?
                                        <ForSalutation acc={acc} changeHandle={changeHandle} />
                                        : null,

                                      acc.uitype == 5 ?
                                        <Checkbox acc={acc} /> : null,

                                      //this may effect inventory module field serial/batch so please check country field when work on inventory
                                      acc.uitype == 2 && acc.fieldname != ["salutation"] ?
                                        <Uitype2 acc={acc} parent={parent} />
                                        : null,

                                      acc.uitype == 103 && <Uitype103 acc={acc} parent={parent} blocke={blocke} module_name={module_name} country={country} add_forName={add_forName} />,

                                      acc.full_width == 1 ?
                                        [<div key={i} className="col-lg-1"></div>,
                                        <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                        </div>,
                                        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                        </div>] : null,

                                      acc.uitype !== 10 ? <div key={i} className="col-lg-1"></div> : null,
                                    ]
                                    : null
                                ))
                              }
                            </div>
                          </div>
                        </div>,

                        (k.match(/_Information/g) || k.match(/_Details/g) || k.match(/_Info/g)|| k.match(/Details/g)) &&
                        <CreateRecordTime k={k} blocke={blocke} add={add} e_id={e_id} customerDetails={customerDetails} duplicate={duplicate} />
                        
                      ]
                    ))
                  }
                  {
                    (module_name == "supplierorderreceipt") && <SupplierorderReceiptLines />
                  }
                 { (!relatedPopUp && module_name === "supplierorderreceipt") ? null :
                  <div className="row">
                    <div className="col-lg-6  col-md-6 col-12"></div>
                    <div className="col-lg-6 col-md-6 col-12 submit-row">
                      <Buttons type="button" class="btn_cancel reset_button bottom" onClick={cancel}>Cancel</Buttons>
                      <Buttons type="button" class="btn_save crt_btn edit_btn bottom" disabled={isSaveButtonDisabled} onClick={submit}>Save</Buttons>
                    </div>
                  </div>}
                </form>

                {/* xxxxxx modal for edit confirmation xxxxxx */}
                <EditAccountModal show4={show4} submit={submit} handleClose4={handleClose4} />


                {/* xxxxxx Modal for Assignig users xxxxxx */}
                <ShowUserList selectedUserList={selectedUserList} setShowUserlist={setShowUserlist} custom={custom} userListState={userListState} showUserlist={showUserlist} />

                {/* Modal for completion update xxxxxx */}
                <ProgressBarFile progres_value={progres_value} smShow={smShow} setSmShow={setSmShow} />

                {/* Modal for line item delete xxxxxx */}
                <LineDeleteModal linedeletefrommodal={linedeletefrommodal} smShow2={smShow2} setSmShow2={setSmShow2} />

                {/* Modal for Error message xxxxxx */}

                <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />
                {/* Modal for Warning to leave edit account page xxxxxxx */}
                <LeavePageWarning module_name={module_name} relatedModuleName={relatedModuleName} smLeaveEditWarn={smLeaveEditWarn} setSmLeaveEditWarn={setSmLeaveEditWarn} rediLinkRel={rediLinkRel} />

                {/* Modal for searchtable module......... */}

                <Modal show={show2} onHide={handleClose5} className="modal_delete fade small_modal modal">
                  <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Please select Module first</h5>
                  </Modal.Body>
                </Modal>

                {/* Modale for searchtable module......... */}

                <Modal show={show9} onHide={handleClose9} className="modal_delete fade small_modal modal">
                  <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Can not add more input fields</h5>
                  </Modal.Body>
                </Modal>

                <Modal show={show10} onHide={handleClose10} className="modal_delete fade small_modal modal">
                  <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Can not add more quantity</h5>
                  </Modal.Body>
                </Modal>

              </div>
            </div> : null}
          </div>
        </div>
      </>{!props.hide && <Footer />}
      </blocke_value.Provider>

  )
}

export default CreateModulePage