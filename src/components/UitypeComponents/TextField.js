import { useContext, useState, useEffect } from "react";
import { opCreatePageData, r_value } from "../../navigation/PageRoutes";

const TextField = ({ acc, changeHandle, selectedFlatRowsmy, module_name,parent }) => {
  let { add_forName, setAdd_forName } = useContext(r_value);
  const { add, setAdd } = useContext(opCreatePageData);
  const [emailError, setEmailError] = useState(false);

  // console.log("POst Address",parent,"acccc",acc)
  
    // useEffect(()=>{
    //   if(parent && (acc.fieldname === module_name+'_city')){
    //     const md_name = localStorage.getItem('prev_module_name')
    //     setAdd_forName(add_forName => ({...add_forName,[module_name+'_city']:parent[md_name+'_city']}))
    //     setAdd(add => ({...add,[module_name+'_city']:parent[md_name+'_city']}))
    //   }
    //   if(parent && (acc.fieldname === module_name+'_post_code')){
    //     setAdd_forName(add_forName => ({...add_forName,[module_name+'_post_code']:parent['post_code']|| parent[(`${localStorage.getItem("prev_module_name2")}_post_code`)]}))
    //     setAdd(add => ({...add,[module_name+'_post_code']:parent['post_code'] || parent[(`${localStorage.getItem("prev_module_name2")}_post_code`)]}))
    //   }
    //   if(parent && (acc.fieldname === 'post_code')){
    //     const md_name = localStorage.getItem('prev_module_name')
    //     setAdd_forName(add_forName => ({...add_forName,['post_code']:parent['post_code']||parent[md_name+'_post_code']}))
    //     setAdd(add => ({...add,['post_code']:parent['post_code']||parent[md_name+'_post_code']}))
    //   }
    // },[parent])
  

  const isEmail = (value) => {
    const validFormat =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return validFormat.test(value);
  };

  const handleBlur = (event) => {
    const { value } = event.target;

    // Perform email validation if the field type is 'email'
    if (acc.field_type === 'email') {
      if (!isEmail(value)) {
        setEmailError(true);
        // event.target.value = ''; // Clear the email field value
        setAdd_forName({...add_forName,"email":value})
        setAdd({...add,"email":value})
      } else {
        setEmailError(false);
      }
    }
  };
  return (
    <>
      <input
        type={acc.field_type}
        readOnly={selectedFlatRowsmy && selectedFlatRowsmy.length >= 1 && acc.fieldname === module_name + "_name" || acc.readonly === '1' ? true : false}
        name={acc.fieldname}
        value={(add_forName && add_forName[acc.fieldname])}
        onChange={(event) => changeHandle(event.target)}
        onBlur={handleBlur}
        placeholder=""
      />
      {/* {console.log("valueADDDPOST",add_forName[acc.fieldname])} */}
      {emailError && <div className="error-message">Please enter valid email</div>}
    </>
  );
};

export default TextField;