
export const USERMENUAPI = tenantCname =>`/${tenantCname}/api/usermenu`
export const NOTIFICATIONAPI = tenantCname => `/${tenantCname}/api/notification`
export const GLOBALSEARCHAPI = tenantCname => `/${tenantCname}/api/globalsearch`
export const DASHICONAPI = tenantCname => `/${tenantCname}/api/dashicon`
export const GETALLWIDGETAPI = tenantCname => `/${tenantCname}/api/getallwidget`
export const UPDATEDASHBOARDWIDGETORDERAPI = tenantCname => `${tenantCname}/api/updatedashboardwidgetorder`
export const DRAGDASHBOARDWIDGETORDERAPI = tenantCname => `${tenantCname}/api/updatedashboardwidgetorder`
export const DELETEDASHBOARDWIDGETORDERAPI = tenantCname => `${tenantCname}/api/updatedashboardwidgetorder`
export const ADDWIDGETAPI = tenantCname => `${tenantCname}/api/addwidget`
export const FIELDSAPI = tenantCname => `/${tenantCname}/api/fields`
export const GETALLTAGS = tenantCname => `/${tenantCname}/api/getalltags`
export const FIELDDATAAPI = tenantCname => `/${tenantCname}/api/fielddata`
export const LISTVIEWAPI = tenantCname => `/${tenantCname}/api/listview`
export const CURRENTPAGEDATAAPI = (tenantCname,module_name) => (module_name!= 'report') ?`/${tenantCname}/api/${module_name}`:''
export const LISTREPORTDATA = (tenantCname,module_name) => (module_name == 'report') ?`/${tenantCname}/api/userreportlist`: ''
export const LISTREPORTDETAILSDATA = (tenantCname,module_name, apiPath) => (module_name == 'report') ?`/${tenantCname}/api/${apiPath}`: ''
export const SEARCHREPORT_CUS_LIST_API = (tenantCname, m_name) => `/${tenantCname}/api/${m_name}`
export const CSVDOWNLOADREPORT_API = (tenantCname) => `/${tenantCname}/api/reportingexport`
export const SEARCH_CUS_LIST_API = m_name => `/api/${m_name}`
export const RESET_CUS_LIST_API = m_name => `/api/${m_name}`
export const MOB_R_LIST_HISTORY_API = tenantCname => `/${tenantCname}/api/history`
export const MOB_R_LIST_API = tenantCname => `/${tenantCname}/api/relatedmodule`
export const MOB_SEARCH_R_LIST_API = m_name => `/api/${m_name}`
export const R_LIST_HISTORY_ASC_API = tenantCname => `/${tenantCname}/api/history`
export const R_LIST_API = tenantCname => `/${tenantCname}/api/relatedmodule`
export const SORT_CUS_DATA = (tenantCname,spy) => `/${tenantCname}/api/${spy}`
export const R_LIST_HISTORY_API = tenantCname => `/${tenantCname}/api/history`
export const R_LIST_HISTORY_DSC_API = tenantCname => `/${tenantCname}/api/history`
export const R_LIST_DSC_API = tenantCname => `/${tenantCname}/api/relatedmodule`
export const CUS_LIST_DSC_API = (tenantCname,spy) => `/${tenantCname}/api/${spy}`
export const DELETERELATEDMODULE = (tenantCname,related_module,org_module_nameid) => `/${tenantCname}/api/${related_module}s/${org_module_nameid}`
export const DELETERELATEDMODULE1 = (tenantCname,apiPath) => `/${tenantCname}${apiPath}`
export const APIPATH = (tenantCname,apiPath) => `/${tenantCname}${apiPath}`
export const WORKFLOWAPI = (tenantCname) => `/${tenantCname}/api/workflow`
export const IMPORTRECORDAPI = (tenantCname,forthis) => `/${tenantCname}/api/${forthis}import`
export const EXPORTRECORDAPI = (tenantCname,forthis) => `/${tenantCname}/api/${forthis}export` 
export const EXPORTALLRECORDAPI = (tenantCname,forthis) => `/${tenantCname}/api/${forthis}export`
export const DELETESELECTRECORD = (tenantCname,forthis,id) => `/${tenantCname}/api/${forthis}s/${id}` 
export const DELETERECORD = (tenantCname,forthis,cusid)  => `/${tenantCname}/api/${forthis}/${cusid}` 
export const SINGLETEMPLATE = (tenantCname) => `/${tenantCname}/api/singletemplate`
export const TEMPLATE = (tenantCname) => `/${tenantCname}/api/template`
export const TEMPLATELIST = (tenantCname) => `/${tenantCname}/api/templatelist`
export const RELATEDMODULE = (tenantCname,related_module) => `/${tenantCname}/api/relatedmodule`
export const SEARCHTABLEMODULE = (tenantCname,searchTableModule) => `/${tenantCname}/api/${searchTableModule}`
export const WSTEPS = (tenantCname) => `/${tenantCname}/api/wsteps/`