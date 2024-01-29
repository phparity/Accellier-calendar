import Moment from 'moment';

const CreateRecordTime = ({ k, blocke, add, duplicate }) => {
  return (
    <div>
      <div key={k + '1'} className="detail_div3">
        <div className="row">
          {
            blocke[k].map((acc, i) => ( 
              acc.uitype === 10 ?
                <div key={i} className="col-lg-2 col-md-5 col-sm-5 col-12">
                  <div className="created_date">{acc.fieldlabel} <span>{duplicate ? Moment().format("DD-MM-YYYY HH:mm") : Moment(add[acc.fieldname], "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") == "Invalid date" ? Moment().format("DD-MM-YYYY HH:mm") : Moment(add[acc.fieldname], "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")}</span></div>

                </div>
                : null
            ))
          }
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  )
}
export default CreateRecordTime;