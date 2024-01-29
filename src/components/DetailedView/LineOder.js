import React, { useState, useEffect, useContext } from "react";
import { MdModeEdit } from "react-icons/md"
import { CheckModuleName } from "../../utils/CheckModuleName";
import { VscInfo } from "react-icons/vsc"
import { GrClose } from "react-icons/gr"
import axios from "../../service/Axios";
import { AuthContext } from "../../config/Authentications/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from "react-bootstrap/DropdownButton"
import CurrencyInput from 'react-currency-input-field';
import parse from 'html-react-parser';
import { blockeDetail, cDetails2, linedetails, linee1 } from "../../pages/DetailedView";
import Moment from 'moment';
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"
import { Trans } from 'react-i18next'
import { linee_value, opCreatePageData } from "../../navigation/PageRoutes";
import { recordErrorAPIdata } from "../../service/useApiData";


const LineOrder = () => {
  const { authState, setAuthState } = useContext(AuthContext)
  const tenantCname = authState.tenant_cname
  const { add } = useContext(opCreatePageData)
  const [hovered, setHovered] = useState(false)
  let { linee, setLinee } = useContext(linee1)
  const { blocke, setBlocke } = useContext(blockeDetail)
  const { cdetails, setCdetails } = useContext(cDetails2);
  const { cdetailsLines, setCdetailsLines } = useContext(linedetails);
  const [editon, setEditon] = useState(false)
  const [lineupdate, setLinupdate] = useState({})
  const [lineDeleteId, setLineDeleteId] = useState({})
  const [editline, setEditline] = useState("")
  const [smShow2, setSmShow2] = useState(false);
  const [dragId, setDragId] = useState();
  const [c_id, setC_id] = useState('')
  const [norecord, setNorecord] = useState('')
  const [vatOptionsKeys,setVatOptionsKey] = useState([])
  let related_module = localStorage.getItem("relatedmodule")
  let { id } = useParams();
  localStorage.setItem("c_id", id)
  const [total, setTotal] = useState('');
  const [profit, setProfit] = useState('');

  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
  
  useEffect(() => {
    setC_id(id)
  }, [id])

  let mergedLineItems = []

  Object.keys(cdetailsLines || {}).map((mergre => (
    mergedLineItems = [...mergedLineItems, ...cdetailsLines[mergre]]
  )))
  useEffect(()=>{
    if(linee && linee['Detailed__Quote']){
      let options = linee['Detailed__Quote'].filter(e => e['fieldname'] === "vat_code")
      if(options){
        setVatOptionsKey(options[0]['options']);
      }
    }
  },[linee])

  const getVatoVal = (val) => {
    if(vatOptionsKeys){
      const vatVal = vatOptionsKeys.filter(e => e.picklistvalue == val)
      return vatVal[0].picklistlabel 
    }
    return false
  }

  let { TsalesPrice, TcostPrice, TnetOfTaxes, setTnetOfTaxes, grand, vat, TCdiscount, Tdiscount, Tmargin, setTmargin, Tmarginper, g_total, setG_total, total1, settotal1, lineObject, setLineObject } = useContext(linee_value)
  TsalesPrice = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.sales_price) * Number(currentValue.qty), 0)
  TcostPrice = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.cost_price) * Number(currentValue.qty), 0)
  TnetOfTaxes = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.total_without_tax), 0)
  grand = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.line_total), 0)
  vat = (grand - TnetOfTaxes)
  Tdiscount = (TsalesPrice - TnetOfTaxes)
  TCdiscount = (TcostPrice - TnetOfTaxes)
  Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
  Tmarginper = (Tmargin / TsalesPrice) * 100

  let module_name = CheckModuleName()
  const changeHandleLineUpdate = (changeHandleProps) => {
    let { name, value, options, selectedIndex } = changeHandleProps
    // setLinupdate({ ...lineupdate, [name]: value })
    setLinupdate({
      ...lineupdate, [name]: value, ["vat_codeid"]: (name === "vat_code" ? value : lineupdate.vat_codeid),
      ["discount_typeid"]: (name === "discount_type" ? value : lineupdate.discount_typeid),

      // eslint-disable-next-line no-useless-computed-key
      ["total_without_tax"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ?
        name === "discount_type" && value === "173" ?
          ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "sales_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty))
          : name === "discount_type" && value === "173" ?
            (
              (Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
            ) : lineupdate.discount_type === "173" ?
              (
                (Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "sales_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)
              ) :
              (
                (Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) * Number(name === "qty" ? value : lineupdate.qty)
              )
        :
        name === "discount_type" && value === "173" ?
          ((Number(name === "sales_price" ? value : lineupdate.sales_price) - (Number(name === "discount" ? value : lineupdate.discount) * Number(name === "sales_price" ? value : lineupdate.sales_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty))
          : name === "discount_type" && value === "173" ?
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

      // eslint-disable-next-line no-useless-computed-key
      ["line_total"]: (module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ?
        name === "discount_type" && value === "173" ?
          (
            ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) *
              Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)) *
            ((Number(100) +
              Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : lineupdate.vat_code)) / 100)
          )
          : name === "discount_type" && value === "172" ?
            (
              ((Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) *
                Number(name === "qty" ? value : lineupdate.qty)) * ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : lineupdate.vat_code)) / 100)
            ) : lineupdate.discount_type === "173" ?
              (
                ((Number(name === "cost_price" ? value : lineupdate.cost_price) - (Number(name === "discount" ? value : lineupdate.discount) *
                  Number(name === "cost_price" ? value : lineupdate.cost_price) / Number(100))) * Number(name === "qty" ? value : lineupdate.qty)) *
                ((Number(100) +
                  Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : lineupdate.vat_code)) / 100)
              ) :
              (
                ((Number(name === "cost_price" ? value : lineupdate.cost_price) - Number(name === "discount" ? value : lineupdate.discount)) *
                  Number(name === "qty" ? value : lineupdate.qty)) * ((Number(100) +
                    Number(name === "vat_code" ? options[selectedIndex].text.replace("%", "") : lineupdate.vat_code)) / 100)
              )

        :
          name === "discount_type" && value === "173" ?
          (
            (((Number(lineupdate.sales_price) - ((Number(lineupdate.discount) / Number(100) * Number(lineupdate.sales_price)))) * Number(lineupdate.qty)) *
            ((Number(getVatoVal(name === "vat_code" ? value : lineupdate.vat_codeid)||"20") / 100))) + ((Number(lineupdate.sales_price) - 
            ((Number(lineupdate.discount) / Number(100) * Number(lineupdate.sales_price)))) * Number(lineupdate.qty))
          )
          : name === "discount_type" && value === "172" ?
          (
            ((Number(lineupdate.sales_price) - Number(lineupdate.discount)) *
              Number(lineupdate.qty)) * ((Number(100) +
                Number(getVatoVal(name === "vat_code" ? value : lineupdate.vat_codeid)||"20")) / 100)
          )  : lineupdate.discount_typeid === "173" ?
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
      )
    })

  }

  useEffect(() => {
    setTotal(TnetOfTaxes);
    setProfit(Tmargin)
  }, [total, profit, Tmargin, TnetOfTaxes]);

  const lineedit = (alb) => {
    setEditon(true)
    setEditline(alb[module_name + "lineid"])
    setLinupdate(alb)
  }
  const lineArrayItemUpdated = (tut, i) => {
    cdetailsLines[i].splice(cdetailsLines[i].indexOf(tut), 1, lineupdate)
    setEditon(false)
    updatelinesonapi("")
  }

  const linedelete = (ei, i) => {
    setLinupdate(ei)
    setSmShow2(true)
    setLineDeleteId({ id: ei, indx: i })
  }

  const linedeletefrommodal = () => {
    cdetailsLines[lineDeleteId.indx].splice(cdetailsLines[lineDeleteId.indx].indexOf(lineDeleteId.id), 1, { ...lineDeleteId.id, ["deleted"]: true })
    updatelinesonapi("deletesend")
    setSmShow2(false)
  }


  const paisa = [
    {
      currency_id: 1,
      symbol: "£"
    },
    {
      currency_id: 2,
      symbol: "$"
    },
    {
      currency_id: 4,
      symbol: "¥"
    },
    {
      currency_id: 3,
      symbol: "₹"
    }
  ]


  const recalldetail = () => {
    let forthis = ""
    if (module_name === "opportunity") {
      forthis = "opportunitie"
    } else {
      forthis = module_name
    }
    axios.get("/" + tenantCname + "/api/" + forthis + "s/" + id, {
      headers: {
        "Accept": "application/JSON",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      params: {
        "company_id": localStorage.getItem("companyId")
      }
    }
    )
      .then(res => {
        setCdetails(res.data[0])
        setCdetailsLines(res.data[0].lines.Group)
        localStorage.setItem("c_id", id)
        localStorage.removeItem("customerDetails")
          (related_module == null ? localStorage.setItem("prev_c_id", id) : null)
        setNorecord('')
        logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{ "company_id": localStorage.getItem("companyId")}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          setNorecord("No Record Found!")
        }, 1000);
        logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{"company_id": localStorage.getItem("companyId")}, 'response':[], 'error_details': err, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })
  }

  let custom = ''

  Object.keys(blocke).map((k) => (
    blocke[k].map((acc) => (
      acc.fieldname != [module_name + "_num"] && acc.fieldname !== "source" && acc.fieldname !== "status"
        && acc.fieldname !== "repeat_sales_stage" && acc.fieldname != [module_name + "_type"] ?
        custom = { ...custom, [acc.fieldname]: cdetails[`${acc.fieldname}id`], ["ownerid"]: cdetails["ownerid"] } : null,


      acc.uitype === 1 && acc.fieldname === "opportunity_name" ?
        custom = { ...custom, [acc.fieldname]: cdetails["opportunity_name"] } : null,

      acc.fieldname === "grand_total" ?
        custom = { ...custom, [acc.fieldname]: grand  } : null,

      // acc.fieldname === "stage" ?
      //   custom = { ...custom, [acc.fieldname]: cdetails[acc.fieldname] } : null,

      acc.fieldname === "total_tax" ?
        custom = { ...custom, [acc.fieldname]: vat } : null,

      acc.uitype === 11 ? acc.fieldname === "net_profit" ?
        custom = { ...custom, [acc.fieldname]: profit } : null : null,

      acc.fieldname === "expected_sales" ?
        custom = { ...custom, [acc.fieldname]: TnetOfTaxes} : null,

      acc.fieldname === "expected_profit" ?
        custom = { ...custom, [acc.fieldname]: Tmargin } : null,

      acc.fieldname == [module_name + "_type"] ?
        custom = { ...custom, [acc.fieldname]: cdetails[module_name + "_typeid"] } : null,


      acc.uitype === 10 && acc.fieldname === "modifiedtime" ?
        custom = { ...custom, [acc.fieldname]: Moment().format("YYYY-MM-DD HH:mm") } : null,

      acc.uitype === 10 && acc.fieldname === "createtime" ?
        custom = { ...custom, [acc.fieldname]: Moment(cdetails.createtime, "DD-MM-YYYY hh:mm:ss").format('YYYY-MM-DD HH:MM:SS') } : null,

      acc.uitype === 7 && acc.fieldname === "close_date" ?
        custom = { ...custom, [acc.fieldname]: Moment(cdetails.close_date, "DD-MM-YYYY ").format('YYYY-MM-DD') } : null,

      acc.uitype == 100 ?
        acc.options.map((owner) => (
          add[acc.fieldname] == [owner.firstname + " " + owner.lastname] ?
            custom = { ...custom, ["ownerid"]: owner.userid } : custom = { ...custom, ["ownerid"]: authState.userid, ["assign_to"]: authState.username }
        )) : null

    ))
  ))


  let data2 = { "linegroup": { "nogrp": [] } }

  const updatelinesonapi = (d2) => {
    let forthis = ""
    if (module_name === "opportunity") {
      forthis = "opportunitie"
    } else {
      forthis = module_name
    }

    let newdgitem = []
    if (d2 !== "deletesend") {

      Object.keys(cdetailsLines).map((dg) => (
        cdetailsLines[dg].map((dgitem) => (
          dg === "nogrp" ?
            data2.linegroup.nogrp.push(
              ((dgitem["vat_code"] = (dgitem["vat_codeid"] || dgitem["vat_code"])), (dgitem["discount_type"] = (dgitem["discount_typeid"] || dgitem["discount_type"])), (dgitem[module_name + "lineid"] = (dgitem[module_name + "lineid"])), delete dgitem["group_name"], delete dgitem[module_name + "_id"], delete dgitem["ownerid"], delete dgitem["ownerid"],
                delete dgitem["vat_codeid"], delete dgitem["group_nameid"], delete dgitem["discount_typeid"], delete dgitem["line_group_id"], dgitem)
            )
            :

            data2.linegroup = {
              ...data2.linegroup, [dg]: (data2.linegroup[dg] || []).concat({
                ["vat_code"]: (dgitem["vat_codeid"] || dgitem["vat_code"]), ["discount_type"]: (dgitem["discount_typeid"] || dgitem["discount_type"]), ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false),
                ["cost_price"]: dgitem["cost_price"], ["discount"]: dgitem["discount"], ["sales_price"]: dgitem["sales_price"], ["qty"]: dgitem["qty"], ["total_without_tax"]: dgitem["total_without_tax"], ["line_total"]: dgitem["line_total"], ["line_comment"]: dgitem["line_comment"], [module_name + "lineid"]: dgitem[module_name + "lineid"]
              })
            }

          //]
        ))
      ))
    } else {
     
      Object.keys(cdetailsLines).map((dg) => (
        cdetailsLines[dg].map((dgitem, i) => (
          (dg.groupInArray === "") ?
            data2.linegroup.nogrp.push(
              { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], [module_name + "lineid"]: dgitem[module_name + "lineid"], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
            )
            :
            (dg.groupInArray === "nogrp") ?
              data2.linegroup.nogrp.push(
                { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], [module_name + "lineid"]: dgitem[module_name + "lineid"], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }
              )
              :
              data2.linegroup = {
                ...data2.linegroup, [dg]: (data2.linegroup[dg] || []).concat(
                  { ["product_id"]: dgitem["product_id"], [module_name + "_product"]: dgitem[module_name + "_product"], [module_name + "lineid"]: dgitem[module_name + "lineid"], ["line_order"]: dgitem["line_order"], ["deleted"]: (dgitem["deleted"] || false) }) || []
              }
        ))
      ))
    }

    if(module_name === "opportunity"){
      let linearray = []
      Object.keys(cdetailsLines)?.forEach(k => {cdetailsLines[k]?.forEach(line => line.deleted?null:linearray.push(line))})
      let TsalesPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + (Number(currentValue.sales_price || 0)*Number(currentValue.qty)), 0) 
      let TcostPrice = linearray.reduce((total, currentValue) => total = Number(total || 0) + (Number(currentValue.cost_price || 0)*Number(currentValue.qty)), 0)
      let TnetOfTaxes = linearray.reduce((total, currentValue) => total = Number(total || 0) + Number(currentValue.total_without_tax || 0), 0)
      let Tdiscount = (TsalesPrice - TnetOfTaxes)
      let Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
      custom = {...custom,
        ['expected_sales']:TnetOfTaxes,
        ['expected_profit']: Tmargin,
        ['net_profit']: Tmargin - Number(cdetails['other_costs']) -Number(cdetails['operational_expenses']) - Number(cdetails['payroll_costs'])
      }
    }

    if (module_name === "invoice" && related_module === null) {
      blocke.Invoice_Information.map((field) => {
        if (field.fieldname === "payment_terms") {
          field.options.map((picklist) => {
            if (picklist.picklistlabel === custom["payment_terms"]) {
              custom["payment_terms"] = picklist.picklistvalue
            }
          })
        }
      })
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    axios.put("/" + tenantCname + "/api/" + forthis + "s/" + id,
      {
        [module_name + "_num"]: cdetails[module_name + "_num"],
        "custom": custom,
        "source": "none",
        "status": "1",
        "lines": data2
      },

      {
        headers: headers
      })
      .then((response) => {
        // setCdetails(response.data[0])
        if (response.data[0]?.lines === undefined) {
          // setCdetailsLines([])
          setCdetailsLines([])
        } else {
          // setCdetailsLines(response.data[0].lines.Group)
          recalldetail()
        }
        logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{
        [module_name + "_num"]: cdetails[module_name + "_num"],
        "custom": custom,
        "source": "none",
        "status": "1",
        "lines": data2
      }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
        // window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        // alert("Something Went Wrong")
        logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{
        [module_name + "_num"]: cdetails[module_name + "_num"],
        "custom": custom,
        "source": "none",
        "status": "1",
        "lines": data2
      }, 'response':[], 'error_details': error, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })

  }


  const handleDrag = (kum, gan) => {
    if (module_name === "opportunity") {
      setDragId({ id: kum.opportunitylineid, gr: gan });
    }
    if (module_name === "invoice") {
      setDragId({ id: kum.invoicelineid, gr: gan });
    }
    if (module_name === "supplierorder") {
      setDragId({ id: kum.supplierorderlineid, gr: gan });
    }
    if (module_name === "supplierorderreturn" || module_name == "supplierorderreceipt") {
      setDragId({ id: kum.supplierorderreturnlineid, gr: gan });
    }
  };

  const handleDrop = (kum, gan) => {
    let forthis = ""
    if (module_name === "opportunity") {
      forthis = "opportunitie"
    } else {
      forthis = module_name
    }

    if (module_name === "opportunity") {
      var lineName = "opportunitylineid"
    }
    if (module_name === "invoice") {
      var lineName = "invoicelineid"
    }
    if (module_name === "supplierorder") {
      var lineName = "supplierorderlineid"
    }
    if (module_name === "supplierorderreturn" || module_name == "supplierorderreceipt") {
      var lineName = "supplierorderreturnlineid"
    }
    const dragBox = cdetailsLines[dragId.gr].find((box) => box[lineName] === dragId.id);
    const dropBox = cdetailsLines[gan].find((box) => box[lineName] === kum[lineName]);

    const dragBoxOrder = dragBox.line_order;
    const dropBoxOrder = dropBox.line_order;
    const cdetailsLines2 = cdetailsLines
    const newBoxState = cdetailsLines2[gan].map((box) => {
      if (box[lineName] === dragId.id) {
        box.line_order = dropBoxOrder;
      }
      if (box[lineName] === kum[lineName]) {
        box.line_order = dragBoxOrder;
      }
      return (box);
    });

    setCdetailsLines({ ...cdetailsLines, [gan]: newBoxState })
    // cdetailsLines[gan] = newBoxState
    setDragId({ id: "", gr: "" })

    let newdgitem = []
    Object.keys(cdetailsLines).map((dg) => (
      newdgitem = [],
      cdetailsLines[dg].map((dgitem) => (
        [
          dg === "nogrp" ?
            data2.linegroup.nogrp.push(
              ((dgitem["vat_code"] = (dgitem["vat_codeid"] || dgitem["vat_code"])), (dgitem["discount_type"] = (dgitem["discount_typeid"] || dgitem["discount_type"])), delete dgitem["group_name"], delete dgitem[module_name + "_id"], delete dgitem["ownerid"],
                delete dgitem["vat_codeid"], delete dgitem["group_nameid"], delete dgitem["discount_typeid"], delete dgitem["line_group_id"],
                delete dgitem["createdby"], delete dgitem["createtime"], delete dgitem["id"], delete dgitem["deleted"], delete dgitem["linegroupid"], delete dgitem["modifiedtime"], delete dgitem["moduleid"], delete dgitem["recordid"], delete dgitem["status"], dgitem)
            )
            :
            [newdgitem.push(
              ((dgitem["vat_code"] = (dgitem["vat_codeid"] || dgitem["vat_code"])), (dgitem["discount_type"] = (dgitem["discount_typeid"] || dgitem["discount_type"])), delete dgitem["group_name"], delete dgitem[module_name + "_id"], delete dgitem["ownerid"],
                delete dgitem["vat_codeid"], delete dgitem["group_nameid"], delete dgitem["discount_typeid"], delete dgitem["line_group_id"],
                delete dgitem["createdby"], delete dgitem["createtime"], delete dgitem["id"], delete dgitem["deleted"], delete dgitem["linegroupid"], delete dgitem["modifiedtime"], delete dgitem["moduleid"], delete dgitem["recordid"], delete dgitem["status"], dgitem)
            ),
            data2.linegroup = {
              [dg]: newdgitem, ...data2.linegroup
            }
            ]
        ]
      ))
    ))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    axios.put("/"+tenantCname+"/api/" + forthis + "s/" + c_id,
    {
      [module_name + "_num"]: cdetails[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "lines": data2
    },

    {
      headers: headers
    })
    .then((res) => {
      // setCdetails(res.data[0])
      setCdetailsLines(res.data[0]?.lines.Group)
      // window.location.reload()
      logData = [{...viewData, 'module_name': module_name, 'api': `/${forthis}s`, 'payload':{
        [module_name + "_num"]: cdetails[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "lines": data2
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
      "custom": custom,
      "source": "none",
      "status": "1",
      "lines": data2
      }, 'response':[], 'error_details': error, 'status_code':'' }];
      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
        recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
      }
    })

  };

  useEffect(() => {
    setHovered(true)
  }, [id])

  return (
    <>{
      Object.keys(blocke).map((k, index) => (

        [((k !== "Invoice_Information") && (k !== "Summary_Quote") && (k !== "Supplier_Order_Information") && (k !== "Order_Information")) ? null :
          <div className="detail_div1 detail_div1_with_tab">
            <ul className="nav nav-pills opportunityTab" id="pills-tab" role="tablist">
              {(k === "Summary_Quote") ?
                <li className="nav-item" onClick={() => setHovered(false)} role="presentation">
                  <button className={hovered === false ? "nav-link active" : "nav-link"} id="pills-SummaryQ-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-SummaryQ" type="button" role="tab" aria-controls="pills-SummaryQ"
                    aria-selected="true">{module_name === "invoice" ? "Summary Invoice" : module_name === "supplierorder" ? "Summary Supplier Order" : module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ? "Summary Supplier Order Return" : "Summary Quote"}</button>
                </li>
                : null}
              <li className="nav-item" onClick={() => setHovered(true)} role="presentation">
                <button className={hovered === true ? "nav-link active" : "nav-link "} id="pills-DetailedQ-tab" data-bs-toggle="pill"
                  data-bs-target="#pills-DetailedQ" type="button" role="tab" aria-controls="pills-DetailedQ"
                  aria-selected="false">{module_name === "invoice" ? "Invoice Details" : module_name === "supplierorder" ? "Supplier Order Details" : module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ? "Supplier Order Return Details" : "Detailed Quote"}</button>
              </li>
            </ul>
          </div>,
        ((k !== "Invoice_Information") && (k !== "Summary_Quote") && (k !== "Supplier_Order_Information") && (k !== "Order_Information")) ? null : hovered === false ?
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-SummaryQ" role="tabpanel" aria-labelledby="pills-SummaryQ-tab">
              <div className="detail_div2 detail_div2_with_tab">
                {
                  blocke[k].map((acc, i) => (
                    acc.show_hide_criteria == 1 ?
                      [
                        <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                          { }
                        </div>,
                        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12 summary_value">
                          {acc.uitype !== 6 ?
                            acc.uitype !== 5 ?
                              <div className="value">{cdetails["quote_summary"] && parse(cdetails["quote_summary"] == "0" ? " " : cdetails["quote_summary"])}</div> : null : null
                          }

                        </div>
                      ]
                      : null
                  ))
                }
              </div>
            </div>
          </div> :
          <div className="tab-pane" id="pills-DetailedQ" role="tabpanel" aria-labelledby="pills-DetailedQ-tab">
            <div className="detail_div2 detail_div2_with_tab2">
              <div className="table forWidthOnly customer_table tableWrap opportunity_table quote_table">
                {<table role="table">
                  <thead>
                    <tr>
                      <th>
                        {/* .<div className="filter oppo"></div> */}
                      </th>
                      {Object.keys(linee || []).map((k, index) => (
                        linee[k].map((acc, i) => (
                          ((acc.show_hide_criteria == 1) && (acc.listview === 1)) ?
                            [
                              <th colSpan="1" role="columnheader" key={k}>
                                {acc.fieldlabel.replace('&pound;', '£') + ' '}{acc.mandatory == 1 ? <span className="mandatoryAstric">*</span> : null}
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
                  <tbody>
                    {Object.keys(cdetailsLines || {}).map((gAndng) => (
                      [module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ?
                        gAndng !== "nogrp" ? <tr role="row" className="groupRow" key={gAndng}><td></td><td>{gAndng}</td>
                          <td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr> : null
                        : gAndng !== "nogrp" ? <tr role="row" className="groupRow" key={gAndng}><td></td><td>{gAndng}</td>
                          <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr> : null,
                      (cdetailsLines[gAndng] || []).sort((a, b) => a.line_order - b.line_order).map((kum) => (
                        editon && editline === kum[module_name + "lineid"] ?
                          <tr role="row" className="check_row updt" key={kum[module_name + "lineid"]}>
                            <td></td>
                            {Object.keys(linee).map((k, index) => (
                              [linee[k].map((acc, i) => (
                                ((acc.show_hide_criteria == 1) && (acc.listview === 1)) ?
                                  [
                                    <td role="cell" data-title={acc.fieldlabel} key={index}>
                                      {
                                        acc.fieldname !== "line_total" ? acc.fieldname == [module_name + "_product"] ?
                                          <div className="td_edit_product">
                                            <span className="search_form_field">
                                              <input type="text"
                                                name={acc.fieldname}
                                                defaultValue={lineupdate[acc.fieldname]}
                                                //    onClick={searchline} 
                                                //readOnly
                                                onChange={(event) => changeHandleLineUpdate(event.target)} placeholder={"product"}>
                                              </input>
                                            </span>
                                            <span className="comment_input">
                                              <textarea type="text"
                                                name={"line_comment"}
                                                defaultValue={lineupdate["line_comment"]}
                                                onChange={(event) => changeHandleLineUpdate(event.target)} placeholder={"description"}>
                                              </textarea>
                                            </span>
                                          </div> :
                                          module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ?
                                            ([acc.fieldname !== "sales_price" && acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                              <CurrencyInput name={acc.fieldname} onValueChange={(value, name) => changeHandleLineUpdate({ value, name })} value={lineupdate[acc.fieldname] || ""}
                                                thousandSeparator={false} decimalScale="2" fixedDecimalScale={true} /> : null,

                                            acc.fieldname === "discount" ?
                                              [<input type="text"
                                                name={acc.fieldname}
                                                defaultValue={lineupdate[acc.fieldname] || " "}
                                                onChange={(event) => changeHandleLineUpdate(event.target)} placeholder={"£ / %"}>
                                              </input>,
                                              linee[k].map((acc, v) => (
                                                ((acc.listview === 0) && (acc.fieldname === "discount_type")) ?
                                                  <div className="discount_cell" key={v}>
                                                    <select name={acc.fieldname}
                                                      defaultValue={lineupdate[acc.fieldname]}
                                                      onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                      <option hidden>{lineupdate[acc.fieldname].replace('Amount', 'GBP')}</option>
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
                                                onChange={(event) => changeHandleLineUpdate(event.target)}>
                                              </input> : null,

                                            acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                              <div>
                                                <select name={acc.fieldname}
                                                  defaultValue={lineupdate[acc.fieldname]}
                                                  onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                  <option hidden>{lineupdate[acc.fieldname]}</option>
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
                                                  onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                  <option hidden>{lineupdate[acc.fieldname]}</option>
                                                  {
                                                    acc.options.map((opt) => (
                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                    ))
                                                  }
                                                </select>
                                              </div> : null
                                            ]) :
                                            [acc.uitype !== 2 && acc.fieldname !== "qty" && acc.fieldname !== "discount" && acc.fieldname !== "discount_type" ?
                                              <CurrencyInput name={acc.fieldname} onValueChange={(value, name) => changeHandleLineUpdate({ value, name })} value={lineupdate[acc.fieldname] || ""}
                                                thousandSeparator={false} decimalScale="2" fixedDecimalScale={true} /> : null,

                                            acc.fieldname === "discount" ?
                                              [<input type="text"
                                                name={acc.fieldname}
                                                defaultValue={lineupdate[acc.fieldname] || " "}
                                                onChange={(event) => changeHandleLineUpdate(event.target)} placeholder={"£ / %"}>
                                              </input>,
                                              linee[k].map((acc, v) => (
                                                ((acc.listview === 0) && (acc.fieldname === "discount_type")) ?
                                                  <div className="discount_cell" key={v}>
                                                    <select name={acc.fieldname}
                                                      defaultValue={lineupdate[acc.fieldname]}
                                                      onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                      <option hidden>{lineupdate[acc.fieldname] === 'Amount' ? lineupdate[acc.fieldname].replace('Amount', 'GBP') : "%"}</option> ||
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
                                                onChange={(event) => changeHandleLineUpdate(event.target)}>
                                              </input> : null,

                                            acc.uitype === 2 && acc.fieldname !== "discount_type" ?
                                              <div>
                                                <select name={acc.fieldname}
                                                  defaultValue={lineupdate[acc.fieldname]}
                                                  onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                  <option hidden>{lineupdate[acc.fieldname]}</option>
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
                                                  onChange={(event) => changeHandleLineUpdate(event.target)} >
                                                  <option hidden>{lineupdate[acc.fieldname]}</option>
                                                  {
                                                    acc.options.map((opt) => (
                                                      <option key={opt.picklistvalue} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                    ))
                                                  }
                                                </select>
                                              </div> : null
                                            ] :

                                          [Number(lineupdate.line_total).toFixed(2).replace("NaN", "00.00")]
                                      }
                                    </td>
                                  ] : null
                              )), <td><button onClick={() => lineArrayItemUpdated(kum, gAndng)} type="button" className="search_button">Save</button>
                                <button onClick={() => setEditon(false)} type="button" className="reset_button addmargin dview"><i><GrClose /></i></button></td>]
                            ))
                            }
                          </tr> :
                          <tr
                            draggable={true}
                            onDragOver={(ev) => ev.preventDefault()}
                            onDragStart={() => handleDrag(kum, gAndng)}
                            onDrop={() => handleDrop(kum, gAndng)} key={gAndng + kum[module_name + "lineid"]}>
                            <td></td>
                            {
                              Object.keys(linee).map((k) => (
                                linee[k].map((acc) => (
                                  acc.fieldname == [module_name + "_product"] ?
                                    <td role="cell" data-title="Product/Service:" key={"pc"}>
                                      <div className="proService">
                                        <span>{kum[acc.fieldname] === "Adhod0" ? "" : kum[acc.fieldname]}</span>
                                        <p>{kum["line_comment"]}</p>
                                      </div>
                                    </td>
                                    : module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ? (acc.fieldname !== "sales_price" && acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_comment" && acc.fieldname !== "discount_type" ?
                                      <td role="cell" data-title={acc.fieldlabel} key={kum.lineid}>
                                        {acc.fieldname === 'discount' ?
                                          ((kum[acc.fieldname]) + ' ' + (kum["discount_type"] || '').replace('Amount', 'GBP')) :
                                          acc.fieldname === 'qty' ? (kum[acc.fieldname]) : acc.fieldname === "vat_code" ? (kum[acc.fieldname]) + " %" : Number(kum[acc.fieldname]).toFixed(2).replace("NaN", "00.00")
                                        }
                                      </td> : null)
                                      : (acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_comment" && acc.fieldname !== "discount_type" ?
                                        <td role="cell" data-title={acc.fieldlabel} key={kum.lineid}>
                                          {acc.fieldname === 'discount' ?
                                            ((kum[acc.fieldname]) + ' ' + (kum["discount_type"] || '').replace('Amount', 'GBP')) :
                                            acc.fieldname === 'qty' ? (kum[acc.fieldname]) : acc.fieldname === "vat_code" ? (kum[acc.fieldname]) + " %" : Number(kum[acc.fieldname]).toFixed(2).replace("NaN", "00.00")
                                          }
                                        </td> : null)

                                ))
                              ))
                            }

                            <td role="cell" className="icon_opportunity_mobile" key={kum.product_id}>
                              <div className="act_icons">
                                <a onClick={() => lineedit(kum)} data-tooltip="Edit" className="tool lineEdit" style={{ fontSize: "large", marginBottom: "5px" }} ><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></a>

                                <i onClick={() => linedelete(kum, gAndng)} data-tooltip="Delete" className='tool delete_icon' role="button" data-bs-toggle="modal" data-bs-target="#deleteModal"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></i>
                                <i className="drag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none"><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 15.6615)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 15.6625)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 6.11223)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 6.11271)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 1.33732)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 1.33732)" fill="#ACACAC" className="fillBlue" /></svg>
                                </i>
                              </div>
                              <div className="mobile_visible_icons">
                                <i className="drag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="none"><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 15.6615)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 15.6625)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 10.8871)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 6.11223)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 6.11271)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 1.75521 1.33732)" fill="#ACACAC" className="fillBlue" /><ellipse rx="1.75521" ry="1.33699" transform="matrix(1 0 0 -1 7.01693 1.33732)" fill="#ACACAC" className="fillBlue" /></svg>
                                </i>
                                <div className="mobile_visible_bgrmv dropdown">
                                  <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd"></path></svg></i>}>
                                    <Dropdown.Item className="dropdown-item" role="button" onClick={() => lineedit(kum)}><i><MdModeEdit /></i> Edit Item</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" role="button" onClick={() => linedelete(kum, gAndng)}><i className="del_icons"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></i> Delete Item</Dropdown.Item>
                                  </DropdownButton>
                                </div>
                              </div>
                            </td>
                          </tr>
                      ))
                      ]))
                    }
                    
                    {module_name === "supplierorder" || module_name === "supplierorderreturn" || module_name == "supplierorderreceipt" ?
                      <tr className="Gtotal_row total_row total_row_desk grand_total">
                        <td></td>
                        <td></td> <td></td>
                        <td className="td_total_title2">
                          <div className="total_wrap">
                            <div className='total_row1'>
                              <p><span className="span_title1">Total Price <i className='tooltip3' data-tooltip='Total sales price before discount'><VscInfo /></i> </span>
                                <span className='td_total'>
                                  {paisa.map((p) => (
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
                                  ))}
                                  {(grand).toFixed(2).replace("NaN", "00.00")}
                                </span>
                              </p>
                            </div>
                          </div>
                        
                        </td>
                        <td></td>
                      </tr> : <tr className="Gtotal_row total_row total_row_desk grand_total">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="td_total_title2">
                          <div className="total_wrap">
                            <div className='total_row1'>
                              <p><span className="span_title1">Total Price <i className='tooltip3' data-tooltip='Total sales price before discount'><VscInfo /></i> </span>
                                <span className='td_total'>
                                  {paisa.map((p) => (
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
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
                                    cdetails.currencyid === p.currency_id ? p.symbol : null
                                  ))}
                                  {Tmargin.toFixed(2).replace("NaN", "00.00") + ' '}
                                  ({Number(Tmarginper || "0").toFixed(2) / (Number(Tmarginper || "0")) === 1 ? Number(Tmarginper || "0") : Number(Tmarginper || "0").toFixed(2)}%)
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td></td>
                      </tr>}
                  </tbody>
                </table>}
              </div>
            </div>
          </div>
        ]
      ))

    }

      {/* Modal for line item delete xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      <Modal show={smShow2} onHide={() => setSmShow2(false)} className="modal_delete fade small_modal modal">
        <Modal.Header closeButton>
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
      </Modal>
    </>
  );
}
export default LineOrder;