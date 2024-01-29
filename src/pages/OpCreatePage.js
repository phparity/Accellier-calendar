import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { Modal } from "react-bootstrap"
import "../assets/style/OpCreateEdit.css"
import "../assets/style/Header.css";
import { useNavigate, useParams } from "react-router-dom";
import i18n from "../config/i18n"
import { Trans } from 'react-i18next'
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AuthContext } from '../config/Authentications/AuthContext';
import Header from '../layouts/Header';
import { linee_value, opCreatePageData, r_value, searchTableModuleValue } from '../navigation/PageRoutes';
import Footer from '../layouts/Footer';
import RecurringModal from '../components/RecurringModal';
import CreateLineItem from '../components/CreateLineItem';
import Uitype14 from '../components/UitypeComponents/Uitype14';
import Uitype6 from '../components/UitypeComponents/Uitype6';
import { usePayload } from '../service/usePayload';
import Uitype2 from '../components/UitypeComponents/Uitype2';
import { getData_of_opexpense, getData_of_payrollcosts, getDuplicateApiData, getEditApiData, getFieldDataApiData, getFieldsApiData, getRelatedModuleApiData, post_api_opfile, put_api2_of_opfile, put_api3_of_opfile, put_api_delete_line, put_api_for_opfile, put_api_formultiedit_opfile, put_api_forrelatedmodule } from '../service/useApiData';
import ProgressBarFile from '../components/ProgressBarFile';
import LeavePageWarning from '../components/LeavePageWarning';
import CreateRecordTime from '../components/CreateRecordTime';
import ShowErrorMsg from '../components/ShowErrorMsg';
import Uitype9 from '../components/UitypeComponents/Uitype9';
import Uitype8 from '../components/UitypeComponents/Uitype8';
import Uitype7 from '../components/UitypeComponents/Uitype7';
import Checkbox from '../components/UitypeComponents/Checkbox';
import ForSalutation from '../components/UitypeComponents/ForSalutation';
import Uitype100 from '../components/UitypeComponents/Uitype100';
import RadioButtons from '../components/UitypeComponents/RadioButtons';
import Uitype3 from '../components/UitypeComponents/Uitype3';
import Uitype102 from '../components/UitypeComponents/Uitype102';
import EditModal from '../components/UitypeComponents/EditModal';
import RelatedListForCreateRecord from '../components/RelatedListForCreateRecord';
import RecurringField from '../components/UitypeComponents/RecurringField';
import Buttons from '../components/Buttons';
import BackToLinks from '../components/UitypeComponents/BackToLinks';
import EditAccountModal from '../components/Modal/EditAccountModal';
import Uitype103 from '../components/UitypeComponents/Uitype103';
import FieldData from '../components/UitypeComponents/FieldData';
import TextField from '../components/UitypeComponents/TextField';
import FinancialBlock from '../components/Financialblock/FinancialBlock';
import { CheckModuleName } from '../utils/CheckModuleName';
import useStorage from '../service/useStorage';
export const recurringModal = createContext();
export const lineOrderData = createContext();

