import { useContext, useEffect, useState  } from "react"
import { opCreatePageData, r_value } from "../../navigation/PageRoutes"
import Select from 'react-select';
import { CgSearch } from "react-icons/cg"

const Uitype103 = ({acc,blocke,module_name,parent})=>{
    const {add,setAdd,addForMulti, setAddForMulti,dep_dropdown_value,country} = useContext(opCreatePageData)
    let { add_forName, setAdd_forName,row_value } = useContext(r_value)

    //changes103 created new state
    const [selectedOption, setSelectedOption] = useState(add[acc.fieldname]);
   
let options = []

blocke && Object.keys(blocke||{})?.map((k) => (
    blocke[k]?.map((acc) => (
      acc.options != null && acc.fieldname == [module_name + '_county'] &&
      country&& (acc.options[country])?.map((county, i) => (
        options = [...options, {
          label: county.picklistlabel,
          value: county.picklistvalue
        }]
      ))
    ))

  ))
  blocke && Object.keys(blocke||{})?.map((k) => (
    blocke[k]?.map((acc) => (
      acc.options != null && acc.uitype == 103 &&
      acc.fieldname != [module_name + '_county'] && acc.depandent_for &&
      (acc.options[dep_dropdown_value[acc.depandent_for && acc.depandent_for]] || [])?.map((county, i) => (
        options = [...options, {
          label: county.picklistlabel,
          value: county.picklistvalue
        }]
      ))
    ))

  ))

useEffect(() => {
  // Reset the value when the country changes
  if (acc.fieldlabel === "County" && row_value && Object.keys(row_value).includes('supplier_county')) {
    setAdd((prevAdd) => ({ ...prevAdd, [acc.fieldname]: row_value.supplier_county }));
    setAdd_forName((prevAddForMulti) => ({ ...prevAddForMulti, [acc.fieldname]: row_value.supplier_county }));
  } else {
    if (!parent) {
      setAdd((prevAdd) => ({ ...prevAdd, [acc.fieldname]: '' }));
      setAdd_forName((prevAddForMulti) => ({ ...prevAddForMulti, [`${module_name}_county`]: add_forName[`${module_name}_county`] || '' }));
    }
  }
  //setAdd_forName((prevAdd) => ({ ...prevAdd, [acc.fieldname]: '' }));
  setAddForMulti((prevAddForMulti) => ({ ...prevAddForMulti, [acc.fieldname]: '' }));
  setSelectedOption(null);
}, [country, dep_dropdown_value]);

useEffect(() => {
  //handles the scenario when selectedOption is null meaans when multi edit if no changes done in country field
  const valueToSet = selectedOption ? selectedOption.value : '';
  setAdd((prevAdd) => ({ ...prevAdd, [acc.fieldname]: valueToSet }));
  setAddForMulti((prevAddForMulti) => ({ ...prevAddForMulti,[`${module_name}_country`]:prevAddForMulti[`${module_name}_country`] || 1, [acc.fieldname]: valueToSet }));
}, [selectedOption]);

const changeHandleRajya = (rajyaa) => {
  setSelectedOption(rajyaa);
};


const placeholderValue = add_forName[`${acc.fieldname}_ph`] || (add_forName[acc.fieldname] == 0 ? '' : selectedOption || add_forName[acc.fieldname]);

return (
  <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
    <Select
      options={options}
      id="countyselection"
      value={selectedOption}
      onChange={changeHandleRajya}
      placeholder={
        <>
          <CgSearch className="countyfield" />{"  "}{placeholderValue}
        </>
      }
    />
  </div>
);
};
export default Uitype103;