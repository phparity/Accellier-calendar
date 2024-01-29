import React, { useContext, useState,useEffect,createContext } from "react"
import { Routes, Route, useNavigate, useParams } from "react-router-dom"
import LogIn from "../pages/LogInPage/LogIn"
import Home from "../pages/Home.js"
import CustomerList from "../pages/CustomerList.js"
import ForgetPassword from "../pages/ForgetPassword.js";
import { LOGIN, HOME, FORGETPASSWORD, CUSTOMERLIST, DETAILEDVIEW, RELATEDLIST, DETAILEDVIEW1, CREATEMODULEPAGE, CREATEMODULEPAGE1, SUPPLIERRECEIPTPAGE, RELATEDETAILEDVIEW,RELATEDLISTDETAILEDVIEWFOROP, RELATEDLISTDETAILEDVIEW, CALENDAR, NOTESMODULE, REPORTCREATEPAGE, REPORTDETAILSPAGE, CREATEREPORTMODULEPAGE, EVENTMANAGEMENTPAGE } from "./Constants";
import Footer from "../layouts/Footer";
import { AuthProvider, AuthContext } from "../config/Authentications/AuthContext";
import DetailedView from "../pages/DetailedView"
import RelatedList from "../pages/RelatedList"
import CreateModulePage from "../pages/CreateModulePage"
import OpCreatePage from "../pages/OpCreatePage"
import Calendar from "../pages/Calendar"
import Notes from "../components/Notes"
import Header from '../layouts/Header';
import useGetReq from "../service/useGetReq"
import { NOTIFICATIONAPI, USERMENUAPI } from "../service/ApiPath"
import ReportDetailsPage from "../pages/ReportDetailsPage/reportDetailsPage";
import ReportCreatePage from "../pages/ReportCreatePage/reportCreatePage";
import ReportSubjectPage from "../pages/ReportSubjectPage/ReportSubjectPage"
import OrangeWorkflowButton from "../components/OrangeWorkflowButton"
import EventManagementModule from "../pages/EventManagementPage"
import useStorage from "../service/useStorage.js"

export const r_value = createContext();
export const linee_value = createContext();
export const searchTableModuleValue = createContext();
export const opCreatePageData = createContext('');
export const userMenuContext = createContext();
export const getRalatedValueContext = createContext();
export const groupCheck = createContext();

