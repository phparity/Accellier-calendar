import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
import "./style.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getReportFieldsAddEditAPIdata,
  getReportFieldsUpdateAPIdata,
  saveReportDetailsAPIdata,
} from "../../service/useApiData";
import { AuthContext } from "../../config/Authentications/AuthContext";
import {
  Typography,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button, OutlinedInput, Chip, ListItemText, InputLabel, Tooltip
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UiParamter from "../../config/conditional_params";
import { CheckModuleName } from "../../utils/CheckModuleName";
import { Trans } from 'react-i18next';
import i18n from "../../config/i18n";
import axios from "../../config/Axios";
import { BiInfoCircle } from "react-icons/bi";
import ShowErrorMsg from "../../components/ShowErrorMsg";
import { searchTableModuleValue } from "../../navigation/PageRoutes";

const windowHeight = window?.screen?.height;
const ReportCreatePage = () => {
  const { searchTableModule, searchRelatedTo, setSearchRelatedTo, uitype_module, setUitype_module,smShowError, setSmShowError,error_msg, setError_msg } = useContext(searchTableModuleValue);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const { authState, setAuthState } = useContext(AuthContext);
  const tenantCname = authState.tenant_cname;
  const [reportFields, setReportFields] = React.useState([]);
  const [checkedFields, setCheckedFields] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState([]);
  const [conditionalData, setConditionalData] = React.useState([]);
  const [graphData, setGraphData] = React.useState([]);
  const [axisList, setAxisList] = React.useState([]);
  const [xAxisData, setXaxisData] = React.useState([]);
  const [yAxisData, setYaxisData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [createReportStatus, setCreateReportStatus] = React.useState("");

  const [selectedGroup, setSelectedGroup] = React.useState(false);
  const [tabState, setTabState] = React.useState(1);
  const [name, setName] = React.useState("");
  const [reportName, setReportName] = React.useState("");
  const [groupedBy, setGroupedBy] = React.useState(false);
  const [mutliFlag, setMutliFlag] = React.useState(true);
  const [newSelect, setNewSelect] = React.useState(false);
  const [selectedIndices, setSelectedIndices] = React.useState([]);
  let { said } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const [yAxisValue, setYAxisValue] = useState([]);
  const [yAxisColor, setYAxisColor] = useState([]);
  const [yAxisValues, setYAxisValues] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const[stateName, setStateName] = useState("Create new ");
  // using an array to store the checked items
  const [isChecked, setIsChecked] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [selectedCheckboxParameter, setSelectedCheckboxParameter] =
    useState(false);
  const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const lang = authState.language;
  if (lang) {
    i18n.changeLanguage(lang);
  }

  let module_name = CheckModuleName()

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const isSelected = (index) => selectedField[index]?.selected || false;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleAddOnClick = (event, name, index) => {
    const { selected, reportFn, styleField, logic, newFieldLabel, para_condition, sorting, ...newConfig } =
      name;
    if (value === 0) {
      name.sorting = "";
      name.reportFn = "";
      name.newFieldLabel = "";

      name.styleField = "";
      name.selected = false;
      //name.para_condition = false;
      //name.reportBracket = "";

      selectedField.push(name);
      setSelectedField((prevFields) =>
        prevFields.map((field, i) => ({
          ...field,
          // selected: selectedCheckbox,
        }))
      );
    } else if (value === 1) {
      newConfig.logic = "AND";
      newConfig.conditional_operator = "";
      newConfig.value = "";
      newConfig.para_condition = false;
      newConfig.reportBracket = "";

      // name.para_condition = false;
      conditionalData.push(newConfig);
      setConditionalData((prevFields) =>
        prevFields.map((field, i) => ({
          ...field,
          // selected: selectedCheckbox,
        }))
      );
    }
  };

  const handleRemoveOnClick = (event, index) => {
    let closingIndex = -1;
    if (conditionalData[index]?.reportBracket === "(") {
      // Find the index of the corresponding closing parenthesis

      let count = 0;

      for (let i = index + 1; i < conditionalData.length; i++) {
        if (conditionalData[i]?.reportBracket === "(") {
          count++;
        } else if (conditionalData[i]?.reportBracket === ")") {
          if (count === 0) {
            closingIndex = i;
            break;
          } else {
            count--;
          }
        }
      }

      if (closingIndex !== -1) {
        // console.log(closingIndex, index, "kju");
        // Remove both the opening and closing parentheses
        // newArray.splice(closingIndex, 1);
        // newArray.splice(clickedIndex, 1);

        // // Update the state with the modified array
        // setParanthesesArray(newArray);
      }
    }
    if (value === 0) {
      setSelectedField((oldValues) => {
        return oldValues.filter((_, i) => i !== index);
      });
    } else if (value === 1) {
      setConditionalData((oldValues) => {
        return oldValues.filter((_, i) => i !== index && i !== closingIndex);
      });
    }
  };

  const changeLabelField = (index, event) => {
    const { name, value } = event.target;
    let newData = [...selectedField];
    console.log(newData, '164');
    newData[index][name] = value;
  };

  const changeConditionsLabelField = (index, event) => {
    const { name, value } = event.target;
    let newData1 = [...conditionalData];
    newData1[index][name] = value;
  };



  const addGraph = () => {
    setGraphData([...graphData, { 'title': '', 'subtitle': '', 'charttype': 'line', 'maxData': 10, 'graphdata': [{ 'xAxis': [], 'yAxis': [] }] }]);
  }

  const removeGraphData = (index) => {
    setGraphData((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  }

  const changeGraphField = (index, event, ind) => {
    const { name, value } = event.target;
    let newData = [...graphData];
    if (name === 'xAxis') {

      let newAxisValue = [];
      newAxisValue.push(selectedField.find(obj => obj.fieldlabel === value));
      newAxisValue.map((item, index) => {
        newAxisValue[index]['graphFn'] = selectedField[index].reportFn || null;
        newAxisValue[index]['color'] = '#4E73DF' || null;
        newAxisValue[index]['legend'] = true || null;
        // newAxisValue[index]['type'] = null;
      })

      setGraphData((prevData) => {
        const newData = [...prevData];
        newData[index]['graphdata'][0][name] = newAxisValue;
        return newData;
      });

    } else if (name === 'yAxis') {
      const {
        target: { value }
      } = event;
      setYAxisValue((prevSelectedValues) => {
        const updatedSelectedValues = [...prevSelectedValues];
        updatedSelectedValues[index] = value;
        return updatedSelectedValues;
      });

      let choosedYAxisValues = typeof value === 'string' ? value.split(",") : value;
      let valueAxisY = choosedYAxisValues.map((item, i) => {
        return selectedField.find(field => field.fieldlabel === item);
      });
      valueAxisY.map((item, index) => {
        valueAxisY[index]['graphFn'] = selectedField[index].reportFn;
        valueAxisY[index]['color'] = '#4E73DF';
        valueAxisY[index]['legend'] = true;
        // valueAxisY[index]['type'] = graphData[index]?.charttype || 'line';
      })
      setGraphData((prevData) => {
        const newData = [...prevData];
        newData[index]['graphdata'][0][name] = valueAxisY;
        return newData;
      });

    } else if (name === 'color') {
      const {
        target: { value }
      } = event;
      
      setYAxisColor((prevSelectedValues) => {
        const updatedSelectedValues = [...prevSelectedValues];
        updatedSelectedValues[index] = value;
        return updatedSelectedValues;
      });

      console.log(value, 'color', yAxisColor);

      yAxisValue[index].map((ele, i) => {
        console.log(ele, i, '269', ind);
        if (i === ind) {
          newData[index]['graphdata'][0]['yAxis'][i][name] = value
        }
      })

    } else if (name === 'graphFn') {
      console.log(value, 'graphFn');
      yAxisValue.map((ele, i) => {
        if (i === ind) {
          newData[index]['graphdata'][0]['yAxis'][i][name] = selectedField[index].reportFn || value
        }
      })
    } else if (name === 'legend') {
      console.log(value, 'legend');
      yAxisValue.map((ele, i) => {
        if (i === ind) {
          newData[index]['graphdata'][0]['yAxis'][i][name] = value
        }
      })
    } else if (name === 'charttype') {
      console.log(value, 'type1');
      newData[index]['charttype'] = value
      // yAxisValue.map((ele, i) => {        
      //   // if (i === ind) {
      //     newData[index]['graphdata'][0]['yAxis'][i]['type'] = value || newData[index]['charttype']
      //   // }
      // }, () => console.log(yAxisValue, 'yaxis296'))
    } else {
      newData[index][name] = value;
    }
  };


  const renderSelectedValues = (index) => {
    return yAxisValue[index]?.map((value, valueIndex) => (
      <span key={valueIndex}>
        {value}
        {valueIndex !== yAxisValue[index].length - 1 ? ', ' : ''}
      </span>
    ));
  };

  const renderSelectedColors = (index) => {
    return yAxisColor[index]?.map((value, valueIndex) => (
      <span key={valueIndex}>
        {value}
        {valueIndex !== yAxisColor[index].length - 1 ? ', ' : ''}
      </span>
    ));
  };

  const [openDialogs, setOpenDialogs] = useState(Array(graphData.length).fill(false));

  const handleClickOpen1 = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = true;
    setOpenDialogs(newOpenDialogs);
  };

  const handleClose1 = (index) => {
    console.log('calling dialog close', index);
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = false;
    setOpenDialogs(newOpenDialogs);
  };

  // useEffect(() => {
  //   selectedField?.length > 0 && selectedField?.map((ele, i) => {
  //     // yAxisValue?.length > 0 && yAxisValue?.map((item, index) => {
  //     //   if(ele.fieldlabel !== item){
  //         // console.log(ele, item, 313);
  //         setYAxisValue((oldValues) => {
  //           return oldValues.filter((ele1, i) => ele1 !== ele.fieldlabel);
  //         });
  //     //   }
  //     // })
  //   })
  // }, [selectedField])

  //const isSelected = (name) => selectedField.indexOf(name) !== -1;

  const selectedFieldObj = selectedField.find((item) => item.selected); // Find the selected field object
  if (selectedFieldObj) {
    var combinedString = `${selectedFieldObj.table}.${selectedFieldObj.field}`;
  }

  const [value, setValue] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleUncheckSelected = () => {
    const updatedSelectedField = selectedField.map((field) => ({
      ...field,
      selected: false,
    }));
    setSelectedField(updatedSelectedField);
    setSelectedCheckbox(null);
  };

  const handleCheckboxChange = (index, event) => {
    event.preventDefault();

    const { checked, name } = event.target;

    if (checked) {
      const updatedSelectedField = selectedField.map((field, i) => ({
        ...field,
        selected: i === index,
      }));
      setSelectedField(updatedSelectedField);
      setSelectedCheckbox(index);
    } else {
      handleUncheckSelected();
    }
  };

  // const handleDrag = (event, item, index) => {
  //   event.preventDefault();

  //   // Check if the index is within bounds
  //   if (index >= 0 && index < selectedField.length) {
  //     const updatedSelectedField = [...selectedField];
  //     updatedSelectedField[index] = {
  //       ...updatedSelectedField[index],
  //       x: item?.x,
  //       y: item?.y,
  //     };
  //     setSelectedField(updatedSelectedField);
  //   } else {
  //     console.error("Invalid index:", index);
  //   }
  // };

  const handleUncheckSelectedParameter = () => {
    const updatedSelectedField = conditionalData.map((field) => ({
      ...field,
      para_condition: false,
    }));
    setConditionalData(updatedSelectedField);
    setSelectedCheckboxParameter(null);
  };

  const handleCheckboxChangeParameter = (index, event) => {
    event.preventDefault();

    const { checked, name } = event.target;

    if (checked) {
      const updatedSelectedField = conditionalData.map((field, i) => ({
        ...field,
        para_condition: i === index,
      }));
      setConditionalData(updatedSelectedField);
      setSelectedCheckboxParameter(index);
    } else {
      handleUncheckSelectedParameter();
    }
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const fieldSetupData = (apiPoint, id) => {
    (async () => {
      const data = await getReportFieldsAddEditAPIdata(
        tenantCname,
        apiPoint,
        id
      );
      if (data) {
        setReportFields(data);
      }
    })();
  };

  const editSetupData = (apiPoint, id) => {
    (async () => {
      const data = await getReportFieldsAddEditAPIdata(
        tenantCname,
        apiPoint,
        id
      );
      if (data) {
        // if (data[0] === undefined) {
        //   Object.keys(data).map((keywords) => (
        //     error_msg.push(data[keywords])
        //   ))
        //   setSmShowError(true)
        //   setSaveButtonDisabled(false);
        // }
        console.log(data, 326);
        const {
          said,
          report_display_name,
          reportdatafield,
          groupedBy,
          condition,
          graph
        } = data;
        setReportName(report_display_name);
        setSelectedField(reportdatafield);
        setGroupedBy(groupedBy);
        setConditionalData(condition);
        setGraphData(graph !== undefined ? graph : []);
        graph?.length > 0 && graph.map((item, index) => {
          let yIndexFieldValue = [];
          let yIndexColorValue = [];
          console.log(item, 'newIneritem');
          item?.graphdata.map((innerItem, newIndex) => {
            console.log(innerItem, 'innnerIte', newIndex);
            innerItem?.yAxis?.map((ele, i) => {
              yIndexFieldValue = [...yIndexFieldValue, ele.fieldlabel]
              yIndexColorValue = [...yIndexColorValue, ele.color]
            })
          })
          // setYAxisValue(yIndexFieldValue);
          setYAxisValue((prevSelectedValues) => {
            const updatedSelectedValues = [...prevSelectedValues];
            updatedSelectedValues[index] = yIndexFieldValue;
            return updatedSelectedValues;
          });
          // setYAxisColor(yIndexColorValue);
          setYAxisColor((prevSelectedValues) => {
            const updatedSelectedValues = [...prevSelectedValues];
            updatedSelectedValues[index] = yIndexColorValue;
            return updatedSelectedValues;
          });
          console.log(yIndexFieldValue, '470');
        })
      }
    })();
  };


  const createNewReport = () => {
    if (conditionalData?.length > 0) {
      conditionalData[0].logic = ""
      conditionalData?.map((data, index) => {

        if (conditionalData[index - 1]?.reportBracket === "(") {
          conditionalData[index].logic = ""
        }
      })
    }
    let data = {
      said: said,
      report_display_name: reportName,
      reportdatafield: selectedField,
      groupedBy: combinedString ? combinedString : "",
      condition: conditionalData,
      graph: graphData
    };
    // console.log(conditionalData, "kio");
    console.log(data, 477);

    (async () => {
      let saveReportData = await saveReportDetailsAPIdata(tenantCname, data);
      // console.log(saveReportData, 'saveReportData');
     
      if (saveReportData?.status === 400) {
        Object.keys(saveReportData?.data).map((keywords) => (
          error_msg.push(saveReportData?.data[keywords])
        ))
        setSmShowError(true)
        setSaveButtonDisabled(false);
      } else if(saveReportData?.status === 201) {    
        const { msg, report_id, said } = saveReportData?.data;
        setCreateReportStatus(msg);
        localStorage.setItem("said", said);
        localStorage.setItem("reportId", report_id);
        setAuthState({ ...authState, reportId: report_id, said: said })
        navigate(`/home/${module_name}/reportdetails/${report_id}`);
        setReportName("");
        setSelectedField([]);
        setConditionalData([]);
        combinedString = "";
      }
    })();
  };

  const updateReportData = (apiPoint, id) => {
    if (conditionalData?.length > 0) {
      conditionalData[0].logic = ""
      reportFields?.map((item, i) => {
        conditionalData?.map((data, index) => {
          if (data?.table === item?.table && data?.field === item?.field) {
            data["module_field_id"] = item?.module_field_id
          }
          if (conditionalData[index - 1]?.reportBracket === "(") {
            conditionalData[index].logic = ""
          }
        })
      })
    }
    if (selectedField?.length > 0) {
      reportFields?.map((item, i) => {
        selectedField?.map((data, index) => {
          if (data?.table === item?.table && data?.field === item?.field) {
            data["module_field_id"] = item?.module_field_id
          }
        })
      })
    }
    let data = {
      said: said,
      report_display_name: reportName,
      reportdatafield: selectedField,
      groupedBy: combinedString ? combinedString : "",
      condition: conditionalData,
      graph: graphData
    };
    (async () => {
      const updateData = await getReportFieldsUpdateAPIdata(
        tenantCname,
        apiPoint,
        id,
        data
      );
      // console.log(updateData, 319);
      if (updateData) {
        if (updateData?.status === 400) {
          Object.keys(updateData?.data).map((keywords) => (
            error_msg.push(updateData?.data[keywords])
          ))
          setSmShowError(true)
          setSaveButtonDisabled(false);
        } else { 
          const { msg, report_id, said } = updateData;
          setCreateReportStatus(msg);
          setAuthState({ ...authState, reportId: report_id, said: said })
          localStorage.setItem('reportId', report_id)
          localStorage.setItem('said', said);
          navigate(`/home/${module_name}/reportdetails/${report_id}`);
        }
      }
    })();
  };

  const createUpdateData = (e) => {
    e.preventDefault();
    if (
      localStorage.getItem('reportId') !== '' &&
      localStorage.getItem('reportId') !== null &&
      localStorage.getItem('reportId') !== undefined ||
      authState?.reportId !== "" &&
      authState?.reportId !== null &&
      authState?.reportId !== undefined
    ) {
      updateReportData("updatereport?report_id=", localStorage.getItem('reportId') || authState?.reportId);
    } else {
      createNewReport();
    }
    setSaveButtonDisabled(true);
  };

  React.useEffect(() => {
    fieldSetupData("reportfieldsbysubject?said=", said);
  }, [said]);

  React.useEffect(() => {
    if (
      localStorage.getItem('reportId') !== '' ||
      authState?.reportId !== "" &&
      authState?.reportId !== null &&
      authState?.reportId !== undefined
    ) {
      setStateName("Edit ");
      editSetupData("foreditreport?report_id=", localStorage.getItem('reportId') || authState?.reportId);
    } else {      
      setStateName("Create new ")
    }
  }, [localStorage.getItem('reportId') || authState?.reportId]);

  const capitalize = (word) => {
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  };
  const [draggedText, setDraggedText] = useState("Drag me!");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stop, setStop] = useState(false);
  const [stop1, setStop1] = useState(false);
  const [indexx, setIndex] = useState(null);
  const [truee, setTrue] = useState(false);
  const [item, setItem] = useState({});
  const handleDragStart = (event, item) => {
    setDraggedText(event.target.textContent);
    event.dataTransfer.setData("text/plain", event?.target?.textContent);
    setItem(item);
    setStop(true);
    setStop1(false);
    // handleAddOnClick(event,item,0)
  };

  const handleDrop = (event) => {

    if (!truee) {

      event.preventDefault();
      setDraggedText("");
      setPosition({ x: 0, y: 0 });
      const {
        selected,
        para_condition,
        reportFn,
        styleField,
        logic,
        newFieldLabel,
        sorting,
        ...newConfig
      } = item;

      if (value === 0) {
        item.sorting = "";
        item.reportFn = "";
        item.styleField = "";
        item.newFieldLabel = "";

        item.selected = false;
        //item.para_condition = false;
        //item.reportBracket = "";

        setSelectedField((prevItems) => [
          ...prevItems.slice(0, indexx), // Items before the index
          item, // New data to insert
          ...prevItems.slice(indexx), // Items after the index
        ]);
      } else if (value === 1) {
        newConfig.logic = "AND";
        newConfig.conditional_operator = "";
        newConfig.value = "";
        newConfig.para_condition = false;
        newConfig.reportBracket = "";

        setConditionalData((prevItems) => [
          ...prevItems.slice(0, indexx), // Items before the index
          newConfig, // New data to insert
          ...prevItems.slice(indexx), // Items after the index
        ]);
      }
      setTrue(false);
    } else {
      setTrue(false);
      setConditionalData((prevItems) => [
        ...prevItems.slice(0, indexx + 1), // Items before the index
        {
          table: "",

          field: "",

          fieldlabel: "",

          module_field_id: "",

          uitype: "",

          field_type: "",

          logic: "AND",

          conditional_operator: "",

          para_condition: "",

          value: "",
          reportBracket: "(",
        }, // Insert opening parenthesis at index
        {
          table: "",

          field: "",

          fieldlabel: "",

          module_field_id: "",

          uitype: "",

          field_type: "",

          logic: "",

          conditional_operator: "",

          para_condition: "",

          value: "",
          reportBracket: ")",
        }, // Insert closing parenthesis at index + 1
        ...prevItems.slice(indexx + 1), // Items after the index
      ]);

      // setConditionalData((prevItems) => [
      //   ...prevItems.slice(0, indexx), // Items before the index
      //   "(", // Opening parenthesis
      //   ...prevItems.slice(indexx), // Items from the index onwards
      //   ")", // Closing parenthesis
      // ]);
    }
  };
  const handleDragOver = (event, index) => {
    // setDropZoneIndex(index);
    stop && event.preventDefault();
  };
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStartVertical = (index) => {
    setStop(false);
    setStop1(true);
    setDraggedIndex(index);
  };

  const handleDragOverVertical = (index) => {
    setIndex(index);
    if (draggedIndex === null) return;
    if (value === 0 && stop1) {
      const newItems = [...selectedField];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setSelectedField(newItems);
      setDraggedIndex(index);
    } else if (stop1) {
      conditionalData.map((data, index) => {
        if (conditionalData[index]?.reportBracket !== ")") {
          conditionalData[index].logic = conditionalData[index].logic || "AND";
        }

      })
      const newItems = [...conditionalData];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setConditionalData(newItems);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {

    setDraggedIndex(null);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      //behavior: "smooth",
      block: "end",
    });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [selectedField, conditionalData])

  const graphType = [
    { 'name': 'Line Chart', 'value': 'line' },
    { 'name': 'Bar Chart', 'value': 'bar' },
    { 'name': 'Stacked Bar', 'value': 'stacked_bar' },
    { 'name': 'Horizontal Bar', 'value': 'horizontal_bar' },
    { 'name': 'Horizontal Stacked Bar', 'value': 'horizontal_stacked_bar' },
    { 'name': 'Grouped Bar', 'value': 'grouped_bar' },
    { 'name': 'Bar Line Chart', 'value': 'bar_line' },
    { 'name': 'Radar Chart', 'value': 'radar' },
    { 'name': 'Polar Area Chart', 'value': 'polar_area' },
    { 'name': 'Pie Chart', 'value': 'pie' },
    { 'name': 'Doughnut Chart', 'value': 'doughnut' }
  ]

  const graphFunType = [
    { 'name': 'None', 'value': '' },
    { 'name': 'Count', 'value': 'count' },
    { 'name': 'Minimum', 'value': 'min' },
    { 'name': 'Maximum', 'value': 'max' },
    { 'name': 'Sum', 'value': 'sum' },
    { 'name': 'Average', 'value': 'average' },
  ]

  const graphLegendFlag = [
    { 'name': 'Yes', 'value': true },
    { 'name': 'No', 'value': false },
  ]

  // const fetchFieldData = async (slug) => {
  //     await axios.get("/"+tenantCname+"/api/fields", {
  //       headers: {
  //         "Accept": "application/JSON",
  //         "Authorization": "Bearer " + localStorage.getItem('token')
  //       },
  //       params: {
  //         "module": slug
  //       }
  //     }
  //     )
  //       .then(res => {
  //         //console.log(res.data.block.Opportunity_Information, 665);
  //         setAxisList(res?.data.block.Opportunity_Information)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }

  // React.useEffect(() => {
  //   fetchFieldData(localStorage.getItem('slug'));
  // }, [localStorage.getItem('slug')]);

  // React.useEffect(() => {
  //   console.log(graphData, 'graphData', xAxisData, yAxisData, selectedField)
  // }, [graphData, xAxisData, yAxisData, selectedField])

  return (
    <>
      <Header />

      <Box className="reportCreatepage reportMainPage" sx={{ marginTop: "4.5em", flexGrow: 1 }}>


        <div className="detail_parent parent_padding">
          <div className="container-fluid col-12 pl-4 pr-4">
            <div className="row pr-1">
              <div className="col-12">
                <div className="bread_crumb">
                  <Link target='_self' to={`/home/${module_name}/add-edit-report`}
                  //onClick={()=>(all_accounts(), clear())}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
                    <Trans>
                      {"Back to " + module_name + 's Subject Page'} </Trans>
                  </Link>
                </div>
                <div className="view_page_head">
                  <div className="page_head mt-2">
                    <h3 className="h33"> {stateName + module_name}</h3>
                  </div>
                  <div className="crt_btn_div crt_btn_div_tab_margin">
                    <button className="btn_cancel reset_button" type="button" onClick={handleGoBack}>
                      Cancel
                    </button>
                    <button className="btn_save crt_btn edit_btn" type="button" onClick={(e) => createUpdateData(e)}>
                      Save
                    </button>
                  </div>
                </div>
                {/* <div className="top_btns">
                  <div className="grid_box">
                    <label>Report Name: </label>
                    <TextField
                      id="outlined-controlled"
                      onChange={(e) => setReportName(e.target.value)}
                      value={reportName}
                    />
                  </div>
                  <div className="crt_btn_div">
                    <div className="row">
                      <div className="col-lg-6  col-md-6 col-12"></div>
                      <div className="col-lg-6 col-md-6 col-12 submit-row">
                        <Button
                          className="btn_cancel reset_button bottom"
                          variant="contained"
                          onClick={handleGoBack}
                        >
                          Cancel
                        </Button>
                        <Button className="btn_save crt_btn edit_btn bottom" variant="contained" onClick={() => createUpdateData()} style={{ minWidth: '100px' }}>Save</Button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="parent_div col-12">
                <div className="detail_div1"><h4 className="cst_inf">Report Information</h4></div>
                <div className="detail_div2">
                  <div className="details_field_1">
                    <div className="row">
                      <div className="col-lg-2 col-md-5 col-sm-5 col-12">
                        <label>Report Name<span>*</span></label>
                        <h6 className="mand_error"></h6>
                      </div>
                      <div className="col-lg-3 col-md-7 col-sm-7 col-12">
                        <input type={'text'} onChange={(e) => setReportName(e.target.value)} value={reportName} placeholder="" />
                      </div>
                    </div>
                    <div className="row">

                      <div className="col-3 mt-2">
                        <div className="card">
                          <h4 className="h5">{"Select fields"}</h4>
                          {reportFields.length > 0 && (
                            <>
                              <div
                                className="card-body text-left"
                                style={{
                                  maxHeight: `${Number(windowHeight - 438)}px`,
                                }}
                              >
                                {reportFields?.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      draggable="true"
                                      onDragStart={(event) =>
                                        handleDragStart(event, item)
                                      }
                                      onClick={(event) =>
                                        handleAddOnClick(event, item, index)
                                      }
                                      className="field_value"
                                    >
                                      <label htmlFor={item?.fieldlabel}>
                                        {item?.fieldlabel}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-9 mt-2">
                        <div className="card">
                          <div className="card-body">
                            <Box sx={{ width: "100%" }}>
                              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  aria-label="report-table"
                                >
                                  <Tab label="Fields" {...a11yProps(0)} />
                                  <Tab label="Conditions" {...a11yProps(1)} />
                                  <Tab label="Graph" {...a11yProps(2)} />
                                </Tabs>
                              </Box>

                              <CustomTabPanel
                                value={value}
                                index={0}
                                className="text-left"
                              >
                                <div
                                  className="right_wrapper"
                                  onDrop={handleDrop}
                                  onDragOver={(event) => handleDragOver(event, 0)}
                                  style={{
                                    height: '57.5vh',
                                    // maxHeight: '57vh'
                                    // overflowY: "scroll",
                                    // maxHeight: `${Number(windowHeight - 490)}px`,
                                  }}
                                >
                                  <table className="text-center">
                                    <thead>
                                      <tr>
                                        <th className="select-field "></th>
                                        <th className="field-name">Field Name</th>
                                        <th className="label-field">Label</th>
                                        <th className="function-field">Function</th>
                                        <th className="style-field more-info">Style
                                          <Tooltip placement="top" title={<Trans>{'reportStyleTootltip'}</Trans>}><i><BiInfoCircle /></i></Tooltip>
                                        </th>
                                        <th className="label-group">Group By</th>
                                        <th className="sorting-field">Sort</th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      ref={bottomRef}>
                                      {selectedField?.length > 0 &&
                                        selectedField?.map((item, index) => {

                                          const labelId = `enhanced-table-checkbox-${index}`;

                                          return (
                                            <tr
                                              className={` ${selectedRow === index
                                                ? "selected"
                                                : ""
                                                }`}
                                              key={index}
                                              role="checkbox"
                                              tabIndex={-1}
                                              draggable="true"
                                              onDragStart={() =>
                                                handleDragStartVertical(index)
                                              }
                                              onDragOver={() => {
                                                handleDragOverVertical(index);
                                              }}
                                              onDragEnd={handleDragEnd}
                                            >
                                              <td
                                                onClick={() =>
                                                  handleRemoveOnClick(item, index)
                                                }
                                                className="select-field"
                                              >
                                                <i
                                                  data-tooltip="Delete"
                                                  className="tool delete_icon"
                                                  role="button"
                                                  data-bs-toggle=""
                                                  data-bs-target=""
                                                >
                                                  <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                  </svg>
                                                </i>
                                              </td>
                                              <td className=" field-name">
                                                {item &&
                                                  capitalize(
                                                    item?.field.split("_").join(" ")
                                                  )}
                                              </td>
                                              <td className="label-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <TextField
                                                    id="outlined-controlled"
                                                    label={item?.newFieldLabel}
                                                    defaultValue={
                                                      item?.newFieldLabel
                                                    }
                                                    name={"newFieldLabel"}
                                                    onChange={(event) =>
                                                      changeLabelField(index, event)
                                                    }
                                                    placeholder={item?.fieldlabel}
                                                  />
                                                </FormControl>
                                              </td>
                                              <td className="function-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <Select
                                                    variant="outlined"
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    defaultValue={item?.reportFn}
                                                    placeholder={item?.reportFn}
                                                    label={'Function'}
                                                    name={"reportFn"}
                                                    onChange={(event) =>
                                                      changeLabelField(index, event)
                                                    }
                                                  >
                                                    {graphFunType?.length > 0 &&
                                                      graphFunType?.map((item, index) => {
                                                        return (
                                                          <MenuItem key={index} value={item?.value}>
                                                            {item?.name}
                                                          </MenuItem>
                                                        )
                                                      })}

                                                  </Select>
                                                </FormControl>
                                              </td>
                                              <td className="style-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <TextField
                                                    multiline
                                                    rows={1}
                                                    id="outlined-textarea"
                                                    label={'Style'}
                                                    defaultValue={item?.styleField}
                                                    name={"styleField"}
                                                    onChange={(event) =>
                                                      changeLabelField(index, event)
                                                    }
                                                    variant="outlined"
                                                    placeholder={item?.styleField}
                                                  />
                                                </FormControl>
                                              </td>
                                              <td className="label-group">
                                                <FormControl
                                                  sx={{ minWidth: 80 }}
                                                  size="small"
                                                >
                                                  <Checkbox
                                                    name={"selected"}
                                                    color="primary"
                                                    checked={
                                                      item?.selected
                                                    }
                                                    onChange={(event) =>
                                                      handleCheckboxChange(
                                                        index,
                                                        event
                                                      )
                                                    }
                                                  />
                                                </FormControl>
                                              </td>
                                              <td className="sorting-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <Select
                                                    variant="outlined"
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    defaultValue={item?.sorting}
                                                    label={'Sort'}
                                                    name={"sorting"}
                                                    onChange={(event) =>
                                                      changeLabelField(index, event)
                                                    }
                                                  >
                                                    <MenuItem value="">
                                                      <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"asc"}>
                                                      Ascending
                                                    </MenuItem>
                                                    <MenuItem value={"desc"}>
                                                      Descending
                                                    </MenuItem>
                                                  </Select>
                                                </FormControl>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </CustomTabPanel>
                              <CustomTabPanel
                                value={value}
                                index={1}
                                className="text-left"
                              >
                                <Button
                                  className="dragBrackets"
                                  draggable="true"
                                  onDragStart={(event) => {
                                    if (conditionalData?.length > 0) {
                                      setTrue(true);
                                      handleDragStart(event, item);
                                    }
                                  }}
                                >
                                  (... Drop paranthesis)
                                </Button>
                                <div
                                  className="right_wrapper"
                                  style={{
                                    minHeight: "52.8vh",
                                    maxHeight: '52.8vh'
                                    // overflowY: "scroll",
                                    // maxHeight: `${Number(windowHeight - 490)}px`,
                                  }}
                                  onDrop={handleDrop}
                                  onDragOver={(event) => handleDragOver(event)}
                                >
                                  <table className="text-center">
                                    <thead>
                                      <tr>
                                        <th className="select-field"></th>
                                        <th className="value">Logic</th>
                                        <th className="field-name">Field Name</th>
                                        <th className="operator">Operator</th>
                                        <th className="type1">Value</th>
                                        <th className="sorting-field">Parameter</th>
                                      </tr>
                                    </thead>
                                    <tbody ref={bottomRef}>
                                      {conditionalData?.length > 0 &&
                                        conditionalData?.map((item, index) => {
                                          let uiParams = UiParamter(item?.uitype);

                                          if (
                                            item?.reportBracket !== "(" &&
                                            item?.reportBracket !== ")"
                                          ) {
                                            return (
                                              <tr
                                                // className="field-box"
                                                key={index}
                                                role="checkbox"
                                                tabIndex={-1}
                                                sx={{ cursor: "pointer" }}
                                                draggable="true"
                                                onDragStart={() =>
                                                  handleDragStartVertical(index)
                                                }
                                                onDragOver={() =>
                                                  handleDragOverVertical(index)
                                                }
                                                onDragEnd={handleDragEnd}
                                              >
                                                <td
                                                  onClick={() =>
                                                    handleRemoveOnClick(item, index)
                                                  }
                                                  className="select-field"
                                                >
                                                  <i
                                                    data-tooltip="Delete"
                                                    className="tool delete_icon"
                                                    role="button"
                                                    data-bs-toggle=""
                                                    data-bs-target=""
                                                  >
                                                    <svg
                                                      stroke="currentColor"
                                                      fill="currentColor"
                                                      strokeWidth="0"
                                                      viewBox="0 0 24 24"
                                                      height="1em"
                                                      width="1em"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                    </svg>
                                                  </i>
                                                </td>
                                                <td className="operator">
                                                  {index > 0 &&
                                                    conditionalData[index - 1]
                                                      ?.reportBracket !== "(" && (
                                                      <FormControl
                                                        sx={{ m: 1, minWidth: 140 }}
                                                        size="small"
                                                      >
                                                        <Select
                                                          variant="outlined"
                                                          labelId="demo-select-small-label"
                                                          id="demo-select-small"
                                                          defaultValue={
                                                            item?.logic || "AND"
                                                          }
                                                          label={item?.logic}
                                                          name={"logic"}
                                                          onChange={(event) =>
                                                            changeConditionsLabelField(
                                                              index,
                                                              event
                                                            )
                                                          }
                                                        >
                                                          <MenuItem value="">
                                                            <em>None</em>
                                                          </MenuItem>
                                                          <MenuItem
                                                            value={"AND"}
                                                            selected
                                                          >
                                                            AND
                                                          </MenuItem>
                                                          <MenuItem value={"OR"}>
                                                            OR
                                                          </MenuItem>
                                                        </Select>
                                                      </FormControl>
                                                    )}
                                                </td>
                                                <td className="field-name">
                                                  {item?.fieldlabel && (
                                                    <span>{item?.fieldlabel}</span>
                                                  )}
                                                </td>
                                                <td className="operator">
                                                  <FormControl
                                                    sx={{ m: 1, minWidth: 140 }}
                                                    size="small"
                                                  >
                                                    <Select
                                                      variant="outlined"
                                                      labelId="demo-select-small-label"
                                                      id="demo-select-small"
                                                      defaultValue={
                                                        item?.conditional_operator
                                                      }
                                                      label={
                                                        item?.conditional_operator
                                                      }
                                                      name={"conditional_operator"}
                                                      onChange={(event) =>
                                                        changeConditionsLabelField(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                    >
                                                      <MenuItem value="">
                                                        <em>None</em>
                                                      </MenuItem>
                                                      {uiParams &&
                                                        uiParams.map(
                                                          (params, index) => {
                                                            return (
                                                              <MenuItem
                                                                key={index}
                                                                value={
                                                                  params?.value
                                                                }
                                                              >
                                                                {params?.uiSign}
                                                              </MenuItem>
                                                            );
                                                          }
                                                        )}
                                                    </Select>
                                                  </FormControl>
                                                </td>
                                                <td className="type1">
                                                  <FormControl
                                                    sx={{ m: 1, minWidth: 140 }}
                                                    size="small"
                                                  >
                                                    <TextField
                                                      id="outlined-controlled"
                                                      label={item?.value}
                                                      defaultValue={
                                                        item?.value
                                                      }
                                                      type={
                                                        item.uiType == 11
                                                          ? "number"
                                                          : item.field_type
                                                      }
                                                      name={"value"}
                                                      onChange={(event) =>
                                                        changeConditionsLabelField(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                      placeholder={"value"}
                                                    />
                                                  </FormControl>
                                                </td>
                                                <td className="sorting-field">
                                                  <FormControl
                                                    sx={{ m: 1, minWidth: 140 }}
                                                    size="small"
                                                  >
                                                    <Checkbox
                                                      name={"para_condition"}
                                                      color="primary"
                                                      checked={
                                                        item?.para_condition
                                                      }
                                                      onChange={(event) =>
                                                        handleCheckboxChangeParameter(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                    />
                                                  </FormControl>
                                                </td>
                                              </tr>
                                            );
                                          } else {
                                            return (
                                              <tr
                                                // className="field-box"
                                                key={index}
                                                role="checkbox"
                                                tabIndex={-1}
                                                sx={{ cursor: "pointer" }}
                                                draggable="false"
                                                onDragStart={() =>
                                                  handleDragStartVertical(index)
                                                }
                                                onDragOver={() =>
                                                  handleDragOverVertical(index)
                                                }
                                                onDragEnd={handleDragEnd}
                                              >
                                                {item?.reportBracket !== ")" && (
                                                  <td
                                                    onClick={() =>
                                                      handleRemoveOnClick(
                                                        item,
                                                        index
                                                      )
                                                    }
                                                    className="select-field"
                                                  >
                                                    <i
                                                      data-tooltip="Delete"
                                                      className="tool delete_icon"
                                                      role="button"
                                                      data-bs-toggle=""
                                                      data-bs-target=""
                                                    >
                                                      <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 24 24"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                      </svg>
                                                    </i>
                                                  </td>
                                                )}
                                                <td className="operator">
                                                  {index > 0 &&
                                                    item?.reportBracket !== ")" &&
                                                    conditionalData[index - 1]
                                                      ?.reportBracket !== "(" && (
                                                      <FormControl
                                                        sx={{ m: 1, minWidth: 140 }}
                                                        size="small"
                                                      >
                                                        <Select
                                                          variant="outlined"
                                                          labelId="demo-select-small-label"
                                                          id="demo-select-small"
                                                          defaultValue={
                                                            item?.logic || "AND"
                                                          }
                                                          label={item?.logic}
                                                          name={"logic"}
                                                          onChange={(event) =>
                                                            changeConditionsLabelField(
                                                              index,
                                                              event
                                                            )
                                                          }
                                                        >
                                                          <MenuItem value="">
                                                            <em>None</em>
                                                          </MenuItem>
                                                          <MenuItem
                                                            value={"AND"}
                                                            selected
                                                          >
                                                            AND
                                                          </MenuItem>
                                                          <MenuItem value={"OR"}>
                                                            OR
                                                          </MenuItem>
                                                        </Select>
                                                      </FormControl>
                                                    )}
                                                </td>
                                                <td>{item?.reportBracket}</td>
                                              </tr>
                                            );
                                          }
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </CustomTabPanel>
                              <CustomTabPanel
                                value={value}
                                index={2}
                                className="text-left"
                              >
                                {selectedField.length > 0 &&
                                  <Button
                                    className="dragBrackets remove_graph"
                                    onClick={addGraph}
                                  // draggable="true"
                                  // onDragStart={(event) => {
                                  //   if (conditionalData?.length > 0) {
                                  //     setTrue(true);
                                  //     handleDragStart(event, item);
                                  //   }
                                  // }}
                                  >
                                    Add Graph
                                  </Button>
                                }
                                <div
                                  className="right_wrapper"
                                  //onDrop={handleDrop}
                                  // onDragOver={(event) => handleDragOver(event, 0)}
                                  style={{
                                    height: '57.5vh',
                                    // maxHeight: '57vh'
                                    // overflowY: "scroll",
                                    // maxHeight: `${Number(windowHeight - 490)}px`,
                                  }}
                                >
                                  <table className="text-center">
                                    <thead>
                                      <tr>
                                        <th className="select-field "></th>
                                        <th className="field-name">Title</th>
                                        <th className="label-field">Subtitle</th>
                                        <th className="function-field">Chart Type</th>
                                        <th className="function-field">Max no. of Data </th>
                                        <th className="style-field">X-Axis</th>
                                        <th className="style-field more-info">Y-Axis
                                          <Tooltip placement="top" title={<Trans>{'graphStyleTootltip'}</Trans>}><i><BiInfoCircle /></i></Tooltip>
                                        </th>
                                        {/* <th className="sorting-field">Graph Function</th> */}
                                      </tr>
                                    </thead>
                                    <tbody
                                      ref={bottomRef}>
                                      {(selectedField.length > 0 && graphData?.length > 0) &&
                                        graphData?.map((item, index) => {
                                          console.log(item?.['graphdata']?.[0]?.['yAxis'], '1509');
                                          const labelId = `enhanced-table-checkbox-${index}`;

                                          return (
                                            <tr
                                              key={1}
                                              role="checkbox"
                                              tabIndex={-1}
                                            >
                                              <td
                                                onClick={() =>
                                                  removeGraphData(index)
                                                }
                                                className="select-field"
                                              >
                                                <i
                                                  data-tooltip="Delete"
                                                  className="tool delete_icon"
                                                  role="button"
                                                  data-bs-toggle=""
                                                  data-bs-target=""
                                                >
                                                  <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                  </svg>
                                                </i>
                                              </td>
                                              <td className="field-name">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <TextField
                                                    id="outlined-controlled"
                                                    label={'Title'}
                                                    defaultValue={
                                                      item?.title
                                                    }
                                                    name={'title'}
                                                    onChange={(event) =>
                                                      changeGraphField(index, event)
                                                    }
                                                    placeholder={item?.title}
                                                  />
                                                </FormControl>
                                              </td>
                                              <td className="label-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <TextField
                                                    id="outlined-controlled"
                                                    label={'Subtitle'}
                                                    defaultValue={
                                                      item?.subtitle
                                                    }
                                                    name={"subtitle"}
                                                    onChange={(event) =>
                                                      changeGraphField(index, event)
                                                    }
                                                    placeholder={item?.subtitle}
                                                  />
                                                </FormControl>
                                              </td>
                                              <td className="function-field">

                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <Select
                                                    variant="outlined"
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    defaultValue={item?.charttype}
                                                    label={'Chart Type'}
                                                    name={"charttype"}
                                                    onChange={(event) =>
                                                      changeGraphField(index, event)
                                                    }
                                                  >
                                                    {graphType?.length > 0 &&
                                                      graphType?.map((item, index) => {
                                                        return (
                                                          <MenuItem key={index} value={item?.value}>
                                                            {item?.name}
                                                          </MenuItem>
                                                        )
                                                      })}

                                                  </Select>
                                                </FormControl>
                                              </td>
                                              <td className="label-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <TextField
                                                    id="outlined-controlled"
                                                    defaultValue={
                                                      item?.maxData
                                                    }
                                                    name={"maxData"}
                                                    onChange={(event) =>
                                                      changeGraphField(index, event)
                                                    }
                                                    placeholder={item?.maxData}
                                                  />
                                                </FormControl>
                                              </td>

                                              <td className="style-field">
                                                <FormControl
                                                  sx={{ m: 1, minWidth: 140 }}
                                                  size="small"
                                                >
                                                  <Select
                                                    variant="outlined"
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    defaultValue={item?.['graphdata']?.[0]?.['xAxis']?.[0]?.['fieldlabel']}
                                                    label={'X Axis'}
                                                    name={"xAxis"}
                                                    onChange={(event) =>
                                                      changeGraphField(index, event)
                                                    }
                                                  >
                                                    {selectedField?.length > 0 && (
                                                      selectedField
                                                        .filter((item, index, self) => {
                                                          return index === self.findIndex((t) => t.fieldlabel === item.fieldlabel);
                                                        })
                                                        .map((item, index) => {
                                                          return (
                                                            <MenuItem key={index} value={item.fieldlabel}>
                                                              {item.fieldlabel}
                                                            </MenuItem>
                                                          );
                                                        })
                                                    )}
                                                  </Select>
                                                </FormControl>
                                              </td>
                                              <td className="label-group">
                                                {/* <FormControl
                                              sx={{ m: 1, minWidth: 140 }}
                                              size="small"
                                            >

                                              <Select
                                                id="demo-select-small"
                                                name={'yAxis'}
                                                multiple
                                                value={yAxisValue}
                                                label={'Y Axis'}
                                                onChange={(event) => changeGraphField(index, event)}
                                                renderValue={renderSelectedValues}
                                                MenuProps={MenuProps}
                                              >
                                                {selectedField?.length > 0 &&
                                                  selectedField.filter((item, index, self) => {
                                                    return index === self.findIndex((t) => t.fieldlabel === item.fieldlabel);
                                                  })
                                                    .map((select, keyInd) => (
                                                      <MenuItem key={keyInd} value={select?.fieldlabel}>
                                                        <Checkbox checked={yAxisValue.includes(select.fieldlabel)} />
                                                        <ListItemText primary={select?.fieldlabel} />
                                                      </MenuItem>
                                                    ))}
                                              </Select>

                                            </FormControl> */}
                                                <div key={index}>
                                                  <Button onClick={() => handleClickOpen1(index)}>Open select dialog</Button>
                                                  <Dialog disableEscapeKeyDown open={openDialogs[index]} onClose={() => handleClose1(index)}>
                                                    <DialogTitle>Select Y-Axis, Color, Function and Legend</DialogTitle>
                                                    <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                          <InputLabel htmlFor="demo-dialog-native">Y-Axis</InputLabel>
                                                          <Select
                                                            id="demo-select-small"
                                                            name={'yAxis'}
                                                            //native
                                                            multiple
                                                            defaultValue={yAxisValue[index] || []}
                                                            label={'Y Axis'}
                                                            onChange={(event) => changeGraphField(index, event)}
                                                            renderValue={() => renderSelectedValues(index)}
                                                            MenuProps={MenuProps}
                                                          >
                                                            {selectedField?.length > 0 &&
                                                              selectedField.filter((item, index, self) => {
                                                                return index === self.findIndex((t) => t.fieldlabel === item.fieldlabel);
                                                              })
                                                                .map((select, keyInd) => (
                                                                  <MenuItem key={keyInd} value={select?.fieldlabel}>
                                                                    <Checkbox checked={yAxisValue[index]?.includes(select.fieldlabel)} />
                                                                    <ListItemText primary={select?.fieldlabel} />
                                                                  </MenuItem>
                                                                ))}
                                                          </Select>
                                                        </FormControl>
                                                        {yAxisValue[index]?.length > 0 &&
                                                          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                            <InputLabel id="demo-dialog-select-label">Color</InputLabel>
                                                            <Select
                                                              labelId="demo-dialog-select-label"
                                                              id="demo-dialog-select"
                                                              multiple
                                                              defaultValue={yAxisColor || []}
                                                              // onChange={(event) => changeGraphField(index, event)}
                                                              input={<OutlinedInput label="Color" />}
                                                            >
                                                              {
                                                                yAxisValue[index]?.map((newEl, ind) => {
                                                                  return (
                                                                    <MenuItem key={ind}>
                                                                      <InputLabel id="demo-dialog-select-label">{newEl + ' -  '}</InputLabel>
                                                                      <input value={item?.['graphdata']?.[0]?.['yAxis']?.[ind]?.['color'] || yAxisColor[ind]} onChange={(event) => changeGraphField(index, event, ind)} type="color" name="color" />
                                                                    </MenuItem>)
                                                                }
                                                                )}
                                                            </Select>
                                                          </FormControl>
                                                        }
                                                        {yAxisValue[index]?.length > 0 &&
                                                          yAxisValue[index]?.map((yValue, ind) => {
                                                            return (
                                                              <FormControl
                                                                sx={{ m: 1, minWidth: 120 }}
                                                                size="small"
                                                              >
                                                                <p id="">{'Graph Function - '}<small>{yValue}</small></p>
                                                                <Select
                                                                  key={ind}
                                                                  variant="outlined"
                                                                  labelId="demo-dialog-select-label"
                                                                  id="demo-dialog-select"
                                                                  defaultValue={item?.['graphdata']?.[0]?.['yAxis']?.[ind]?.['graphFn'] || selectedField[ind]?.reportFn}
                                                                  label={'Graph Function ' + yValue}
                                                                  placeholder={'Graph Function ' + yValue}
                                                                  name={"graphFn"}
                                                                  onChange={(event) =>
                                                                    changeGraphField(index, event, ind)
                                                                  }
                                                                >
                                                                  {graphFunType?.length > 0 &&
                                                                    graphFunType?.map((item, index) => {
                                                                      return (
                                                                        <MenuItem key={index} value={item?.value}>
                                                                          {item?.name}
                                                                        </MenuItem>
                                                                      )
                                                                    })}

                                                                </Select>

                                                              </FormControl>
                                                            )
                                                          }
                                                          )}

                                                        {yAxisValue[index]?.length > 0 &&
                                                          // yAxisValue[index]?.map((yValue, ind) => {
                                                            // return (
                                                              <FormControl
                                                                sx={{ m: 1, minWidth: 120 }}
                                                                size="small"
                                                              >
                                                                <p id="">{'Legend'}</p>
                                                                <Select
                                                                  key={0}
                                                                  variant="outlined"
                                                                  labelId="demo-dialog-select-label"
                                                                  id="demo-dialog-select"
                                                                  defaultValue={item?.['graphdata']?.[0]?.['yAxis']?.[0]?.['legend']}
                                                                  label={'Legend'}
                                                                  name={"legend"}
                                                                  placeholder="Legend"
                                                                  onChange={(event) =>
                                                                    changeGraphField(index, event, 0)
                                                                  }
                                                                  
                                                                  input={<OutlinedInput label="Legend" />}
                                                                >
                                                                  {graphLegendFlag?.length > 0 &&
                                                                    graphLegendFlag?.map((item, index) => {
                                                                      return (
                                                                        <MenuItem key={index} value={item?.value}>
                                                                          {item?.name}
                                                                        </MenuItem>
                                                                      )
                                                                    })}

                                                                </Select>

                                                              </FormControl>
                                                        //  )})
                                                          } 
                                                      </Box>
                                                    </DialogContent>
                                                    <DialogActions>
                                                      <Button onClick={() => handleClose1(index)}>Cancel</Button>
                                                      <Button onClick={() => handleClose1(index)}>Ok</Button>
                                                    </DialogActions>
                                                  </Dialog>
                                                </div>
                                                {/* )
                                              // }
                                            })} */}
                                              </td>
                                              {/* <td className="sorting-field">
                                            <FormControl
                                              sx={{ m: 1, minWidth: 140 }}
                                              size="small"
                                            >
                                              <Select
                                                variant="outlined"
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                defaultValue={item?.['graphdata']?.[0]?.['yAxis']?.[index]?.['graphFn'] || selectedField[index]?.reportFn}
                                                label={'Graph Function'}
                                                name={"graphFn"}
                                                onChange={(event) =>
                                                  changeGraphField(index, event)
                                                }
                                              >
                                                {graphFunType?.length > 0 &&
                                                  graphFunType?.map((item, index) => {
                                                    return (
                                                      <MenuItem key={index} value={item?.value}>
                                                        {item?.name}
                                                      </MenuItem>
                                                    )
                                                  })}

                                              </Select>
                                            </FormControl>
                                          </td> */}
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </CustomTabPanel>
                            </Box>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6  col-md-6 col-12"></div>
                  <div className="col-lg-6 col-md-6 col-12 submit-row">
                    <button type="button" className="btn_cancel reset_button bottom" onClick={handleGoBack}>Cancel</button>
                    <button type="button" className="btn_save crt_btn edit_btn bottom" onClick={(e) => createUpdateData(e)}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Error message xxxxxx */}

        <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />
      </Box>

      <Footer />
    </>
  );
};

export default ReportCreatePage;
