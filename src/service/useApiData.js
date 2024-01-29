import axios from "../config/Axios"
import { CheckModuleName } from "../utils/CheckModuleName"
import { FIELDDATAAPI, FIELDSAPI } from "./ApiPath"

    let logData = [];
    let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'),  'user_ip': sessionStorage.getItem('ipAddress')};
export const getFieldsApiData = (tenantCname, module_name,storage) => {
    const {getData,saveData} = storage;
    const data = getData(`v_/cust2/api/fields_${(module_name?`module_${module_name}`:"")}`)
    if(!data) return axios.get(FIELDSAPI(tenantCname), {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        params: {
            "module": module_name
        }
    }
    )
        .then(res => {
            saveData(`v_/cust2/api/fields_${(module_name?`module_${module_name}`:"")}`,res.data)
            logData = [{...viewData, 'module_name': module_name, 'payload': {"module": module_name}, 'api': `/${module_name}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {"module": module_name}, 'api': `/${module_name}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response;
            }
        )

    return data
}
export const getFieldDataApiData = (tenantCname, module_name) => {
    return [
        "00000000000"
    ]
}


export const getEditApiData = (tenantCname, authState, apiPath) => {
    let newApiPath = apiPath.split("/");
    let pathName = newApiPath[newApiPath.length - 1];
    return axios.get("/" + tenantCname + apiPath, {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        params: {
            "company_id": authState.companyId || authState.company_id
        }
    }
    )
        .then(
                res => { 
                    logData = [{...viewData, 'module_name': pathName, 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${pathName}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                    return res.data
                }
            )
        .catch(
            err => {
                logData = [{...viewData, 'module_name': pathName, 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${pathName}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
            )
}

export const getDuplicateApiData = (tenantCname, authState, apiPath) => {
    let newApiPath = apiPath.split("/");
    let pathName = newApiPath[newApiPath.length - 1];
    return axios.get("/" + tenantCname + apiPath, {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        params: {
            "company_id": authState.companyId || authState.company_id
        }
    }
    )
        .then(
            res => { 
                logData = [{...viewData, 'module_name': pathName, 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${pathName}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            }
        )
        .catch(
            err => {
                logData = [{...viewData, 'module_name': pathName, 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${pathName}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const getRelatedModuleApiData = (tenantCname, forChange, authState) => {
    return axios.get("/" + tenantCname + "/api/" + forChange + "s/" + localStorage.getItem("prev_c_id"), {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        params: {
            "company_id": authState.companyId || authState.company_id
        }
    }
    )
        .then(res => { 
            logData = [{...viewData, 'module_name': localStorage.getItem("prev_c_id"), 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${localStorage.getItem("prev_c_id")}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': localStorage.getItem("prev_c_id"), 'payload': {"company_id": authState.companyId || authState.company_id}, 'api': `/${localStorage.getItem("prev_c_id")}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response
            })
}
export const allUserListApi = (tenantCname) => {
    return axios.get("/" + tenantCname + "/api/alluserlist", {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }
    )
        .then(res => { 
            logData = [{...viewData, 'module_name': 'alluserlist', 'payload': '', 'api': `/${'alluserlist'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'alluserlist', 'payload': '', 'api': `/${'alluserlist'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const workFlowDySubmit = (tenantCname, module_name, swid, num, dy_form_data) => {
    return axios.get("/" + tenantCname + "/api/wsteps", {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer" + " " + localStorage.getItem('token')
        },
        params: {
            "module": module_name,
            "view": "edit",
            "wid": swid,
            "formtype": "1",
            "stepnum": num,
            "email": dy_form_data,
        }
    }
    )
        .then(res => { 
            logData = [{...viewData, 'module_name': 'wsteps', 'payload': {"module": module_name,
            "view": "edit",
            "wid": swid,
            "formtype": "1",
            "stepnum": num,
            "email": dy_form_data}, 'api': `/${'wsteps'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'wsteps', 'payload': {"module": module_name,
                "view": "edit",
                "wid": swid,
                "formtype": "1",
                "stepnum": num,
                "email": dy_form_data}, 'api': `/${'wsteps'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const soreceipt_module_post_api = (tenantCname, add, custom, data2, headers) => {
    return axios.post("/" + tenantCname + "/api/" + "supplierorderreceipt",
        {
            ['supplierorderreceipt' + "_num"]: add['supplierorderreceipt' + "_num"],
            "source": "none",
            "status": "1",
            "custom": custom,
            // "lines": linearray,
            "lines": data2,
            "createevent": custom.start_date !== undefined ? true : false
        },
        {
            headers: headers
        })
        .then(res => { 
            logData = [{...viewData, 'module_name': 'supplierorderreceipt', 'payload': {
            ['supplierorderreceipt' + "_num"]: add['supplierorderreceipt' + "_num"],
            "source": "none",
            "status": "1",
            "custom": custom,
            // "lines": linearray,
            "lines": data2,
            "createevent": custom.start_date !== undefined ? true : false
        }, 'api': `/${'supplierorderreceipt'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'supplierorderreceipt', 'payload': {
            ['supplierorderreceipt' + "_num"]: add['supplierorderreceipt' + "_num"],
            "source": "none",
            "status": "1",
            "custom": custom,
            // "lines": linearray,
            "lines": data2,
            "createevent": custom.start_date !== undefined ? true : false
        }, 'api': `/${'supplierorderreceipt'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const put_api_forall_module = (tenantCname, module_name, add, custom, e_id, headers) => {
    return axios.put("/" + tenantCname + "/api/" + module_name + "s/" + e_id,
        {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        },

        {
            headers: headers
        })
        .then(res => { 
            logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${module_name}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${module_name}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const multiedit_api_forall_module = (tenantCname, module_name, medit, addForMulti, mutliids, headers) => {
    return axios.put("/" + tenantCname + "/api/" + module_name + "s/" + medit[module_name + "id"],
        {
            "custom": addForMulti,
            "multi_edit": mutliids
        },
        {
            headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            "custom": addForMulti,
            "multi_edit": mutliids
        }, 'api': `/${module_name}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            "custom": addForMulti,
            "multi_edit": mutliids
        }, 'api': `/${module_name}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const op_and_payroll_editapi = (tenantCname, module_name, add, endPart, custom, headers) => {
    return axios.put("/" + tenantCname + "/api/" + endPart,
        {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        },

        {
            headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${endPart}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${endPart}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const editapi = (tenantCname, module_name, add, custom, apiPath, headers) => {

    let newApiPath = apiPath.split("/");
    let pathName = newApiPath[newApiPath.length - 1];
    return axios.put("/" + tenantCname + apiPath,
        {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        },
        {
            headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${pathName}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add[module_name + "_num"],
            "custom": custom,
            "source": "web",
            "status": "1"
        }, 'api': `/${pathName}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const postapi = (tenantCname, module_name, custom, add_forName, headers,autofillnumm) => {
    return axios.post("/" + tenantCname + "/api/" + module_name,
        {
            [module_name + "_num"]: add_forName[module_name + "_num"]||autofillnumm,
            "custom": custom,
            "source": "web",
            "status": "1",
        },

        {
            headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add_forName[module_name + "_num"]||autofillnumm,
            "custom": custom,
            "source": "web",
            "status": "1",
        }, 'api': `/${module_name}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
            [module_name + "_num"]: add_forName[module_name + "_num"]||autofillnumm,
            "custom": custom,
            "source": "web",
            "status": "1",
        }, 'api': `/${module_name}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const for_updating_calculation = (tenantCname, e_id, customtemp, custoupdate, headers) => {
    return axios.put("/" + tenantCname + "/api/opportunities/" + e_id,
        {
            ["opportunity_num"]: customtemp["opportunity_num"],
            "custom": custoupdate,
            "source": "none",
            "status": "1",
            "updateall": 1,
            "createevent": true,
        },
        {
            headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': 'opportunities', 'payload': {
            ["opportunity_num"]: customtemp["opportunity_num"],
            "custom": custoupdate,
            "source": "none",
            "status": "1",
            "updateall": 1,
            "createevent": true,
        }, 'api': `/${'opportunities'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'opportunities', 'payload': {
            ["opportunity_num"]: customtemp["opportunity_num"],
            "custom": custoupdate,
            "source": "none",
            "status": "1",
            "updateall": 1,
            "createevent": true,
        }, 'api': `/${'opportunities'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const getData_of_opexpense = (tenantCname) => {
    return axios.get("/" + tenantCname + "/api/relatedmodule", {
        headers: {
          "Accept": "application/JSON",
          "Authorization": "Bearer" + " " + localStorage.getItem('token')
        },
        params: {
          "module": "opportunity",
          "relatedmodule": "operationalexpense",
          "ipp": "200",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }
      })
        .then(res => { 
                logData = [{...viewData, 'module_name': 'opportunity', 'payload': {
          "module": "opportunity",
          "relatedmodule": "operationalexpense",
          "ipp": "200",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }, 'api': `/${'relatedmodule'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'opportunity', 'payload': {
          "module": "opportunity",
          "relatedmodule": "operationalexpense",
          "ipp": "200",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }, 'api': `/${'relatedmodule'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const getData_of_payrollcosts = (tenantCname) => {
    return  axios.get("/" + tenantCname + "/api/relatedmodule", {
        headers: {
          "Accept": "application/JSON",
          "Authorization": "Bearer" + " " + localStorage.getItem('token')
        },
        params: {
          "module": "opportunity",
          "ipp": "200",
          "relatedmodule": "payrollcosts",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }
      }

      )
        .then(res => { 
                logData = [{...viewData, 'module_name': 'opportunity', 'payload': {
          "module": "opportunity",
          "ipp": "200",
          "relatedmodule": "payrollcosts",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }, 'api': `/${'relatedmodule'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'opportunity', 'payload': {
          "module": "opportunity",
          "ipp": "200",
          "relatedmodule": "payrollcosts",
          "recordid": localStorage.getItem('c_id') || localStorage.getItem("prev_c_id")
        }, 'api': `/${'relatedmodule'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const put_api_for_opfile = (tenantCname,forthis,e_id,headers,add,custom,isrecurr,reccuringruleSave,data2,radioEditOption,module_name) => {
    let custom2 = ""
    
    if(module_name==="opportunity"){
        custom2 = {...custom,
            "expected_sales":String(add["expected_sales"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "expected_profit":String(((add["copy_costs"]?add["expected_profit"]:add["expected_profit_"])||add["expected_profit"])||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "net_profit":String(add["net_profit"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "operational_expenses":String(add["operational_expenses"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "payroll_costs":String(add["payroll_costs"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "other_costs":String(add["other_costs"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
    }
    }else{
        custom2 = {...custom}
    }
    return axios.put("/" + tenantCname + "/api/" + forthis + "s/" + e_id,
    {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom2,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "lines": data2,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    },
    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom2,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "lines": data2,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom2,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "lines": data2,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const put_api2_of_opfile = (tenantCname,forthis,e_id,add,custom,isrecurr,reccuringruleSave,radioEditOption,module_name) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
    return   axios.put("/" + tenantCname + "/api/" + forthis + "s/" + e_id,
    {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    },

    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "recurring": isrecurr ? reccuringruleSave : null,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}
export const put_api3_of_opfile = (tenantCname,forthis,e_id,add,module_name,custom,data2,radioEditOption) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
    return       axios.put("/" + tenantCname + "/api/" + forthis + "s/" + e_id,
    {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      "lines": data2,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    },

    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {[module_name + "_num"]: add[module_name + "_num"],
                "custom": custom,
                "source": "none",
                "status": "1",
                "lines": data2,
                "createevent": custom.start_date !== undefined ? true : false,
                "updateall": radioEditOption}, 'api': `/${forthis}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {[module_name + "_num"]: add[module_name + "_num"],
                "custom": custom,
                "source": "none",
                "status": "1",
                "lines": data2,
                "createevent": custom.start_date !== undefined ? true : false,
                "updateall": radioEditOption}, 'api': `/${forthis}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const put_api_forrelatedmodule = (tenantCname,forthis,e_id,add,module_name,custom,radioEditOption) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
    return     axios.put("/"+tenantCname+"/api/" + forthis + "s/" + e_id,
    {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      // "recurring": reccuringruleSave,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    },

    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      // "recurring": reccuringruleSave,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"],
      "custom": custom,
      "source": "none",
      "status": "1",
      // "recurring": reccuringruleSave,
      "createevent": custom.start_date !== undefined ? true : false,
      "updateall": radioEditOption
    }, 'api': `/${forthis}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const put_api_formultiedit_opfile = (tenantCname,forthis,medit,module_name,addForMulti,radioEditOption,mutliids,i) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
    return    axios.put("/"+tenantCname+"/api/" + forthis + "s/" + medit[module_name + "_id"],
    {
      "custom": addForMulti,
      "updateall": radioEditOption,
      "multi_edit": mutliids
    },

    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      "custom": addForMulti,
      "updateall": radioEditOption,
      "multi_edit": mutliids
    }, 'api': `/${forthis}s`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      "custom": addForMulti,
      "updateall": radioEditOption,
      "multi_edit": mutliids
    }, 'api': `/${forthis}s`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const post_api_opfile = (tenantCname,module_name,add,custom,isrecurr,reccuringruleSave,data2,headers,autofillnumm) => {

    let custom2;

    // if(add["expected_sales_"]){
    //     custom2 = {...custom,"expected_sales":add["expected_sales"],"expected_profit":add["expected_profit"]}
    // }

    if(module_name==="opportunity"){
        custom2 = {...custom,

            "expected_sales":String(add["expected_sales"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "expected_profit":String((add["copy_costs"]?add["expected_profit"]:add["expected_profit_"])||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "net_profit":String(add["net_profit"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "operational_expenses":String(add["operational_expenses"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "payroll_costs":String(add["payroll_costs"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
            "other_costs":String(add["other_costs"]||0).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''),
    }
    }else{
        custom2 = {...custom}
    }

    return    axios.post("/"+tenantCname+"/api/" + module_name,
    {
      [module_name + "_num"]: add[module_name + "_num"]||autofillnumm,
      "source": "none",
      "status": "1",
      "custom": custom2,
      "recurring": isrecurr ? reccuringruleSave : null,
      // "lines": linearray,
      "lines": data2,
      "createevent": custom2.start_date !== undefined ? true : false
    },

    {
      headers: headers
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"]||autofillnumm,
      "source": "none",
      "status": "1",
      "custom": custom2,
      "recurring": isrecurr ? reccuringruleSave : null,
      // "lines": linearray,
      "lines": data2,
      "createevent": custom2.start_date !== undefined ? true : false
    }, 'api': `/${module_name}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
      [module_name + "_num"]: add[module_name + "_num"]||autofillnumm,
      "source": "none",
      "status": "1",
      "custom": custom2,
      "recurring": isrecurr ? reccuringruleSave : null,
      // "lines": linearray,
      "lines": data2,
      "createevent": custom2.start_date !== undefined ? true : false
    }, 'api': `/${module_name}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const put_api_delete_line = (module_name,add, custom, data3, headers,apiPath,radioEditOption) => {

    let newApiPath = apiPath.split("/");
    let pathName = newApiPath[newApiPath.length - 1];
    return      axios.put(apiPath,
        {
          [module_name + "_num"]: add[module_name + "_num"],
          "custom": custom,
          "source": "none",
          "status": "1",
          "lines": data3,
          "createevent": custom.start_date !== undefined ? true : false,
          "updateall": radioEditOption
        },

        {
          headers: headers
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': module_name, 'payload': {
          [module_name + "_num"]: add[module_name + "_num"],
          "custom": custom,
          "source": "none",
          "status": "1",
          "lines": data3,
          "createevent": custom.start_date !== undefined ? true : false,
          "updateall": radioEditOption
        }, 'api': `/${pathName}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': module_name, 'payload': {
          [module_name + "_num"]: add[module_name + "_num"],
          "custom": custom,
          "source": "none",
          "status": "1",
          "lines": data3,
          "createevent": custom.start_date !== undefined ? true : false,
          "updateall": radioEditOption
        }, 'api': `/${pathName}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const getReportDetailsAPIdata = (tenantCname, id) => {
    return axios.get("/" + tenantCname + "/api/detailreport/" + id, {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': 'detailreport', 'payload': {'id': id}, 'api': `/${'detailreport'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'detailreport', 'payload': {'id': id}, 'api': `/${'detailreport'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const getReportSubjectdata = (tenantCname) => {
    return axios.get("/" + tenantCname + "/api/reportsubjectarea", {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': 'reportsubjectarea', 'payload': '', 'api': `/${'reportsubjectarea'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'reportsubjectarea', 'payload': '', 'api': `/${'reportsubjectarea'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const getReportFieldsAddEditAPIdata = (tenantCname, addEditApi, id) => {
    return axios.get("/" + tenantCname + "/api/" + addEditApi + id, {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': 'report', 'payload': {'id': id}, 'api': `/${addEditApi}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'report', 'payload': {'id': id}, 'api': `/${addEditApi}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const getReportFieldsUpdateAPIdata = (tenantCname, addEditApi, id, apiData) => {
    return axios.put("/" + tenantCname + "/api/" + addEditApi + id, { ...apiData },
        {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(res => { 
                logData = [{...viewData, 'module_name': addEditApi, 'payload': {...apiData}, 'api': `/${addEditApi}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': addEditApi, 'payload': {...apiData}, 'api': `/${addEditApi}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const saveReportDetailsAPIdata = (tenantCname, apiData) => {
    // console.log(apiData, '239');
    return axios.post("/" + tenantCname + "/api/savereportdatabyuser", { ...apiData },

        {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }
    )
        .then(res => { 
            logData = [{...viewData, 'module_name': 'report', 'payload': {...apiData}, 'api': `/${'savereportdatabyuser'}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            return res.data
        })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': 'report', 'payload': {...apiData}, 'api': `/${'savereportdatabyuser'}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}



export const getReportAfterCreatedata = (tenantCname, apiEndPoint, reportId) => {
    return axios.get("/" + tenantCname + "/api/" + apiEndPoint + "?report_id=" + reportId, {
        headers: {
            "Accept": "application/JSON",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(res => { 
                logData = [{...viewData, 'module_name': apiEndPoint, 'payload': {'report_id': reportId}, 'api': `/${apiEndPoint}`, 'response':res.data, 'error_details': '', 'status_code': res.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid') }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return res.data
            })
        .catch(
            err => {
                logData = [{...viewData, 'module_name': apiEndPoint, 'payload': {'report_id': reportId}, 'api': `/${apiEndPoint}`, 'response':[], 'error_details': err , 'status_code': err.status, 'company_id': localStorage.getItem('companyId') || sessionStorage.getItem('companyId'), 'user_id': sessionStorage.getItem('userid')}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
                return err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response}
        )
}

export const recordErrorAPIdata = (tenantCname, apiData) => {
    // console.log(apiData, '239', tenantCname);
    return axios.post("/" + tenantCname + "/api/recorderror", { ...apiData },

        {
            headers: {
                "Accept": "application/JSON",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }
    )
        .then(res => res)
        .catch(err => err?.response?.data.error === 'Unauthenticated' ? (sessionStorage.removeItem('user')) : err.response)
}