import { useContext, useEffect } from "react"
import { opCreatePageData, r_value } from "../../navigation/PageRoutes"
import { CheckModuleName } from "../../utils/CheckModuleName"

function Uitype2(props){
    let { add_forName,setAdd_forName,row_value,setRow_value } = useContext(r_value)
    const {add, setAdd,addForMulti, setAddForMulti,dep_dropdown_value, setDep_dropdown_value,country, setCountry } = useContext(opCreatePageData)
    let module_name = CheckModuleName()
    let related_module = localStorage.getItem("relatedmodule")
    let acc = props.acc
    // console.log("1111111country",country,"propsssss",props)
    useEffect(()=>{
          if(acc.fieldlabel === "Country" && row_value && Object.keys(row_value).includes('supplier_country')){
      setDep_dropdown_value({[acc.fieldname]: row_value.supplier_country })
      setAdd_forName(add_forName => ({ ...add_forName, [acc.fieldname]: row_value.supplier_country }))
      setAdd(add => ({ ...add, [acc.fieldname]: row_value.supplier_country }))
      setAddForMulti(addForMulti => ({ ...addForMulti, [acc.fieldname]: row_value.supplier_country }))
    }
    },[])

    // useEffect(()=>{
    //   if(props.parent && acc.fieldlabel === "Country"){
    //     const md_name = localStorage.getItem('prev_module_name')
    //     setCountry(props.parent[`${props.parent['module_name']}_countryid`])
    //     setAdd(add => ({...add,[`${related_module}_county_ph`]:props.parent[`${props.parent['module_name'] || md_name}_county`],
    //       [`${related_module}_county`]:props.parent[`${props.parent['module_name'] || md_name}_countyid`],
    //       [`${related_module}_country_ph`]:props.parent[`${props.parent['module_name']|| md_name}_country`],
    //       [`${related_module}_country`]:props.parent[`${props.parent['module_name']|| md_name}_countryid`]}))
    //     setAdd_forName(add_forName => ({...add_forName,[`${related_module}_county_ph`]:props.parent[`${props.parent['module_name']|| md_name}_county`],
    //       [`${related_module}_county`]:props.parent[`${props.parent['module_name']|| md_name}_countyid`],
    //       [`${related_module}_country_ph`]:props.parent[`${props.parent['module_name']|| md_name}_country`],
    //       [`${related_module}_country`]:props.parent[`${props.parent['module_name']|| md_name}_countryid`]}))
    //     }
    // },[props.parent])

    useEffect(() => {
      if (props.parent && acc.fieldlabel === "Country") {
        const md_name = localStorage.getItem('prev_module_name');
    // console.log("399country",country,"mdname",md_name)
        // Check if country is undefined or null, set a default value of 1
        const defaultCountryValue = country !== undefined && country !== null ? country : 1;
    
        // for prefilling of country data in related module fields when create new
        // setCountry((props.parent[`${props.parent['module_name']}_countryid`] === undefined || props.parent[`${props.parent['module_name']}_countryid`] === null) ? defaultCountryValue  : props.parent[`${props.parent['module_name']}_countryid`])
    
        setAdd(add => ({
          ...add,
          [`${related_module}_county_ph`]: add[`${related_module || md_name}_county`],
          [`${related_module}_county`]: add[`${related_module|| md_name}_countyid`],
          [`${related_module}_country_ph`]: add[`${related_module|| md_name}_country`],
          [`${related_module}_country`]: add[`${related_module|| md_name}_countryid`], // default country value
        }));
    
        setAdd_forName(add_forName => ({
          ...add_forName,
          [`${related_module}_county_ph`]: add_forName[`${related_module|| md_name}_county`],
          [`${related_module}_county`]: add_forName[`${related_module|| md_name}_countyid`],
          [`${related_module}_country_ph`]: add_forName[`${related_module|| md_name}_country`],
          [`${related_module}_country`]: add_forName[`${related_module|| md_name}_countryid`], // default country value
        }));
      }
    }, [props.parent, country]);
    


    const changeHandle = (e, acc) =>{
      if(props.parent && acc.fieldlabel === "Country"){
        setAdd(add => ({...add,[`${related_module}_county_ph`]:'',[`${related_module}_county`]:'',[`${related_module}_country_ph`]:'',[`${related_module}_country`]:''}))
        setAdd_forName(add_forName => ({...add_forName,[`${related_module}_county_ph`]:'',[`${related_module}_county`]:'',[`${related_module}_country_ph`]:'',[`${related_module}_country`]:''}))
      }
      const name = e.target.name;
      const value = e.target.value;
  
      if (name == `${module_name}_country` ||name == `${related_module}_country`) {
        const md_name = localStorage.getItem('prev_module_name')
        setRow_value(row_value => ({...row_value,[`${md_name}_county`]:''}))
        setCountry(value)
        setAdd(add => ({...add,[`${module_name}_county`]:'',[`${related_module}_county`]:''}))
        setAdd_forName(add_forName =>({...add_forName,[`${module_name}_county`]:'',[`${related_module}_county`]:''}))
      }
    
      if (acc && (acc.uitype == 2 && acc.options.length)) {
        if(name === "equipment_category"){
          setAdd(add => ({...add,[`${module_name}_subcategory`]:''}))
          setAdd_forName(add_forName => ({...add_forName,[`${module_name}_subcategory`]:''}))  
          setDep_dropdown_value({[acc.fieldname]: value })
        }
      }
      setAdd(add => ({ ...add, [name]: value }))
      setAddForMulti({ ...addForMulti, [name]: value })

    }

    return    (
    <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
    <select key="s" name={acc.fieldname} defaultValue={add_forName[acc.fieldname]||''} onChange={event => { changeHandle(event, acc)}}>
      {acc.fieldname. match(/_country$/g)?
        <option hidden>{add_forName[acc.fieldname] ? add_forName[`${acc.fieldname}_ph`] || add_forName[acc.fieldname] : 'United Kingdom'}</option>
        : <option hidden>{add_forName[acc.fieldname] !== undefined ? add_forName[acc.fieldname] : 'Select'}</option>}
      {
        (acc.options).map((opt, i) => ( 
          <option key={i} value={opt.picklistvalue}>{opt.picklistlabel}</option>
        ))
      }
    </select>
  </div>)
}

export default Uitype2