import React, { useContext, useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import "../assets/style/CustomerList.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Trans } from "react-i18next";
import { CgSearch } from "react-icons/cg";
import axios from "../config/Axios"
import { CheckModuleName } from "../utils/CheckModuleName";
import { AuthContext } from "../config/Authentications/AuthContext";
import { r_value, linee_value, searchTableModuleValue, opCreatePageData } from "../navigation/PageRoutes";
import { blocke_value } from "../pages/CreateModulePage";
import useGetReq from "../service/useGetReq";
import { LISTVIEWAPI } from "../service/ApiPath";
import useStorage from "../service/useStorage";
import { recordErrorAPIdata } from "../service/useApiData";


const SearchIconModal = (props) => {
    const [getData] = useGetReq()
    const storage = useStorage()
    let searchTableModule;
    const { authState, setAuthState } = useContext(AuthContext)
    const tenantCname = authState.tenant_cname
    const { row_value, setRow_value, product_Table, blocke, uitype6_value, setuitype6_value } = useContext(r_value)
    const { add, setAdd, addForMulti } = useContext(opCreatePageData)
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true)
    const { setSearchTableModule } = useContext(searchTableModuleValue)
    const handleClose1 = () => {setSearchTableModule(undefined);setShow1(false);}
    searchTableModule = props.searchTableModule || props.stmodal
    // useEffect(()=>{
    //     !show1 && setSearchTableModule(undefined)            
    // },[show1])
    useEffect(()=>{setSearchTableModule(searchTableModule)},[searchTableModule])

    const [search_mobile, setSearch_mobile] = useState('')
    const [warehouse, setWarehouse] = useState("")
    let rowValues = props.rowValues
    const [table_header, setTable_header] = useState([])
    const [supplierorder_num, setSupplierOrder_num] = useState("")
    const [table_d, setTable_d] = useState([])
    const [input_mobile, setInput_mobile] = useState('')
    const [isrest, setIsrest] = useState(false)
    let [reset, setReset] = useState(false)
    const [loading, setLoading] = useState(null)
    const { line, setLine } = useContext(linee_value)
    const fieldsName = props.fieldname
    const uitypes = props.uitype
    const [search_value, setSearch_value] = useState({
        customer_num: '',
        phone: "",
        email: "",
        customer_name: "",
        street_address: "",
        pobox: "",
        customer_city: "",
        customer_county: "",
        customer_country: "",
        post_code: "",
        assign_to: "",
        related_to: ''

    })
    let module_name = CheckModuleName()
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    let related_module = localStorage.getItem("relatedmodule")
if (module_name == undefined){
    module_name = related_module
}
    const handleChange = (e) => {
        setSearch_value(
            { [e.target.name]: e.target.value }
        )

        if (e.target.value.length >= 4) {
            axios.get("/" + tenantCname + "/api/" + searchTableModule, {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                params: {
                    "filter": e.target.name + "=" + e.target.value
                }
            }

            )
                .then(res => {
                    console.log(res)
                    setTable_d(res.data.data)
                    setIsrest(true)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": e.target.name + "=" + e.target.value}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": e.target.name + "=" + e.target.value}, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        } else if (e.target.value.length === 0) {
            set_again()
        }

    }
    let fieldName = ''
    let uiType = ''
    blocke && Object.keys(blocke).map((k) => {
        blocke[k].map((acc) => {
            fieldName = acc.fieldname
            uiType = acc.uitype
            if (uiType == 14) {
                addForMulti[fieldName] = 'test Steirn'
            }
        })
    })


    useEffect(() => {
        searchTableModule && getData(LISTVIEWAPI(tenantCname),(data)=>setTable_header(data.fields),(err)=>setLoading(err.message),{params: {"module": searchTableModule}},storage)
                
        if (module_name == "stockmovement" && searchTableModule == "opportunity") {
            let eq = '=';
            axios.get("/" + tenantCname + "/api/" + searchTableModule + "?company_id=" + authState.companyId + "&filter=related_venue=", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }
            )
                .then(res => {
                    setTable_d(res.data.data)
                    setReset(false)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"company_id": authState.companyId, "filter": "related_venue"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoading(err.message)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"company_id": authState.companyId, "filter": "related_venue"}, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        } else {
            searchTableModule && axios.get("/" + tenantCname + "/api/" + searchTableModule, {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                params: {
                    "order": [searchTableModule + "_name"] + ":" + "asc",
                    'ipp':100
                }
            }

            )
                .then(res => {
                    setTable_d(res?.data.data)
                    if(props?.isPrefill){
                         props.setListingMDN(res?.data?.listing_module_name)
                    }
                    // console.log(res?.data.data, "res.data")
                    setReset(false)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"order": [searchTableModule + "_name"] + ":" + "asc", 'ipp':100}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoading(err.message)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"order": [searchTableModule + "_name"] + ":" + "asc", 'ipp':100}, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }

    }, [reset, searchTableModule])

    const search_click = () => {
        axios.get("/" + tenantCname + "/api/" + searchTableModule, {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params: {
                "filter": JSON.stringify(search_value).replace(/[\{\}\"]/g, '').replace(/:/g, "=")
            }
        }

        )
            .then(res => {
                console.log(res)
                setTable_d(res.data.data)
                setIsrest(true)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": JSON.stringify(search_value).replace(/[\{\}\"]/g, '').replace(/:/g, "=")}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            .catch(err => {
                console.log(err)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": JSON.stringify(search_value).replace(/[\{\}\"]/g, '').replace(/:/g, "=")}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
        setReset(false)
    }

    const set_again = () => {
        setReset(true)
        setIsrest(false)
        setSearch_value({
            customer_num: '',
            phone: "",
            email: "",
            customer_name: "",
            street_address: "",
            pobox: "",
            customer_city: "",
            customer_county: "",
            customer_country: "",
            post_code: "",
            assign_to: "",
            related_to: ''
        })
    }
    useEffect(() => {
        set_again();
    }, [props.modChange]);

    let headerx = [
        {
            header: "         ",
            inputx: [isrest == false ? <button key="b2" type="button" className="button_in_modal search_button" onClick={search_click}>Search</button> :
                <button key="b1" className="button_in_modal1 reset_button" onClick={set_again}>Reset</button>]
        }
    ]

    {
        table_header && table_header.slice(0).reverse().map((h, i) => (
            h.listview == 1 ? h.fieldname == [searchTableModule + "_name"] || [searchTableModule + "_num"] && searchTableModule == "supplierorder" || h.fieldname == "firstname" || h.fieldname == "lastname" ?

                headerx.unshift({
                    header: h.fieldlabel,
                    inputx: [<input key={i} type="text" className="input_in_modal" name={h.fieldname} autoComplete="off"
                        value={search_value[h.fieldname] || ''} onChange={handleChange} placeholder={"Min 4 Characters"}>
                    </input>],
                    dname: h.fieldname
                }
                ) : null : null
        ))
    }

    const mobilesearch = () => {
        axios.get("/" + tenantCname + "/api/" + searchTableModule, {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            params: {
                "filter": search_mobile + "=" + input_mobile
            }
        })
            .then(res => {
                setTable_d(res.data.data)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": search_mobile + "=" + input_mobile}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            .catch(err => {
                console.log(err)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": search_mobile + "=" + input_mobile}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
    }

    const changeHandle5 = (e) => {
        setSearch_mobile(e.target.value)
    }

    const handleTableRowSelect = (d, i) => {
    // Remove commas from buying_price and selling_price if they exist
    const buyingPrice = d.buying_price ? d.buying_price.replace(/,/g, '') : null;
    const sellingPrice = d.selling_price ? d.selling_price.replace(/,/g, '') : null;

        if (product_Table[0] && (module_name == "supplierorderreceipt" || related_module == "supplierorderreceipt")) {
            setSupplierOrder_num(d["supplierorder_num"]);
            setWarehouse(d[searchTableModule + "_name"]);
            product_Table[0] && (product_Table[0].lines.Group[rowValues.checkGroup][rowValues.groupId].inputRowArr[rowValues.ind].warehouse_multiple_record = d[searchTableModule + "_name"])
        }
        if (searchTableModule != "supplierorder" && module_name == "supplierorder" && searchTableModule != "supplierorder" || module_name == "supplierorderreceipt" && searchTableModule != "supplierorder") {
            //   setWarehouse(d[searchTableModule + "_name"]);
            product_Table[0] && (product_Table[0].lines.Group[rowValues.checkGroup][rowValues.groupId].inputRowArr[rowValues.ind].warehouse_multiple_record = d[searchTableModule + "_name"])
        }


        setShow1(false)
        if(props?.isPrefill){
            props.setPrefill(d)
            props.setShow(true)
        }

        if (uitypes == 14) {
            row_value[fieldsName] = d[searchTableModule + "id"]
            row_value[fieldsName.replace('_record','_module')] = searchTableModule
            row_value[fieldsName + "_name"] = d[searchTableModule + "_name"]
            setRow_value({
                ...row_value, ['related_' + searchTableModule]: d[searchTableModule + "_name"],
                ['related_' + searchTableModule + 'id']: d[searchTableModule + "id"]
            });
        }
        if (uitypes == 6) {
            setuitype6_value({
                ...uitype6_value, ['related_' + searchTableModule]:  d[searchTableModule + "_name"] === undefined ?d[searchTableModule + "_num"]  : d[searchTableModule + "_name"],
                ['related_' + searchTableModule + 'id']: d[searchTableModule + "id"]
            });
        }
        setAdd({ ...add, ['related_' + searchTableModule]: d[searchTableModule + "id"] })

        if (module_name == 'supplierorder' || module_name == "supplierorderreturn") {
            setLine({
                ...line, ["product_id"]: d.product_id || 0,
                [module_name + "_product"]: d.product_name,
                ["cost_price"]: buyingPrice,
                ["vat_code"]: d.taxrate || "169",
            })

        } else {
            setLine({
                ...line, ["product_id"]: d.product_id || 0,
                [module_name + "_product"]: d.product_name,
                ["cost_price"]: buyingPrice,
                ["sales_price"]: sellingPrice,
                ["vat_code"]: d.taxrate || "169",
            })
        }
    }

    const getTableBody = () => {
        return (table_d || []).map((d, i) => (
            <tr key={i} onClick={() => handleTableRowSelect(d, i)}>
                {
                    table_header && table_header.map((head, i) => (
                        head.poplistview == 1 ? head.fieldname == [searchTableModule + "_name"] || searchTableModule == "supplierorder" && [searchTableModule + "_num"] || head.fieldname == "_num" || head.fieldname == "firstname" || head.fieldname == "lastname" ?
                            <td key={i} data-title={head.fieldlabel}>{d[head.fieldname]}</td>
                            : null : null
                    ))
                }
            </tr>
        ))


    }

    return (
        <> <div className="container-fluid col-12 pl-4 pr-4">
            <div className="row pr-1">
                {/* <div className="parent_div col-12"> */}
                <span onClick={() => handleShow1()}  className={props.sicn ? 'search-icon-142' :null}>
                    <i><CgSearch /></i>
                </span>
                {searchTableModule && <Modal className={props.rst ? "model-zindex-c small_modal search_modal" :"small_modal search_modal"} show={show1} onHide={handleClose1}  scrollable={true} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title className="h4"><h4 className="headingModal"><Trans>{searchTableModule}</Trans></h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="chart_top p-0">
                            <div className="chart_table_wrap customer_table">
                                <div className="global_filter">
                                    <select className="float-left" name="search_mobile" defaultValue={search_mobile} onChange={changeHandle5}>
                                        <option className="option">Search by</option>
                                        {
                                            headerx.map((hdx, i) => (
                                                <option className="option" key={i} value={hdx.inputx}>{hdx.header}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="search_box">
                                        <input className="float-left" type="text" placeholder="Enter your Search"
                                            onChange={(e) => { setInput_mobile(e.target.value) }}></input>
                                        <span onClick={mobilesearch}><i><CgSearch /></i></span>
                                    </div>
                                </div>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr role="row">

                                            {
                                                headerx.map((hdx, i) => (
                                                    <th key={i} colSpan="1" role="columnheader">
                                                        {hdx.header}
                                                        <div className=" filter">
                                                            {hdx.inputx}
                                                        </div>
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getTableBody()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>}</div></div>
        </>
    );
};

export default SearchIconModal;