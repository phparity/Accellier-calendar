import Slider from "react-slick";
import { Trans } from 'react-i18next'
import SVG from 'react-inlinesvg';
const RelatedListForCreateRecord = ({module_name,openSmLeaveEditWarn,e_id,rlist})=>{

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 13,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <div className="icons_div">
        <span className="prev_arrow"></span>
        {rlist[0] == undefined ? null :
          <Slider {...settings}>
            <div className="detail_icons">
              <li className=''
                onClick={() => openSmLeaveEditWarn("", "#/home/" + module_name + "/detail/" + e_id)}>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>
                  <p>Details</p>
                </a>
              </li>
            </div>
            {
              rlist.sort((a, b) => a.seq - b.seq).map((r) => (

                [<div className="detail_icons"><li key={1} className=''
                  onClick={() => openSmLeaveEditWarn(r.name.toLowerCase(), "#/home/" + (module_name === "customer" ? "accounts" :module_name === "supplier" ? "suppliers" :module_name) + "/relatedlist/" + (localStorage.getItem('prev_c_id') || localStorage.getItem('c_id')))}>
                  <a key={r.name} >{[<SVG src={r.related_icon} />]}<p><Trans>{(r.name == 'Customer' ? r.relatedlistname : r.name)}</Trans></p></a>
                </li></div>]

              ))
            }
          </Slider>
        }
        <span className="next_arrow"></span>
      </div>
    )
}
export default RelatedListForCreateRecord