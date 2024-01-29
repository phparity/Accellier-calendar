import React from "react";
import CustomAxios from "../middleware/CustomAxios";
import { recordErrorAPIdata } from "./useApiData";

const useGetReq = () => {
  let logData = [];
  let viewData = {};

  const getData = (path, onComplete, onError, reqParams,storage) => {
    let apiPath = path.split("/");
    let pathName = apiPath[apiPath.length - 1];
  const {getData,saveData} = storage;
  if(!getData(`v_${path}_${(reqParams?.params?.module?`module_${reqParams?.params?.module}`:"")}`)){
    CustomAxios.get(path,{
        ...reqParams,
      })
        .then((res) => {
          if (onComplete){ 
            if(path === `/${localStorage.getItem('tenant_cname')}/api/workflow` || 
                path === `/${localStorage.getItem('tenant_cname')}/api/usermenu` ||
                path === `/${localStorage.getItem('tenant_cname')}/api/listview` ||
                path === `/${localStorage.getItem('tenant_cname')}/api/fields` ||
                path === `/${localStorage.getItem('tenant_cname')}/api/getalltags` ) saveData(`v_${path}_${(reqParams?.params?.module?`module_${reqParams?.params?.module}`:"")}`,res.data)
            onComplete(res.data);
            viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId') ||sessionStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid') || sessionStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), 'payload':'', 'status_code': res.status};
            if(path === `/${localStorage.getItem('tenant_cname')}/api/workflow`){
              logData = [{...viewData, 'module_name': 'workflow', 'api': '/workflow', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/usermenu`){
              logData = [{...viewData, 'module_name': 'usermenu', 'api': '/usermenu', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/listview`){
              logData = [{...viewData, 'module_name': 'listview', 'api': '/listview', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/fields`){
              logData = [{...viewData, 'module_name': 'fields', 'api': '/fields', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/getalltags`){
              logData = [{...viewData, 'module_name': 'getalltags', 'api': '/getalltags', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/getallwidget`){
              logData = [{...viewData, 'module_name': 'widget', 'api': '/getallwidget', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/dashicon`){
              logData = [{...viewData, 'module_name': 'dashicon', 'api': '/dashicon', 'response':res.data}];
            } else if(path === `/${localStorage.getItem('tenant_cname')}/api/notification`){
              logData = [{...viewData, 'module_name': 'notification', 'api': '/notification', 'response':res.data}];
            } else {
              logData = [{...viewData, 'module_name': pathName, 'api': `/${pathName}`, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            }
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
           };
        })
        .catch((err) => {
          if (onError) onError(err);
          viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId') ||sessionStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid') || sessionStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), 'payload':'', 'status_code': err.status, 'response': []};
          if(path === `/${localStorage.getItem('tenant_cname')}/api/workflow`){
            logData = [{...viewData, 'module_name': 'workflow', 'api': '/workflow', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/usermenu`){
            logData = [{...viewData, 'module_name': 'usermenu', 'api': '/usermenu', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/listview`){
            logData = [{...viewData, 'module_name': 'listview', 'api': '/listview', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/fields`){
            logData = [{...viewData, 'module_name': 'fields', 'api': '/fields', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/getalltags`){
            logData = [{...viewData, 'module_name': 'getalltags', 'api': '/getalltags', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/getallwidget`){
            logData = [{...viewData, 'module_name': 'getallwidget', 'api': '/getallwidget', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/dashicon`){
            logData = [{...viewData, 'module_name': 'dashicon', 'api': '/dashicon', 'error_details':err}];
          } else if(path === `/${localStorage.getItem('tenant_cname')}/api/notification`){
            logData = [{...viewData, 'module_name': 'notification', 'api': '/notification', 'error_details':err}];
          } else {
            logData = [{...viewData, 'module_name': pathName, 'api': `/${pathName}`, 'error_details':err}];
          }
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
        });
  }else{
    onComplete(getData(`v_${path}_${(reqParams?.params?.module?`module_${reqParams?.params?.module}`:"")}`));
  }      
  };
  return [getData];
};

export default useGetReq;
