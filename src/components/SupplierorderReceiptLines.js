import { useContext,useState,createContext, useEffect} from "react";
import { blocke_value } from "../pages/CreateModulePage";
import { CheckModuleName } from "../utils/CheckModuleName";
import { VscInfo } from "react-icons/vsc";
import { GrAdd, GrClose } from "react-icons/gr"
import Form from 'react-bootstrap/Form'
import { Datepicker } from "@mobiscroll/react";
import Moment from 'moment';
import { AuthContext } from "../config/Authentications/AuthContext";
import { Modal, Button } from "react-bootstrap"
import { groupCheck, linee_value, opCreatePageData, r_value, searchTableModuleValue } from "../navigation/PageRoutes";
import SearchIconModal from "./SearchIconModal";
import { VscCalendar } from "react-icons/vsc";
import { getRelatedModuleApiData } from "../service/useApiData";
import { dblocke_value } from "../pages/DetailedView";
import Uitype142 from "./UitypeComponents/Uitype142";

const SupplierorderReceiptLines = ({s})=>{
    const { authState } = useContext(AuthContext)
    const tenantCname = authState.tenant_cname;
    let { line, setLine } = useContext(linee_value)
    const { add, setAdd } = useContext(opCreatePageData)
    let { product_Table, setProduct_Table} = useContext(r_value)
    const {groupName,linee, setShow2, setWarehouse_multiple_record,apiPathData} = useContext(s ? dblocke_value : blocke_value)
    let {blocke} = useContext(s ? dblocke_value : r_value)
    const module_name = CheckModuleName()
    const {setSupplierOrder_num} = useContext(groupCheck)
    const [show9, setShow9] = useState(false);
    const handleClose9 = () => setShow9(false);
    const [hovered, setHovered] = useState(false)
    const [show10, setShow10] = useState(false);
    const handleClose10 = () => setShow10(false);
    const [warehouse, setWarehouse] = useState("")
    const {searchTableModule, setSearchTableModule} = useContext(searchTableModuleValue)
    const [editon, setEditon] = useState(false)
    const [isreadonly, setIsreadonly] = useState(false)
    const [rowValues, setRowValues] = useState({ 'checkGroup': '', 'groupId': '', 'ind': '' })
    const [editline, setEditline] = useState("")
    let selectedFlatRows = authState.selectedFlatRows
    let selectedFlatRowsmy = selectedFlatRows&&JSON.parse(selectedFlatRows)

    if(apiPathData.length){
        setProduct_Table(apiPathData)
    }

    if(!blocke){
        blocke = {}
    }
    
    
  const changeHandleCount = (e, a, b, checkGroup, groupId) => {
    const name = e.target.name;
    let value = e.target.value
    let countsub = 0
    a.forEach(r => {
      countsub = countsub + Number(r.qty_received)
    })
    let result = Number(b) - countsub
    Math.sign(result) == -1 && Math.sign(result) != 0 ? setShow10(true) : (product_Table[0].lines.Group[checkGroup][groupId].pending_qty = result
    )

    return result
  }

  const changeHandleLine = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setLine({
      ...line, [name]: value,

    })
  }


  const handleShow7 = (pId, checkGroup) => {
    let pInd = product_Table[0].lines.Group[checkGroup].findIndex(d => d.supplierorderlineid === pId)
    let inpArr = []
    let data = product_Table[0].lines.Group[checkGroup][pInd]
    if (product_Table[0].lines.Group[checkGroup][pInd].inputRowArr) 
    {
      inpArr = product_Table[0].lines.Group[checkGroup][pInd].inputRowArr;
      
      inpArr.push({
        batch_or_serial: "",
        ordered_qty:data.qty, 
        product_id:data.product_id,
        line_order:data.line_order,
        pending_qty: '',  
        supplierorder_product:data.supplierorder_product, 
        warehouse_multiple_module: '',
        qty_received: "",
        warehouse_multiple_record: '',
        batch_expiry:'',
        product_repeat:1
      })
   }
    else { 
      inpArr.push({
        batch_or_serial: "",
        ordered_qty:data.qty, 
        product_id:data.product_id,
        line_order:data.line_order,
        pending_qty: '',  
        supplierorder_product:data.supplierorder_product, 
        warehouse_multiple_module: '',
        qty_received: "",
        warehouse_multiple_record: '',
        batch_expiry:'',
        product_repeat: 1})
    }
    product_Table[0].lines.Group[checkGroup][pInd].inputRowArr = inpArr
    setProduct_Table(a => [...a, inpArr])
  }

  const removeline = (inputR, ind, checkGroup, indline, groupId) => {
    product_Table[0].lines.Group[checkGroup][groupId].inputRowArr.splice(ind, 1)
    setProduct_Table(re => [...re])

  }

  const onChangeHandler = (e,iElement) => {
    iElement.warehouse_multiple_record = e.target.value
    setWarehouse(e.target.value)
}

    const productRows = (m, checkGroup, indline, groupId, rec) => {
        return  product_Table && groupName.length <=0? <tr key={"z2"} draggable={true}
          onDragOver={(ev) => ev.preventDefault()}
          >
          <td></td>

            {Object.keys(linee).map((k) => (
                linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                    acc.fieldname == ["supplierorderreceipt_product"] ?
                        [<td role="cell" data-title="Product/Service:">
                            <div className="proService">
                                <span>
                                    {m[acc.fieldname] === "Adhod0" ? "" : m[acc.fieldname] ? m[acc.fieldname] : m["supplierorder_product"]}</span>
                                <p>{m["line_comment"]}</p>
                            </div>
                        </td>]
                    :
                        acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_total" && acc.fieldname !== "deleted"
                            && acc.fieldname !== "bid" && acc.fieldname != [module_name + "_id"] && acc.fieldname != [module_name + "lineid"] && acc.fieldname !== "line_comment" && acc.fieldname != [module_name + "line_id"] && acc.fieldname !== "ownerid" ?

                            [acc.fieldname !== "qty_received" && acc.fieldname !== "ordered_qty" && acc.fieldname !== "warehouse_multiple_record" && acc.fieldname !== "batch_expiry" && acc.fieldname !== "pending_qty" && acc.fieldname !== "warehouse_multiple_module" ?

                                <td role="cell">
                                    {acc.fieldname == "batch_or_serial" ? (m[acc.fieldname]) : Number(m[acc.fieldname])
                                    }
                                    {returnCols(acc, m.inputRowArr, m, checkGroup, indline, groupId)}
                                </td>
                                : null,


                                acc.fieldname === "ordered_qty" ?
                                    <td role="cell" data-title={acc.fieldlabel}>
                                        {
                                            m.qty || m.ordered_qty
                                        }
                                    </td> : null,

                                acc.fieldname === "pending_qty" ?
                                    <td role="cell" data-title={acc.fieldlabel}>

                                        {product_Table[0].lines.Group[checkGroup][groupId].pending_qty == undefined ? m.qty : product_Table[0].lines.Group[checkGroup][groupId].pending_qty}

                                    </td> : null,

                                acc.fieldname === "qty_received" ?
                                    <td role="cell" data-title={acc.fieldlabel} >
                                        {[m.qty_received || returnCols(acc, m.inputRowArr, m, checkGroup, indline, groupId) || 0]}
                                    </td> : null,

                                acc.fieldname === "warehouse_multiple_record" ? <>
                                    <td role="cell" data-title={acc.fieldlabel}>
                                       {(m.warehouse_multiple_record && (m.warehouse_multiple_module +" "+ m.warehouse_multiple_record)) ||
                                        ((rec["deliverylocation_multiple_module"], rec["deliverylocation_multiple_record"]) ? (rec["deliverylocation_multiple_module"], rec["deliverylocation_multiple_record"]) : "-")}
                                        {returnCols(acc, m.inputRowArr, m, checkGroup, indline, groupId)}
                                    </td>
                                </> : null,

                                acc.fieldname === "batch_expiry" ?
                                    <td role="cell" data-title={acc.fieldlabel}>
                                        {m.batch_expiry}
                                        {/* {Moment(add[acc.fieldname]).format("DD-MM-YYYY")} */}
                                        {returnCols(acc, m.inputRowArr, m, checkGroup, indline, groupId)}
                                    </td>
                                    : null]
                            : groupName ? <tr></tr> : null
                ))
            ))
            }

            <td role="cell" className="icon_opportunity_mobile">
                {!s &&
                <div className="act_icons act_icons2">
                    <button onClick={() => { product_Table[0].lines.Group[checkGroup][groupId].pending_qty <= 0 ? setShow9(true) : handleShow7(m.supplierorderlineid, checkGroup) }} className="btn_cancel reset_button addmargin" type="button"><GrAdd /></button>
                </div>}
                <div>
                    {/* using map for created inputfields........... */}
                    {m.inputRowArr &&
                        m.inputRowArr.map((inputR, ind) => {
                            return <div>
                                <button onClick={(e) => { removeline(inputR, ind, checkGroup, indline, groupId); changeHandleCount(e, product_Table[0].lines.Group[checkGroup][groupId].inputRowArr, m.qty, checkGroup, groupId) }} className="btn_cancel closeBtn addmargin" type="button"><GrClose /></button>
                            </div>
                        })}
                </div>
            </td>
        </tr>
            : ''

    }
    
    //  for create input fields...........
    const returnCols = (acc, inputR, m, checkGroup, indline, groupId) => {
        return inputR !== undefined && inputR !== 'undefined' && inputR && inputR.length > 0 && acc.fieldname != "ordered_qty" && acc.fieldname != "pending_qty" ?
            [
                inputR.map((iElement, ind) => {
                    return <div className="editline">
                        <div className='check_row'> {
                            acc.fieldname == "warehouse_multiple_record" ?
                                [<Uitype142 acc={acc} checkGroup={checkGroup} groupId={groupId} ind={ind} rowValues={rowValues} iElement={iElement} onChangeHandler={onChangeHandler} setShow2={setShow2} setSearchTableModule={setSearchTableModule} adcs={s} setRowValues={setRowValues}/>] :
                                acc.fieldname === "batch_expiry" ?
                                    [
                                        <div className="datepicker datepicker2">
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12" style={{ width: "68%", marginTop: "0", marginBottom: "10px", height: "44px", resize: "none" }}>
                                                {
                                                    <div className='editline25'>
                                                        <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
                                                            <Datepicker className="form-control  datetimepicker-input"
                                                                controls={['calendar']}
                                                                display='anchored'
                                                                inputComponent="input"
                                                                inputProps={{ className: "form-control  datetimepicker-input" }}
                                                                name={acc.fieldname}
                                                                onChange={(inst) => {
                                                                    iElement.batch_expiry = Moment(inst.value).format("YYYY-MM-DD")
                                                                    setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD") })
                                                                }}
                                                                value={iElement.batch_expiry}
                                                                dateFormat="DD/MM/YYYY"
                                                                defaultValue={''} />
                                                            <div className="input-group-text" data-toggle="datetimepicker" data-target="#datetimepicker3" >
                                                                <VscCalendar />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    ] :
                                    acc.fieldname === "qty_received" ?
                                        <div>
                                            <span className="search_form_field">
                                                <input type="text"
                                                    name={acc.fieldname}
                                                    onChange={(e) => {
                                                        changeHandleLine(e)
                                                        product_Table[0].lines.Group[checkGroup][groupId].inputRowArr[ind].qty_received = e.target.value;
                                                        changeHandleCount(e, product_Table[0].lines.Group[checkGroup][groupId].inputRowArr, m.qty || m.pending_qty, checkGroup, groupId);
                                                    }}
                                                    value={iElement.qty_received}
                                                >
                                                </input>
                                            </span>
                                        </div>
                                        :
                                        acc.fieldname === "batch_or_serial" ?
                                            <div className='editline25'>
                                                <span className="search_form_field">
                                                    <input type="text"
                                                        name={acc.fieldname}
                                                        onChange={(e) => {
                                                            changeHandleLine(e)
                                                            product_Table[0].lines.Group[checkGroup][groupId].inputRowArr[ind].batch_or_serial = e.target.value;
                                                        }}
                                                        value={iElement.batch_or_serial}
                                                    >
                                                    </input>
                                                </span>
                                            </div>
                                            :
                                            null
                        }

                        </div>

                    </div>

                })
            ]
            : null


    }
 useEffect(()=>{
    
    if(!s){
    (async () => {
        let forChange = localStorage.getItem("prev_module_name2")
        const data = await getRelatedModuleApiData(tenantCname, forChange, authState)
        if (data) {
          console.log(data,"reponse1")
          setProduct_Table(data)
          setSupplierOrder_num(data[0].supplierorder_num)
        } 
  
      })()  
    }
},[])

    

    return (
        <>  {         
           !(Array.isArray(product_Table[0]?.lines) && !product_Table[0].lines.length) && Object.keys(blocke).map((k, index) => (
                    
                        <div key={index} className="col-12 opportunityBox1">
                        
                            <div className="detail_div1 detail_div1_with_tab">
                                <ul className="nav nav-pills opportunityTab" id="pills-tab" role="tablist">

                                    <li className="nav-item" role="presentation" >
                                        <button onClick={() => setHovered(true)} role="presentation" disabled={selectedFlatRowsmy && selectedFlatRowsmy.length >= 1 ? true : false}
                                            className={hovered === true ? "nav-link active" : "nav-link"} id="pills-DetailedQ-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-DetailedQ" type="button" aria-controls="pills-DetailedQ"
                                            aria-selected="false">Detailed Receipts</button>
                                    </li>
                                </ul>
                            </div>
                            {
                                <div key={k} className="tab-pane" id="pills-DetailedQ" role="tabpanel" aria-labelledby="pills-DetailedQ-tab">
                                    <div className="detail_div2 detail_div2_with_tab2">
                                        <div className="table forWidthOnly customer_table tableWrap opportunity_table quote_table">
                                            <table role="table" className="linetable">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="1" role="columnheader">
                                                        </th>
                                                        {Object.keys(linee).map((k, index) => (
                                                            linee[k].sort((a, b) => a.sequence - b.sequence).map((acc, i) => (
                                                                ((acc.show_hide_criteria == 1) && (acc.listview == 1)) ?
                                                                    
                                                                        <th colSpan="1" role="columnheader" key={i}>
                                                                            {acc.fieldlabel.replace('&pound;', '£') + ' '}
                                                                            {acc.help_description === '' ? null : <span className='tooltip2' data-tooltip={acc.help_description}><VscInfo /></span>}
                                                                            <div className="filter oppo">

                                                                            </div>
                                                                        </th>
                                                                     : null
                                                            ))
                                                        ))
                                                        }
                                                        <th colSpan="1" role="columnheader" className="text-center">
                                                            &nbsp;
                                                            <div className="filter oppo">
                                                            </div>
                                                        </th>
                                                    </tr>

                                                </thead>
                                                {/* start code for edit save codee */}
                                                <tbody role="rowgroup">
                                                    {
                                                        product_Table.map((m, i) => {
                                                            if (m.lines && m.lines.length > 0) {
                                                                m.lines.map((k, groupId) => {
                                                                    return productRows(k, '', i, groupId, m)

                                                                })
                                                            }
                                                            if (m.lines && m.lines.Group) {
                                                                return Object.keys(m.lines.Group).map(grpId => {
                                                                    return m.lines.Group[grpId].map((k, groupId) => {
                                                                        return productRows(k, grpId, i, groupId, m)

                                                                    })

                                                                })

                                                            }
                                                        })}
                                                    {groupName ?
                                                        Object.keys(groupName || {}).map((gAndng) => ([
                                                            gAndng !== "nogrp" ? <tr role="row" className="groupRow" key={gAndng}><td></td><td>{gAndng}</td>
                                                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr> : null,
                                                            (groupName[gAndng] || []).sort((a, b) => a.line_order - b.line_order).map((kum) => (
                                                                editon && editline === kum[module_name + "lineid"] ?
                                                                    <tr role="row" className="check_row updt" key={kum[module_name + "lineid"]}>
                                                                        {null}
                                                                    </tr> :
                                                                    <tr
                                                                        draggable={true}
                                                                        onDragOver={(ev) => ev.preventDefault()}
                                                                        key={gAndng + kum[module_name + "lineid"]}>
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
                                                                                        : <td></td>,
                                                                                    acc.fieldname !== "line_order" && acc.fieldname !== "product_id" && acc.fieldname !== "line_comment" && acc.fieldname != "warehouse_multiple_module" ?
                                                                                        <td role="cell" data-title={acc.fieldlabel} key={kum.lineid}>
                                                                                            {(acc.fieldlabel === "Batch Expiry") ? (kum[acc.fieldname] !== '' && Moment(kum[acc.fieldname]).format('DD/MM/YYYY')) : (kum[acc.fieldname])
                                                                                            }
                                                                                        </td> : null
                                                                                ))
                                                                            ))
                                                                        }


                                                                    </tr>
                                                            ))
                                                        ]))
                                                        : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                ))

            
                    

        }

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
        </>
    );
}
export default SupplierorderReceiptLines;