/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from 'react'
import { Modal, Button } from "react-bootstrap"
import "../assets/style/OpCreateEdit.css"
import "../assets/style/Header.css";
import { useParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from "react-bootstrap/DropdownButton"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import i18n from "../config/i18n"
import { Trans } from 'react-i18next'
import { GrClose } from "react-icons/gr"
import { VscInfo } from "react-icons/vsc"
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Draggable from 'react-draggable';
import CurrencyInput from "react-currency-input-field"
import { AuthContext } from '../config/Authentications/AuthContext';
import SearchIconModal from '../components/SearchIconModal';
import { linee_value, opCreatePageData, r_value, searchTableModuleValue } from '../navigation/PageRoutes';
import { lineOrderData } from '../pages/OpCreatePage';
import LineDeleteModal from './LineDeleteModal';
import { CheckModuleName } from '../utils/CheckModuleName';

export const recurringModal = createContext();
function CreateLineItem({createLineItemProps,isEdit,expenseEdit, payrollEdit}) {
// console.log("qqqqqqqqq",createLineItemProps)
  const {
    props,
    custom,
    module_name
  } = createLineItemProps


  const { authState, setAuthState } = useContext(AuthContext)
  const { lineSaveCheck,setLineSaveCheck,blocke, linee, groupName, setGroupName,profit, setProfit,setCopyCostCal,copyCostCal } = useContext(lineOrderData)
  let { add, setAdd,linearray, setLinearray } = useContext(opCreatePageData)
  const [hovered, setHovered] = useState(false)
  const [group, setGroup] = useState(false)
  const [grpname, setGrpname] = useState({})
  const [editgrpName, setEditgrpName] = useState("")
  const [groupNameEditId, setGroupNameEditId] = useState("")
  const [isgroupNameEdit, setIsgroupNameEdit] = useState(false)
  const [isAddItem, setIsAddItem] = useState(false)
  const [IsCreateRow, setisCreateRow] = useState(false)
  const [isAddItemId, setIsAddItemId] = useState("")
  const [editline, setEditline] = useState("")
  const [editon, setEditon] = useState(false)
  const [lineupdate, setLinupdate] = useState({})
  const [dragId, setDragId] = useState();
  let [percent, setPercent] = useState("20")
  const [smShow2, setSmShow2] = useState(false);
  const [lineDeleteId, setLineDeleteId] = useState({})
  const [smShowError, setSmShowError] = useState(false);
  const [error_msg, setError_msg] = useState([])
  // const [netProfit, setNetProfit] = useState('')
  const [opExpTotAmount, setOpExpTotAmount] = useState(0)
  const [payCostTotAmount, setPayCostTotAmount] = useState(0)
 const [addItemLineCheck , setAddItemLineCheck] = useState(false)
//  const [expenseEdit, setExpenseEdit] = useState(0)
//  const [payrollEdit, setPayrollEdit] = useState(0)
 const [vatOptionsKeys,setVatOptionsKey] = useState([])

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  useEffect(()=>{
    if(isEdit){
      setLinearray([])
    }
  },[isEdit])

  useEffect(()=>{
    if(linee['Detailed__Quote']){
      let options = linee['Detailed__Quote'].filter(e => e['fieldname'] === "vat_code")
      if(options){
        setVatOptionsKey(options[0]['options']);
      }
    }
  },[linee])

  const getVatoVal = (val) => {
    if(vatOptionsKeys){
      const vatVal = vatOptionsKeys.filter(e => e.picklistvalue == val)
      return vatVal[0]?.picklistlabel 
    }
    return false
  }
  const lang = localStorage.getItem("language")
  if (lang) {
    i18n.changeLanguage(lang)
  }

  let module_name_links = module_name

  let { line, setLine,netProfit, setNetProfit, TsalesPrice, TcostPrice, TnetOfTaxes,setTnetOfTaxes, grand, vat, TCdiscount, Tdiscount, Tmargin, setTmargin, Tmarginper,g_total, setG_total,total1, settotal1 } = useContext(linee_value)
  useEffect(() => {
    setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
  }, [])

  let related_module = localStorage.getItem("relatedmodule")
  const { searchTableModule, setSearchTableModule } = useContext(searchTableModuleValue)

function objectsAreEqual(obj1, obj2, properties) {
  for (const prop of properties) {
    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
}
function saveHandler(){
  if(line['line_total']){
    lineorderadd(linearray.length)
    lineArrayItemAdd()
    setLineSaveCheck(true)
  }
}
function saveHandler1(itms, i){
  if(lineupdate['line_total']){
    lineArrayItemUpdated(itms, i)
    setAddItemLineCheck(false)
  }
}

// Removing duplicates based on specified properties
linearray = linearray.filter((line, index) =>
  index === linearray.findIndex((obj) =>
    objectsAreEqual(obj, line, ['line_order'])
  )
);

  TsalesPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.sales_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.sales_price || 0) * Number(line.qty || 0))
  TcostPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.cost_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.cost_price || 0) * Number(line.qty || 0))
  TnetOfTaxes = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.total_without_tax || 0), 0) + Number(line.total_without_tax || 0)
  grand = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.line_total || 0), 0) + Number(line.line_total || 0)
  vat = (grand - TnetOfTaxes)
  TCdiscount = (TcostPrice - TnetOfTaxes)
  Tdiscount = (TsalesPrice - TnetOfTaxes)
  Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
  Tmarginper = (Tmargin / TsalesPrice) * 100

  // add['expected_profit'] = Tmargin||0;

  if(add["copy_costs"]){
    add['expected_profit'] = Tmargin||0;
    add['expected_sales']= TnetOfTaxes ||0;
    add['operational_expenses']=expenseEdit ;
    add['payroll_costs']=payrollEdit;
    add['net_profit']=netProfit ||0;
  }else{
    add['expected_profit'] = add["expected_profit_"]||add['expected_profit']||0;
    add['expected_sales']= add['expected_sales_']||add['expected_sales']||0;
    add['operational_expenses']= add['operational_expenses_']||add['operational_expenses'];
    add['payroll_costs']=add['payroll_costs_']||add['payroll_costs']||0;
    add['net_profit']= copyCostCal||add['net_profit']||0;
  }




  useEffect(()=>{
    setG_total(grand)
    settotal1(vat)
    setTnetOfTaxes(TnetOfTaxes)
    setTmargin(Tmargin)
  },[grand,TnetOfTaxes,Tmargin])
  
  
  
  const paisa = [
    {
      currency_id: "1",
      symbol: "£"
    },
    {
      currency_id: "2",
      symbol: "$"
    },
    {
      currency_id: "4",
      symbol: "¥"
    },
    {
      currency_id: "3",
      symbol: "₹"
    }
  ]

  let selectedFlatRows = localStorage.getItem('selectedFlatRows')
  let selectedFlatRowsmy = JSON.parse(selectedFlatRows)
  const customerDetailsss = authState.customerDetails
  const customerDetails = customerDetailsss && JSON.parse(customerDetailsss)
  let { row_value, setRow_value,uitype6_value, setuitype6_value } = useContext(r_value)


  // useEffect(() => {
  //   calcNetProfit();
  // }, [
  //   add['expected_profit'],
  //   opExpTotAmount,
  //   payCostTotAmount,
  //   add['other_costs']
  // ])

  // const calcNetProfit = () => {
  //   let grossProfit = parseFloat(add['expected_profit']) ? parseFloat(add['expected_profit']) : 0;
  //   let oppExp = parseFloat(expenseEdit) ? parseFloat(expenseEdit) : 0;
  //   let payrollExp = parseFloat(payrollEdit) ? parseFloat(payrollEdit) : 0;
  //   let otherExp = parseFloat(add['other_costs']) ? parseFloat(add['other_costs']) : 0;
  //   let netProfit = grossProfit - oppExp - payrollExp - otherExp
  //   setNetProfit(netProfit);
  // }

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
    let oppExp = parseFloat(String(expenseEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''));
    let payrollExp = parseFloat(String(payrollEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''));
    let otherExp = parseFloat(String(add['other_costs']).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
    let nettProfit = grossProfit - oppExp - payrollExp - otherExp
    setNetProfit(nettProfit);
    }else{
      let grossProfit = parseFloat(profit) ? parseFloat(profit) : 0;
      let oppExp = parseFloat(expenseEdit ) ? parseFloat(expenseEdit) : 0;
      let payrollExp = parseFloat(payrollEdit) ? parseFloat(payrollEdit) : 0;
      let otherExp = parseFloat(add['other_costs']) ? parseFloat(add['other_costs']) : 0;
      let nettProfit = grossProfit - oppExp - payrollExp - otherExp
      setCopyCostCal(nettProfit)
    }

  }

  let e_id = ""
  if (customerDetails && customerDetails[module_name + "_id"]) {
    e_id = customerDetails[module_name + "_id"] || customerDetails[module_name + "id"]
  } else if (customerDetails && customerDetails[module_name + "_id"] == null) {
    e_id = authState.c_id
  } else {
    e_id = authState.c_id
  }

  useEffect(() => {
    add['copy_costs'] = 1
  }, [])


  const changeHandleLine = (changeHandleProps) => {
    const { name, value, options, selectedIndex, type, checked } =changeHandleProps;
    setLine((prevLine) => ({
      ...prevLine,
      [name]: value
    }));

    if (type === 'checkbox') { setLine({ ...lineupdate, [name]: checked }) };
    
    performCalculations(name, value, options, selectedIndex, type, checked );
  };

  const performCalculations = (name, value, options, selectedIndex) => {
    setLine({
      ...line, [name]: value,
      ["total_without_tax"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" ?
        name === "discount_type" && value === "173" ?
          ((Number(name === "cost_price" ? value : line.cost_price) - (Number(name === "discount" ? value : line.discount) * Number(name === "cost_price" ? value : line.cost_price) / Number(100))) * Number(name === "qty" ? value : line.qty))
          : name === "discount_type" && value === "172" ?
            (
              (Number(name === "cost_price" ? value : line.cost_price) - Number(name === "discount" ? value : line.discount)) * Number(name === "qty" ? value : line.qty)
            ) : line.discount_type === "173" ?
              (
                (Number(name === "cost_price" ? value : line.cost_price) - (Number(name === "discount" ? value : line.discount) * Number(name === "cost_price" ? value : line.cost_price) / Number(100))) * Number(name === "qty" ? value : line.qty)
              ) :
              (
                (Number(name === "cost_price" ? value : line.cost_price) - Number(name === "discount" ? value : line.discount)) * Number(name === "qty" ? value : line.qty)
              )
        :
        name === "discount_type" && value === "173" ?
          ((Number(name === "sales_price" ? value : line.sales_price) - (Number(name === "discount" ? value : line.discount) * Number(name === "sales_price" ? value : line.sales_price) / Number(100))) * Number(name === "qty" ? value : line.qty))
          : name === "discount_type" && value === "172" ?
            (
              (Number(name === "sales_price" ? value : line.sales_price) - Number(name === "discount" ? value : line.discount)) * Number(name === "qty" ? value : line.qty)
            ) : line.discount_type === "173" ?
              (
                (Number(name === "sales_price" ? value : line.sales_price) - (Number(name === "discount" ? value : line.discount) * Number(name === "sales_price" ? value : line.sales_price) / Number(100))) * Number(name === "qty" ? value : line.qty)
              ) :
              (
                (Number(name === "sales_price" ? value : line.sales_price) - Number(name === "discount" ? value : line.discount)) * Number(name === "qty" ? value : line.qty)
              )
      ),
      ["line_total"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" ?
        name === "discount_type" && value === "173" ?
          (
            ((Number(name === "cost_price" ? value : line.cost_price) - (Number(name === "discount" ? value : line.discount) *
              Number(name === "cost_price" ? value : line.cost_price) / Number(100))) * Number(name === "qty" ? value : line.qty)) *
            ((Number(100) +
              Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : "20")) / 100)
          )
          : name === "discount_type" && value === "172" ?
            (
              ((Number(name === "cost_price" ? value : line.cost_price) - Number(name === "discount" ? value : line.discount)) *
                Number(name === "qty" ? value : line.qty)) * ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
            ) : line.discount_type === "173" ?
              (
                ((Number(name === "cost_price" ? value : line.cost_price) - (Number(name === "discount" ? value : line.discount) *
                  Number(name === "cost_price" ? value : line.cost_price) / Number(100))) * Number(name === "qty" ? value : line.qty)) *
                ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : "20")) / 100)
              ) :
              (
                ((Number(name === "cost_price" ? value : line.cost_price) - Number(name === "discount" ? value : line.discount)) *
                  Number(name === "qty" ? value : line.qty)) * ((Number(100) +
                    Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
              )
        :
        name === "discount_type" && value === "173" ?
          (
            (((Number(line.sales_price) - ((Number(line.discount) / Number(100) * Number(line.sales_price)))) * Number(line.qty)) *
            ((Number(getVatoVal(line.vat_code)||"20") / 100))) + ((Number(line.sales_price) - 
            ((Number(line.discount) / Number(100) * Number(line.sales_price)))) * Number(line.qty))
          )
          : name === "discount_type" && value === "172" ?
            (
              ((Number(line.sales_price) - Number(line.discount)) *
                Number(line.qty)) * ((Number(100) +
                  Number(getVatoVal(line.vat_code)||"20")) / 100)
            ) : line.discount_type === "173" ?
              (
                ((Number(name === "sales_price" ? value : line.sales_price) - (Number(name === "discount" ? value : line.discount) *
                  Number(name === "sales_price" ? value : line.sales_price) / Number(100))) * Number(name === "qty" ? value : line.qty)) *
                ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") :  getVatoVal(line.vat_code)||"20")) / 100)
              ) :
              (
                ((Number(name === "sales_price" ? value : line.sales_price) - Number(name === "discount" ? value : line.discount)) *
                  Number(name === "qty" ? value : line.qty)) * ((Number(100) +
                    Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : getVatoVal(line.vat_code))) / 100)
              )
      )
    })
  };

  const changeHandleLineUpdate = (changeHandleProps) => {

    let { name, value, options, selectedIndex, type, checked } = changeHandleProps
    // setLinupdate({ ...lineupdate, [name]: value })

    if (name === "vat_code") {
      setPercent(options[selectedIndex].text.replace("%", ""))
    }

    setLinupdate({
      ...lineupdate, [name]: value,

      ["total_without_tax"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" ?
        (name === "discount_type" && value === "173" ?
          ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty))
          : name === "discount_type" && value === "172" ?
            (
              (Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
            ) : lineupdate.discount_type === "173" ?
              (
                (Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)
              ) :
              (
                (Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
              )
        )
        :
        name === "discount_type" && value === "173" ?
          ((Number(name === "sales_price" ? value : lineupdate.sales_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "sales_price" ? value : lineupdate.sales_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty))
          : name === "discount_type" && value === "172" ?
            (
              (Number(name === "sales_price" ? value : lineupdate.sales_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
            ) : lineupdate.discount_type === "173" ?
              (
                (Number(name === "sales_price" ? value : lineupdate.sales_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "sales_price" ? value : lineupdate.sales_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)
              ) :
              (
                (Number(name === "sales_price" ? value : lineupdate.sales_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
              )
      ),

      ["line_total"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" ?
        (name === "discount_type" && value === "173" ?
          (
            ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) *
              Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)) *
            ((Number(100) +
              Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
          )
          : name === "discount_type" && value === "172" ?
            (
              ((Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) *
                Number(name === "qty" ? value : lineupdate.qty)) * ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
            ) : lineupdate.discount_type === "173" ?
              (
                ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) *
                  Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)) *
                ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
              ) :
              (
                ((Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) *
                  Number(name === "qty" ? value : lineupdate.qty)) * ((Number(100) +
                    Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : percent)) / 100)
              )
        ) :
        name === "discount_type" && value === "173" ?
        (
          (((Number(lineupdate.sales_price) - ((Number(lineupdate.discount) / Number(100) * Number(lineupdate.sales_price)))) * Number(lineupdate.qty)) *
          ((Number(getVatoVal(lineupdate.vat_codeid)||"20") / 100))) + ((Number(lineupdate.sales_price) - 
          ((Number(lineupdate.discount) / Number(100) * Number(lineupdate.sales_price)))) * Number(lineupdate.qty))
        )
          : name === "discount_type" && value === "172" ?
          (
            ((Number(lineupdate.sales_price) - Number(lineupdate.discount)) *
              Number(lineupdate.qty)) * ((Number(100) +
                Number(getVatoVal(lineupdate.vat_codeid)||"20")) / 100)
          ) : lineupdate.discount_type === "173" ?
          (
            (((Number(name === "sales_price" ? value:lineupdate.sales_price) - ((Number(name === "discount" ? value:lineupdate.discount) / Number(100) * Number(name === "sales_price" ? value:lineupdate.sales_price)))) * Number(name === "qty" ? value:lineupdate.qty)) *
            ((Number(getVatoVal(name === "vat_code" ? value : lineupdate.vat_codeid||lineupdate.vat_code)||"20") / 100))) + ((Number(name === "sales_price" ? value:lineupdate.sales_price) - 
            ((Number(name === "discount" ? value:lineupdate.discount) / Number(100) * Number(name === "sales_price" ? value:lineupdate.sales_price)))) * Number(name === "qty" ? value:lineupdate.qty))
          )  :
          (
            ((Number(name === "sales_price" ? value:lineupdate.sales_price) - Number(name === "discount" ? value:lineupdate.discount)) *
              Number(name === "qty" ? value:lineupdate.qty)) * ((Number(100) +
                Number(getVatoVal(name === "vat_code" ? value : lineupdate.vat_codeid||lineupdate.vat_code)||"20")) / 100)
          )
      ),
            
      ["vat_codeid"]: (name === "vat_code" ? value :lineupdate.vat_code),
      ["discount_typeid"]: (name === "discount_type" ? value : lineupdate.discount_type)
    })

    if (type === 'checkbox') { setLinupdate({ ...lineupdate, [name]: checked }) };
  }

  const groupChange = (e) => {
    setGrpname({ ...grpname, [e.target.name]: e.target.value })
  }

  const groupNameChange = (e) => {
    setEditgrpName(e.target.value)
  }

  const savegroup = () => {
    groupName.push({ ["groupInArray"]: grpname.gname, ["groupitem"]: [] })
    setGroup(false)
    setGrpname("")
  }

  const saveeditgrpname = (dgn) => {
    dgn.groupInArray = editgrpName
    setIsgroupNameEdit(false)
  }


  const lineArrayItemAdd = () => {
    if (!line.line_comment) {
      line['line_comment'] = null
    }
    // linearray.push(line)

    setLinearray([...linearray, line]);
    setEditon(false)
    if (e_id === null || e_id === undefined) {
      setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
    }
    else {
      setLine({ [module_name + "lineid"]: "0", "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
    }
    if (groupName[groupName.length - 1].groupInArray !== "") {
      groupName[groupName.length - 1].groupitem.push(line)
    } else {
      groupName[0].groupitem.push(line)
    }
    
    setisCreateRow(false)
    if (add.copy_costs == true) {
      setAdd({ ...add, expected_sales: TnetOfTaxes, expected_profit: Tmargin })
      setProfit(Tmargin.toString())
    }
  }

  const addItemInCreatedGroup = (iii) => {
    if (e_id === null || e_id === undefined) {
      line = { ...line, ["line_order"]: (Number(linearray[(Number(linearray.length) - Number(1))].line_order) + Number(1)) }
    } else {
      line = { ...line, [module_name + "lineid"]: "0", ["line_order"]: (Number(linearray[(Number(linearray.length) - Number(1))].line_order) + Number(1)) }
    }
    groupName[iii].groupitem.push(line)
    setIsAddItem(false)
    setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
  }

  const lineorderadd = (len) => {
    if (linearray.length === 0) {
      line = { ...line, ["line_order"]: 1 }
    } else {
      line = { ...line, ["line_order"]: (Number(linearray[(Number(len) - Number(1))].line_order) + Number(1)) }
    }
  }

  const deleteGroupName = (dgn) => {
    const dgndata = dgn
    Object.keys(dgndata.groupitem).map((dgnm) => ( 
      groupName[0].groupitem.push(dgndata.groupitem[dgnm])
    ))
    groupName.splice(groupName.indexOf(dgn), 1)
    setGroupName([...groupName])
    // setSmShow2(true)
  }

  const editGroupName = (dgn, iedit) => {
    setEditgrpName(dgn.groupInArray)
    setGroupNameEditId(iedit)
    setIsgroupNameEdit(true)
  }

  const lineArrayItemUpdated = (tut, i) => {
    linearray.splice(linearray.indexOf(tut), 1, lineupdate)
    TsalesPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.sales_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.sales_price || 0) * Number(line.qty || 0))
    TcostPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.cost_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.cost_price || 0) * Number(line.qty || 0))
    TnetOfTaxes = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.total_without_tax || 0), 0) + Number(line.total_without_tax || 0)
    grand = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.line_total || 0), 0) + Number(line.line_total || 0)
    vat = (grand - TnetOfTaxes)
    TCdiscount = (TcostPrice - TnetOfTaxes)
    Tdiscount = (TsalesPrice - TnetOfTaxes)
    Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
    Tmarginper = (Tmargin / TsalesPrice) * 100
    setLinearray(linearray)
    setEditon(false)
    groupName[i].groupitem.splice(groupName[i].groupitem.indexOf(tut), 1, lineupdate)
    if (add.copy_costs == true || add.copy_costs === 1) {
      setAdd({ ...add, expected_sales: TnetOfTaxes, expected_profit: Tmargin })
      setProfit(Tmargin.toString())
    }
  }

  const linedelete = (ei, i) => {
    setSmShow2(true)
    setLineDeleteId({ id: ei, indx: i })

  }

  const linedeletefrommodal = () => {
    linearray.splice(linearray.indexOf(lineDeleteId.id), 1)
    TsalesPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.sales_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.sales_price || 0) * Number(line.qty || 0))
    TcostPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.cost_price || 0) * Number(currentValue.qty || 0), 0) + (Number(line.cost_price || 0) * Number(line.qty || 0))
    TnetOfTaxes = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.total_without_tax || 0), 0) + Number(line.total_without_tax || 0)
    grand = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.line_total || 0), 0) + Number(line.line_total || 0)
    vat = (grand - TnetOfTaxes)
    TCdiscount = (TcostPrice - TnetOfTaxes)
    Tdiscount = (TsalesPrice - TnetOfTaxes)
    Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
    Tmarginper = (Tmargin / TsalesPrice) * 100
    setLinearray(linearray)
    let itemIndex = groupName[lineDeleteId.indx].groupitem.indexOf(lineDeleteId.id)
    groupName[lineDeleteId.indx].groupitem[itemIndex]["deleted"] = true
    let guy = [...groupName]
    linedeletefunc(guy)
    setTimeout(() => {
      groupName[lineDeleteId.indx].groupitem.splice(groupName[lineDeleteId.indx].groupitem.indexOf(lineDeleteId.id), 1)
      setGroupName([...groupName])
    }, 500);

    setSmShow2(false)
  }

  const linedeletefunc = (guy) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    let data2 = { "linegroup": { "nogrp": [] } }
    let data3 = { "linegroup": { "nogrp": [] } }

    if (module_name === "opportunity") {
      guy.map((dg) => (
        dg.groupitem.map((dgitem, i) => (
          (dg.groupInArray === "") ?
            data2.linegroup.nogrp.push(
              { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['opportunitylineid']: dgitem['opportunitylineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: dgitem["deleted"] }
            )
            :
            (dg.groupInArray === "nogrp") ?
              data2.linegroup.nogrp.push(
                { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['opportunitylineid']: dgitem['opportunitylineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
              )
              :
              data2.linegroup = {
                ...data2.linegroup, [dg.groupInArray]: (data2.linegroup[dg.groupInArray] || []).concat(
                  { ["product_id"]: dg.groupitem[i]["product_id"], [module_name + "_product"]: dg.groupitem[i][module_name + "_product"], ['opportunitylineid']: dgitem['opportunitylineid'], ["line_order"]: dg.groupitem[i]["line_order"], ["deleted"]: dg.groupitem[i]["deleted"] }) || []
              }
        ))
      ))
    }

    if (module_name === "invoice") {
      guy.map((dg) => (
        dg.groupitem.map((dgitem, i) => (
          (dg.groupInArray === "") ?
            data2.linegroup.nogrp.push(
              { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['invoicelineid']: dgitem['invoicelineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: dgitem["deleted"] }
            )
            :
            (dg.groupInArray === "nogrp") ?
              data2.linegroup.nogrp.push(
                { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['invoicelineid']: dgitem['invoicelineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
              )
              :
              data2.linegroup = {
                ...data2.linegroup, [dg.groupInArray]: (data2.linegroup[dg.groupInArray] || []).concat(
                  { ["product_id"]: dg.groupitem[i]["product_id"], [module_name + "_product"]: dg.groupitem[i][module_name + "_product"], ['invoicelineid']: dgitem['invoicelineid'], ["line_order"]: dg.groupitem[i]["line_order"], ["deleted"]: dg.groupitem[i]["deleted"] }) || []
              }
        ))
      ))
    }

    if (module_name === "supplierorder") {
      guy.map((dg) => (
        dg.groupitem.map((dgitem, i) => (
          (dg.groupInArray === "") ?
            data2.linegroup.nogrp.push(
              { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['supplierorderlineid']: dgitem['supplierorderlineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: dgitem["deleted"] }
            )
            :
            (dg.groupInArray === "nogrp") ?
              data2.linegroup.nogrp.push(
                { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['supplierorderlineid']: dgitem['supplierorderlineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
              )
              :
              data2.linegroup = {
                ...data2.linegroup, [dg.groupInArray]: (data2.linegroup[dg.groupInArray] || []).concat(
                  { ["product_id"]: dg.groupitem[i]["product_id"], [module_name + "_product"]: dg.groupitem[i][module_name + "_product"], ['supplierorderlineid']: dgitem['supplierorderlineid'], ["line_order"]: dg.groupitem[i]["line_order"], ["deleted"]: dg.groupitem[i]["deleted"] }) || []
              }
        ))
      ))
    }
    if (module_name === "supplierorderreturn") {
      guy.map((dg) => (
        dg.groupitem.map((dgitem, i) => (
          (dg.groupInArray === "") ?
            data2.linegroup.nogrp.push(
              { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['supplierorderreturnlineid']: dgitem['supplierorderreturnlineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: dgitem["deleted"] }
            )
            :
            (dg.groupInArray === "nogrp") ?
              data2.linegroup.nogrp.push(
                { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ['supplierorderreturnlineid']: dgitem['supplierorderreturnlineid'], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
              )
              :
              data2.linegroup = {
                ...data2.linegroup, [dg.groupInArray]: (data2.linegroup[dg.groupInArray] || []).concat(
                  { ["product_id"]: dg.groupitem[i]["product_id"], [module_name + "_product"]: dg.groupitem[i][module_name + "_product"], ['supplierorderreturnlineid']: dgitem['supplierorderreturnlineid'], ["line_order"]: dg.groupitem[i]["line_order"], ["deleted"]: dg.groupitem[i]["deleted"] }) || []
              }
        ))
      ))
    }

    const createData3 = (g, line) => {
      if (line[0]?.deleted === true) {
        data3.linegroup = { [g]: line }
      }
    }

    Object.keys(data2.linegroup).map((hu) => (
      createData3(hu, data2.linegroup[hu].filter(bn => bn.deleted === true))
    ))
  }

  const lineedit = (alb) => {
    setEditon(true);
    setEditline(linearray.findIndex(v => v["line_order"] === alb["line_order"]));
  
  
    if (e_id === undefined || e_id === null) {
        setLinupdate(alb);
    } else {
      if (`${module_name}lineid` in alb && addItemLineCheck === "true") {  
      setLinupdate(alb)
      } 
      else if (`${module_name}lineid` in alb && addItemLineCheck === "false") { 
        setLinupdate({  ...alb,  "vat_code": alb.vat_codeid,  "discount_type": alb.discount_typeid, [module_name + "lineid"]: alb[module_name + "lineid"] || "0"});
        }
      else if( 'line_group_id' in alb){ 
        setLinupdate({  ...alb,  "vat_code": alb.vat_codeid,  "discount_type": alb.discount_typeid, [module_name + "lineid"]: alb[module_name + "lineid"] || "0"});
      }
      else {
        setLinupdate(alb);
      }
    }
  };


  // const lineedit = (alb) => {
  //   setEditon(true);
  //   setEditline(linearray.indexOf(alb));
  
  //   if (e_id === undefined || e_id === null) {
  //     setLinupdate(alb);
  //   } else {
  //     if (`${module_name}lineid` in alb) {
  //       setLinupdate({  ...alb,  "vat_code": alb.vat_codeid,  "discount_type": alb.discount_typeid, [module_name + "lineid"]: alb[module_name + "lineid"] || "0"});
  //     } else {
  //       setLinupdate(alb);
  //     }
  //   }
  // };


  const handleDrag = (kum, gan) => {
    setDragId({ id: (kum[module_name + "_product"] + kum.line_comment), gr: gan });
  };

  const handleDrop = (kum, i) => {
    const dragBox = groupName[dragId.gr].groupitem.find((box) => (box[module_name + "_product"] + box.line_comment) == dragId.id);
    const dropBox = groupName[i].groupitem.find((box) => (box[module_name + "_product"] + box.line_comment) == (kum[module_name + "_product"] + kum.line_comment));

    const dragBoxOrder = dragBox.line_order;
    const dropBoxOrder = dropBox.line_order;

    const newBoxState = groupName[i].groupitem.map((box) => {
      if ((box[module_name + "_product"] + box.line_comment) == dragId.id) {
        box.line_order = dropBoxOrder;
      }
      if ((box[module_name + "_product"] + box.line_comment) == (kum[module_name + "_product"] + kum.line_comment)) {
        box.line_order = dragBoxOrder;
      }
      return (box);
    });
    groupName[i].groupitem = newBoxState
    // setLinearray(newBoxState)
    setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" })
  }

  if(add["copy_costs"]){
    add['expected_profit'] = Tmargin
  }

  let xlink = ""

  if (related_module != null) {
    let markchange = ""
    if (localStorage.getItem("prev_module_name2") === "customer") {
      markchange = "accounts"
    } else {
      markchange = localStorage.getItem("prev_module_name2")
    }
    xlink = "/home/" + markchange + "/detail/" + localStorage.getItem("prev_c_id")
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

  return (

    <div className="container-fluid col-12 pl-4 pr-4">
      {blocke != "[]" ? <div className="row pr-1">
        <div className="col-12">


        </div>
        <div className="parent_div col-12 opportunityBox">
          <form>

            {
              blocke&&Object.keys(blocke).map((k, index) => (
                ((k !== "Invoice_Information") && (k !== "Summary_Quote") && (k !== "Supplier_Order_Information")) && (k !== "Order_Information")? null :
                  //   check opportunity
                  [<div key={index} className="col-12 opportunityBox1">
                    <div className="detail_div1 detail_div1_with_tab">
                      <ul className="nav nav-pills opportunityTab" id="pills-tab" role="tablist">
                        {(k === "Summary_Quote") ?
                          <li className="nav-item" onClick={() => setHovered(false)} role="presentation">
                            <button className={hovered === false ? "nav-link active" : "nav-link"} id="pills-SummaryQ-tab" data-bs-toggle="pill"
                              data-bs-target="#pills-SummaryQ" type="button" role="tab" aria-controls="pills-SummaryQ"
                              aria-selected="true">Summary Quote</button>
                          </li>
                          : null}
                        <li className="nav-item" role="presentation" >
                          <button onClick={() => setHovered(true)} role="presentation" disabled={selectedFlatRowsmy?.length >= 1 ? true : false}
                            className={hovered === true ? "nav-link active" : "nav-link"} id="pills-DetailedQ-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-DetailedQ" type="button" aria-controls="pills-DetailedQ"
                            aria-selected="false">{module_name === "invoice" ?"Invoice Details" : module_name === "supplierorderreturn" ? "Line Items": "Detailed  Quote"}</button>
                        </li>
                      </ul>
                    </div>
                    {((hovered === false) && (k === "Summary_Quote")) ?
                      <div key={k} className="tab-pane fade show active" id="pills-SummaryQ" role="tabpanel" aria-labelledby="pills-SummaryQ-tab">
                        <div className="detail_div2 detail_div2_with_tab">
                          {
                            blocke[k].map((acc, i) => (
                              acc.show_hide_criteria == 1 ?
                                <div key={i}>
                                  <Editor editorState={editorState} onEditorStateChange={setEditorState} />
                                  {/* <div className="rightAlign rightBtnGroup">
                                    <button className="saveBtn edit_btn" type="button" >Save</button>
                                  </div> */}
                                </div> : null
                            ))
                          }

                        </div>
                      </div> :
                      // else condition starttt
                      <div key={k} className="tab-pane" id="pills-DetailedQ" role="tabpanel" aria-labelledby="pills-DetailedQ-tab">
                        <div className="detail_div2 detail_div2_with_tab2">
                          <div className="table forWidthOnly customer_table tableWrap opportunity_table quote_table">
                            <table role="table" className="linetable">
                              <thead>
                                <tr>
                                  <th colSpan="1" role="columnheader">
                                    {/* <div className="filter oppo"></div> */}
                                  </th>
                                  {Object.keys(linee).map((k, index) => (
                                    linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                                      ((acc.show_hide_criteria == 1) && (acc.listview == 1)) ?
                                        [
                                          <th colSpan="1" role="columnheader" key={i}>
                                            {acc.fieldlabel.replace('&pound;', '£') + ' '} {  acc.mandatory == 1 ? <span className="mandatoryAstric">*</span> : null}
                                            {acc.help_description === '' ? null : <span className='tooltip2' data-tooltip={acc.help_description}><VscInfo /></span>}
                                            <div className="filter oppo">

                                            </div>
                                          </th>
                                        ] : null
                                    ))
                                  ))
                                  }
                                  <th colSpan="1" role="columnheader" className="text-center">
                                    &nbsp;
                                    <div className="filter oppo">
                                      {/* <button class="search_button">Search</button> */}
                                    </div>
                                  </th>
                                </tr>

                              </thead>
                              <tbody role="rowgroup">
                                {(groupName || []).map((gn, i) => (
                                  [(groupName[i].groupInArray !== '' && groupName[i].groupInArray !== 'nogrp') ?
                                    isgroupNameEdit && groupNameEditId === i ?
                                      <tr key={i}>
                                        <td></td>
                                        <td><label>Edit Group Name</label>
                                          <input onChange={groupNameChange} name="gname" defaultValue={editgrpName} className="search_form_field mb-1" placeholder="Group Name"></input>
                                          <button type="button" className="search_button bottom mr-1 editGroupName" onClick={() => saveeditgrpname(gn)}>Save</button>
                                          <button type="button" className="btn_cancel reset_button bottom editGroupNameCancel" onClick={() => setIsgroupNameEdit(false)}>X</button>
                                        </td>
                                      </tr>
                                      :
                                      [module_name === "supplierorder" || module_name === "supplierorderreturn" ? <tr key={i} role="row" className="groupRow actionRow"><td></td><td> {gn.groupInArray}</td>
                                        <td></td><td></td><td></td><td></td><td></td>
                                        <td role="cell" data-title={"Action"}>
                                          {(groupName.length - 1) === i ? null :
                                            <button onClick={() => (setIsAddItem(!isAddItem), setIsAddItemId(i),setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" }), setAddItemLineCheck(true))} type="button" className="aiig_button">{isAddItem ? "Cancel" : "Add item"}</button>
                                          }
                                        </td>
                                        <td>
                                          <button onClick={() => editGroupName(gn, i)} type="button" className="grpdel grpedit"><i><MdModeEdit /></i></button>
                                          <button onClick={() => deleteGroupName(gn)} type="button" className="grpdel"><i><MdDelete /></i></button>
                                        </td></tr> : <tr key={i} role="row" className="groupRow actionRow"><td></td><td>{gn.groupInArray}</td>
                                        <td></td><td></td><td></td><td></td><td></td><td></td>
                                        <td role="cell" data-title={"Action"}>
                                          {(groupName.length - 1) === i ? null :
                                            <button onClick={() => (setIsAddItem(!isAddItem), setIsAddItemId(i),setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" }), setAddItemLineCheck(true))} type="button" className="aiig_button">{isAddItem ? "Cancel" : "Add item"}</button>
                                          }
                                        </td>
                                        <td>
                                          <button onClick={() => editGroupName(gn, i)} type="button" className="grpdel grpedit"><i><MdModeEdit /></i></button>
                                          <button onClick={() => deleteGroupName(gn)} type="button" className="grpdel"><i><MdDelete /></i></button>
                                        </td></tr>,

                                      isAddItem && isAddItemId === i ?
                                        <tr role="row" className="check_row">
                                          <td></td>

                                          {Object.keys(linee).map((k, index) => (
                                            [linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                                              ((acc.show_hide_criteria == 1) && (acc.listview === 1)) ?
                                                [
                                                  <td role="cell" data-title={acc.fieldlabel.replace('&pound;', '£')} key={i}>
                                                    {
                                                      acc.fieldname !== "line_total" ? acc.fieldname == [module_name + "_product"] ?
                                                        <div className="td_edit_product">
                                                          <span className="search_form_field addItem">
                                                            <input type="text"
                                                              name={acc.fieldname}
                                                              defaultValue={line[acc.fieldname]}
                                                              onChange={(event) => changeHandleLine(event.target)} placeholder={"product"}>
                                                            </input>
                                                            {/* <span onClick={searchline} className="searchLineSpan"><i><CgSearch /></i></span> */}
                                                            <span onClick={setSearchTableModule("product")} ><SearchIconModal searchTableModule={searchTableModule} /></span>
                                                          </span>
                                                          <span className="comment_input">
                                                            <textarea type="text"
                                                              cols={4}
                                                              name={"line_comment"}
                                                              defaultValue={line["line_comment"] || " "}
                                                              autoComplete="off"
                                                              onChange={(event) => changeHandleLine(event.target)} placeholder={"description"}>
                                                            </textarea>
                                                          </span>
                                                        </div> :
                                                        module_name === "supplierorder" || module_name === "supplierorderreturn" ?
                                                          [acc.fieldname !== "sales_price" && acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                                            <CurrencyInput name={acc.fieldname} onValueChange={(value,name) => changeHandleLine({value,name})} value={line[acc.fieldname] || ""}
                                                              thousandSeparator={false} decimalScale={2} fixedDecimalScale={true} />
                                                            : null,


                                                          acc.fieldname === "discount" ?
                                                            [<div className='discountwap discountwap25'><input type="number" style={{ marginTop: "1px" }}
                                                              name={acc.fieldname}
                                                              autoComplete="off"
                                                              value={line[acc.fieldname] || ""}
                                                              onChange={(event) => changeHandleLine(event.target)} placeholder={"£ / %"}>
                                                            </input></div>,
                                                            linee[k].map((acc, m) => (
                                                              ((acc.listview === 0) && (acc.fieldname === "discount_type")) ?
                                                                <div className="discountwap discountwap25" key={m}>
                                                                  <select name={acc.fieldname}
                                                                    defaultValue={line[acc.fieldname]}
                                                                    onChange={(event) => changeHandleLine(event.target)} >
                                                                      <option hidden>{line[acc.fieldname] === "172" ? "GBP"  : line[acc.fieldname] === "173" ? "%" : line[acc.fieldname]} </option>
                                                                    {/* <option hidden>{line[acc.fieldname]}</option> */}
                                                                    {
                                                                      acc.options.map((opt) => (
                                                                        <option key={opt.picklistvalue} value={opt.picklistvalue}> {opt.picklistlabel.replace("Amount", "GBP")}  </option>
                                                                        // <option key={opt.picklistvalue} value={opt.picklistlabel}></option>
                                                                      ))
                                                                    }
                                                                  </select>
                                                                </div> : null
                                                            ))
                                                            ] : null,

                                                          acc.fieldname === "qty" ?
                                                            <input type="text"
                                                              name={acc.fieldname}
                                                              autoComplete="off"
                                                              value={line[acc.fieldname] || ""}
                                                              onChange={(event) => changeHandleLine(event.target)} placeholder={acc.fieldname === "vat_code" ? "%" : acc.fieldname === "qty" ? "quantity" : "£00.00"}>
                                                            </input> : null,

                                                          acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                                            <div className="discount_cell">
                                                              <select name={acc.fieldname}
                                                                defaultValue={line[acc.fieldname]}
                                                                onChange={(event) => changeHandleLine(event.target)} >
                                                              <option hidden>{line[acc.fieldname] === "169" ? line[acc.fieldname].replace('169', '20%') : line[acc.fieldname] === '168' ? line[acc.fieldname].replace('168', '5%') : line[acc.fieldname].replace('167', '0%')}</option>
                                                                {/* <option hidden>{line[acc.fieldname]}</option> */}
                                                                {
                                                                  acc.options.map((opt) => (
                                                                    opt.picklistvalue === 169 ?
                                                                      <option selected key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option> :
                                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div> : null,

                                                          acc.uitype === 2 && acc.fieldname === "discount_type" ?
                                                            <div className="discount_cell">
                                                              <select name={acc.fieldname}
                                                                defaultValue={line[acc.fieldname]}
                                                                onChange={(event) => changeHandleLine(event.target)} >
                                                                <option hidden>{line[acc.fieldname]}</option>
                                                                {
                                                                  acc.options.map((opt) => (
                                                                    <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div> : null,
                                                          ] : [acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                                            <CurrencyInput name={acc.fieldname} onValueChange={(value,name) => changeHandleLine({value,name})} value={line[acc.fieldname] || ""}
                                                              thousandSeparator={false} decimalScale={2} fixedDecimalScale={true} />
                                                            : null,

                                                       
                                                            acc.fieldname === "discount" ? [
                                                              <div className='discountwap discountwap25'>
                                                                <input
                                                                  type="number"
                                                                  style={{ marginTop: "1px" }}
                                                                  name={acc.fieldname}
                                                                  autoComplete="off"
                                                                  value={line[acc.fieldname] || ""}
                                                                  onChange={(event) => changeHandleLine(event.target)}
                                                                  placeholder={"£ / %"}
                                                                />
                                                              </div>,
                                                              linee[k].map((acc, m) =>
                                                                acc.listview === 0 && acc.fieldname === "discount_type" ? (
                                                                  <div className="discountwap discountwap25" key={m}>
                                                                    <select
                                                                      name={acc.fieldname}
                                                                      defaultValue={line[acc.fieldname]}
                                                                      onChange={(event) => changeHandleLine(event.target)}>
                                                                      <option hidden>
                                                                        {line[acc.fieldname] === "172" ? "GBP"  : line[acc.fieldname] === "173" ? "%" : line[acc.fieldname]}
                                                                      </option>
                                                                      {acc.options.map((opt) => (
                                                                        <option key={opt.picklistvalue} value={opt.picklistvalue}> {opt.picklistlabel.replace("Amount", "GBP")}  </option>
                                                                      ))}
                                                                    </select>
                                                                  </div>
                                                                ) : null
                                                              ),
                                                            ] : null,


                                                          acc.fieldname === "qty" ?
                                                            <input type="text"
                                                              name={acc.fieldname}
                                                              autoComplete="off"
                                                              value={line[acc.fieldname] || ""}
                                                              onChange={(event) => changeHandleLine(event.target)} placeholder={acc.fieldname === "vat_code" ? "%" : acc.fieldname === "qty" ? "quantity" : "£00.00"}>
                                                            </input> : null,

                                                          acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                                            <div className="discount_cell">
                                                              <select name={acc.fieldname}
                                                                defaultValue={line[acc.fieldname]}
                                                                onChange={(event) => changeHandleLine(event.target)} >
                                                              <option hidden>{line[acc.fieldname] === "169" ? line[acc.fieldname].replace('169', '20%') : line[acc.fieldname] === '168' ? line[acc.fieldname].replace('168', '5%') : line[acc.fieldname].replace('167', '0%')}</option>
                                                                {/* <option hidden>{line[acc.fieldname]}</option> */}
                                                                {
                                                                  acc.options.map((opt) => (
                                                                    opt.picklistvalue === 169 ?
                                                                      <option selected key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option> :
                                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div> : null,

                                                          acc.uitype === 2 && acc.fieldname === "discount_type" ?
                                                            <div className="discount_cell">
                                                              <select name={acc.fieldname}
                                                                defaultValue={line[acc.fieldname]}
                                                                onChange={(event) => changeHandleLine(event.target)} >
                                                                <option hidden>{line[acc.fieldname]}</option>
                                                                {
                                                                  acc.options.map((opt) => (
                                                                    <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                                  ))
                                                                }
                                                              </select>
                                                            </div> : null,
                                                          ]

                                                        :
                                                        <input type="number"
                                                          name={acc.fieldname}
                                                          autoComplete="off"
                                                          readOnly
                                                          value={line[acc.fieldname] || ""}
                                                          onChange={(event) => changeHandleLine(event.target)}>
                                                        </input>
                                                    }
                                                  </td>

                                                ] : null
                                            )), <td><button onClick={() => (addItemInCreatedGroup(i))} className="search_button addmargin" type="button">Save</button></td>]
                                          ))
                                          }
                                        </tr> : null]
                                    : null,
                                  gn.groupitem.sort((a, b) => a.line_order - b.line_order).map((itms, z) => (
                                    editon && editline === linearray.findIndex(v => v["line_order"] === itms["line_order"]) ?

                                      <tr role="row" className="check_row updt" key={z}>
                                        <td></td>
                                        {Object.keys(linee).map((k, index) => (
                                          [linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                                            ((acc.show_hide_criteria == 1) && (acc.listview === 1)) ?
                                              [
                                                <td role="cell" data-title={acc.fieldlabel} key={i}>
                                                  {
                                                    acc.fieldname !== "line_total" ? acc.fieldname == [module_name + "_product"] ?
                                                      <div className="td_edit_product">
                                                        <span className="search_form_field lineItemSearch">
                                                          <input type="text"
                                                            name={acc.fieldname}
                                                            defaultValue={lineupdate[acc.fieldname]}
                                                            onChange={(event) =>changeHandleLineUpdate(event.target)} placeholder={"product"}>
                                                          </input>
                                                          {/* <span onClick={searchline} className="searchLineSpan"><i><CgSearch /></i></span> */}
                                                          <span onClick={setSearchTableModule("product")} className="searchLineSpan"><SearchIconModal searchTableModule={searchTableModule} /></span>
                                                        </span>
                                                        <span className="comment_input">
                                                          <textarea type="text"
                                                            name={"line_comment"}
                                                            value={lineupdate["line_comment"]}
                                                            onChange={(event) =>changeHandleLineUpdate(event.target)} placeholder={"description"}>
                                                          </textarea>
                                                        </span>
                                                      </div> :
                                                      module_name === "supplierorder" || module_name === "supplierorderreturn" ?
                                                        [acc.fieldname !== "sales_price" && acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                                          <CurrencyInput name={acc.fieldname} onValueChange={(value,name) =>changeHandleLineUpdate({value,name})} value={lineupdate[acc.fieldname] || ""}
                                                            decimalScale={2} fixedDecimalScale={true} />
                                                          : null,

                                                          acc.fieldname === "discount" ?
                                                          [<input type="text"
                                                            name={acc.fieldname}
                                                            defaultValue={lineupdate[acc.fieldname] || " "}
                                                            onChange={(event) =>changeHandleLineUpdate(event.target)} placeholder={"£ / %"}>
                                                          </input>,
                                                          linee[k].map((acc, l) => (
                                                            ((acc.listview === 0) && (acc.fieldname === "discount_type")) ?
                                                              <div className="discount_cell discount_cell32" key={l}>
                                                                <select name={acc.fieldname}
                                                                  defaultValue={lineupdate[acc.fieldname]}
                                                                  onChange={(event) =>changeHandleLineUpdate(event.target)} >
                                                                  <option hidden>{lineupdate[acc.fieldname] === 'Amount' ? lineupdate[acc.fieldname].replace('Amount', 'GBP') : "%"}</option>
                                                                  {
                                                                    acc.options.map((opt) => (
                                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel.replace('Amount', 'GBP')}</option>
                                                                    ))
                                                                  }
                                                                </select>
                                                              </div> : null
                                                          ))
                                                          ] : null,


                                                        acc.fieldname === "qty" ?
                                                          <input type="text"
                                                            name={acc.fieldname}
                                                            defaultValue={lineupdate[acc.fieldname] || " "}
                                                            onChange={(event) =>changeHandleLineUpdate(event.target)} placeholder={acc.fieldname === "vat_code" ? "%" : acc.fieldname === "qty" ? "quantity4" : "£00.00"}>
                                                          </input> : null,

                                                        acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                                          <div className="discount_cell">
                                                            <select name={acc.fieldname}
                                                              value={lineupdate[acc.fieldname]}
                                                              onChange={(event) =>changeHandleLineUpdate(event.target)} >
                                                              <option hidden>{lineupdate[acc.fieldname] === "169" ? lineupdate[acc.fieldname].replace('169', '20%') : lineupdate[acc.fieldname] === '168' ? lineupdate[acc.fieldname].replace('168', '5%') : lineupdate[acc.fieldname].replace('167', '0%')}</option>
                                                              {
                                                                acc.options.map((opt) => (
                                                                  <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option>
                                                                ))
                                                              }
                                                            </select>
                                                          </div> : null,

                                                        acc.uitype === 2 && acc.fieldname === "discount_type" ?
                                                          <div className="discount_cell">
                                                            <select name={acc.fieldname}
                                                              defaultValue={lineupdate[acc.fieldname]}
                                                              onChange={(event) =>changeHandleLineUpdate(event.target)} >
                                                              <option hidden>{lineupdate[acc.fieldname]}</option>
                                                              {
                                                                acc.options.map((opt) => (
                                                                  <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                                ))
                                                              }
                                                            </select>
                                                          </div> : null
                                                        ] : [acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                                          <CurrencyInput name={acc.fieldname} onValueChange={(value,name) => changeHandleLineUpdate({value,name})} value={lineupdate[acc.fieldname] || ""}
                                                            decimalScale={2} fixedDecimalScale={true} />
                                                          : null,

                                                          acc.fieldname === "discount" ? [
                                                            <input
                                                              type="text"
                                                              name={acc.fieldname}
                                                              defaultValue={lineupdate[acc.fieldname] || " "}
                                                              onChange={(event) => changeHandleLineUpdate(event.target)}
                                                              placeholder={"£ / %"}
                                                            />,
                                                            linee[k].map((acc, l) =>
                                                              acc.listview === 0 && acc.fieldname === "discount_type" ? (
                                                                <div className="discount_cell" key={l}>
                                                                  <select
                                                                    name={acc.fieldname}
                                                                    defaultValue={lineupdate[acc.fieldname]}
                                                                    onChange={(event) => changeHandleLineUpdate(event.target)}
                                                                  >
                                                                    <option hidden>
                                                                      {lineupdate[acc.fieldname] === "173" ? "%"  : lineupdate[acc.fieldname] === "172" || lineupdate[acc.fieldname] === 'Amount'? lineupdate[acc.fieldname].replace('172', 'GBP').replace('Amount', 'GBP'): lineupdate[acc.fieldname]}  </option>
                                                                    {acc.options.map((opt) => (
                                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>
                                                                        {opt.picklistlabel.replace("Amount", "GBP")}
                                                                      </option>
                                                                    ))}
                                                                  </select>
                                                                </div>
                                                              ) : null
                                                            ),
                                                          ] : null,


                                                        acc.fieldname === "qty" ?
                                                          <input type="text"
                                                            name={acc.fieldname}
                                                            defaultValue={lineupdate[acc.fieldname] || " "}
                                                            onChange={(event) =>changeHandleLineUpdate(event.target)} placeholder={acc.fieldname === "vat_code" ? "%" : acc.fieldname === "qty" ? "quantity" : "£00.00"}>
                                                          </input> : null,

                                                        acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                                          <div className="discount_cell">
                                                            <select name={acc.fieldname}
                                                              value={lineupdate[acc.fieldname]}
                                                              onChange={(event) =>changeHandleLineUpdate(event.target)} >
                                                              <option hidden>{lineupdate[acc.fieldname] === "169" ? lineupdate[acc.fieldname].replace('169', '20%') : lineupdate[acc.fieldname] === "168" ? lineupdate[acc.fieldname].replace('168', '5%') : lineupdate[acc.fieldname].replace('167', '0%')}</option>

                                                              {
                                                                acc.options.map((opt) => (
                                                                  <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option>
                                                                ))
                                                              }
                                                            </select>
                                                          </div> : null,

                                                        acc.uitype === 2 && acc.fieldname === "discount_type" ?
                                                          <div className="discount_cell">
                                                            <select name={acc.fieldname}
                                                              defaultValue={lineupdate[acc.fieldname]}
                                                              onChange={(event) =>changeHandleLineUpdate(event.target)} >
                                                              <option hidden>{lineupdate[acc.fieldname]}</option>
                                                              {
                                                                acc.options.map((opt) => (
                                                                  <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                                ))
                                                              }
                                                            </select>
                                                          </div> : null
                                                        ] :

                                                      [<div className="addmargin">{Number(lineupdate.line_total).toFixed(2).replace("NaN", "00.00")}</div>]
                                                  }
                                                </td>

                                              ] : null
                                          )), <td><button onClick={() => saveHandler1(itms, i)} type="button" className="search_button addmargin">Save</button>
                                            <button onClick={() => setEditon(false)} type="button" className="reset_button addmargin"><GrClose /></button></td>]
                                        ))
                                        }

                                      </tr> :
                                      [
                                        <tr key={z} draggable={true}
                                          onDragOver={(ev) => ev.preventDefault()}
                                          onDragStart={() => handleDrag(itms, i)}
                                          onDrop={() => handleDrop(itms, i)}>
                                          <td></td>
                                          {Object.keys(linee).map((k) => (
                                            linee[k].sort((a, b) => a.sequence - b.sequence).map((acc) => (
                                              acc.fieldname == [module_name + "_product"] ?
                                                [<td role="cell" data-title="Product/Service:">
                                                  <div className="proService">
                                                    <span>{itms[acc.fieldname] === "Adhod0" ? "" : itms[acc.fieldname]}</span>
                                                    <p>{itms["line_comment"]}</p>
                                                  </div>
                                                </td>]
                                                :
                                                module_name === "supplierorder" || module_name === "supplierorderreturn" ?
                                                  acc.fieldname !== "sales_price" && acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_total" && acc.fieldname !== "deleted"
                                                    && acc.fieldname !== "bid" && acc.fieldname != [module_name + "_id"] && acc.fieldname != [module_name + "lineid"] && acc.fieldname !== "line_comment"
                                                    && acc.fieldname != [module_name + "line_id"] && acc.fieldname !== "ownerid" ?
                                                    [acc.fieldname !== "vat_code" && acc.fieldname !== "qty" && acc.fieldname !== "discount_type" ?

                                                      <td role="cell" data-title={acc.fieldlabel.replace('&pound;', '£')}>
                                                        {
                                                          acc.fieldname === "discount" ?
                                                            (
                                                              (itms["discount_type"] === "172" ?
                                                                (itms[acc.fieldname]) + " " + (custom.currency === '1' ? '£' : custom.currency === '2' ? '$' : custom.currency === '3' ? 'â‚¹' : custom.currency === '4' ? 'Â¥' : 'GBP')
                                                                : (itms[acc.fieldname]) + "  " + (itms["discount_type"] === "173" ? "%" : itms["discount_type"].replace('Amount', 'GBP')))
                                                            ) : Number(itms[acc.fieldname]).toFixed(2)
                                                        }
                                                      </td> : null,

                                                    acc.fieldname === "vat_code" ?
                                                      <td role="cell" data-title={acc.fieldlabel}>
                                                        {
                                                          itms[acc.fieldname] === "167" ? "0%" : itms[acc.fieldname] === "168" ? "5%" : itms[acc.fieldname] === "169" ? "20%" : (itms[acc.fieldname] + "%")
                                                        }
                                                      </td> : null,

                                                    acc.fieldname === "qty" ?
                                                      <td role="cell" data-title={acc.fieldlabel}>{itms[acc.fieldname]}</td>
                                                      : null]
                                                    : null

                                                  :
                                                  acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_total" && acc.fieldname !== "deleted"
                                                    && acc.fieldname !== "bid" && acc.fieldname != [module_name + "_id"] && acc.fieldname != [module_name + "lineid"] && acc.fieldname !== "line_comment"
                                                    && acc.fieldname != [module_name + "line_id"] && acc.fieldname !== "ownerid" ?
                                                    [acc.fieldname !== "vat_code" && acc.fieldname !== "qty" && acc.fieldname !== "discount_type" ?

                                                      <td role="cell" data-title={acc.fieldlabel.replace('&pound;', '£')}>
                                                        {
                                                          acc.fieldname === "discount" ?
                                                            (
                                                              (itms["discount_type"] === "172" ?
                                                                (itms[acc.fieldname]) + " " + (custom.currency === '1' ? '£' : custom.currency === '2' ? '$' : custom.currency === '3' ? '₹' : custom.currency === '4' ? 'Â¥' : 'GBP')
                                                                : (itms[acc.fieldname]) + "  " + (itms["discount_type"] === "173" ? "%" : itms["discount_type"].replace('Amount', 'GBP')))
                                                            ) : Number(itms[acc.fieldname]||"0").toFixed(2)
                                                        }
                                                      </td> : null,

                                                    acc.fieldname === "vat_code" ?
                                                      <td role="cell" data-title={acc.fieldlabel}>
                                                        {
                                                          itms[acc.fieldname] === "167" ? "0%" : itms[acc.fieldname] === "168" ? "5%" : itms[acc.fieldname] === "169" ? "20%" : (itms[acc.fieldname] + "%")
                                                        }
                                                      </td> : null,

                                                    acc.fieldname === "qty" ?
                                                      <td role="cell" data-title={acc.fieldlabel}>{itms[acc.fieldname]}</td>
                                                      : null] : null

                                            ))
                                          ))
                                          }
                                          <td>{[(Number(itms.line_total)).toFixed(2).replace("NaN", "00.00")]}</td>
                                          <td role="cell" className="icon_opportunity_mobile">
                                            <div className="act_icons">

                                              <a onClick={() => lineedit(itms)} data-tooltip="Edit" className='tool' style={{ fontSize: "large", marginBottom: "5px" }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></a>

                                              <i onClick={() => linedelete(itms, i)} data-tooltip="Delete" className='tool delete_icon' role="button" data-bs-toggle="modal" data-bs-target="#deleteModal"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></i>
                                              <i className="drag">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none"><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 15.6615)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 15.6625)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 6.11223)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 6.11271)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 1.33732)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 1.33732)" fill="#ACACAC" className="fillBlue" /></svg>
                                              </i>
                                            </div>
                                            <div className="mobile_visible_icons">
                                              <i className="drag">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none"><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 15.6615)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 15.6625)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 6.11223)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 6.11271)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 1.33732)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 1.33732)" fill="#ACACAC" className="fillBlue" /></svg>
                                              </i>
                                              <div className="mobile_visible_bgrmv dropdown">

                                                <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd"></path></svg></i>}>
                                                  <Dropdown.Item className="dropdown-item" role="button" onClick={() => lineedit(itms)}><i><MdModeEdit /></i> Edit Customer</Dropdown.Item>
                                                  <Dropdown.Item className="dropdown-item" role="button" onClick={() => linedelete(itms, i)}><i className="del_icons"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></i> Delete Customer</Dropdown.Item>
                                                </DropdownButton>

                                              </div>
                                            </div>
                                          </td>
                                        </tr>]
                                  ))]
                                ))
                                }
                                {group ? <tr key={'z1'} className='groupRows'>
                                  <td></td>
                                  <td><label>Group Name</label>
                                    <input onChange={groupChange} name="gname" defaultValue={grpname.gname} className="search_form_field mb-1" placeholder="Group Name"></input>
                                    <button type="button" className="search_button bottom mr-1" onClick={savegroup}>+ Group</button>
                                    <button type="button" className="btn_cancel reset_button bottom groupcancelbtn" onClick={() => setGroup(false)}>Cancel</button>
                                  </td>
                                </tr> : null}
                                {IsCreateRow ?
                                  <tr key={'z2'} role="row" className="check_row">
                                    <td></td>

                                    {Object.keys(linee).map((k, index) => (
                                      [linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                                        ((acc.show_hide_criteria == 1) && (acc.listview === 1)) ?
                                          [
                                            <td role="cell" data-title={acc.fieldlabel.replace('&pound;', '£')} key={i}>
                                              {
                                                acc.fieldname !== "line_total" ? acc.fieldname == [module_name + "_product"] ?
                                                  <div className="td_edit_product">
                                                    <span className="search_form_field lineItemSearch">
                                                      <input type="text"
                                                        name={acc.fieldname}
                                                        defaultValue={line[acc.fieldname]}
                                                        onChange={(event) => changeHandleLine(event.target)} 
                                                        placeholder={"product"}>
                                                      </input>
                                                      {/* not opening product search table in related opportunity module */}
                                                      {/* <span onClick={()=>(setAccValue(acc.fieldname),searchline())} className="searchLineSpan"><i><CgSearch /></i></span>  */}
                                                      <span onClick={() => (setSearchTableModule("product"))} className="searchLineSpan">
                                                        <SearchIconModal searchTableModule={"product"} /></span>
                                                    </span>
                                                    <span className="comment_input">
                                                      <textarea type="text"
                                                        cols={4}
                                                        name={"line_comment"}
                                                        defaultValue={line["line_comment"] || " "}
                                                        autoComplete="off"
                                                        onChange={(event) => changeHandleLine(event.target)} placeholder={"description"}>
                                                      </textarea>
                                                    </span>
                                                  </div> : 
                                                  [acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                                    <CurrencyInput name={acc.fieldname} onValueChange={(value,name) => changeHandleLine({value,name})}  
                                                    value={line[acc.fieldname] || "0"}
                                                    // value={
                                                    //   // Checking field is sales_price or cost_price
                                                    //    (line && (line.sales_price || line.cost_price))?
                                                    //   (acc.fieldname === 'sales_price' || acc.fieldname === 'cost_price')
                                                    //     ? (line[acc.fieldname] && line[acc.fieldname].includes(','))
                                                    //     ? line[acc.fieldname].replace(',', '') 
                                                    //     : line[acc.fieldname] || "0"  
                                                    //     : line[acc.fieldname] || "0"
                                                    //     : line[acc.fieldname] || "0"
                                                    // }
                                                      thousandSeparator={false} decimalScale={2} fixedDecimalScale={true}  />
                                                    : null,

                                                  acc.fieldname === "discount" ?
                                                    [<div className='discountwap discountwap25'><input type="number" style={{ marginTop: "1px" }}
                                                      name={acc.fieldname}
                                                      autoComplete="off"
                                                      value={line[acc.fieldname] || ""}
                                                      onChange={(event) => changeHandleLine(event.target)} placeholder={"£ / %"}>
                                                    </input></div>,
                                                    linee[k].map((acc, j) => (
                                                      ((acc.listview === 0) && (acc.fieldname === "discount_type")) ?
                                                        <div className="discountwap discountwap25" key={j}>
                                                          <select name={acc.fieldname}
                                                            value={line[acc.fieldname]}
                                                            onChange={(event) => changeHandleLine(event.target)} >
                                                            <option hidden>{line[acc.fieldname] == "172" ? line[acc.fieldname].replace("172", "GBP") : line[acc.fieldname].replace("173", "%")}</option>
                                                            {/* <option hidden>{line[acc.fieldname]}</option> */}
                                                            {
                                                              acc.options?.map((opt) => (
                                                                <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel.replace('Amount', 'GBP')}</option>
                                                              ))
                                                            }
                                                          </select>
                                                        </div> : null
                                                    ))
                                                    ]
                                                    : null,

                                                  acc.fieldname === "qty" ?
                                                    <input type="text"
                                                      name={acc.fieldname}
                                                      autoComplete="off"
                                                      value={line[acc.fieldname] || ""}
                                                      onChange={(event) => changeHandleLine(event.target)} placeholder={acc.fieldname === "vat_code" ? "%" : acc.fieldname === "qty" ? "quantity" : "£00.00"}>
                                                    </input> : null,

                                                  acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                                    <div className="discount_cell discount_cell2">
                                                      <select name={acc.fieldname}
                                                        defaultValue={line[acc.fieldname]}
                                                        onChange={(event) => changeHandleLine(event.target)} >
                                                        <option hidden>Select</option>
                                                        {
                                                          acc.options.map((opt) => (
                                                            opt.picklistvalue === 169 ?
                                                              <option selected key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option> :
                                                              <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}%</option>
                                                          ))
                                                        }
                                                      </select>
                                                    </div> : null,

                                                  acc.uitype === 2 && acc.fieldname === "discount_type" ?
                                                    <div className="discount_cell">
                                                      <select name={acc.fieldname}
                                                        value={line[acc.fieldname]}
                                                        onChange={(event) => changeHandleLine(event.target)} >
                                                        <option hidden>Select</option>
                                                        {
                                                          acc.options.map((opt) => (
                                                            <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                          ))
                                                        }
                                                      </select>
                                                    </div> : null,
                                                  ]

                                                  :
                                                  <input type="number"
                                                    name={acc.fieldname}
                                                    autoComplete="off"
                                                    readOnly
                                                    value={line[acc.fieldname] || ""}
                                                    onChange={(event) => changeHandleLine(event.target)}>
                                                  </input>
                                              }
                                            </td>

                                          ] : null
                                      )),
                                      <td>
                                        <button onClick={() => saveHandler()} className="search_button addmargin" type="button">Save</button>
                                        <button onClick={() => (setLineSaveCheck(true),setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" }), setisCreateRow(false))} className="btn_cancel reset_button addmargin" type="button"><GrClose /></button>
                                      </td>]
                                    ))
                                    }
                                  </tr> : null}

                                {module_name === "supplierorder" || module_name === "supplierorderreturn" ? <tr key={'z3'} className="Gtotal_row total_row total_row_desk grand_total">

                                  <td></td>
                                  <td>
                                    <button type="button" className="search_button addGroupTd" onClick={() => setGroup(!group)}>Add Group</button>
                                    {IsCreateRow ? null :
                                      <button type="button" className="search_button addGroupTd" onClick={() => (setisCreateRow(true), setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" }))}>Add Product</button>
                                    }

                                  </td>
                                  <td></td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Price <i className='tooltip3' data-tooltip='Total sales price before discount'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {TcostPrice.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Discount <i className='tooltip3' data-tooltip='Total Discount'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {TCdiscount.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total <i className='tooltip3' data-tooltip='Total amount net of taxes'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {TnetOfTaxes.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Tax <i className='tooltip3' data-tooltip='Total Tax'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {vat.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Grand Total <i className='tooltip3' data-tooltip='Total amount inclusive of taxes'><VscInfo /></i> </span>
                                          <span className="td_total">
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {(grand).toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>

                                  </td>
                                  <td></td>
                                </tr> : <tr key={'z3'} className="Gtotal_row total_row total_row_desk grand_total">

                                  <td></td>
                                  <td>
                                    <button type="button" className="search_button addGroupTd" onClick={() => setGroup(!group)}>Add Group</button>
                                    {IsCreateRow ? null :
                                      <button type="button" className="search_button addGroupTd" onClick={() => (setLineSaveCheck(false),setisCreateRow(true), setLine({ "product_id": 0, [module_name + "_product"]: "", "discount": "0", "discount_type": "172", "vat_code": "169" }))}>Add Product</button>
                                    }

                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Price <i className='tooltip3' data-tooltip='Total sales price before discount'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {TsalesPrice.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Discount <i className='tooltip3' data-tooltip='Total Discount'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {Tdiscount.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total <i className='tooltip3' data-tooltip='Total amount net of taxes'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {TnetOfTaxes.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Total Tax <i className='tooltip3' data-tooltip='Total Tax'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {vat.toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_total_title2">
                                    <div className="total_wrap">
                                      <div className='total_row1'>
                                        <p><span className="span_title1">Grand Total <i className='tooltip3' data-tooltip='Total amount inclusive of taxes'><VscInfo /></i> </span>
                                          <span className="td_total">
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {(grand).toFixed(2).replace("NaN", "00.00")}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="total_wrap">
                                      <div className='total_row1_margin'>
                                        <p><span className="span_title1">Margin <i className='tooltip3' data-tooltip='Total margin'><VscInfo /></i> </span>
                                          <span className='td_total'>
                                            {paisa.map((p) => (
                                              custom.currency == p.currency_id ? p.symbol : null
                                            ))}
                                            {Tmargin.toFixed(2).replace("NaN", "0.00") + ' '}
                                            ({Number(Tmarginper || "0").toFixed(2) / (Number(Tmarginper || "0")) === 1 ? Number(Tmarginper || "0") : Number(Tmarginper || "0").toFixed(2)}%)
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                </tr>}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>}
                  </div>]
              ))
            }

          </form>


          {/* Modal for Error message xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
          <Modal
            size="sm"
            show={smShowError}
            onHide={() => (setSmShowError(false), setError_msg([]))}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm" style={{ "color": "red" }}>
                <Trans>Error</Trans>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{error_msg.map((para) => (<li style={{ "color": "brown", "font-size": "12px" }}>{para}</li>))}</Modal.Body>
          </Modal>


          {/* Modal for line item delete xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
          {/* <Modal show={smShow2} onHide={() => setSmShow2(false)} className="modal_delete fade small_modal modal"  data-bs-backdrop="static" data-bs-keyboard="false">
            <Modal.Header>
              <Modal.Title><Trans>Delete Item</Trans></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Are you sure that you want to delete the Item?</h5>
              <h6>All the data related to this item will be deleted.</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button className="secondary reset_button" onClick={() => setSmShow2(false)}>
                Cancel
              </Button>
              <Button variant="danger" className="danger" onClick={linedeletefrommodal}>
                Yes Delete
              </Button>
            </Modal.Footer>
          </Modal> */}
                      <LineDeleteModal linedeletefrommodal={linedeletefrommodal} smShow2={smShow2} setSmShow2={setSmShow2} />


        </div>
      </div> : null}
    </div>



  )
}

export default CreateLineItem
