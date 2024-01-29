import { useContext } from "react";
import { r_value } from "../../navigation/PageRoutes";
import CurrencyInput from "react-currency-input-field";

const Uitype11 = ({ acc, changeHandle }) => {
    let { add_forName } = useContext(r_value)

    return (
        <div className="col-lg-3 col-md-7 col-sm-7 col-12">
            <CurrencyInput
                name={acc.fieldname}
                onValueChange={(value, name) => changeHandle({ value, name })}
                value={add_forName[acc.fieldname] && Number(add_forName[acc.fieldname].replace(',',''))}
                thousandSeparator={false}
            />
        </div>
    )
}

export default Uitype11;