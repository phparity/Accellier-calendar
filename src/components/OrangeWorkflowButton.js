import React, { useContext, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Draggable from "react-draggable";
import Group_75 from "../assets/images/Group_75.png";
import "../assets/style/OrangeWorkflowButton.css";
import axios from "../config/Axios";
import { IoMdClose } from "react-icons/io";
import { useParams, useLocation } from "react-router-dom";
import { CheckModuleName } from "../utils/CheckModuleName";
import { Drawer } from "@mui/material";
import DrawerGraph from "./drawerGraph";
import { AuthContext } from "../config/Authentications/AuthContext";
import { recordErrorAPIdata } from "../service/useApiData";

const OrangeWorkflowButton = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  // const [tenantCname, setTenantCname] = useState(localStorage.getItem("tenant_cname"));
  let tenantCname = authState.tenant_cname;
  const [show, setShow] = useState(false);
  const [dash, setDash] = useState([]);
  // const [value, setValue] = useState({})
  // const [path, setPath] = useState('')

  const [label, setLabel] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [gData, setGdata] = useState([]);
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let module_name = useLocation().pathname?.split("/home/")[1]?.split("/")[0];
  let detailsId = useLocation().pathname.split("/home/")[1]?.split("/");
  let logData = [];
  let viewData = {};
  viewData = {
    view_name: sessionStorage.getItem("vwname"),
    company_id: localStorage.getItem("companyId"),
    user_id: localStorage.getItem("userid"),
    user_ip: sessionStorage.getItem("ipAddress"),
  };
  // let module_name = localStorage.getItem("prev_module_name");
  if (pathname === "/" || !module_name) return null;
  // let module_name = CheckModuleName();
  if (module_name === "accounts") {
    module_name = "customer";
  } else if (module_name === "contacts") {
    module_name = "contact";
  } else if (module_name === "inventory") {
    module_name = "product";
  } else if (module_name === "opportunities") {
    module_name = "opportunity";
  } else if (pathname === "/home") {
    module_name = "home";
  } else if (module_name?.slice(-1) === "s") {
    module_name = module_name.slice(0, -1);
  } else {
    module_name = module_name;
  }
  // app.automateevents.com -- production server
  // if(path === "https://events-ui.accellier.net/#/home/customer"){
  //     modules = "customer"
  // }else if(path === "https://events-ui.accellier.net/#/home/customer/detail"){
  //   modules = "venue"
  // }else if(path === "https://events-ui.accellier.net/#/home"){
  //   modules = "activities"
  // }else {
  //   modules = ""
  // }

  // labels: ['January', 'February', 'March',
  //            'April', 'May'],
  // datasets: [
  //   {
  //     label: 'Rainfall',
  //     fill: false,
  //     lineTension: 0.5,
  //     backgroundColor: 'rgba(75,192,192,1)',
  //     borderColor: 'rgba(0,0,0,1)',
  //     borderWidth: 2,
  //     data: [65, 59, 80, 81, 56]
  //   }
  // ]

  // class DraggableModalDialog extends React.Component {
  //   render() {
  //       return <Draggable handle=".modal-title"><ModalDialog
  //       {...props} /></Draggable>
  //     }
  // }

  // useEffect(() => {
  //   setPath(window.location.href)
  // }, [window.location.href])

  // const modaal = () => {
  //   let vwname = ''
  //   if(window.location.href.match(/detail/g)){
  //     vwname = 'detail'
  //   }else{
  //     vwname = 'index'
  //   }
  //   if (module_name === "home"){
  //     axios.get("/"+tenantCname+"/api/dashicon", {
  //         headers:{
  //             "Accept": "application/JSON",
  //             "Authorization": "Bearer " + localStorage.getItem('token')
  //         },
  //         params:{
  //             "viewname": "home",
  //             "company_id": localStorage.getItem("companyId")
  //         }
  //       }
  //         )
  //     .then((res) => {
  //         datafunc(res.data)
  //     })
  //     .catch(err => {
  //         console.log(err)
  //     })
  //   }else{
  //   axios.get("/"+tenantCname+"/api/dashicon", {
  //         headers:{
  //             "Accept": "application/JSON",
  //             "Authorization": "Bearer " + localStorage.getItem('token')
  //         },
  //         params:{
  //             "module": module_name,
  //             "view": vwname,
  //             "company_id": localStorage.getItem("companyId")
  //         }
  //       }
  //         )
  //     .then((res) => {
  //       console.log(res, '126');
  //         datafunc(res.data)
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //     })
  //   }
  //   setIsDrawerOpen(true);
  //     // setShow(true)
  // }

  // const getv = (e) => {
  //   const name = e.target.name;
  //     const value = e.target.value;
  //     setValue({ [name]: value })
  // }

  const embeddingModule = () => {
    let dataSet = {};
    let vwname = "";
    if (window.location.href.match(/detail/g)) {
      vwname = "detail";
      dataSet = {
        detailsId:
          detailsId[detailsId.length - 1] !== undefined
            ? detailsId[detailsId.length - 1]
            : null,
        filter: "embedding_module=" + module_name + "&embedding_view=" + vwname,
        order: "embedding_order:asc",
        company_id: localStorage.getItem("companyId"),
      };
    } else {
      vwname = "index";
      dataSet = {
        filter: "embedding_module=" + module_name + "&embedding_view=" + vwname,
        order: "embedding_order:asc",
        company_id: localStorage.getItem("companyId"),
      };
    }
    setDash([]);
    if (module_name === "home") {
      axios
        .get("/" + tenantCname + "/api/embedding", {
          headers: {
            Accept: "application/JSON",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: { ...dataSet },
        })
        .then((res) => {
          datafunc(res.data);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${"embedding"}`,
              payload: { ...dataSet },
              response: res.data,
              status_code: res.status,
              error_details: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        })
        .catch((err) => {
          console.log(err);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${"embedding"}`,
              payload: { ...dataSet },
              response: [],
              error_details: err,
              status_code: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        });
    } else {
      axios
        .get("/" + tenantCname + "/api/embedding", {
          headers: {
            Accept: "application/JSON",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: { ...dataSet },
        })
        .then((res) => {
          // console.log(res, '126');
          datafunc(res.data);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${"embedding"}`,
              payload: { ...dataSet },
              response: res.data,
              status_code: res.status,
              error_details: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        })
        .catch((err) => {
          console.log(err);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${"embedding"}`,
              payload: { ...dataSet },
              response: [],
              error_details: err,
              status_code: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        });
    }
    setIsDrawerOpen(true);
    // setShow(true)
  };

  const datafunc = (dash2) => {
    setDash(dash2);
    setShow(true);
    // console.log(dash2, 'dash2');
    dash2?.data?.map((dashe) => {
      if (dashe?.embedding_type === "Report") {
        // console.log(dashe, '200');
        let gTitle = "";
        if (dashe?.embedding_graphtitle !== undefined) {
          gTitle = dashe?.embedding_graphtitle;
        } else {
          gTitle = null;
        }
        graphEmbed(dashe?.embedding_value, gTitle);
      }
      // [setLabel(dashe.reportdetails.labels), setDataa(dashe.reportdetails.datasets)] : null
    });
  };
  // {
  //   dash.map((dashe)=>(
  //     dashe.sequence === "2" ?
  //     [label = dashe.reportdetails.labels, dataa = dashe.reportdetails.datasets] : null
  //   ))
  // }

  const graphEmbed = (reportId, graphTitle) => {
    // console.log(reportId, graphTitle, '222');
    axios
      .get("/" + tenantCname + "/api/getreport", {
        headers: {
          Accept: "application/JSON",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          report_id: reportId,
          graph_only: 1,
          graph_title: graphTitle,
        },
      })
      .then((res) => {
        // console.log(res, '229');
        setGdata(res?.data?.graph_data);
        logData = [
          {
            ...viewData,
            module_name: module_name,
            api: `/${"embedding"}`,
            payload: {
              report_id: reportId,
              graph_only: 1,
              graph_title: graphTitle,
            },
            response: res.data,
            status_code: res.status,
            error_details: "",
          },
        ];
        if (
          Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
          Number(sessionStorage.getItem("debugMode")) === 1
        ) {
          recordErrorAPIdata(localStorage.getItem("tenant_cname"), ...logData);
        }
      })
      .catch((err) => {
        console.log(err);
        logData = [
          {
            ...viewData,
            module_name: module_name,
            api: `/${"embedding"}`,
            payload: {
              report_id: reportId,
              graph_only: 1,
              graph_title: graphTitle,
            },
            response: [],
            error_details: err,
            status_code: "",
          },
        ];
        if (
          Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
          Number(sessionStorage.getItem("debugMode")) === 1
        ) {
          recordErrorAPIdata(localStorage.getItem("tenant_cname"), ...logData);
        }
      });
    // setShow(true)
  };

  let state = {
    labels: label,
    datasets: [
      {
        label: "Report Details",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: dataa,
      },
    ],
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <img
        className="modale_btn"
        id="ani"
        src={Group_75}
        alt="Group_75"
        onClick={embeddingModule}
      />
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <div className="drawer-content drawer-boxSize">
          <i onClick={closeDrawer} className="closeButton">
            <IoMdClose style={{ width: "24px", height: "24px" }} />
          </i>
          <div className="row">
            <div className="col-12 bnds">
              <div className="sortWrap">
                {/* <ul id="sortable"> */}
                {(dash?.data || [])
                  .sort((a, b) => a.embedding_order - b.embedding_order)
                  .map(
                    (dashline, i) => (
                      console.log(dashline?.embedding_name, "283"),
                      dashline.embedding_type === "Report" ? (
                        // <Draggable handle=".dragHead"
                        //   defaultPosition={{ x: 0, y: 0 }} position={null}
                        //   grid={[25, 25]} scale={1}>
                        //   <li key={dashline.id} className={"ui-state-default chart-100p"} draggable={false}>
                        <div className="card m-3" key={i}>
                          <div className="card-header">
                            {dashline?.embedding_name !== ""
                              ? dashline?.embedding_name
                              : "Report Graph"}
                          </div>
                          <div className="card-body text-center">
                            <DrawerGraph graphlistData={gData} />
                          </div>
                        </div>
                      ) : //   </li>
                      // </Draggable>
                      dashline.embedding_type === "Text" ? (
                        // <Draggable handle=".dragHead"
                        //   defaultPosition={{ x: 0, y: 0 }}
                        //   position={null} grid={[25, 25]} scale={1}>
                        //   <li key={dashline.id} className={"ui-state-default chart-100p"} draggable={false}>
                        //     <div className="chartWrapper text-center">

                        <div className="card m-3" key={i}>
                          <div className="card-header">
                            {dashline?.embedding_name !== ""
                              ? dashline?.embedding_name
                              : "Notes"}
                          </div>
                          <div className="card-body text-center">
                            <p>{dashline.embedding_value}</p>
                          </div>
                        </div>
                      ) : //   </li>
                      // </Draggable>

                      dashline.embedding_type === "IFrame" ? (
                        // <Draggable handle=".dragHead"
                        //   defaultPosition={{ x: 0, y: 0 }}
                        //   position={null} grid={[25, 25]} scale={1}>
                        //   <li key={dashline.id} className={"ui-state-default chart-100p"} draggable={false}>
                        //     <div className="chartWrapper">

                        <div className="card m-3" key={i}>
                          <div className="card-header">
                            {dashline?.embedding_name !== ""
                              ? dashline?.embedding_name
                              : "IFrame"}
                          </div>
                          <div className="card-body text-center">
                            {}
                            <iframe
                              style={{ pointerEvents: "none" }}
                              src={
                                dashline?.embedding_value.indexOf(
                                  "trimmedValue",
                                ) !== -1
                                  ? window.location.origin +
                                    "/#/home" +
                                    dashline?.embedding_value.split(
                                      "trimmedValue",
                                    )[1]
                                  : dashline?.embedding_value
                              }
                              height={400}
                              width={"100%"}
                            />
                          </div>
                        </div>
                      ) : //   </li>
                      // </Draggable>
                      dashline.embedding_type === "Image" ? (
                        // <Draggable handle=".dragHead"
                        //   defaultPosition={{ x: 0, y: 0 }}
                        //   position={null} grid={[25, 25]} scale={1}>
                        //   <li key={dashline.id} className={"ui-state-default chart-100p"} draggable={false}>
                        //     <div className="chartWrapper text-center">

                        <div className="card m-3" key={i}>
                          <div className="card-header">
                            {dashline?.embedding_name !== ""
                              ? dashline?.embedding_name
                              : "Image"}
                          </div>

                          <div className="card-body text-center">
                            <img
                              src={dashline?.embedding_value}
                              alt=""
                              width="100%"
                              height=""
                            />
                          </div>
                        </div>
                      ) : //   </li>
                      // </Draggable>

                      dashline.embedding_type === "table" ? (
                        <Draggable
                          handle=".dragHead"
                          defaultPosition={{ x: 0, y: 0 }}
                          position={null}
                          grid={[25, 25]}
                          scale={1}
                        >
                          <li
                            key={dashline.id}
                            className={"ui-state-default chart-100p"}
                            draggable={false}
                          >
                            <div className="chartWrapper">
                              <div id="mydiv0" className={"mydiv normalscreen"}>
                                <div
                                  className="reziseDiv"
                                  style={{
                                    backgroundColor: "rgb(255, 255, 255)",
                                  }}
                                >
                                  <div className="chartDraghead">
                                    {dashline.report_name}
                                  </div>
                                  <div className="chartjs-size-monitor">
                                    <div className="chartjs-size-monitor-expand">
                                      <div className=""></div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink">
                                      <div className=""></div>
                                    </div>
                                  </div>
                                  <div className="chart_table_wrap customer_table">
                                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Data</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(dash || []).map((da, i) =>
                                          (da.reportdetails.labels || []).map(
                                            (label, d) =>
                                              (
                                                da.reportdetails.datasets || []
                                              ).map((dts, k) =>
                                                d === k ? (
                                                  <tr key={k}>
                                                    <td data-title="Name">
                                                      {label}
                                                    </td>
                                                    <td
                                                      className="pl-1"
                                                      data-title="Venue Code"
                                                    >
                                                      {dts}
                                                    </td>
                                                  </tr>
                                                ) : null,
                                              ),
                                          ),
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </Draggable>
                      ) : null
                    ),
                  )}
                {/* </ul> */}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      {/* <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        // dialogcomponent={DraggableModalDialog}
        scrollable = {true}
        className="dashboard_modal"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            <div onClick={() => setShow(false)}><i><IoMdClose/></i></div>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>


          {/* { (dash || []).map((dashtable)=>(
            dashtable.type == "table"?
            <div className="chart_top">
              <div className="chart_table_wrap customer_table">
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                        (dash || []).map((da, i)=>(
                          da.sequence === 2 ?
                          da.reportdetails.labels.map((label, d)=>(
                              da.reportdetails.datasets.map((dts, k)=>(
                                d === k ?
                            <tr key={k}>
                              <td data-title="Name">{label}</td>
                              <td data-title="Venue Code">{dts}</td>
                            </tr> : null
                              )
                            )
                            )
                          )
                          
                          : null
                        ))
                    }
                </tbody>
                </Table>
              </div>
            </div>
        
            : null
          ))
          }
        <div className="mt-5">
          { (dash || []).map((dashline)=>(
            dashline.type === "bar" ?
          <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Reports',
              fontSize:16
            },
            // legend:{
            //   display:true,
            //   position:'left'
            // }
          }}
        />
        : null
          ))
          }
      </div>

          <div>
            {
              dash.map((dashlink)=>(
                dashlink.type === "link" ?
                <h3>Links: {dashlink.reportdetails}</h3> : null
              ))
            }
          </div> */}
      {/* </Modal.Body>
        
      </Modal> */}
    </>
  );
};

export default OrangeWorkflowButton;
