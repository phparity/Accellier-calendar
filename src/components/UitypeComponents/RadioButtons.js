

const RadioButtons = ({acc,changeHandle})=>{
    return (
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12" onChange={(event)=>changeHandle(event.target)} style={{ display: 'inherit' }}>
                                          {
                                            (acc.options||[]).map((option) => ( 
                                              [<input className="radioButton" type={acc.field_type} value={option.radiovalue} id={option.radiovalue} name={acc.fieldname} style={{ height: '15px' }} ></input>,
                                              <label className="radioButtonLabel" htmlFor={option.radiovalue}>{option.radiolabel}</label>]
                                            ))
                                          }
                                        </div>
    )
}
export default RadioButtons;