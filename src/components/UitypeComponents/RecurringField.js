

const RecurringField = ({acc,changeHandle,ruleshow,selectedFlatRowsmy,setShow5})=>{

    return (
        <div key={acc.fieldname} onClick={() => setShow5(selectedFlatRowsmy.length >= 1 ? false : true)} className="col-lg-3 col-md-7 col-sm-7 col-12">
        <textarea type="text"
          name={acc.fieldname}
          defaultValue={ruleshow}
          onChange={changeHandle} placeholder="" readOnly>
        </textarea>
      </div> 

    )
}
export default RecurringField;