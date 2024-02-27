import React from "react";
import CustomAxios from '../middleware/CustomAxios'
import { recordErrorAPIdata } from "./useApiData";

const usePostReq = () => {

  let logData = [];
  let viewData = {};

  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId') ||sessionStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid') || sessionStorage.getItem('userid'),  'user_ip': sessionStorage.getItem('ipAddress')};
  const postData = (path,data,onComplete, onError, reqParams) => {
    let apiPath = path.split("/");
    let pathName = apiPath[apiPath.length - 1];
    // return new Promise((resolve, reject) => {
      CustomAxios.post(path,data,{
        ...reqParams,
      })
        .then((res) => {
          if (onComplete){ onComplete(res.data);

            logData = [{...viewData, 'module_name': pathName, 'payload': data, 'api': `/${pathName}`, 'response':res.data, 'error_details': '', 'status_code': res.status }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
            };
          // resolve(res);
        })
        .catch((err) => {
          if (onError) onError(err);
          logData = [{...viewData, 'module_name': pathName, 'payload': data, 'api': `/${pathName}`, 'response':[], 'error_details': err, 'status_code': err.response.status }];
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
          // reject(err);
        });
    // });
  };
  return [postData];
};

export default usePostReq;
