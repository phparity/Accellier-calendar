
const Fullwidth = ({acc,i})=>{
    return (
        <div key={i} className="col-lg-1"></div>,
        <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
      </div>,
      <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
      </div> 
    )
}
export default Fullwidth;