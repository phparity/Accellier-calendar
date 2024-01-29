import { useContext } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";


const Uitype101 = ({acc,changeHandle})=>{
    const {add,setAdd} = useContext(opCreatePageData)

return (
    <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
    <select name={acc.fieldname} value={add[acc.fieldname]} onChange={(event)=>changeHandle(event.target)}>

      <option hidden></option>
      {
        (acc.options).map((option) => (
          <option key={option.userid} value={option.moduleid}>
            {option.name}
          </option>
        ))
      }
    </select>
  </div>
)
}

export default Uitype101;
