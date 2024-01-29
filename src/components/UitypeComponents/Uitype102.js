import { useContext } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";


const Uitype102 = ({acc,changeHandle})=>{
    const {add,setAdd} = useContext(opCreatePageData)

return (
    <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
    <select name={acc.fieldname} value={add[acc.fieldname]} onChange={(event)=>changeHandle(event.target)}>
      <option hidden>Select</option>
      {
        (acc.options).map((option) => (
          <option key={option.picklistvalue} value={option.picklistvalue} >
            {option.picklistlabel}
          </option>
        ))
      }
    </select>
  </div>
)
}

export default Uitype102;