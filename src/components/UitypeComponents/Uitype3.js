import { useContext, useEffect } from "react";
import { opCreatePageData, r_value } from "../../navigation/PageRoutes";


const Uitype3 = ({acc,changeHandle,parent})=>{
    const {add,setAdd} = useContext(opCreatePageData)
    let {  add_forName,setAdd_forName } = useContext(r_value)
    const related_module =  localStorage.getItem('relatedmodule')

// console.log("parentss",parent,"accc",acc,"related",related_module)

    // useEffect(() => {
    //   if(parent && (acc.fieldname === "street_address" || acc.fieldname === "bill_to_address" || acc.fieldname === `${related_module}_address` || acc.fieldname === `${localStorage.getItem("prev_module_name2")}_address`)){
    //     setAdd_forName(add_forName => ({...add_forName,[acc.fieldname]:parent['street_address']||parent['supplier_address']||parent['address'] || parent["bill_to_address"] || parent[(`${localStorage.getItem("prev_module_name2")}_address`)] }))
    //     setAdd(add => ({...add,[acc.fieldname]:parent['street_address']||parent['supplier_address']||parent['address'] || parent["bill_to_address"] || parent[(`${localStorage.getItem("prev_module_name2")}_address`)] }))
    //   }
    // },[parent])


    return (
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
        <textarea type={acc.field_type} rows="3" cols="10"
          name={acc.fieldname}
          value={add_forName[acc.fieldname]}
          onChange={(event)=>changeHandle(event.target)} placeholder="">
            {/* {console.log("valueADDD",add_forName[acc.fieldname])} */}
        </textarea>
      </div>

    )
}
export default Uitype3;