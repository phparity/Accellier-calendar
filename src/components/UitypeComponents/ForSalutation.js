import { useContext } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";


const ForSalutation =({acc,changeHandle})=>{
    const {add,setAdd} = useContext(opCreatePageData)

    return (
        <div key={"a3"} className="col-lg-3 col-md-7 col-sm-7 col-12 salute_column">
        <div className="row salute_row">
          <div className="col-lg-3 col-md-4 col-sm-3 col-4 pr-0">
            <select key={"a2"} name={acc.fieldname} value={add[acc.fieldname]} onChange={(event)=>changeHandle(event.target)}>
              {/* <option hidden>{add[acc.fieldname] == undefined ? "Mr." : salutation} </option> */}
              {acc.options.length >= 1 ?
                (acc.options).map((opt) => (
                  <option key={opt.picklistlabel} value={opt.picklistvalue} >
                    {opt.picklistlabel}
                  </option>
                )) : null
              }
            </select>
          </div>
        </div>
      </div> 
    )
}

export default ForSalutation;