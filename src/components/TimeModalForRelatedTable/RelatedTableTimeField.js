import React, { useContext,useState } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";
import Moment from 'moment';
import { CalendarNav, CalendarNext, CalendarPrev, Datepicker } from "@mobiscroll/react";
import { VscCalendar } from "react-icons/vsc"


const RelatedTableTimeField = ({ acc }) => {
  const { valuex, setValuex} = useContext(opCreatePageData)
  const [relDate,setRelDate] = useState('')
  const calendarHeader = () => {
    return <React.Fragment>
      <CalendarPrev className="custom-prev" />
      <CalendarNav className="custom-nav" />
      <CalendarNext className="custom-next" />
    </React.Fragment>;
  }
  return (
    <div key={acc} className="rel-date-pop-up">
      {
        <div >
          <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
          <Datepicker className="form-control  datetimepicker-input"
                    controls={['time']}
                    select="range" 
                    pages={1}
                    touchUi={true}
                    renderCalendarHeader={calendarHeader}
                    display='anchored'
                    value={valuex[acc] ? relDate:''}
                    onChange={(ev) => (setRelDate(ev.value),setValuex({...valuex, [acc]:`${Moment(ev.value[0]).format("DD-MM-YYYY")}@@${Moment(ev.value[1]).format("DD-MM-YYYY")}` }))}
                     />
            <span className="input-group-text" data-toggle="datetimepicker" data-target="#datetimepicker3" style={{marginTop:"-4px"}} >
              <VscCalendar />
            </span>
          </div>
        </div>
      }
    </div>
  )
}
export default RelatedTableTimeField;