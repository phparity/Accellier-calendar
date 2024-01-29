import { useContext } from "react";
import { opCreatePageData } from "../../navigation/PageRoutes";
import Moment from 'moment';
import { Datepicker} from "@mobiscroll/react";
import { MdAccessTime } from "react-icons/md"



const Uitype8 = ({acc})=>{
    const {add, setAdd, addForMulti, setAddForMulti} = useContext(opCreatePageData)


    return(
        <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
        {
          <div>
            <div className="input-group date timepickers timepickerWrap" id="datetimepicker5" data-target-input="nearest">
              <Datepicker
                cssClass="datetimepicker56"
                buttons={['set', 'cancel']}
                display='anchored'
                controls={['time']}
                touchui={true}
                timeFormat="HH:mm"
                inputComponent="input"
                inputProps={{
                  className: "form-control  datetimepicker-input"
                }}
                name={acc.fieldname}
                onChange={(inst) => (setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("HH:mm") }), setAddForMulti({ ...addForMulti, [acc.fieldname]: Moment(inst.value).format("HH:mm") }))}
                defaultValue={add[acc.fieldname]}
              />
              <span className="input-group-text" data-toggle="datetimepicker" data-target="#datetimepicker5">
                <MdAccessTime />
              </span>
            </div>
          </div>
        }

      </div> 

    )
}
export default Uitype8;