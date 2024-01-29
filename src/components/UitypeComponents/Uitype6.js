import { useContext,useState,useEffect } from "react"
import { groupCheck, opCreatePageData, r_value, searchTableModuleValue } from "../../navigation/PageRoutes"
import { CheckModuleName } from "../../utils/CheckModuleName"
import SearchIconModal from "../SearchIconModal"
import PlusIconModal from "../PlusIconModal"
import { CgClose } from "react-icons/cg";
import {Modal,Button} from 'react-bootstrap'

function Uitype6(props){
    let { uitype6_value, setuitype6_value,add_forName,setAdd_forName,related_record } = useContext(r_value)
    const { searchTableModule, setSearchTableModule } = useContext(searchTableModuleValue)
    const {setAdd,setCountry} = useContext(opCreatePageData)
    const {supplierorder_num} = useContext(groupCheck)
    const [moduleTable,setModuleTable] = useState("")
    const [show,setShow] = useState(false)
    const [prefill,setPrefill] = useState(null)
    const [listingMDN,setListingMDN] = useState("")
    let module_name = CheckModuleName()
    let acc = props.acc
    let add = props.add
    let relatedPopUp = props.relatedPopUp
    // let i = i.props
    
  // State to track the field value
  const [fieldValue, setFieldValue] = useState(
    supplierorder_num && props.supplierorder_num === supplierorder_num
        ? supplierorder_num
        : searchTableModule === "related_supplierorder"
        ? uitype6_value[`related_${searchTableModule}`]
        : uitype6_value && uitype6_value[`related_${acc.relatedto[0]}`] ||
          add_forName && add_forName[`related_${acc.relatedto[0]}`]
);

  // Function to update the field value when the related data changes
  useEffect(() => {
    setFieldValue(
        supplierorder_num && props.supplierorder_num === supplierorder_num
            ? supplierorder_num
            : searchTableModule === "related_supplierorder"
            ? uitype6_value[`related_${searchTableModule}`]
            : uitype6_value && uitype6_value[`related_${acc.relatedto[0]}`] ||
              add_forName && add_forName[`related_${acc.relatedto[0]}`]
    );
}, [supplierorder_num, searchTableModule, uitype6_value, acc.relatedto, add_forName]);

const handleCancel = () => {
    setShow(false)
}
const handleOk = () => {
    let prefill_module_name = relatedPopUp ? localStorage.getItem("relatedmodule") : module_name

    setAdd((add) => ({...add,
        [prefill_module_name === "invoice" ? "bill_to_address" : `${prefill_module_name}_address`]: prefill[listingMDN === "invoice" ? "bill_to_address" : `${listingMDN}_address`] || "",
        [`${prefill_module_name}_country`]: prefill[`${listingMDN}_country`] || "",
        [`${prefill_module_name}_countyid`]: prefill[`${listingMDN}_countyid`] || 0,
        [`${prefill_module_name}_countryid`]: prefill[`${listingMDN}_countryid`] || 0,
        [`${prefill_module_name}_county`]: prefill[`${listingMDN}_county`] || "",
        [`${prefill_module_name}_city`]: prefill[`${listingMDN}_city`] || "",
        [`${prefill_module_name}_post_code`]: prefill[`${listingMDN}_post_code`]|| "",
    }))
    setAdd_forName((add_forName) => ({...add_forName,
        [prefill_module_name === "invoice" ? "bill_to_address" : `${prefill_module_name}_address`]: prefill[listingMDN === "invoice" ? "bill_to_address" : `${listingMDN}_address`] || "",
        [`${prefill_module_name}_country`]: prefill[`${listingMDN}_country`] || "",
        [`${prefill_module_name}_countyid`]: prefill[`${listingMDN}_countyid`] || 0,
        [`${prefill_module_name}_countryid`]: prefill[`${listingMDN}_countryid`] || 0,
        [`${prefill_module_name}_county`]: prefill[`${listingMDN}_county`] || "",
        [`${prefill_module_name}_city`]: prefill[`${listingMDN}_city`] || "",
        [`${prefill_module_name}_post_code`]: prefill[`${listingMDN}_post_code`]|| "",
    }))

    setCountry(prefill[`${listingMDN}_countryid`] || 0)
    setShow(false)
}

const clearField = () => {
    setFieldValue("");   
    if (searchTableModule === "related_supplierorder") {
        setuitype6_value(prevState => ({
            ...prevState,
            [`related_${searchTableModule}`]: ""
        }));
    } else if (uitype6_value && uitype6_value[`related_${acc.relatedto[0]}`]) {
        setuitype6_value(prevState => ({
            ...prevState,
            [`related_${acc.relatedto[0]}`]: ""
        }));
    }
    setAdd(add => ({...add,[acc.fieldname]:''}))
};


    return <div className="col-lg-3 col-md-7 col-sm-7 col-12 plusfield">
    <div className="row">
        <div key={acc.fieldname} onClick={(e) => {setModuleTable("SearchIconModal")}}
            className={"col-xl-10 col-lg-9 col-md-10 col-sm-9 col-10 search_form_field relat-2"}>
            {/* <input type={acc.field_type}
                readOnly
                name={acc.fieldname}
                // value={row_value != undefined && typeof (row_value) != "string" ?  row_value[acc.fieldname] : add_forName[acc.fieldname]
                value={supplierorder_num && (props.supplierorder_num === supplierorder_num)? supplierorder_num : (searchTableModule === "related_supplierorder" ? uitype6_value[`related_${searchTableModule}`] : uitype6_value&&uitype6_value[`related_${acc.relatedto[0]}`] || add_forName&&add_forName[`related_${acc.relatedto[0]}`])
                }
                placeholder="">
            </input> */}
            <input   type={acc.field_type}  readOnly name={acc.fieldname} value={fieldValue} placeholder="" />
            {/* {fieldValue && (  <span onClick={clearField} style={{marginTop:"30px"}}> <CgClose />  </span>   )} */}
            <SearchIconModal setShow={setShow} setPrefill={setPrefill} setListingMDN={setListingMDN} isPrefill={acc?.clone_address}  searchTableModule={moduleTable === "SearchIconModal" ?  module_name == 'calendar' ? add.related_module : acc.relatedto[0] : undefined} uitype={acc.uitype} fieldname={acc.fieldname} relatedPopUp={relatedPopUp}/>
        </div>
        
            {
            <div  className="col-xl-2 col-lg-3 col-md-2 col-sm-3 col-2 text-endss relat-3 d-flex align-items-center justify-content-between" onClick={() => {setModuleTable("PlusIconModal");}}>
            {fieldValue ? <span className="plus" onClick={clearField} style={{marginTop:"0px"}}> <CgClose /></span> :
            <PlusIconModal  setShow={setShow} setPrefill={setPrefill} setListingMDN={setListingMDN} isPrefill={acc?.clone_address} searchTableModule={moduleTable === "PlusIconModal" ? acc.relatedto[0] || related_record : undefined} />}
            </div>
            }
            <Modal show={show} onHide={handleCancel} className="import_modal fade small_modal modal">
                <Modal.Header closeButton>
                    <Modal.Title>Please Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to copy address from related record?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="secondary reset_button" style={{ color: "#4e73df" }} onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="import_button" type="button" onClick={handleOk}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
                            

    </div>
</div>
}

export default Uitype6