function TestError() {
  const a = null;
  return a.hello();
}
function PageRoutes(props) {
  const storage = useStorage();
    const { authState } = useContext(AuthContext)
  const [row_value, setRow_value] = useState({})
  const [uitype6_value, setuitype6_value] = useState({})
  let [add_forName, setAdd_forName] = useState({})
  let [add, setAdd] = useState({})
  let [linearray, setLinearray] = useState([])
  let [lineObject, setLineObject] = useState({})
  const [related_record, setRelated_record] = React.useState('');
  const [searchTableModule, setSearchTableModule] = useState()
  const [searchRelatedTo, setSearchRelatedTo] = useState()
  let [uitype_module, setUitype_module] = useState({})
  const [smShowError, setSmShowError] = useState(false);
  const [error_msg, setError_msg] = useState([])
  const [line, setLine] = useState({})
  const [netProfit, setNetProfit] = useState('')
  const navigate = useNavigate()
  let [addForMulti, setAddForMulti] = useState({})
  const [rlist, setRlist] = useState([])
  const [product_Table, setProduct_Table] = useState([])
  let [blocke, setBlocke] = useState([])
  const [dep_dropdown_value, setDep_dropdown_value] = useState({})
  const [country, setCountry] = useState(1)
  const [total1, settotal1] = useState()
  const [g_total, setG_total] = useState()
  const [salutation, setSalutation] = useState(116)
  const [TnetOfTaxes, setTnetOfTaxes] = useState()
  const [Tmargin, setTmargin] = useState()
  const [opExpTotAmount, setOpExpTotAmount] = useState(0)
  const [payCostTotAmount, setPayCostTotAmount] = useState(0)
  const [otherExpChange, setOtherExpChange] = useState(false);
  const [costs, setCosts] = useState("")
  const [userMenuData, setUsermenuData] = useState('')
  const [notificationData, setNotificationData] = useState();
  const [relatedModuleValue, setRelatedModuleValue] = useState();
  const [supplierorder_num, setSupplierOrder_num] = useState("");
  const [valuex, setValuex] = useState("")

  let tenantCname = authState?.tenant_cname

  if (window.location.href.match(/detail/g)) {
    sessionStorage.setItem('vwname', 'detail')
  } else {    
    sessionStorage.setItem('vwname', 'index')
  }

  if (window.location.href.match(/debug=1/g)) {
    sessionStorage.setItem('debugMode', 1)
  } else {    
    sessionStorage.setItem('debugMode', 0)
  }

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => sessionStorage.setItem('ipAddress', data.ip))
      .catch(error => console.log(error))
  }, [sessionStorage.getItem('user')]);

  var TsalesPrice, TcostPrice, grand, vat, TCdiscount, Tdiscount, Tmarginper

  useEffect(() => {
    !authState && (window.location.hash !== "") && navigate('/')
  }, [])

  const [getData] = useGetReq();

  useEffect(() => {
    tenantCname && getData(USERMENUAPI(tenantCname), setUsermenuData,null,null,storage);
  }, [tenantCname]);
  
      
  useEffect(() => {
    tenantCname && getData(NOTIFICATIONAPI(tenantCname), setNotificationData,null,null,storage);
  }, [tenantCname]);

  return (
    <r_value.Provider value={{ row_value, setRow_value,product_Table, setProduct_Table,rlist, setRlist,blocke, setBlocke,related_record, setRelated_record,uitype6_value, setuitype6_value,add_forName, setAdd_forName}}>
      <linee_value.Provider value={{ line, setLine,netProfit, setNetProfit,TsalesPrice, TcostPrice, TnetOfTaxes,setTnetOfTaxes, grand, vat, TCdiscount, Tdiscount, Tmargin,setTmargin, Tmarginper, g_total, setG_total,
        total1, settotal1,opExpTotAmount, setOpExpTotAmount, payCostTotAmount, setPayCostTotAmount, otherExpChange, setOtherExpChange, otherExpChange, setOtherExpChange, costs, setCosts,lineObject, setLineObject }}>
        <searchTableModuleValue.Provider value={{ searchTableModule, setSearchTableModule,searchRelatedTo, setSearchRelatedTo,uitype_module, setUitype_module,smShowError, setSmShowError,error_msg, setError_msg }}>
          <opCreatePageData.Provider value={{ add, setAdd, addForMulti, setAddForMulti,dep_dropdown_value, setDep_dropdown_value,country, setCountry,salutation, setSalutation,linearray, setLinearray, valuex, setValuex }}>
          <userMenuContext.Provider value={{userMenuData,notificationData,setUsermenuData}}>
          <getRalatedValueContext.Provider value={{relatedModuleValue, setRelatedModuleValue}}>
          <groupCheck.Provider value = {{supplierorder_num, setSupplierOrder_num}} >
      
            <div>
              <Routes>
                <Route exact path={LOGIN} element={<LogIn />} />
                {authState && userMenuData && <Route path={FORGETPASSWORD} element={<ForgetPassword />} />}
                {authState && userMenuData && <Route path={HOME} element={<Home />} />}
                {authState && userMenuData && <Route path={CUSTOMERLIST} element={<CustomerList />} />}
                {authState && userMenuData && <Route path={CALENDAR} element={<Calendar/>} />}
                {authState && userMenuData && <Route path={RELATEDLIST} element={<RelatedList />} />}
                {authState && userMenuData && <Route path={DETAILEDVIEW} element={<DetailedView />} />}
                {authState && userMenuData && <Route path={DETAILEDVIEW1} element={<DetailedView />} />}
                {authState && userMenuData && <Route path={RELATEDETAILEDVIEW} element={<DetailedView />} />}
                {authState && userMenuData && <Route path={RELATEDLISTDETAILEDVIEW} element={<DetailedView />} />}
                {authState && userMenuData && <Route path={RELATEDLISTDETAILEDVIEWFOROP} element={<DetailedView />} />}
                {authState && userMenuData && <Route path={CREATEMODULEPAGE} element={<CreateModulePage />} />}
                {authState && userMenuData && <Route path={SUPPLIERRECEIPTPAGE} element={<CreateModulePage />} />}
                {authState && userMenuData && <Route path={CREATEMODULEPAGE1} element={<OpCreatePage />} />}
                {authState && userMenuData && <Route path={NOTESMODULE} element={<Notes />} />}
                {authState && userMenuData && <Route path={REPORTDETAILSPAGE} element={<ReportDetailsPage />} />}
                {authState && userMenuData && <Route path={CREATEREPORTMODULEPAGE} element={<ReportSubjectPage />} />}
                {authState && userMenuData && <Route path={REPORTCREATEPAGE} element={<ReportCreatePage />} />}
                {authState && userMenuData && <Route path={EVENTMANAGEMENTPAGE} element={<EventManagementModule />} />}
              </Routes>
              {authState && <OrangeWorkflowButton/>}
              {/* {<TestError />} */}
            </div>
            </groupCheck.Provider>
          </getRalatedValueContext.Provider>
          </userMenuContext.Provider>
          </opCreatePageData.Provider>
        </searchTableModuleValue.Provider>
      </linee_value.Provider>
    </r_value.Provider>
  );
}

export default PageRoutes;