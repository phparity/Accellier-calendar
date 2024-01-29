import React, { useEffect, useState } from 'react';
import "../../assets/style/LogIn.css";
// import "../../assets/style/CustomerList.css"
import axios from "../../config/Axios"
import { Link, Navigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import acc_tab_img from "../../assets/images/acc_tab_img.png"
import FooterLogin from '../../layouts/FooterLogin';
import { Trans } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import Buttons from "../../components/Buttons"
import {validationSchema} from "../../pages/LogInPage/Validationschema";
import { AuthContext } from '../../config/Authentications/AuthContext';
import { useContext } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Dialog from '@mui/material/Dialog';
import { GrAdd, GrClose } from "react-icons/gr"
import { recordErrorAPIdata } from '../../service/useApiData';
// import {SimpleDialog} from '@mui/material';
// or
// import { DialogActions } from '@mui/material';



const LogIn=()=> {
  const {authState,setAuthState} = useContext(AuthContext)
  const [state, setState] = useState({})
  const [isloggedIn, setIsLoggedIn] = useState("false")
  const [dbResponse, setDbResponse] = useState()
  const [show1, setShow1] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginDetails, setLogInDetails] = useState();

  const handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    setState({
      [input.name]: value
    });
  }
  let loginData = [];
let viewData = {'view_name': sessionStorage.getItem('vwname'), 'user_ip': sessionStorage.getItem('ipAddress')};
  const handleShow = () =>{ 
    setOpen(true)
    setShow1(true)}

  const handleClose = () => {
  setShow1(false);
  setDbResponse(null);
  }
  useEffect(()=>{console.log("Loging Deployed Environment",process.env.REACT_APP_DEPLOY_ENV, process.env.REACT_APP_DEBUG_MODE)},[])

  
  
  if (state.isloggedIn === true) {
    return <Navigate to={{ pathname: "/home" }} />
  }
  dbResponse&& Object.values(dbResponse).map((db)=>{
    
  })
 

  const selectDb=(db_name)=>{
    const { rememberMe } = state;  
    const data = {
      email: loginDetails.email,
      password: loginDetails.password,
      db_name: db_name
    } 
    axios.post("/api/login", data, {
      body: {
        "email": "email",
        "password": "password",
        "db_name":"db_name"
      }
    })
      .then(res => {
        setDbResponse(res.data.data)
        setAuthState({...authState,
          companyId:res.data.company_id,
          tenant_cname:res.data.tenant_cname,
          token:res.data.token,
          email:rememberMe ? data.email : '',
          password:rememberMe ?  data.password:'',
          rememberMe: rememberMe,
        })
        localStorage.setItem("token", res.data.token)
        sessionStorage.setItem('user',JSON.stringify(res.data))
        sessionStorage.setItem('companyId',JSON.stringify(res.data.company_id))
        localStorage.setItem("tenant_cname", res.data.tenant_cname);
        localStorage.setItem("companyId", res.data.company_id);
        if (res.data.token) {
          setState({ isloggedIn: true });
        }
        loginData= [{...viewData, 'user_id': localStorage.getItem('userid'), 'api': '/login', 'status_code': res?.status,  'module_name' : 'login', 'company_id': res?.data?.company_id, 'payload': data, 'response' : res.data, 'error_details': ''}]; 
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata('cust2', ...loginData);
        }
      })
      .catch(err => {
        {
          loginData= [{...viewData, 'user_id': localStorage.getItem('userid'), 'api': '/login', 'status_code': err.status, 'module_name' : 'login', 'company_id': '', 'payload': data, 'response' : [], 'error_details': err}]; 
          alert("Wrong Email or Password.", { err });
          handleClose();
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata('cust2', ...loginData);
          }
        }
      })
    
  }

  return (
    <div>
      <div className="container-fluid nav_bg">
        <div className='login_wrapper'>
          <div className="my_login_css1 login_left"></div>
          <div className="login_right my_login_css align-self-center brdr">
            <div className="login_form_wrap">
              <Formik
                initialValues={{
                  password: '',
                  email: '',
                }}
                  validationSchema={validationSchema}
                  onSubmit={(values)=> {
                  handleShow()
                  const { email, password, rememberMe } = state;  
                  setLogInDetails(values)
                             
                  const data = {
                    email: values.email,
                    password: values.password
                  }
                  axios.post("/api/login", data, {
                    body: {
                      "email": "email",
                      "password": "password"
                    }
                  })
                    .then(res => {
                      setDbResponse(res.data.data)
                      setAuthState({...authState,
                        companyId:res.data.company_id,
                        tenant_cname:res.data.tenant_cname,
                        token:res.data.token,
                        email:rememberMe ? data.email : '',
                        password:rememberMe ?  data.password:'',
                        rememberMe: rememberMe,
                      })
                      localStorage.setItem("token", res.data.token)
                      sessionStorage.setItem('user',JSON.stringify(res.data))
                      localStorage.setItem("tenant_cname", res.data.tenant_cname);
                      localStorage.setItem("companyId", res.data.company_id);
                      if (res.data.token) {
                        setState({ isloggedIn: true });
                      }
                      loginData= [{...viewData, 'user_id': localStorage.getItem('userid'), 'api': '/login', 'status_code': res?.status, 'module_name' : 'login', 'company_id': res?.data?.company_id, 'payload': data, 'response' : res.data, 'error_details': ''}]; 

                      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                        // recordErrorAPIdata('cust2', ...loginData);
                      }
                    })
                    .catch(err => {
                      {
                      loginData= [{...viewData, 'user_id': localStorage.getItem('userid'), 'api': '/login', 'status_code': err.status, 'module_name' : 'login', 'company_id': '', 'payload': data, 'response' : '', 'error_details': err}]; 
                        alert("Wrong Email or Password.", { err });
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          // recordErrorAPIdata('cust2', ...loginData);
                        }
                      }
                    })
                }}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className="form">
                    <div className="acc_img"><img src={acc_tab_img} alt="acc_tab_img" /></div>
                    <div className="input_item center">
                      <div className= {errors.email || errors.password ?  "form-group input-group px-0 pb-0 for_icon1 pb-01" : "form-group input-group px-0 pb-0 for_icon1"}>
                        <div className="input-group-prepend">
                          <div className="input-group-text bg-white input_filed ">
                            <i className="icon"><PersonOutlineOutlinedIcon color='primary' /></i>
                            <Field name="email" className="form-control outline" placeholder="Email" />
                          </div>
                          {errors.email && touched.email && <div className='emailerrors'>{errors.email}</div>}
                        </div>
                      </div>

                      <div className="form-group input-group for_icon2 px-0 pt-0 ">
                        <div className="input-group-prepend">
                          <div className="input-group-text bg-white input_filed ">
                            <i className="icon"><LockOutlinedIcon color='primary' /></i>
                            <Field name="password" className="form-control outline" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                          </div>
                          {errors.password && touched.password && <div className='emailerrors'>{errors.password}</div>}

                        </div>
                      </div>
                      <div>
                  
                        <div className='dbpopup222'>{dbResponse && <Modal className='dbpopup1111'
                          show={show1}
                          onHide={handleClose}
                        >
                          <Modal.Body className='dbpopup'>
                            <div className='db popup heading'>
                              <p>Please Select </p>
                              <div className="grclose" onClick={handleClose}>  <GrClose /></div>
                            </div>
                            <div>
                            <div className='dddddd'> {
                                  dbResponse && dbResponse.map((db, index) => (
                                    <div className='inputClass1' key={index}>
                                    <input type="radio" className='inputClass' name="dbOptions" value={db.db_name}  onClick={() => {
                                      selectDb(db.db_name)
                                    }}/>
                                    <label className='labelName'>{db.db_name.toUpperCase()}</label>
                                    </div>
                                  ))
                                }
                            </div>  </div>
                            {/* {

                              <Dropdown className='dropdowndb'>
                                <div className='dddddd'>{
                                  dbResponse && dbResponse.map((db) => (
                                    <Dropdown.Item className='dbitem' onClick={() => {
                                      selectDb(db.db_name)
                                    }} >
                                      <span className='nameeee'> {db.db_name}</span>
                                    </Dropdown.Item>
                                  ))
                                } </div>

                              </Dropdown>
                            } */}
                          </Modal.Body>
                        </Modal>
                        }</div>
                      </div>

                      <div className={errors.password ? "pwd_box1" : "pwd_box"}>
                        <div className="float-left rmbr_me">
                          <input name="rememberMe" checked={state.rememberMe || false} onChange={(e) => handleChange(e)} type="checkbox" />
                          <label><b><Trans>Remember me</Trans></b></label>
                        </div>

                        <div className="forget float-left">
                          <Link target='_self' className="frgt_link" to="/forgetpassword"><b><Trans>Forgot Password?</Trans></b></Link>
                        </div>
                      </div>

                      <Buttons type="submit" class="btn btn-primary btn-login">Login</Buttons>
                    </div> </Form>
                )}
              </Formik>
            </div>
           
            <div className="login_footer"><FooterLogin /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn;