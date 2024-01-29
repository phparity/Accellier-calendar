import CurrencyInput from "react-currency-input-field";
import { CheckModuleName } from "../../utils/CheckModuleName";
import { useContext } from "react";
import { linee_value, opCreatePageData, r_value } from "../../navigation/PageRoutes";
import { lineOrderData } from "../../pages/OpCreatePage";

const FinancialBlock = ({ acc, changeHandle,payrollEdit,expenseEdit,copyCostProfit}) => {
    const { add, setAdd } = useContext(opCreatePageData)
    const {copyCostCal} = useContext(lineOrderData)
    let {  netProfit,TnetOfTaxes,Tmargin, g_total, total1, opExpTotAmount, payCostTotAmount, otherExpChange, setOtherExpChange, costs } = useContext(linee_value)
    let { add_forName } = useContext(r_value)
    let module_name = CheckModuleName();
    
    return (
        <div className="col-lg-3 col-md-7 col-sm-7 col-12">
            {(acc.fieldname !== "operational_expenses" && acc.fieldname !== "payroll_costs" && acc.fieldname !== "net_profit" && acc.fieldname !== "other_costs" &&
              acc.fieldname !== "expected_sales" && acc.fieldname !== "expected_profit" && acc.fieldname !== "expected_costs" && acc.fieldname !== "grand_total" &&
              acc.fieldname !== "total_tax")&&   
              <CurrencyInput
              name={acc.fieldname}
              onValueChange={(value, name) => changeHandle({ value, name })}
              value={add_forName[acc.fieldname]||''}
              thousandSeparator={false}
          />

            }
            {(acc.fieldname == "operational_expenses") &&
                <input type={acc.field_type}
                    name={acc.fieldname}
                    value={module_name === "opportunity" ? (expenseEdit) : (add[acc.fieldname] != undefined) ? add[acc.fieldname] : "0"}
                    onChange={(event)=>changeHandle(event.target)} placeholder="" readOnly={true}>
                </input>}

            {(acc.fieldname == "payroll_costs") &&
                <input type={acc.field_type}
                    name={acc.fieldname}    
                    value={module_name === "opportunity" ? (payrollEdit) : (add[acc.fieldname] != undefined) ? add[acc.fieldname] : "0"}
                    onChange={(event)=>changeHandle(event.target)} placeholder="" readOnly={true}>
                </input>}
            {/* {
                ((acc.fieldname == "net_profit") || (acc.fieldname == "other_costs") || (acc.fieldname == "expected_sales")) &&
                <CurrencyInput
                    name={acc.fieldname}
                    onValueChange={(value, name) => changeHandle({ value, name })}
                    value={(acc.fieldname === 'net_profit') ? netProfit : (acc.fieldname === "expected_sales" && (add['copy_costs'] === true || add["copy_costs"] === 1)) ? TnetOfTaxes : otherExpChange && acc.fieldname === "other_costs" ? console.log("=====",add[acc.fieldname]) : (add[acc.fieldname] || "0.00")}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    onClick={() => { if (!otherExpChange && acc.fieldname === "other_costs" && (add['other_costs'] === "0" || add['other_costs'] === "" || add['other_costs'] === undefined)) { setAdd({ ...add, ["other_costs"]: "" }); setOtherExpChange(!otherExpChange) 
                    console.log("Value for other_costs:", add['other_costs'],acc.fieldname);
                } }}
                   
                    readOnly={acc.fieldname === "net_profit" ? true : acc.fieldname === "other_costs" ? false : add["copy_costs"] === undefined ? false : add["copy_costs"]} />
            } */}

{
    ((acc.fieldname === "net_profit") || (acc.fieldname === "other_costs") || (acc.fieldname === "expected_sales")) && (
        () => {
            let financialCalc;
            if (acc.fieldname === 'net_profit') {
                financialCalc = add['copy_costs'] ? netProfit : copyCostCal||0;
            }else if (acc.fieldname === "expected_sales" && (add['copy_costs'] === true || add["copy_costs"] === 1)) {
                financialCalc = TnetOfTaxes||add[acc.fieldname]||0;
            }else if (acc.fieldname === "expected_sales" && (add['copy_costs'] === false || add["copy_costs"] === 0)) {
                financialCalc = parseFloat(String(add[acc.fieldname]).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
            }else if ( acc.fieldname === "other_costs") {
                financialCalc = parseFloat(String(add[acc.fieldname]).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
             }
            return (
                <CurrencyInput
                    name={acc.fieldname}
                    onValueChange={(value, name) => changeHandle({ value, name })}
                    value={financialCalc}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    onClick={() => {
                        if (!otherExpChange && acc.fieldname === "other_costs" && (add['other_costs'] === "0" || add['other_costs'] === "" || add['other_costs'] === undefined)) {
                            setAdd({ ...add, ["other_costs"]: "" });
                            setOtherExpChange(!otherExpChange);
                         }
                    }}
                    readOnly={acc.fieldname === "net_profit" ? true : acc.fieldname === "other_costs" ? false : add["copy_costs"] === undefined ? false : add["copy_costs"]}
                />
            );
        }
    )()
}


            
            {
                (acc.fieldname === "expected_profit") &&

                <CurrencyInput
                    name={acc.fieldname}
                    onValueChange={(value, name) => changeHandle({ value, name })}
                    value={add["copy_costs"] === true || add["copy_costs"] === 1 ? Tmargin.toFixed(2).replace("NaN", "0.00") : parseFloat(String(add["expected_profit_"]  || copyCostProfit ||'0').replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ''))}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    readOnly={add["copy_costs"] === undefined ? false : add["copy_costs"]} />

            }
            {acc.fieldname === "expected_costs" && <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                <CurrencyInput
                    name={acc.fieldname}
                    onValueChange={(value, name) => changeHandle({ value, name })}
                    value={costs || add[acc.fieldname] || ""}
                    decimalScale={2}
                    fixedDecimalScale={true} />
            </div>}
            {(acc.fieldname === "grand_total") &&
                <input type={acc.field_type}
                    name={acc.fieldname}
                    value={parseFloat(g_total).toFixed(2)}
                    onChange={(event)=>changeHandle(event.target)} placeholder="" readOnly>
                </input>}
            {
                acc.fieldname === "total_tax" &&
                <input type={acc.field_type}
                    name={acc.fieldname}
                    value={parseFloat(total1).toFixed(2)}
                    onChange={(event)=>changeHandle(event.target)} placeholder="" readOnly>
                </input>}



        </div>
    )
}
export default FinancialBlock;

