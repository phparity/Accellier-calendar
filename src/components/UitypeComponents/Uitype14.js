
import Form from 'react-bootstrap/Form'
import { Trans } from 'react-i18next'
import SearchIconModal from '../SearchIconModal'
import { useContext, useState } from 'react'
import { r_value, searchTableModuleValue } from '../../navigation/PageRoutes'
import { CheckModuleName } from '../../utils/CheckModuleName'
import { useEffect } from 'react'

function Uitype14({acc,add,setShow2,isreadonly,relatedPopUp,e_id,duplicate,rst,sCrv,isEdit,parent}){
  const { searchTableModule, setSearchTableModule, searchRelatedTo, setSearchRelatedTo, uitype_module, setUitype_module } = useContext(searchTableModuleValue)
  let { row_value, setRow_value, related_record, setRelated_record,setAdd_forName,add_forName,uitype6_value } = useContext(r_value)
  let module_name = CheckModuleName()
  const [popup, setPopup] = useState(isEdit ? row_value['cal_module'] : '')
  const [slc, setSlc] = useState(isEdit ? row_value['cal_module'] : '')
  let [modChange, setModChange] = useState(false)
  if (Object.keys(uitype6_value).length !== 0) {
    if(acc.relatedto.includes(related_record)){
      uitype_module[acc.fieldname]=related_record
    }
    setSearchTableModule(related_record);
  }
  useEffect(()=>{
    if(parent && acc.relatedto.includes(parent['module_name'])){
      row_value[acc.fieldname] =  parent[`${parent['module_name']}_id`]
      row_value[acc.fieldname.replace('_record','_module')] =  parent['module_name']
      row_value[acc.fieldname + "_name"] =  parent[`${parent['module_name']}_name`]
      setAdd_forName(add_forName => ({...add_forName,
        [acc.fieldname] : parent['module_name'],
        [acc.fieldname.replace('_record','_module')] : parent[`${parent['module_name']}_id`],
        [acc.fieldname + "_name"] : parent[`${parent['module_name']}_name`]}))
    }
  },[parent])

  // if (acc.relatedto.includes(uitype_module[acc.fieldname]) && slc !== uitype_module[acc.fieldname] && !sCrv){
  //   setSlc(uitype_module[acc.fieldname])
  //   setPopup(uitype_module[acc.fieldname])
  // }
  
  // if(relatedPopUp == true && module_name !== "supplierorderreturn" && acc.relatedto.includes(searchRelatedTo) && slc !== searchRelatedTo){
  //   setSlc(searchRelatedTo)
  //   setPopup(searchRelatedTo)
  // }
  if ((row_value && row_value[acc.fieldname] && slc !== row_value[acc.fieldname.replace(/_record$/g, "_module")] && !sCrv)){
    setSlc(row_value[acc.fieldname.replace(/_record$/g, "_module")])
    setPopup(row_value[acc.fieldname.replace(/_record$/g, "_module")])
  }
  useEffect(()=>{
    if (add.temp && add.temp[acc.fieldname.replace(/_record$/g, "_module")] && slc !== add.temp[acc.fieldname.replace(/_record$/g, "_module")]  && !sCrv){
      setSlc(add.temp[acc.fieldname.replace(/_record$/g, "_module")])
      setPopup(add.temp[acc.fieldname.replace(/_record$/g, "_module")])
    }
  },[add.temp])


  useEffect(()=>{
  if(sCrv){
  if(isEdit){
    setSearchTableModule(row_value['cal_module'])
    setSearchRelatedTo(row_value['cal_module'])
    setRelated_record(row_value['cal_module'])
    setUitype_module({})
  }
  else{
    setSearchTableModule('')
    setSearchRelatedTo('')
    setRelated_record('')
    setUitype_module({})
  }

}
  },[])

  const hanldleChange = (e, fieldname) => {

    delete row_value[fieldname];
    delete row_value[fieldname.replace('_record','_module')];
    delete row_value[fieldname + "_name"];
    delete add_forName[fieldname];


    let value = e.target.value
    uitype_module[fieldname] = value
    setSlc(value);
    if(sCrv){
       sCrv(value)
    }
  }
  const handleOnClick = () => {
    if((!uitype_module && related_record == "") || popup == ""){
      if(!acc.relatedto.includes(searchRelatedTo) || !searchTableModule){
        setShow2(true)
        }
    }
    else{
      if (acc.relatedto.includes(searchRelatedTo)){
        setSearchTableModule(searchRelatedTo)
        setModChange(false)
      }else{
        setSearchTableModule(slc)
      }
    }
  }

  return <div key={acc.fieldname} className={rst ? "offset-2" : "col-lg-3 col-md-7 col-sm-7 col-12"}>
    <div className={rst ? "row w-100" : "row"}>
      {acc.relatedto.length >= 1 ?
        <div className={rst ? "col-4 col-md-4 pr-0 select_module" : "col-lg-3 col-md-4 col-sm-3 col-4 pr-0 select_module" }>
          <Form.Control as="select" key={acc.fieldname} onChange={(e) => (
            hanldleChange(e, acc.fieldname),
            e.target.value === "" ? setSearchRelatedTo() : setSearchRelatedTo(e.target.value),
            setRelated_record(e.target.value), setPopup(e.target.value),setModChange(true)
          )}
            size="sm" className="choose_select">
              
            {/* <option hidden> <Trans>{relatedPopUp == true ? searchRelatedTo : uitype_module&&uitype_module[acc.fieldname] || "Select"}</Trans></option> */}
          
            <option hidden><Trans>{row_value['cal_module'] ? row_value['cal_module'] :(acc.relatedto.includes(row_value[acc.fieldname.replace(/_record$/g, "_module")]) && row_value[acc.fieldname.replace(/_record$/g, "_module")])||add.temp && add.temp[acc.fieldname.replace(/_record$/g, "_module")] || "Select"} </Trans> </option>
          
            {/* <option hidden><Trans>{ acc.relatedto.includes(searchRelatedTo) ? searchRelatedTo||"Select" :uitype_module&&uitype_module[acc.fieldname] ||"Select" } </Trans> </option> */}
            <option value={""}>Select</option>
            {
              acc.relatedto.map((ye, i) => (
                <option className="option" key={ye} value={ye}><Trans>{ye}</Trans></option>
              ))
            }
          </Form.Control>
        </div>
        : null}

      <div key={acc.fieldlabel}
        className={ "col-lg-9 col-md-10 col-sm-9 col-10 search_form_field relat-2 searchBar" } >
        <input type={acc.field_type}
          className={rst ? "w-75" : ""}
          readOnly
          style={{ backgroundColor: "white" }}
          name={acc.fieldname}
          // value={relatedPopUp == true ? row_value[`related_${searchRelatedTo}`] :uitype_module&& row_value[`related_${uitype_module[acc.fieldname]}`] || add_forName&&add_forName[acc.fieldname]}
          // value={acc.relatedto.includes(searchRelatedTo) && acc.relatedto.length >=2 ? ( uitype_module && (row_value[`related_${uitype_module[acc.fieldname]}`]||row_value[`related_${searchRelatedTo}`]) !== undefined ? row_value[`related_${uitype_module[acc.fieldname]}`] || row_value[`related_${searchRelatedTo}`]    : add_forName[acc.fieldname]) : (uitype_module&& row_value[`related_${uitype_module[acc.fieldname]}`] || add_forName&&add_forName[acc.fieldname],console.log("===2"))}
         value = {slc === row_value['cal_module'] ? row_value[['related_'+row_value['cal_module']]]:(uitype_module && acc.relatedto.includes(uitype_module[acc.fieldname]) && row_value[acc.fieldname + '_name']) || add_forName&&add_forName[acc.fieldname] || ''}
          // value={relatedPopUp == true ?acc.relatedto.includes(searchRelatedTo) ? row_value[`related_${searchRelatedTo}`]: uitype_module&& row_value[`related_${uitype_module[acc.fieldname]}`] || add_forName&&add_forName[acc.fieldname] :uitype_module&& row_value[`related_${uitype_module[acc.fieldname]}`] || add_forName&&add_forName[acc.fieldname]}

          onChange={(e) => (setRow_value(add.related_to = e.target.value))} placeholder="">
        </input>
        <span onClick={handleOnClick}><i><SearchIconModal rst={rst} searchTableModule={slc} sicn={true} module={module_name} uitype={acc.uitype} fieldname={acc.fieldname}  modChange={modChange}/> </i></span>
      </div>


    </div>
  </div>
}

export default Uitype14