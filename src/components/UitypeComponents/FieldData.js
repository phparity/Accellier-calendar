
const FieldData = ({acc,autofillnumm,changeHandle})=>{
        return (
            <input type={acc.field_type}
            name={acc.fieldname}
            // value={"AUTO GENERATED"}
            onChange={(event)=>changeHandle(event.target)} placeholder= "AUTO GENERATED" readOnly>
          </input>
        )
    }
    
    export default FieldData;
