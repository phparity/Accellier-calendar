import { Link } from 'react-router-dom';
import axios from "../config/Axios";
import React, { useState } from 'react';
import acc_tab_img from "../assets/images/acc_tab_img.png";
import Footer from "../layouts/Footer";
import Buttons from "../components/Buttons";
import { Formik, Form, Field } from 'formik';
import { forgetPageValidationSchema } from './LogInPage/Validationschema';
import { recordErrorAPIdata } from '../service/useApiData';

function ForgetPassword() {
    const [state, setState] = useState({})
    const { email, messageFromServer, showNullError, showError } = useState('')
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

    return (
        <div>
            <div className="container-fluid nav_bg">
                <div className='login_wrapper'>
                    <div className="my_login_css1 login_left"></div>
                    <div className="login_right my_login_css align-self-center brdr">
                        <div className="login_form_wrap">
                            <Formik 
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={forgetPageValidationSchema}
                                onSubmit={values => {                                

                                            axios.post("/api/forgotpassword",  {
                                                email: values.email,
                                            })
                                                .then(response => {
                                
                                                    setState({
                                                        showError: false,
                                                        messageFromServer: response.data.msg
                                                    })
                                                    if (response.data.msg === 'email not in db') {
                                                        setState({
                                                            showError: true,
                                                            messageFromServer: ''
                                                        })
                                                    } else if (response.data === 'Reset password link sent on your email id.') {
                                
                                                        setState({
                                                            showError: false,
                                                            messageFromServer: 'Reset password link sent on your email id.'
                                                        })
                                                    }
                                                    logData = [{...viewData, 'module_name': 'login', 'api': `/${'forgotpassword'}`, 'payload':{
                                                        email: values.email,
                                                    }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                                                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                                                        recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                                                    }
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                    logData = [{...viewData, 'module_name': 'login', 'api': `/${'forgotpassword'}`, 'payload':{
                                                        email: values.email,
                                                    }, 'response':[], 'error_details': error, 'status_code':'' }];
                                                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                                                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                                                    }
                                                })
                                        
                                    }
                            }
                            >
                                {({ errors, touched, isValidating }) => (<Form className="profile-form">
                                    <div className="acc_img"><img src={acc_tab_img} alt="acc_tab_img" /></div>
                                    {
                                        state.messageFromServer != 'Reset password link sent on your email id.' ?
                                            [
                                                <div className="input_item center">
                                                    <h3>Forgot Password?</h3>
                                                    <p>Enter the email address associated with your account and we’ll email you instructions on how to reset your password.</p>
                                                    <div className="form-group input-group px-0 pb-0 for_icon1">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text bg-white input_filed">
                                                                <i className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                        <path d="M15.8906 2.39062H2.10938C0.946266 2.39062 0 3.33689 0 4.5V13.5C0 14.6631 0.946266 15.6094 2.10938 15.6094H15.8906C17.0537 15.6094 18 14.6631 18 13.5V4.5C18 3.33689 17.0537 2.39062 15.8906 2.39062ZM16.5938 13.5C16.5938 13.8877 16.2783 14.2031 15.8906 14.2031H2.10938C1.72167 14.2031 1.40625 13.8877 1.40625 13.5V4.5C1.40625 4.1123 1.72167 3.79688 2.10938 3.79688H15.8906C16.2783 3.79688 16.5938 4.1123 16.5938 4.5V13.5Z" fill="#4E73DF" />
                                                                        <path d="M16.4746 3.26733L9.0002 8.82683L1.52584 3.26733L0.686523 4.39567L9.0002 10.5794L17.3139 4.39567L16.4746 3.26733Z" fill="#4E73DF" />
                                                                    </svg>
                                                                </i>
                                                                <Field name="email" placeholder="email address" />
                                                             
                                                            </div>
                                                            {errors.email && touched.email && <div className='emailerrors'>{errors.email}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="forgot_foot">
                                                        <Buttons class="btn_cancel reset_button" type="button"><Link target='_self' to={'/'}>Cancel</Link></Buttons>
                                                        <Buttons class="btn_save crt_btn edit_btn" type="submit" >Continue</Buttons>
                                                    </div>
                                                </div>] :
                                            [
                                                <div className="input_item center">

                                                    <p>We’ve sent an email with the instructions to change your account password</p>
                                                    <p>If you haven’t received one please do check your spam/junk folders.</p>
                                                    <div className="forgot_foot">
                                                        <Buttons class="btn_save crt_btn edit_btn" type='button'><Link target='_self' to={'/'}>Return To Login</Link></Buttons>
                                                    </div>
                                                </div>]
                                    }
                                </Form>)}
                            </Formik>
                            {showNullError && (
                                <div>
                                    <p>The email address cannot be null.</p>
                                </div>
                            )}
                            {showError && (
                                <div>
                                    <p>That email address is not recognized. Please try again or register for a new account.</p>
                                    <Link target='_self' to={'/register'}>Register</Link>
                                </div>
                            )}
                        </div>
                        <div className="login_footer"><Footer /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ForgetPassword;
