import React, { useContext } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";
import Moment from 'moment';
import { CalendarNav, CalendarNext, CalendarPrev, Datepicker} from "@mobiscroll/react";
import { VscCalendar } from "react-icons/vsc"
import { useEffect } from "react";


const Uitype7 =({acc,parent})=>{
    const {add, setAdd, addForMulti, setAddForMulti} = useContext(opCreatePageData)

    useEffect(()=>{
      if(acc.fieldname === "invoice_date"){
        setAdd(add => ({...add,[acc.fieldname]:Moment().format("YYYY-MM-DD")}))
      }
    },[parent])

    const calendarHeader = () => {
        return <React.Fragment>
          <CalendarPrev className="custom-prev" />
          <CalendarNav className="custom-nav" />
          <CalendarNext className="custom-next" />
        </React.Fragment>;
      }
    return (
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
        {
          <div >
            <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
              <Datepicker className="form-control  datetimepicker-input"
                controls={['calendar']}
                display='anchored'
                renderCalendarHeader={calendarHeader}
                inputComponent="input"
                inputProps={{
                  className: "form-control  datetimepicker-input"
                }}
                name={acc.fieldname}
                onChange={(inst) => (setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD") }), setAddForMulti({ ...addForMulti, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD") }))}
                dateFormat="DD-MM-YYYY"
                defaultValue={add[acc.fieldname]||''}
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
export default Uitype7;