function OpCreatePage(props) {
  const storage = useStorage()
  const { authState, setAuthState } = useContext(AuthContext)
  const tenantCname = authState.tenant_cname;
  let { line, setLine, netProfit, setNetProfit, TsalesPrice, TcostPrice, TnetOfTaxes, setTnetOfTaxes, grand, vat, TCdiscount, Tdiscount, Tmargin, setTmargin, Tmarginper, g_total, setG_total, total1, settotal1, opExpTotAmount, setOpExpTotAmount, payCostTotAmount, setPayCostTotAmount, otherExpChange, setOtherExpChange, costs, setCosts } = useContext(linee_value)
  let { row_value, setRow_value, blocke, setBlocke, related_record, setRelated_record, uitype6_value, setuitype6_value, add_forName, setAdd_forName } = useContext(r_value)
  const { add, setAdd, addForMulti, setAddForMulti, country, setCountry, linearray, setLinearray } = useContext(opCreatePageData)
  const { searchTableModule, searchRelatedTo, setSearchRelatedTo, uitype_module, setUitype_module, smShowError, setSmShowError, error_msg, setError_msg } = useContext(searchTableModuleValue)
  let [blocke_modal, setBlocke_modal] = useState([])
  // let [linearray, setLinearray] = useState([])
  let [linee, setLinee] = useState([])
  const [show1, setShow1] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [showEditOption, setShowEditOption] = useState(false);
  const [rlist, setRlist] = useState([])
  let [mand_error, setMand_error] = useState("")
  const [parent, setParent] = useState("")
  const [reccuringrule, setReccuringrule] = useState({ "repeat": "daily", "interval": "1" })
  const [reccuringruleSave, setReccuringruleSave] = useState({ "repeat": "daily", "interval": "1" })
  const [reccuringtime, setReccuringtime] = useState("daily")
  const [weekday, setWeekday] = useState([])
  const [isrecurr, setIsrecurr] = useState(false)
  const [groupName, setGroupName] = useState([{ ["groupInArray"]: "", ["groupitem"]: [] }])
  const [autofillnumm, setAutofillnumm] = useState("")
  let [ruleshow, setRuleshow] = useState("")
  const [radioEditOption, setRadioEditOption] = useState(1)
  const [smShow, setSmShow] = useState(false);
  // const [smShowError, setSmShowError] = useState(false);
  const [progres_value, setProgres_value] = useState("")
  // const [error_msg, setError_msg] = useState([])
  const [calendarModal, setCalendarModal] = useState(false)
  const [calendarModalPay, setCalendarModalPay] = useState(false)
  const [loading, setLoading] = useState(null) // to show error
  const [show2, setShow2] = useState(false);
  const [countryModel, setCountrymodel] = useState(1)
  const [isreadonly, setIsreadonly] = useState(false)
  const [relatedModuleName, setRelatedModuleName] = useState('')
  const [rediLinkRel, setRediLinkRel] = useState('')
  const [smLeaveEditWarn, setSmLeaveEditWarn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("")
  const [bill_to_address, setBill_to_address] = useState('')//separate state to save bill_to_address for create invoice in account related module
  const [exception_rule, setException_rule] = useState('')//separate state to save exception_rule for create opportunity in account related module
  // const [grandTotal, setGrandTotal] = useState('');
  const [tax, setTax] = useState('');
  const [copyCostCal,setCopyCostCal] = useState('');
  const [profit, setProfit] = useState("")
  const [expense, setExpense] = useState("")
  const [payroll, setPayroll] = useState("")
  const [copyCostProfit,setCopyCostProfit] = useState('');
  let [rajya, setRajya] = useState("")
  let [modal_add, setModal_add] = useState({})
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [lineSaveCheck,setLineSaveCheck] =  useState(true)
  const [expenseEdit, setExpenseEdit] = useState(0)
  const [payrollEdit, setPayrollEdit] = useState(0)
  const main_module = localStorage.getItem("prev_module_name")
  const relatedPopUp = props.relatedPopUp
  let related_module = localStorage.getItem("relatedmodule")
  const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [isAuthState, setIsAuthState] = useState(false);





  useEffect(() => {

    if (customerDetails === null && e_id === null) return;
    setTimeout(() => {
      (e_id && (related_module == "operationalexpense"))
        && (async () => {

          const data = await getData_of_opexpense(tenantCname)
          if (data) {
            let totAmnt = 0;
            for (let i = 0; i < data.data.length; i++) {
              totAmnt = totAmnt + parseFloat(data.data[i].amount)
            }
            setOpExpTotAmount(totAmnt)
          } else {
            // setLoading(err.message)
          }

        })()
    }, 1000)
  }, [calendarModal])
  


  useEffect(() => {
    //to get total amount of payroll costs
    if (customerDetails === null && e_id === null) return;
    (e_id && (related_module == "payrollcosts"))
      &&
      (async () => {

        const data = await getData_of_payrollcosts(tenantCname)
        if (data) {
          let totAmnt = 0;
          for (let i = 0; i < data.data.length; i++) {
            totAmnt = totAmnt + parseFloat(data.data[i].amount)
          }
          setPayCostTotAmount(totAmnt)
        } else {
          // setLoading(err.message)
        }

      })()

  }, [calendarModalPay])

  const handleClose05 = () => {
    setShow2(false);
    setShow1(false);

  }
  const lang = localStorage.getItem("language")
  if (lang) {
    i18n.changeLanguage(lang)
  }

  let navigate = useNavigate();
  const handleClose4 = () => setShow4(false);

  // let { id } = useParams();
  let module_name = CheckModuleName(props);
  let module_name_links = module_name

  useEffect(() => {
    setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
  }, [])

  // let selectedFlatRows = localStorage.getItem('selectedFlatRows')
  let selectedFlatRows = authState.selectedFlatRows
  let selectedFlatRowsmy =  selectedFlatRows && JSON.parse(selectedFlatRows)
  const customerDetailsss = authState.customerDetails
  const customerDetails = customerDetailsss && JSON.parse(customerDetailsss)
  
  useEffect(() => {
    setAddForMulti({})
  }, [module_name])

  useEffect(() => {
    calcNetProfit();
  }, [
    add['expected_profit'],
    add["expected_profit_"],
    opExpTotAmount,
    payCostTotAmount,
    add['other_costs'],expenseEdit,payrollEdit
  ])




  const calcNetProfit = () => {
    if(add['copy_costs']){
      let grossProfit = parseFloat(add['expected_profit']) ? parseFloat(add['expected_profit']) : 0;
      let oppExp = parseFloat(String(expenseEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let payrollExp = parseFloat(String(payrollEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let otherExp = parseFloat(String(add['other_costs']).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let nettProfit = grossProfit - oppExp - payrollExp - otherExp
      setNetProfit(nettProfit);
      }else{
        let grossProfit = parseFloat(add['expected_profit_']||profit||add['expected_profit']) ? parseFloat(add['expected_profit_']||profit||String(add['expected_profit']).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) : 0;
        let oppExp = parseFloat(opExpTotAmount||expenseEdit) ? parseFloat(String(opExpTotAmount||expenseEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) : 0;
        let payrollExp = parseFloat(payCostTotAmount||payrollEdit) ? parseFloat(String(payCostTotAmount||payrollEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) : 0;
        let otherExp = parseFloat(add['other_costs']) ? parseFloat(String(add['other_costs']).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) : 0;
        let nettProfit = grossProfit - oppExp - payrollExp - otherExp
        setCopyCostCal(nettProfit)
      }
  }


  useEffect(() => {
    (async () => {
      const data = await getFieldsApiData(tenantCname, module_name,storage)
      if (data) {
        setBlocke(data?.block)
        setLinee(data?.line?.block)
        setRlist(data.related)
        setIsAuthState(true)
      }
      // else {
      //   setLoading(error.message)
      // }
    })()

  }, [])

  useEffect(() => {
    // when we create record or duplicate
    (async () => {
      if (!e_id || e_id && related_module) {
        const data = await getFieldDataApiData(tenantCname, module_name)
        if (data) {
          setAutofillnumm(data[0])
          setAdd({ ...add, [module_name + "_num"]: data[0] })
          if (add[module_name + "_id"] == null) {
            add.assign_to = authState.username
          }
          // if (modal_add[searchTableModule + "_id"] ===null) { modal_add.assign_to = authState.username  }
          if (add[module_name + "_id"] === null) { add[module_name + "_country"] = "1" }

          setExpense(add['operational_expenses'])
          setPayroll(add['payroll_costs'])
        }
        //   else {
        //   setLoading(err.message)
        // }
      }
    })()

  }, [])
  useEffect(() => {
    // Destructure the authState object and removing c_id keys for running post request
    const { c_id , ...updatedAuthState } = authState;
  
    // Updating authState without the unwanted keys
    setAuthState(updatedAuthState);
  }, [isAuthState]);
  

  let e_id = ""
  if (customerDetails && customerDetails[module_name + "_id"]) {
    e_id = customerDetails[module_name + "_id"] || customerDetails[module_name + "id"]
  } else if (customerDetails && customerDetails[module_name + "_id"] === null) {
    e_id = authState.c_id
  } else {
    e_id = authState.c_id
  }

  let duplicate = authState.duplicate

  const autoFillAgain = useCallback((resadd) => {

    (async () => {

      const data = await getFieldDataApiData(tenantCname, module_name)
      if (data) {
        setAutofillnumm(data[0])
        // setAdd({ ...add, [module_name + "_num"]: data[0] })
      } else {
        // alert(err)
      }

    })()

  }, [autofillnumm])

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


    // setBill_to_address(data["bill_to_address"])
    localStorage.setItem('related_opportunity', data["related_opportunityid"])
    localStorage.setItem('related_contact', data["related_customerid"])
    setRajya({ label: data[module_name + "_county"], value: data[module_name + "_countyid"] })

    if (data.recurring_rule !== null) {
      setRuleshow(data.recurring_rule);
    }


    if (data.lines !== []) {
      Object.keys(data.lines.Group || {}).map((mergre => (
        groupName.push({ ["groupInArray"]: mergre, ["groupitem"]: data.lines.Group[mergre] })
      )))
      let linArrayData = []
      Object.keys(data.lines.Group || {}).map((mergre => ( 
        linArrayData.push(...data.lines.Group[mergre])
      )))
      setLinearray(linArrayData)
    }

    if ((data.recurring_json !== "[]") && (data.recurring_json !== "") && (data.recurring_json !== undefined)) {
      setReccuringrule(JSON.parse(data.recurring_json) || { "repeat": "daily", "interval": "1" })

      const temporary_repeat = data.recurring_rule.slice(10, data.recurring_rule.indexOf(";"))

      setReccuringtime(JSON.parse(data.recurring_json).repeat || temporary_repeat)

      setWeekday([JSON.parse(data.recurring_json).weekDays])

      setReccuringruleSave(JSON.parse(data.recurring_json))
    }

    if (data.quote_summary !== null && (data.quote_summary !== undefined)) {
      setEditorState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(data.quote_summary)
        )
      ))
    };

    if (related_module == null) {
      localStorage.setItem("prev_c_id", e_id)
    }
  }

  useEffect(() => {
    getAPIData()
  }, [])

  const getAPIData = () => {
    let apiPath = '';
    if (module_name === "opportunity") {
      apiPath = "/api/" + "opportunitie" + "s/" + e_id;

    }
    else {
      apiPath = "/api/" + module_name + "s/" + e_id
    }

    if (customerDetails && e_id != null && e_id && !props?.yes) {
      setTimeout(() => {
        (async () => {

          const data = await getEditApiData(tenantCname, authState, apiPath)
          if (data) {
            setAdd_forName(data[0])
            setAutofillnumm(data[0][module_name + "_num"])
            resfunc(data[0]);
            setLine({ ...line, [module_name + "lineid"]: "0" })
            setCountry(data[0][module_name + "_countryid"])
            setExpenseEdit(data[0].operational_expenses)
            setPayrollEdit(data[0].payroll_costs)
            setCopyCostProfit(data[0].expected_profit)
          } else {
            // console.log(err,"err")
          }

        })()
      }, 1000)

    } else if (duplicate != null && duplicate) {
      let apiPath = '';
      if (module_name === "opportunity") {
        apiPath = "/api/" + "opportunitie" + "s/" + duplicate;

      }
      else {
        apiPath = "/api/" + module_name + "s/" + duplicate
      }
      (async () => {

        const data = await getDuplicateApiData(tenantCname, authState, apiPath)
        if (data) {
          setAdd_forName(data[0])
          resfunc(data[0])
          // setRajya({ ...rajyaa,label: res.data[0][module_name + "_county"], value: res.data[0][module_name + "_countyid"] })
          setLine({ ...line, [module_name + "lineid"]: "0" })
          setCountry(data[0][module_name + "_countryid"])
          autoFillAgain(data[0])
          localStorage.removeItem("duplicate")
          setExpenseEdit(data[0].operational_expenses)
          setPayrollEdit(data[0].payroll_costs)
          setCopyCostProfit(data[0].expected_profit||0)
          
        } else {
          // console.log(err,"err")

        }

      })()

    }
    if ( localStorage.getItem("prev_c_id") && relatedPopUp == true) {
      const urlFetch = window.location.hash;
      let urlModule_name = "";
      const match = urlFetch.match(/\/home\/(\w+)\//);
      if (match) {
        urlModule_name = match[1];
      }
      let forthis2 = ''
      if (urlModule_name === 'opportunitys' || urlModule_name === 'opportunities' || urlModule_name === 'opportunity' ) {
      forthis2 = "opportunitie";
      }
     else if (urlModule_name === 'accounts' || urlModule_name === 'customers' ) {
        forthis2 = "customer";
        }
      else{
        forthis2=urlModule_name.replace(/s$/, '');
      }
      // commmented because nowgetting module name from url
      // let forthis2 = ''
      // if (localStorage.getItem("prev_module_name2") === 'opportunity') {
      //   forthis2 = 'opportunitie'
      // } else {
      //   forthis2 = localStorage.getItem("prev_module_name2")
      // }
      const repMNObject = (ob) => {
        const updatedData = ob.map(obj => {
          const newObj = {};
          for (const key in obj) {
            const newKey = key.includes(main_module) ? key.replace(main_module, module_name) : key;
            newObj[newKey] = obj[key];
          }
          return newObj;
        });
        return updatedData
      }

      setTimeout(() => {
        (async () => {

          const data = await getRelatedModuleApiData(tenantCname, forthis2, authState)
          if (data)  {
            // console.log("469",main_module,"222",data[0])
            setSearchRelatedTo(main_module)
            setRelated_record(main_module)
            setParent(data[0])

            if (data[0].lines) {
              Object.keys(data[0].lines.Group || {}).map((mergre =>
                (groupName.push({ ["groupInArray"]: mergre, ["groupitem"]: repMNObject(data[0].lines.Group[mergre]) }))
              ))
              let linArrayData = []
              Object.keys(data[0].lines.Group || {}).map((mergre => (
                linArrayData.push(...data[0].lines.Group[mergre])
              )))
              setLinearray(repMNObject(linArrayData))
            }
            
          const commonValues = {
    ['related_' + main_module]: data[0][main_module + "_name" || data[0][main_module + "_num"]],
    ['related_' + main_module + 'id']: localStorage.getItem("prev_c_id"),
       };

  if (related_module === "invoice" && main_module !=="customer") {
    setRow_value({
      ...row_value,
      ...commonValues,
      ['related_customer']: data[0]['related_customer' || data[0][main_module + "_num"]],
      ['related_customerid']: data[0]['related_customerid'],
    });

    setuitype6_value({
      ...uitype6_value,
      ...commonValues,
      ['related_customer']: data[0]['related_customer' || data[0][main_module + "_num"]],
      ['related_customerid']: data[0]['related_customerid'],
    });
  } else {
    setRow_value({
      ...row_value,
      ...commonValues,
    });

    setuitype6_value({
      ...uitype6_value,
      ...commonValues,
    });
         }
         } else {
            // console.log(err,"err")
          }

        })()

      }, 1100)
    }
  }
  useEffect(() => {
    add['copy_costs'] = 1
  }, [])


  const changeHandle = (changeHandleProps) => {
    // const name = e.target.name;
    // const value = e.target.value.replace("£", "")
    let { name, value, type, checked } = changeHandleProps

    if (name == `${module_name}_country`) {
      setCountry(value)
    }
    if (name === "other_costs" && !otherExpChange)
    setOtherExpChange(true);
    setAdd({ ...add, [name]: value })
    setAdd_forName({ ...add_forName, [name]: value })
    // setAdd_forName({ ...add_forName, [name]: value })
    setAddForMulti({ ...addForMulti, [name]: value })

      if(add["copy_costs"]){
        if ((name === "copy_costs") && (value === "false" || value === "0")) { // fetch expected sales and expected gross profit from detailed quote
        setAdd({ ...add, expected_sales: TnetOfTaxes, expected_profit: Tmargin })
        setAdd_forName({ ...add_forName, expected_sales: TnetOfTaxes, expected_profit: Tmargin })
        setProfit(Tmargin && Tmargin.toString())
      } else {
        // on checkbox uncheck. editable field should take zero at start 
        add['expected_profit'] = "0"
        add['expected_sales'] = "0"
        setProfit(Tmargin && Tmargin.toString())
      }
      }
    

    if (type === 'checkbox') {
      setAdd({ ...add, [name]: checked })
    };
    if (name === "currency") {
      setAdd({ ...add, [name]: value })
    }
    setCosts((Number(name === "stock" ? (value || 0) : (add.stock || 0)) + Number(name === "equipment" ? (value || 0) : (add.equipment || 0)) +
      Number(name === "employees" ? (value || 0) : (add.employees || 0)) + Number(name === "contractors" ? (value || 0) : (add.contractors || 0))).toFixed(2));

    let instant_cost = (Number(name === "stock" ? (value || 0) : (add.stock || 0)) + Number(name === "equipment" ? (value || 0) : (add.equipment || 0)) +
      Number(name === "employees" ? (value || 0) : (add.employees || 0)) + Number(name === "contractors" ? (value || 0) : (add.contractors || 0))).toFixed(2)

    //setProfit((Number(name === "expected_sales" ? value : add.expected_sales) - Number(name === "expected_costs" ? value : instant_cost)).toFixed(2));

    if (name === "expected_costs") {
      setCosts(value)
    }
    if (name === "expected_profit") {
      setAdd(add =>({...add,['expected_profit_']:value}))
      setProfit(value)
    }
    if (name === "operational_expenses") {
      setAdd(add =>({...add,['operational_expenses_']:value}))
      setOpExpTotAmount(value)
      setExpense(value)
    }
    if (name === "payroll_costs") {
      setAdd(add =>({...add,['payroll_costs_']:value}))
      setPayCostTotAmount(value)
      setPayroll(value)
    }
    if (name === "net_profit") {
      setNetProfit(value)
    }
    // if (name === "grand_total") {
    //   setGrandTotal(value);
    // }
    if (name === "total_tax") {
      setTax(value);
    }

  }

  const changeHandle2 = (changeHandleProps) => {
    let { name, value, type, checked } = changeHandleProps

    setCountrymodel(value)
    setAdd_forName({ ...add_forName, [name]: value })
    setAdd({ ...add, [name]: value })
    setModal_add({ ...modal_add, [name]: value })
    if (type === 'checkbox') { 
      setModal_add({ ...modal_add, [name]: checked }) };
    if (name === "exception_rule") {
      setException_rule(value)
    }
  }


  // for sending data to edit api dynamically xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const { customPayload: custom, boot: loadPayload } = usePayload({
    blocke,
    module_name,
    row_value,
    add,
    related_record,
    rajya,
    customerDetails,
    e_id,
    searchTableModule,
    authState,
    country,
    searchRelatedTo,
    add_forName,
    uitype_module,
    relatedPopUp,
    main_module,
    related_module,
    uitype6_value,
    g_total,
    total1
  });

  useEffect(() => {
    loadPayload()
  }, [add, row_value, uitype6_value, g_total, total1])

  useEffect(() => {
    setRajya({ label: "", value: "0" })
  }, [selectedValue])


  const putApiCall = (tenantCname, forthis, e_id, headers, add, custom, isrecurr, reccuringruleSave, data2, radioEditOption, module_name) => {

    (async () => {

      const data = await put_api_for_opfile(tenantCname, forthis, e_id, headers, add, custom, isrecurr, reccuringruleSave, data2, radioEditOption, module_name)

      if (data) {
        if (data[0] !== undefined) {
          clear();
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        }
        if (props.yes === true) {
          // window.location.reload()
          props.closeBox()
        }
           else if (data) {
          if (module_name === "invoice" || module_name === "opportunity" || module_name === "supplierorder" || module_name === "supplierorderreturn") {
            window.location.hash = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
          } else {
            window.location.hash = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
          }
        }

      } else {
        // console.log(err)
        setMand_error("Field(s) Required")
      }
      setCountry(1) 
    })()
  }

  const putApiCall2 = (tenantCname, forthis, e_id, add, custom, isrecurr, reccuringruleSave, radioEditOption, module_name) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer" + " " + localStorage.getItem('token')
    }

      (async () => {

        const data = await put_api2_of_opfile(tenantCname, forthis, e_id, add, custom, isrecurr, reccuringruleSave, radioEditOption, module_name)

        if (data) {
          if (data[0] !== undefined) {
            clear();
          }

          if (data[0] === undefined) {

            Object.keys(data).map((keywords) => (
              error_msg.push(data[keywords])
            ))
            setSmShowError(true)
            setSaveButtonDisabled(false);
          }
          if (props.yes === true) {
            props.closeBox()
          } else {
            if (module_name !== "opportunity") {
              if (module_name === "invoice" || module_name === "supplierorder" || module_name === "supplierorderreturn") {
                window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
              } else {
                window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
              }
            } else {
              window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
            }
          }
        } else {
          // console.log(err)
          setMand_error("Field(s) Required")
          // setLoading(error.message)

        }

      })()

  }

  const putApiCall3 = (tenantCname, forthis, e_id, add, module_name, custom, data2, radioEditOption) => {
    (async () => {

      const data = await put_api3_of_opfile(tenantCname, forthis, e_id, add, module_name, custom, data2, radioEditOption)

      if (data) {
        if (data[0] !== undefined) {
          clear();
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        }

        if (props.yes === true) {
          props.closeBox()
        } else {    
          if (module_name !== "opportunity") {
            if ((module_name === "invoice") || (module_name === "supplierorder" || module_name === "supplierorderreturn")) {
              window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
            } else {
              window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
            }
          } else {
        
            window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
          }
        }
      } else {
        // console.log(err)
        setMand_error("Field(s) Required")
        // setLoading(error.message)

      }

    })()

  }

  const putApiForRelatedModule = (tenantCname, forthis, e_id, add, module_name, custom, radioEditOption) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer" + " " + localStorage.getItem('token')
    }
      (async () => {

        const data = await put_api_forrelatedmodule(tenantCname, forthis, e_id, add, module_name, custom, radioEditOption)

        if (data) {
          if(data[0] !== undefined){
            clear();
          }          
          console.log(data, "wana444")
          if (data[0] === undefined) {
            Object.keys(data).map((keywords) => (
              error_msg.push(data[keywords])
            ))
            setSmShowError(true)
          }
          if (props.yes === true) {
            // window.location.reload()
            props.closeBox()
          } else {   
            if (module_name !== "opportunity") {
              if (module_name === "invoice" || module_name === "supplierorder" || module_name === "supplierorderreturn") {
                window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
              } else {
                window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
              }
            } else {
          
              window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
            }
          }
        } else {
          // console.log(err)
          setMand_error("Field(s) Required")
          // setLoading(error.message)

        }
        setCountry(1) 
      })()

  }

  const putApiForMultiEdit = (tenantCname, forthis, medit, module_name, addForMulti, radioEditOption, mutliids, i) => {

        (async () => {

          const data = await put_api_formultiedit_opfile(tenantCname, forthis, medit, module_name, addForMulti, radioEditOption, mutliids, i)

          if (data) {
            if(data[0] !== undefined){
              clear();
            }            
            console.log(data, "wana5")
            setProgres_value(15 * (i + 1))
            if (i === ((selectedFlatRowsmy).length - 1)) {
              setProgres_value(100)
              setSmShow(false)
              setSaveButtonDisabled(false);
              if(module_name === "opportunity"){
                window.location.href = "#/home/" + "opportunities"
              }  
              else{
                window.location.href = "#/home/" +  module_name
              }
            }
          } else {
            setSmShow(false)
            // setMand_error("Field(s) Required")
            alert("Something Went Wrong", module_name)
          }
          setCountry(1) 
        })()


  }

  const postApiCall = (tenantCname, module_name, add, custom, isrecurr, reccuringruleSave, data2, headers) => {
    (async () => {

      const data = await post_api_opfile(tenantCname, module_name, add, custom, isrecurr, reccuringruleSave, data2, headers, autofillnumm)

      if (data) {
        if(data[0] !== undefined){
          clear();
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => (
            error_msg.push(data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);

        }
        if (props.yes !== true) {
          if (module_name !== "opportunity") {
            if (module_name === "invoice" || module_name === "supplierorder" || module_name === "supplierorderreturn") {
              window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
            } else {
              window.location.href = "#/home/" + module_name + "/detail/" + data[0][module_name + "id"]
            }
          } else {
            window.location.href = "#/home/" + module_name + "/detail-op/" + data[0][module_name + "id"]
          }
        } else {
          if (data[0] !== undefined) {
            window.location.reload()
          }
        }
        //window.location.reload()
      } else {
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
  const submit = (e) => {
    // console.log("888888888888",e_id,"22",customerDetails)
    if (!lineSaveCheck){
      return 
    }
    e.preventDefault()
    if(module_name==="opportunity"){
      if(add['copy_costs']){
        setAdd(add => ({ ...add, 
          ['expected_profit']: Tmargin ||0,
          ['expected_sales']: TnetOfTaxes ||0,
          ['operational_expenses']: expenseEdit ,
          ['payroll_costs']: payrollEdit,
          ['net_profit']: netProfit ||0,
      
    }))
    }else{
      setAdd(add => ({ ...add, 
        ['expected_profit_']: profit||0,
        ['expected_sales']: add['expected_sales']||0,
        ['operational_expenses']: opExpTotAmount||0,
        ['payroll_costs']: payCostTotAmount||0,
        ['net_profit']: copyCostCal||0,
      }))
    }
    }
    
    let forthis = ""
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer" + " " + localStorage.getItem('token')
    }
    if (module_name === "opportunity") {
      forthis = "opportunitie"
    } else {
      forthis = module_name
    }
    let data2 = { "linegroup": { "nogrp": [] } }

    groupName.map((dg) => (
      dg.groupitem.map((dgitem, i) => (
        (dg.groupInArray === "") ?
          data2.linegroup.nogrp.push(
            ((dgitem["vat_code"] = (dgitem["vat_codeid"] || dgitem["vat_code"])), (dgitem["discount_type"] = (dgitem["discount_typeid"] || dgitem["discount_type"])),
              dgitem["deleted"] = "0", delete dgitem["group_name"], delete dgitem[module_name + "_id"], delete dgitem["ownerid"],
              delete dgitem["vat_codeid"], delete dgitem["group_nameid"], delete dgitem["discount_typeid"], delete dgitem["line_group_id"], dgitem)
          )
          :
          (dg.groupInArray === "nogrp") ?
            data2.linegroup.nogrp.push(
              ((dgitem["vat_code"] = (dgitem["vat_codeid"] || dgitem["vat_code"])), (dgitem["discount_type"] = (dgitem["discount_typeid"] || dgitem["discount_type"])),
                dgitem["deleted"] = "0", delete dgitem["group_name"], delete dgitem[module_name + "_id"], delete dgitem["ownerid"],
                delete dgitem["vat_codeid"], delete dgitem["group_nameid"], delete dgitem["discount_typeid"], delete dgitem["line_group_id"], dgitem)
            )
            :
            data2.linegroup = {
              ...data2.linegroup, [dg.groupInArray]:
                ((dg.groupitem[i]["vat_code"] = (dg.groupitem[i]["vat_codeid"] || dg.groupitem[i]["vat_code"])), (dg.groupitem[i]["discount_type"] = (dg.groupitem[i]["discount_typeid"] || dg.groupitem[i]["discount_type"])),
                  dgitem["deleted"] = "0", delete dg.groupitem[i]["group_name"], delete dg.groupitem[i][module_name + "_id"], delete dg.groupitem[i]["ownerid"],
                  delete dg.groupitem[i]["vat_codeid"], delete dg.groupitem[i]["group_nameid"], delete dg.groupitem[i]["discount_typeid"], delete dg.groupitem[i]["line_group_id"], dg.groupitem)
            }
      ))
    ))
 

    if ((customerDetails && e_id != null && e_id || customerDetails && e_id != '' && e_id)) {
      if (e_id) {
        putApiCall(tenantCname, forthis, e_id, headers, add, custom, isrecurr, reccuringruleSave, data2, radioEditOption, module_name)

      } else if (isrecurr && linearray.length < 1) {
        putApiCall2(tenantCname, forthis, e_id, add, custom, isrecurr, reccuringruleSave, radioEditOption, module_name)

      } else if (linearray.length >= 1 && isrecurr === false) {
        putApiCall3(tenantCname, forthis, e_id, add, module_name, custom, data2, radioEditOption)

      } else if (e_id & related_module) {

        if (module_name === "opportunity") {
          if (add['repeat_sales_stage'] === undefined) {
            custom["repeat_sales_stage"] = false
          } else {
            custom["repeat_sales_stage"] = add['repeat_sales_stage']
          }
        }
        putApiForRelatedModule(tenantCname, forthis, e_id, add, module_name, custom, radioEditOption)
      }

    } else if (selectedFlatRowsmy && selectedFlatRowsmy.length >= 1) {
      setSmShow(true);
      let mutliids = []
      selectedFlatRowsmy.map((mids) => (
        mutliids.push(mids[module_name + "_id"])
      ))

      selectedFlatRowsmy.forEach((medit, i) => (
        putApiForMultiEdit(tenantCname, forthis, medit, module_name, addForMulti, radioEditOption, mutliids, i)
      ))

    } else {
      if (module_name === "opportunity" || module_name === "invoice" || module_name === "supplierorder" || module_name === "supplierorderreturn") {// deleted field is necessary for edit opportunity and edit invoice
        Object.keys(data2.linegroup).map((lineKey) => (
          data2.linegroup[lineKey].map((item) => (
            delete item.deleted
          ))
        ))
      }

      if (module_name === "opportunity" || module_name === "invoice" || module_name === "supplierorder" || module_name === "supplierorderreturn") {// deleted field is necessary for edit opportunity and edit invoice
        Object.keys(data2.linegroup).map((lineKey) => (
          data2.linegroup[lineKey].map((item) => (

            delete item["supplierorderlineid"],
            delete item["supplierorderreturnlineid"],
            delete item["invoicelineid"],
            delete item["opportunitylineid"],
            delete item.deleted
          ))
        ))
      }
      // if (module_name == "supplierorder") {
      //   delete custom["sales_price"]
      // }
      postApiCall(tenantCname, module_name, add, custom, isrecurr, reccuringruleSave, data2, headers)

    }
    //remove after create opportunity and create invoice in account module
    localStorage.removeItem('related_contact')
    localStorage.removeItem('related_venue')
    localStorage.removeItem('related_opportunity')
    handleClose4()
     // After submitting, disable the Save button
     setSaveButtonDisabled(true);
     setIsAuthState(false)
     setAuthState({ ...authState, duplicate: ''})
  }

 
useEffect(()=>{
  if(props.yes == false){
    setCountry(1)
  }
},[props.yes])
  const cancel = () => {
    if (props.yes === true) {
      props.closeBox()
    } else {
      navigate(-1)
    }

    setTimeout(() => {
      localStorage.removeItem("customerDetails")
      localStorage.setItem("selectedFlatRows", "[]")
      localStorage.removeItem("duplicate")
    }, 500);
    setAdd_forName({})
    setuitype6_value({})
    setUitype_module({})
    setAdd({})
    setCountry(1)
    setLinearray([])
    setIsAuthState(false)
  }

  const all_accounts = () => {
    // localStorage.removeItem("relatedmodule")
    localStorage.removeItem("duplicate")
  }

  const editOptionChange = (e) => {
    setRadioEditOption(e.target.value)
    if (e.target.value || radioEditOption > 1) {
      setIsrecurr(true)
    }
  }

  // open opportunity edit leave page warning modal and set related module and link
  const openSmLeaveEditWarn = (name, link) => {
    setRelatedModuleName(name)
    setRediLinkRel(link)
    setSmLeaveEditWarn(true)
  }

  let xlink = ""

  if (related_module != null) {
    let markchange = ""
    if (localStorage.getItem("prev_module_name2") === "customer") {
      markchange = "accounts"
    } else {
      markchange = localStorage.getItem("prev_module_name2")
    }
    xlink = "/home/" + markchange + "/detail/" + (localStorage.getItem("prev_c_id")||'')

  } else {
    xlink = "/home/" + module_name_links
  }

  let nam = ""
  if (customerDetails && e_id != null) {
    nam = add[module_name + "_name"]
  } else if (selectedFlatRowsmy && selectedFlatRowsmy.length >= 1) {

    nam = "Edit Selected Records"
  } else {
    nam = "Create New " + module_name
  }

  const createLineItemProps = {
    props,
    custom,
    module_name
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
      <lineOrderData.Provider value={{ lineSaveCheck,setLineSaveCheck,blocke, linee, groupName, setGroupName, profit, setProfit,copyCostCal,setCopyCostCal, line, setLine,expenseEdit, payrollEdit }}>
        <recurringModal.Provider value={{ reccuringrule, setReccuringrule, reccuringtime, setReccuringtime, weekday, setWeekday, reccuringruleSave, setReccuringruleSave, ruleshow, setRuleshow, isrecurr, setIsrecurr, show5, setShow5 }}>
          <>{!props.hide && <Header />}
            <div className="detail_parent parent_padding">
              <div className="container-fluid col-12 pl-4 pr-4">
                {
                  blocke != "[]" ? <div className="row pr-1">
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
                          <Buttons type="button" class="btn_cancel reset_button bottom" onClick={cancel}>Cancel</Buttons>
                          <Buttons type="button" class="btn_save crt_btn edit_btn bottom" disabled={isSaveButtonDisabled} onClick={submit}>Save</Buttons>
                        </div>
                      </div>

                      {
                        ((e_id === null) || (props.yes === true)) ? null :
                          e_id && <RelatedListForCreateRecord module_name={module_name} openSmLeaveEditWarn={openSmLeaveEditWarn} e_id={e_id} rlist={rlist} />
                      }
                    </div>

                    <div className="parent_div col-12 opportunityBox">
                      <form>
                        {
                          blocke && Object.keys(blocke).map((k, index) => (
                            [k === "Summary_Quote" || k === "Generate_Quote" ? null :
                              <div key={index} className="detail_div1">
                                <h4 className="cst_inf">{k.replace(/_/g, " ")}</h4>
                                {
                                  k === "Opportunity_Financials" ?
                                    <div className="crncydiv">
                                      {
                                        blocke[k].map((acc, i) => (
                                          acc.show_hide_criteria === "1" && acc.fieldname === "currency" ?
                                            [
                                              <label key={i}>{acc.fieldlabel}</label>,
                                              <select key={acc.fieldname} name={acc.fieldname} value={add["currency"] || custom.currency} onChange={(event)=>changeHandle(event.target)}>
                                                <option hidden>Select</option>
                                                {
                                                  acc.options.map((opt, i) => (
                                                    <option key={i} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                  ))
                                                }
                                              </select>
                                            ] : null
                                        ))
                                      }

                                    </div> : null
                                }
                              </div>,
                            k === "Summary_Quote" || k === "Generate_Quote" ? null :
                              <div key={k} className="detail_div2 detail_div2_with">
                                <div className="details_field_1">
                                  <div className="row">
                                    {
                                      blocke[k].map((acc, i) => (
                                        acc.show_hide_criteria === "1" && acc.fieldname !== "currency" && acc.uitype !== 10 ?
                                          [
                                            acc.fieldname !== "currency" ?
                                              <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                                <label>{acc.fieldlabel.replace('&pound;', '£')}{acc.mandatory == 1 ? <span>*</span> : null}</label>

                                                {acc.mandatory == 1 && mand_error != null && add[acc.fieldname] == null ? <h6 className="mand_error">{mand_error}</h6> : null}

                                              </div> : null,

                                            acc.uitype != 6 && acc.uitype != 100 && acc.fieldname != [module_name + "_country"] && acc.uitype !== 3
                                              && acc.fieldname != "salutation" && acc.uitype != 5 && acc.uitype !== 14 && acc.uitype !== 103 && acc.uitype !== 2 && acc.uitype !== 102 &&
                                              acc.uitype != 7 && acc.uitype != 11 && acc.fieldname !== "currency" && acc.uitype != 8 && acc.fieldname != "recurring_rule" && acc.uitype !== 4
                                              && acc.uitype !== 9 ?
                                              <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                                {
                                                    acc.fieldname == [module_name + "_num"] ?
                                                    <FieldData acc={acc} autofillnumm={autofillnumm} changeHandle={changeHandle} /> :
                                                    <TextField acc={acc} changeHandle={changeHandle}  parent={parent} selectedFlatRowsmy={selectedFlatRowsmy} add={add} module_name={module_name} />}
                                              </div> : null,

                                            acc.uitype === 11 && <FinancialBlock acc={acc}copyCostProfit={copyCostProfit} expenseEdit={expenseEdit} payrollEdit={payrollEdit} changeHandle={changeHandle} selectedFlatRowsmy={selectedFlatRowsmy} />,

                                            acc.uitype === 102 && <Uitype102 acc={acc} changeHandle={changeHandle} />,

                                            acc.uitype == 4 && <RadioButtons acc={acc} changeHandle={changeHandle} />,

                                            // (acc.uitype == 3 && acc.fieldname != "recurring_rule") && <Uitype3 acc={acc} parent={parent} changeHandle={changeHandle2} />,

                                            acc.uitype == 7 && <Uitype7 acc={acc} parent={parent}/>,

                                            acc.uitype == 8 && <Uitype8 acc={acc} />,

                                            acc.uitype == 9 && <Uitype9 acc={acc} />,

                                            acc.uitype == 6 && (<Uitype6 acc={acc} uitype={acc.uitype} add={add} relatedPopUp={relatedPopUp} />),

                                            acc.uitype == 14 && <Uitype14 acc={acc} add={add} setShow2={setShow2} parent={parent} isreadonly={isreadonly} relatedPopUp={relatedPopUp} />,
                                            
                                            (acc.uitype == 3 && acc.fieldname != "recurring_rule") && <Uitype3 acc={acc} parent={parent} changeHandle={changeHandle2} />,

                                            (acc.uitype == 3 && acc.fieldname == "recurring_rule") && <RecurringField acc={acc} changeHandle={changeHandle} ruleshow={ruleshow} selectedFlatRowsmy={selectedFlatRowsmy} setShow5={setShow5} />,

                                            acc.uitype == 100 && <Uitype100 acc={acc} changeHandle={changeHandle} />,

                                            (acc.uitype == 2 && acc.fieldname == "salutation") && <ForSalutation acc={acc} changeHandle={changeHandle} />,

                                            (acc.uitype == 2 && acc.fieldname != ["salutation"]) && <Uitype2 acc={acc} function={changeHandle} parent={parent}/>,

                                            acc.uitype == 5 && <Checkbox acc={acc} expenseEdit={expenseEdit} payrollEdit={payrollEdit}/>,

                                            acc.uitype == 103 && <Uitype103 parent={parent} acc={acc} blocke={blocke} module_name={module_name} country={country} add_forName={add_forName} />,

                                            acc.full_width == 1 ?
                                              [<div key={i} className="col-lg-1"></div>,
                                              <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                              </div>,
                                              <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              </div>] : null,


                                            <div key={i} className="col-lg-1"></div>
                                          ]
                                          : null
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>,
                            (k.match(/_Information/g)|| k.match(/_Details/g) || k.match(/_Info/g) || k.match(/Details/g)) ?
                              <CreateRecordTime k={k} blocke={blocke} add={add} e_id={e_id} customerDetails={customerDetails} duplicate={duplicate} /> : null
                            ]
                          ))
                        }
                        <CreateLineItem isEdit={!(customerDetails && e_id != null && e_id && !props?.yes)} createLineItemProps={createLineItemProps}  expenseEdit={expenseEdit} payrollEdit={payrollEdit}  parent={parent}/>

                        <div className="row">
                          <div className="col-lg-6  col-md-6 col-12"></div>
                          <div className="col-lg-6 col-md-6 col-12 submit-row">
                            <Buttons type="button" class="btn_cancel reset_button bottom" onClick={cancel}>Cancel</Buttons>
                            <Buttons type="button" class="btn_save crt_btn edit_btn bottom" disabled={isSaveButtonDisabled} onClick={submit}>Save</Buttons>
                          </div>
                        </div>
                      </form>

                      {/* xxxxxxx modal for Edit option xxxxxx */}
                      <EditModal module_name={module_name} submit={submit} showEditOption={showEditOption} setShowEditOption={setShowEditOption} editOptionChange={editOptionChange} />

                      {/* xxxxxx modal for edit confirmation xxxxx */}
                      <EditAccountModal show4={show4} submit={submit} handleClose4={handleClose4} />

                      {/* xxxxxx Modal for reccurence xxxxxx */}
                      <RecurringModal />

                      {/* xxxxxx Modal for Error message xxxxxx */}
                      <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />


                      {/* xxxxxx Modal for completion update xxxxxx */}
                      <ProgressBarFile progres_value={progres_value} smShow={smShow} setSmShow={setSmShow} />

                      {/* xxxxxx Modal for Warning to leave edit opportunity page xxxxxx */}

                      <LeavePageWarning module_name={module_name} relatedModuleName={relatedModuleName} smLeaveEditWarn={smLeaveEditWarn} setSmLeaveEditWarn={setSmLeaveEditWarn} rediLinkRel={rediLinkRel} />

                      {/* xxxxxx modal for searchTablemodule   xxxxxx*/}

                      <Modal show={show2} onHide={handleClose05} className="modal_delete fade small_modal modal">
                        <Modal.Header closeButton>
                          <Modal.Title>Warning</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h5>Please select Module first</h5>
                        </Modal.Body>
                      </Modal>

                    </div>
                  </div> : null}
              </div>
            </div> {!props.hide && <Footer />}
          </></recurringModal.Provider></lineOrderData.Provider>

  )
}

export default OpCreatePage