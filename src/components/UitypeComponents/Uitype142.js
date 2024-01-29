import { useState,useContext } from "react";
import Form from 'react-bootstrap/Form'
import { blocke_value } from "../../pages/CreateModulePage";
import { searchTableModuleValue } from "../../navigation/PageRoutes";
import SearchIconModal from "../SearchIconModal";


const Uitype142 = ({iElement,onChangeHandler,setRowValues,acc,checkGroup,groupId,ind,rowValues,adcs}) => {
    const {setShow2, setWarehouse_multiple_record} = useContext(blocke_value)
    const {setSearchTableModule} = useContext(searchTableModuleValue)
    
    const [sel,setSel] = useState('')

    return (
        <div className="wclass wclass2" style={{ display: "flex", marginTop: "9px" }}>
        <div className="search_form_field" >
            <Form.Control as="select" onChange={(e) => {
                iElement.warehouse_multiple_module = e.target.value;
                setSel(e.target.value)
                // let s = allData;
                // s[ind + 1][acc.fieldname] = e.target.value
                // setAllData(s)
            }}
                size="sm" className="choose_select"
                value={iElement.warehouse_multiple_module}>
                <option>Select</option>
                {
                            acc.relatedto&&acc.relatedto.map((ye, i) => (
                                <option className="option" key={i} value={ye}>
                                    {ye === "warehouse" ? "Warehouses" : ye === "venue" ? "Venues" : ye === "opportunity" ? "Opportunities" : ye}


                                </option>
                            ))
                }

            </Form.Control>
        </div>
        <span className="search_form_field search_form_field25" style={{ width: "103px" }}>
        <input
            name={acc.fieldname}
            onChange={(e)=>onChangeHandler(e,iElement)}
            value={iElement.warehouse_multiple_record}
            placeholder="">
        </input>
        <span className={"c-search-icon-142"} onClick={(e) => (iElement.warehouse_multiple_module == "" ? setShow2(true) : [setSearchTableModule(iElement && iElement.warehouse_multiple_module ? iElement.warehouse_multiple_module ? iElement.warehouse_multiple_module == "event" ? ("opportunity") : iElement.warehouse_multiple_module : iElement.warehouse_multiple_module : null),
        setRowValues({ 'checkGroup': checkGroup, 'groupId': groupId, 'ind': ind })])}><SearchIconModal rowValues={rowValues} stmodal={sel} sicn={true}/></span>
    </span>
    </div>
    )
}

export default Uitype142;