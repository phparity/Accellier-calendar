import { useContext } from "react";
import { AuthContext } from "../../config/Authentications/AuthContext";
import { opCreatePageData } from "../../navigation/PageRoutes";


const Uitype100 = ({acc,changeHandle,module_name,userlistClick})=>{
    const {authState, setAuthState} = useContext(AuthContext)
    const {add,setAdd} = useContext(opCreatePageData)


    return (
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12 ">
        <select name={acc.fieldname} defaultValue={add[acc.fieldname] ? add[acc.fieldname] : authState.username} onChange={(event)=>changeHandle(event.target)}>

          <option hidden>{add[acc.fieldname]}</option>
          {
            (acc.options).map((option) => (
              <option key={option.userid} defaultValue={add[acc.fieldname]}>
                {option.firstname} {option.lastname !== "&nbsp;" ? option.lastname : ""}
              </option>
            ))
          }
        </select>
        {
          module_name !== "report" ? null :
            <p className="moreuser" onClick={userlistClick}>Want to assign more user's? Click Here</p>
        }
      </div>
    )
}
export default Uitype100;