/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "../config/Axios"
import ReactPaginate from 'react-paginate';  
import "../assets/style/CustomerList.css"
import Dropdown from "react-bootstrap/Dropdown"
import "../assets/style/CustomerList.css"
import {CheckModuleName} from "../utils/CheckModuleName"
import {UpdateCustList} from "./DataTable"
import {UpdateDetails} from "./DataTable"
import { AuthContext } from '../config/Authentications/AuthContext';
import useGetReq from '../service/useGetReq';
import { d_table } from '../pages/CustomerList';
import useStorage from '../service/useStorage';

const Pagination = (props) =>{
    const storage = useStorage();
    const { authState,setAuthState } = useContext(AuthContext)
    const {cuslist, setCuslist}= useContext(UpdateCustList);
    const { details, setDetails}= useContext(UpdateDetails);
    const { current_pages, setCurrent_pages} = useContext(d_table)
    const tenantCname = authState.tenant_cname
    const [offset, setOffset] = useState(localStorage.getItem("page") ||1);
    const [noofdata, setNoofdata] = useState("")
    const [err, setErr] = useState()
    const [updatePage, setUpdatePage] = useState()
    const [numOffData, setNumOffData] = useState()
    const [getData] = useGetReq();
    let valuexy= props.valuexy


    let module_name = CheckModuleName()
    useEffect(()=>{
        // console.log("3555555",offset,"222",current_pages)
        current_pages&& setOffset(current_pages)
    },[current_pages])

    const mod_name = localStorage.getItem("prev_module_name");
    useEffect(()=>{
        // console.log("4111111",offset,"222",current_pages,"333",localStorage.getItem("page") )
        current_pages&& setOffset(1)
    },[mod_name])

    useEffect(() => {
        if (updatePage) {
            setCuslist(updatePage.data)
            setDetails(updatePage)
        }
     
    },[updatePage])

    useEffect(()=>{

        if(numOffData){
            // setOffset(localStorage.getItem("page")?localStorage.getItem("page"):1)
            (numOffData.from == null && numOffData.to == null ? (props.reset(1), localStorage.setItem("page", 1)) :
            setCuslist(numOffData.data),
            setDetails(numOffData))
    }

    },[numOffData])

    const handlePageClick = (e) => {
        let spy = ''
        if (module_name === "report"){
            spy = "userreportlist"
        }else{
            spy = module_name
        }
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    

        let param={ 
            data14: {
                params: {
                    "ipp": authState.line || details.per_page,
                    "page": selectedPage + 1,
                    "filter": valuexy,
                    "order": authState.order
                }
            },
        }
        getData("/"+tenantCname+"/api/"+spy, setUpdatePage, setErr,param.data14 ,storage);
        setAuthState({ ...authState, page: selectedPage + 1, onClickMenuModule: module_name })
        localStorage.setItem("page",selectedPage + 1)
        localStorage.setItem("onClickMenuModule", module_name)
        localStorage.setItem("pageData", JSON.stringify(cuslist))
    };

    
    const datanum_chnage=(num)=>{
        setNoofdata(num)
        let spy = ''
        if (module_name === "report"){
            spy = "userreportlist"
        }else{
            spy = module_name
        }

        let param={ 
            data1: {
                params: {
                    "page": details.current_page,
                    "ipp": num,
                    "filter": valuexy
                }
            },
        }
        getData("/"+tenantCname+"/api/"+spy, setNumOffData, setErr,param.data1,storage );
        setAuthState({...authState,line:num})
        localStorage.setItem("line", num)
    }

    let page = [];
        for (var pages=1; pages <= [details.total/details.per_page]; pages++){
            page.push(pages)
         }
         if (details.total%details.per_page != 0){
             page.push(page.length+1)
         }
    let no_Of_Data = [10, 25, 50, 75, 100, 250, 500];

    return (
   
            <div className="para">
                <div className="d-flex show-tab">
                    <label>Show</label>
                    <Dropdown drop='up'>
                        <Dropdown.Toggle className="btn btn-more dropdown-toggle" id="dropdown-basic dropdownShowButton">
                        {details.per_page}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                no_Of_Data.map((number)=>( 
                                    <Dropdown.Item key={number} href="#" onClick={()=>datanum_chnage(number)}>{number}</Dropdown.Item>
                                    ))
                            }
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <nav aria-label="pagination">
                    <ul className="pagination">
                    
                            <ReactPaginate
                                disableInitialCallback={true}
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={details.last_page ||0}
                                initialPage={offset-1}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                //using forcePage instead of initialPage to activate & highlight current page number
                                forcePage={offset-1}/>
                    </ul>
                </nav>
                    
            </div> 

)

}
export default Pagination;