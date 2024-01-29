import { useContext ,useState} from 'react';
import Moment from 'moment';
import { Datepicker} from "@mobiscroll/react";
import { opCreatePageData } from '../../navigation/PageRoutes';
import { VscCalendar } from "react-icons/vsc"

const Uitype9DateModal =({acc}, {abcd})=>{
    const {add, setAdd, valuex, setValuex} = useContext(opCreatePageData)
    const [relDate,setRelDate] = useState('')
    return (
        <div key={acc} className="rel-date-pop-up">
        {
          <div>
            <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
              <Datepicker className="form-control  datetimepicker-input"
                controls={['calendar', 'time']}
                display='anchored'
                buttons={['set', 'cancel']}
                select="range"
                touchUi={true}
                pages={1}
                inputComponent="input"
                inputProps={{
                  className: "form-control  datetimepicker-input"
                }}
                name={acc.fieldname}
                onChange={(ev) => (setRelDate(ev.value),setValuex({...valuex, [acc]:`${Moment(ev.value[0]).format("DD-MM-YYYY")}@@${Moment(ev.value[1]).format("DD-MM-YYYY")}` ||  relDate })
                ,setAdd({...valuex, [acc]:`${Moment(ev.value[0]).format("DD-MM-YYYY")}@@${Moment(ev.value[1]).format("DD-MM-YYYY")}` ||  relDate }))}
                dateFormat="DD-MM-YYYY"
                timeFormat="HH:mm"
                value={valuex[acc] ? relDate:''}
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
export default Uitype9DateModal;
