import { useContext } from "react";
import { linee_value, opCreatePageData, r_value } from "../../navigation/PageRoutes";
import { lineOrderData } from "../../pages/OpCreatePage";
import { VscInfo } from "react-icons/vsc";

const Checkbox =({acc,expenseEdit,payrollEdit})=>{
    const {add,setAdd,addForMulti, setAddForMulti} = useContext(opCreatePageData)
    const lineOrderContext = useContext(lineOrderData)
    let { add_forName, setAdd_forName } = useContext(r_value)
    const {Tmargin} = useContext(linee_value)
    const changeHandle = (e, acc) => {
        const name = e.target.name;
        const value = e.target.value;

        if (e.target.type === 'checkbox' ) {
          setAdd({ ...add, [name]: e.target.checked })
          setAddForMulti({ ...addForMulti, [name]: e.target.checked })
        };


        if(add["copy_costs"]===1 || add["copy_costs"]===false){
          let netProf = Tmargin - Number(payrollEdit||add['payroll_costs']||0) - Number(add['other_costs']||0) - Number(expenseEdit||add['operational_expenses']||0)
           setAdd(add => ({...add,["expected_profit_"]:Tmargin,['net_profit']:netProf}))
            lineOrderContext?.setCopyCostCal(netProf)
        } 
          }

    return (
      <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12 checkboxx">
      <div className="tooltip-container">
        <input
          type={acc.field_type}
          name={acc.fieldname}
          defaultValue={add[acc.fieldname]}
          checked={add[acc.fieldname] === undefined ? false : add[acc.fieldname] }
          onChange={(e) => changeHandle(e, acc)}
          placeholder=""
        />
        { acc.fieldname ==="terms" ?
        <VscInfo className="tooltip4" title={acc.term_text} /> : null
}
        {/* <div>
              <p><span className='tooltip' data-tooltip={acc.term_text}><VscInfo /></span></p>
              </div> */}
         {/* <div className="tooltip" >{acc.term_text}</div> */}
      {/* </div> */}
      {/* <label className="checkBoxButtonLabel">{acc.term_text}</label> */}
    {/* </div> */} 
    </div>  </div>
    )
}

export default Checkbox;