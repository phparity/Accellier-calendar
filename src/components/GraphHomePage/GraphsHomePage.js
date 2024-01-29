import { Trans } from "react-i18next";
import Moment from "moment";
import parse from "html-react-parser";
import { Table } from "react-bootstrap";
import "../../assets/style/Home.css"
import Dropdown from "react-bootstrap/Dropdown";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiRefreshCw } from "react-icons/fi";
import { FiMaximize2 } from "react-icons/fi";
import { FiMinimize2 } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useGetReq from "../../service/useGetReq"
import usePutReq from "../../service/usePutReq";
import usePostReq from "../../service/usePostReq";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { DASHICONAPI, DELETEDASHBOARDWIDGETORDERAPI, DRAGDASHBOARDWIDGETORDERAPI, GETALLWIDGETAPI, UPDATEDASHBOARDWIDGETORDERAPI } from "../../service/ApiPath"
import GraphsTypes from "../GraphHomePage/GraphsTypes";
import Chart from 'chart.js/auto'
import { AuthContext } from "../../config/Authentications/AuthContext";
import useStorage from "../../service/useStorage";

const GraphsHomePage = () => {
  const storage = useStorage();
  const {authState} = useContext(AuthContext)
  let tenantCname = authState.tenant_cname
  let companyId = authState.company_id
  const [zoomInOutFlagAnnual, setZoomInOutFlagAnnual] = useState(false);
  const [zoomInOutFlagBalance, setZoomInOutFlagBalance] = useState(false);
  const [dash, setDash] = useState([]);
  const [allWidget, setallWidget] = useState([]);
  const [myLayout, setmyLayout] = useState([]);
  const [dragId, setDragId] = useState(0);
  const [screensz, setScreensz] = useState(false);
  const [screenszId, setScreenszId] = useState("");
  const [zoomInOut, setZoomInOut] = useState("25p");
  const [dert, setDert] = useState(window.innerWidth);
  const [annualSalesAchieved, setAnnualSalesAchieved] = useState("");
  const [annualSalesTarget, setAnnualSalesTarget] = useState("");
  const [annualSalesPercent, setAnnualSalesPercent] = useState("");
  const [temp, setTemp] = useState(0);
  const [getData] = useGetReq();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [putData] = usePutReq();
  const [widgetOrderApiData, setWidgetOrderApiData] = useState();
  const [postData] = usePostReq();
  const [addWidgetApiData, setAddWidgetApiData] = useState();
  const [err, setErr] = useState();
  const [prevDash,setPrevDash] = useState(0)
  let param = {
    params: {
      viewname: "home",
      company_id: companyId,
    },
  };



  useEffect(() => {
    getData(DASHICONAPI(tenantCname), setData1, setErr, param,storage);
    getData(GETALLWIDGETAPI(tenantCname), setallWidget,null,null,storage);

    setDert(window.innerWidth);
    setInterval(() => {
      if (window.innerWidth !== dert) {
        setZoomInOut("25p");
      }
    }, 500);
  }, []);


  useEffect(() => {
    if (data1) {
      datafunc(data1);
      for (let x = 0; x <= data1.length - 1; x++) {
        if (data1[x].id === 88 && data1[x].size === 1) {
          setZoomInOutFlagAnnual(true);
        } else if (data1[x].id === 89 && data1[x].size === 1) {
          setZoomInOutFlagBalance(true);
        }
      }
    }
    if(data2){
      datafunc(data2);
    }

    if (allWidget) setallWidget(allWidget);

    if (widgetOrderApiData) {
      datafunc(widgetOrderApiData);
      setDash(widgetOrderApiData);
    }
  }, [data1, allWidget, widgetOrderApiData]);

  useEffect(() => {
    if (addWidgetApiData) {
      setTemp(temp + 1);
      datafunc2(addWidgetApiData);
    }
    setAddWidgetApiData("");
  }, [addWidgetApiData]);


  useEffect(()=>{
    if(dash.length > 0 && allWidget.length > 0){
    if(prevDash){
      return 
    }else{    
      setPrevDash(dash.length)
      const elimAdd = allWidget.filter(e => e['report_name'] === dash[0]['report_name'])
      addwidget(elimAdd[0])

    }

    }},[dash,allWidget])

  const testbound = (layout) => {
   
  };

  const zoomdragfunc = (kum) => {
    let sizeState = "";
    kum.forEach((ele, index) => {
      setDragId(ele.i);
      if (ele.w === 1) {
        setZoomInOut("33p");
        if (ele.i === 88) {
          setZoomInOutFlagAnnual(false);
        }
        if (ele.i === 89) {
          setZoomInOutFlagBalance(false);
        }
        sizeState = 1;
      } else if (ele.w === 2) {
        setZoomInOut("50p");
        if (ele.i === 88) {
          setZoomInOutFlagAnnual(false);
        }
        if (ele.i === 89) {
          setZoomInOutFlagBalance(false);
        }
        sizeState = 2;
      } else if (ele.w === 3) {
        setZoomInOut("75p");
        if (ele.i === 88) {
          setZoomInOutFlagAnnual(false);
        }
        if (ele.i === 89) {
          setZoomInOutFlagBalance(false);
        }
        sizeState = 3;
      } else {
        setZoomInOut("100p");
        if (ele.i === 88) {
          setZoomInOutFlagAnnual(false);
        }
        if (ele.i === 89) {
          setZoomInOutFlagBalance(false);
        }
        sizeState = 4;
      }

      const apiBoxState = [
        { id: ele.i, sequence: 0, size: sizeState, delete: 0 },
      ];

      putData(
        UPDATEDASHBOARDWIDGETORDERAPI(tenantCname),
        apiBoxState,
        setWidgetOrderApiData,
        setErr,
        param
      );
    });
  };

  const datafunc = (dash2) => {
    let salesAchieved = 0;
    let salesTarget = 0;
    let salesPercent = 0;
    dash2.map((report) => {
      if (report.report_name === "Annual Sales Target") {
        Object.keys(report.reportdetails).map((repdetail) => {
          if (repdetail === "achived") {
            report.reportdetails[repdetail].map((achiv) => {
              if (achiv) salesAchieved += parseInt(achiv);
            });
          }
        });
        Object.keys(report.reportdetails).map((repdetail) => {
          if (repdetail === "target") {
            report.reportdetails[repdetail].map((tar) => {
              if (tar) salesTarget += parseInt(tar);
            });
          }
        });
      }
    });

    if (salesTarget !== 0) {
      salesPercent = (salesAchieved * 100) / salesTarget;
    } else {
      salesAchieved = 0;
      salesTarget = 0;
      salesPercent = 0;
    }

    setAnnualSalesAchieved(salesAchieved);
    setAnnualSalesTarget(salesTarget);
    setAnnualSalesPercent(salesPercent);

    setDash(dash2);
    setmyLayout(
      dash2.map((now) => {
        now = {
          i: now.id.toString(),
          x: now.xaxis,
          y: now.yaxis,
          w: now.size,
          h: 1,
        };
        return now;
      })
    );
  };

  const datafunc2 = (dash2) => {
    setDash(dash2);
    setmyLayout(
      dash2.map((now, i) => {
        if (dash2.length - 1 == i) {
          now = {
            i: now.id.toString(),
            x:
              dash2[dash2.length - 1].xaxis === 3
                ? 0
                : dash2[dash2.length - 1].xaxis,
            y:
              dash2[dash2.length - 1].xaxis === 3
                ? dash2[dash2.length - 1].yaxis + 1
                : dash2[dash2.length - 1].yaxis,
            w: now.size,
            h: 1,
          };
        } else {
          now = {
            i: now.id.toString(),
            x: now.xaxis,
            y: now.yaxis,
            w: now.size,
            h: 1,
          };
        }
        return now;
      })
    );

  };

  const dragfunc = (layout) => {
    const dragBoxState = dash.map((box, h) => {
      if (layout[h].i == box.id) {
        box = {
          id: box.id,
          sequence: box.sequence,
          xaxis: layout[h].x,
          yaxis: layout[h].y,
          delete: 0,
        };
      } else {
        box = {
          id: box.id,
          sequence: box.sequence,
          xaxis: box.xaxis,
          yaxis: box.yaxis,
          delete: 0,
        };
      }
      return box;
    });

    putData(
      DRAGDASHBOARDWIDGETORDERAPI(tenantCname),
      dragBoxState,
      setWidgetOrderApiData,
      setErr,
      param
    );

   
  };

  const addwidget = (aw) => {
    postData(
      "/" + tenantCname + "/api/addwidget",
      {
        widgetid: aw.widgetid,
        viewname: "home",
        company_id: companyId,
      },
      setAddWidgetApiData,
      setErr
    );

   
  };

  const delwidget = (dl) => {
    setTemp(temp - 1);
    const delBoxState = dash.map((box) => {
      if (dl.id === box.id) {
        box = { id: box.id, sequence: box.sequence, delete: 1 };
      } else {
        box = { id: box.id, sequence: box.sequence, delete: 0 };
      }
      return box;
    });

    putData(
      DELETEDASHBOARDWIDGETORDERAPI(tenantCname),
      delBoxState,
      setWidgetOrderApiData,
      setErr,
      param
    );
    if(dash.length>0){
      addwidget(dash[0])
    };
  };

  const refreshfunc = () => {
    getData(DASHICONAPI(tenantCname), setData2, setErr, param,storage);
  }

  const setScreenzHandle = (id) => {
    setScreensz(!screensz);
    setScreenszId(id);
  };

  const zoominfunc = (kum) => {
    let sizeState = "";
    setDragId(kum.id);
    if (kum.size === 1) {
      setZoomInOut("33p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 2;
    } else if (kum.size === 2) {
      setZoomInOut("50p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 3;
    } else if (kum.size === 3) {
      setZoomInOut("75p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 4;
    } else {
      setZoomInOut("100p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 4;
    }

    const apiBoxState = [
      { id: kum.id, sequence: 0, size: sizeState, delete: 0 },
    ];

    putData(
      UPDATEDASHBOARDWIDGETORDERAPI(tenantCname),
      apiBoxState,
      setWidgetOrderApiData,
      setErr,
      param
    );

   
  };

  const zoomoutfunc = (kum) => {
    let sizeState = "";
    setDragId(kum.id);
    if (kum.size === 4) {
      setZoomInOut("75p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 3;
    } else if (kum.size === 3) {
      setZoomInOut("50p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 2;
    } else if (kum.size === 2 || 50) {
      setZoomInOut("33p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(true);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(true);
      }
      sizeState = 1;
    } else {
      setZoomInOut("25p");
      if (kum.id === 88) {
        setZoomInOutFlagAnnual(false);
      }
      if (kum.id === 89) {
        setZoomInOutFlagBalance(false);
      }
      sizeState = 1;
    }

    const apiBoxState = [
      { id: kum.id, sequence: kum.sequence, size: sizeState, delete: 0 },
    ];

    putData(
      UPDATEDASHBOARDWIDGETORDERAPI(tenantCname),
      apiBoxState,
      setWidgetOrderApiData,
      setErr,
      param
    );

    
  };

  return (
    <div className="detail_parent parent_padding">
      <div className="container-fluid col-12">
       <div className="row">
          <div className="col-12">
            <div className="view_page_head chart_page_head">
              <div className="page_head">
                <h3>Widgets</h3>
              </div>
              <div className="crt_btn_div chart_selection_wrap">
                <div className="btn_actions_right chart_selection_btn">
                  <div className="show dropdown">
                    <Dropdown>
                      <Dropdown.Toggle className="btn-more MoreWidgets" id="dropdown-basic dropdownMoreButton">
                        More Widgets &nbsp;
                      </Dropdown.Toggle>
                      <DropdownMenu >
                        {allWidget && allWidget.length > 0 ?
                          allWidget.map((aw) => (
                            <Dropdown.Item key={aw.widgetid} onClick={() => addwidget(aw)}>
                              {aw.report_name}
                            </Dropdown.Item>
                          )) : <Dropdown.Item> {"No Widgets Available"} </Dropdown.Item>
                        }
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 bnds">
            <div className="sortWrap">
              {temp > 0 && (
                <div id="sortable">
                  <GridLayout
                    className="layout"
                    layout={myLayout}
                    draggableHandle=".dragHead"
                    preventCollision={false}
                    onDragStart={testbound}
                    onResizeStop={zoomdragfunc}
                    onDragStop={dragfunc}
                    compactType={null}
                    isResizable={true}
                    cols={screensz ? 1 : 4}
                    rowHeight={screensz ? 925 : 375}
                    width={
                      window.innerWidth > 1530
                        ? window.innerWidth - 30
                        : window.innerWidth
                    }
                  >
                    {(dash || [])
                      .sort((a, b) => a.sequence - b.sequence)
                      .map((dashline, i) =>
                        dashline.type !== "table" ? (
                          <div
                            key={dashline.id}
                            className={
                              screensz && screenszId === i
                                ? "ui-state-default fullscreen"
                                : "ui-state-default normalscreen"
                            }
                          >
                            <div className="chartWrapper">
                              <div
                                id="mydiv0"
                                className={
                                  screensz && screenszId === i
                                    ? "mydiv "
                                    : "mydiv "
                                }
                              >
                                <div
                                  className="reziseDiv"
                                  style={{
                                    backgroundColor:
                                      "rgb(255, 255, 255)",
                                  }}
                                >
                                  <div className="chartDraghead">
                                    <div className="widget-cntrl">
                                      <button
                                        id="removeChart"
                                        className="removeChart"
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "82px" }
                                            : { right: "110px" }
                                        }
                                        onClick={() => delwidget(dashline)}
                                      >
                                        <RiDeleteBin6Line className="chartCrtl" />
                                      </button>
                                      <button
                                        id="refreshBtn"
                                        className="refreshBtn"
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "57px" }
                                            : { right: "80px" }
                                        }
                                        onClick={refreshfunc}
                                      >
                                      <FiRefreshCw className="chartCrtl1" />
                                      </button>
                                      <button
                                        id="zoomChart"
                                        className="zoomChart"
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "32px" }
                                            : { right: "50px" }
                                        }
                                        onClick={() => setScreenzHandle(i)}
                                      >
                                        {screensz && screenszId === i ? (
                                          <FiMinimize2 className="chartCrtl" />
                                        ) : (
                                          <FiMaximize2 className="chartCrtl" />
                                        )}
                                      </button>
                                      <button
                                        onClick={() => zoominfunc(dashline)}
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "104px" }
                                            : { right: "140px" }
                                        }
                                        className="zoomIn1"
                                        id="mydivheader"
                                      >
                                        <BsPlusCircleFill className="chartCrtl" />
                                      </button>
                                      <button
                                        onClick={() => zoomoutfunc(dashline)}
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "125px" }
                                            : { right: "170px" }
                                        }
                                        className="zoomOut1"
                                        id="mydivheader"
                                      >
                                        <FaMinusCircle className="chartCrtl" />
                                      </button>
                                      <button
                                        onClick={() => setDragId(i)}
                                        style={
                                          zoomInOutFlagAnnual
                                            ? { right: "10px" }
                                            : { right: "20px" }
                                        }
                                        id="mydivheader"
                                        className="dragHead"
                                      >
                                        <HiOutlineViewGrid className="chartCrtl" />
                                      </button>
                                    </div>
                                    <div
                                      className="widget-report-name"
                                      style={
                                        zoomInOutFlagAnnual
                                          ? {
                                            fontSize: "13px",
                                            marginTop: "4px",
                                          }
                                          : { fontSize: "16px" }
                                      }
                                    >
                                      {dashline.report_name}
                                    </div>
                                  </div>
                                  
                                    <GraphsTypes dashline={dashline} target={annualSalesTarget} achieved={annualSalesAchieved} percent={annualSalesPercent} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : dashline.type === "table" ? (
                          <div
                            key={dashline.id.toString()}
                            className={
                              screensz && screenszId === i
                                ? "ui-state-default fullscreen"
                                : "ui-state-default normalscreen"
                            }
                          >
                            <div className="chartWrapper">
                              <div
                                id="mydiv0"
                                className={
                                  screensz && screenszId === i
                                    ? "mydiv fullscreen"
                                    : "mydiv normalscreen"
                                }
                              >
                                <div
                                  className="reziseDiv"
                                  style={{
                                    backgroundColor: "rgb(255, 255, 255)",
                                  }}
                                >
                                  <div className="chartDraghead">
                                    <div
                                      className="widget-report-name"
                                      style={
                                        zoomInOutFlagBalance
                                          ? {
                                            fontSize: "13px",
                                            marginTop: "4px",
                                          }
                                          : { fontSize: "16px" }
                                      }
                                    >
                                      {dashline.report_name}
                                    </div>
                                    <button
                                      id="removeChart"
                                      className="removeChart"
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "82px" }
                                          : { right: "110px" }
                                      }
                                      onClick={() => delwidget(dashline)}
                                    >
                                      <RiDeleteBin6Line className="chartCrtl" />
                                    </button>
                                    <button
                                      id="refreshBtn"
                                      className="refreshBtn"
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "57px" }
                                          : { right: "80px" }
                                      }
                                      onClick={refreshfunc}
                                    >
                                      <FiRefreshCw className="chartCrtl1" />
                                    </button>
                                    <button
                                      id="zoomChart"
                                      className="zoomChart"
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "32px" }
                                          : { right: "50px" }
                                      }
                                      onClick={() => setScreenzHandle(i)}
                                    >
                                      {screensz && screenszId === i ? (
                                        <FiMinimize2 className="chartCrtl" />
                                      ) : (
                                        <FiMaximize2 className="chartCrtl" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => zoominfunc(dashline)}
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "104px" }
                                          : { right: "140px" }
                                      }
                                      className="zoomIn1"
                                      id="mydivheader"
                                    >
                                      <BsPlusCircleFill className="chartCrtl" />
                                    </button>
                                    <button
                                      onClick={() => zoomoutfunc(dashline)}
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "125px" }
                                          : { right: "170px" }
                                      }
                                      className="zoomOut1"
                                      id="mydivheader"
                                    >
                                      <FaMinusCircle className="chartCrtl" />
                                    </button>
                                    <button
                                      id="mydivheader"
                                      style={
                                        zoomInOutFlagBalance
                                          ? { right: "10px" }
                                          : { right: "20px" }
                                      }
                                      className="dragHead"
                                    >
                                      <HiOutlineViewGrid className="chartCrtl" />
                                    </button>
                                  </div>
                                  <div className="chartjs-size-monitor" >
                                    <div className="chartjs-size-monitor-expand">
                                      <div className=""></div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink">
                                      <div className=""></div>
                                    </div>
                                  </div>
                                  <div className="chart_table_wrap customer_table ci">
                                    <Table striped bordered hover>
                                        <thead>
                                          <tr>
                                            {(dashline.reportdetails || []).map(
                                              (nr, i) =>
                                                i == 0
                                                  ? Object.keys(nr).map(
                                                    (keyname) =>
                                                      keyname.match(
                                                        /id/g
                                                      ) ? null : (
                                                        <th
                                                          style={{
                                                            width:
                                                              100 /
                                                              Object.keys(nr)
                                                                .length +
                                                              "%",
                                                          }}
                                                        >
                                                          <Trans>
                                                            {keyname
                                                              .replace(
                                                                /_/g,
                                                                " "
                                                              )
                                                              .toUpperCase()}
                                                          </Trans>
                                                        </th>
                                                      )
                                                  )
                                                  : null
                                            )}
                                          </tr>
                                        </thead>
                                      <tbody>
                                        {(dashline.reportdetails || []).map(
                                          (nr2) => (
                                            <tr>
                                              {Object.keys(nr2).map(
                                                (keyname2) =>
                                                  keyname2.match(
                                                    /id/g
                                                  ) ? null : (
                                                    <td
                                                      className="pl-2"
                                                      data-title={nr2[keyname2]}
                                                    >
                                                      {Moment(
                                                        nr2[keyname2]
                                                      ).isValid() &&
                                                        keyname2.match(/date/g)
                                                        ? Moment(
                                                          nr2[keyname2]
                                                        ).format("DD-MM-YYYY")
                                                        : nr2[keyname2].match(
                                                          /href=/g
                                                        )
                                                          ? parse(
                                                            nr2[
                                                              keyname2
                                                            ].replace(
                                                              "SITE_URL",
                                                              "https://events-ui.accellier.net"
                                                            )
                                                          )
                                                          : nr2[keyname2]}
                                                    </td>
                                                  )
                                              )}
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null
                      )}
                  </GridLayout>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GraphsHomePage;
