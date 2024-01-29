import { useContext } from 'react';
import Moment from 'moment';
import { Datepicker} from "@mobiscroll/react";
import { opCreatePageData } from '../../navigation/PageRoutes';
import { VscCalendar } from "react-icons/vsc"

const Uitype9 =({acc})=>{
    const {add, setAdd} = useContext(opCreatePageData)

    return (
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
        {
          <div>
            <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
              <Datepicker className="form-control  datetimepicker-input"
                controls={['calendar', 'time']}
                display='anchored'
                buttons={['set', 'cancel']}
                inputComponent="input"
                inputProps={{
                  className: "form-control  datetimepicker-input"
                }}
                // name={acc.fieldname}
                // onChange={(inst) => setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD HH:mm") })}
                // dateFormat="DD/MM/YYYY"
                // timeFormat="HH:mm"
                // defaultValue={add[acc.fieldname]||''}

                name={acc.fieldname}
                onChange={(inst) => (
                  setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("DD-MM-YYYY HH:mm") }) )}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
                defaultValue={add[acc.fieldname]}
              />
              <span className="input-group-text" data-toggle="datetimepicker" data-target="#datetimepicker3" >
                <VscCalendar />
              </span>
            </div>
          </div>
        }
      </div> 
    )
}
export default Uitype9;