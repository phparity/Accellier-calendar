import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button } from "react-bootstrap";
import { FaFileInvoice } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import Slider from "react-slick";
import SVG from "react-inlinesvg";
import { CgListTree } from "react-icons/cg";
import { CheckModuleName, CheckModuleName1 } from "../utils/CheckModuleName";
import { useContext } from "react";
import { Trans } from "react-i18next";
import { useParams } from "react-router-dom";
import { r_value } from "../navigation/PageRoutes";


const RelatedIconList =(props)=>{

    let module_name = CheckModuleName()
  let related_list_link = module_name;
  let related_list_link2 = CheckModuleName1();
  if (related_list_link2 === 'customer') {
    related_list_link2 = 'accounts'
  } else {
    related_list_link2 = related_list_link2
  }
  const { rlist, setRlist } = useContext(r_value)
  let { id } = useParams();

    const pervidfuction = () => {
        localStorage.setItem("prev_c_id", id);
        localStorage.setItem("prev_module_name", module_name);
      };

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
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
    ],
  };
  return (
    <>
      <div className="mobile_icons_div mobile_icons_div1">
        <div className="mobile_icons_left">
          {/* <span className="float-left wordi">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF"/><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white"/><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white"/></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2"/><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"/></clipPath></defs></svg>
					         
                </span>
                  <span className="float-left wordp"><p>Details</p></span> */}
        </div>

        <div className="mobile_icons_right">
          <div className="relatedlist_drpdwn">
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Related List
                </Dropdown.Toggle>

                <Dropdown.Menu className="related_drop">
                  <Dropdown.Item
                    href={"#/home/" + module_name + "/detail/" + props.c_id}
                  >
                    <div
                      className="di_icons"
                      onClick={() =>
                        localStorage.removeItem("relatedmodule")
                      }
                    >
                      <span className="related_svg_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="20"
                          viewBox="0 0 27 20"
                          fill="none"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z"
                              fill="#4E73DF"
                            />
                            <rect
                              width="5.78572"
                              height="0.964285"
                              transform="matrix(-1 0 0 1 13.5 10.9287)"
                              fill="white"
                            />
                            <rect
                              width="7.07143"
                              height="0.964285"
                              transform="matrix(-1 0 0 1 13.5 12.8569)"
                              fill="white"
                            />
                          </g>
                          <path
                            d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z"
                            fill="#4E73DF"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="matrix(-1 0 0 1 18 0)"
                              />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="r_name">Details</span>
                  </div>
                </Dropdown.Item>
                {rlist&&rlist
                  .sort((a, b) => a.seq - b.seq)
                  .map((r) => (
                    <Dropdown.Item
                      key={r.seq}
                      href={r.name == "Comment" ? "#/home/" + related_list_link + "/relatedlist/nn/" + id :
                        related_list_link == "customer" ? "#/home/" + "accounts" + "/relatedlist/" + id
                          : "#/home/" + related_list_link + "/relatedlist/" + id}>
                      <div className="di_icons" onClick={() => (localStorage.setItem("relatedmodule", r.name.toLowerCase()),localStorage.setItem("relatedmodule2", r.name.toLowerCase()), pervidfuction())}>
                        <span className="related_svg_icon"> {[<SVG src={r.related_icon} />]}</span>
                        <span className="r_name"><Trans> {r.name == "Customer" ? r.relatedlistname : r.name}</Trans> </span>
                      </div>
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="icons_div">
        <span className="prev_arrow"></span>
        {rlist&&rlist[0] == undefined ? null :
          <Slider {...settings}>
            <div className="detail_icons">
              <li className='active' onClick={() => localStorage.removeItem("relatedmodule")}>
                <a href={module_name == "customer" ? "#/home/" + "accounts" + "/detail/" + id : module_name == "opportunity"|| module_name == "invoice" || module_name == "supplierorder" || module_name == "supplierorderreturn"? "#/home/" + module_name + "/detail-op/" + id: "#/home/" + module_name + "/detail/" + id}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>
                  <p>Details</p>
                </a>
              </li>
            </div>
            {
             rlist&& rlist.sort((a, b) => a.seq - b.seq).map((r) => (
                [<div className="detail_icons" ><li className=''
                  onClick={() => (localStorage.setItem("relatedmodule", r.name.toLowerCase()),localStorage.setItem("relatedmodule2", r.name.toLowerCase()), pervidfuction())}>
                  {/* <a key={r.name} href={"#/home/" + related_list_link + "/relatedlist/" + id}>{[<svg key={1} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={r.related_icon} fill="#7B8593" /></svg>]} */}
                  <a key={r.name} href={r.name == "Comment"? "#/home/" + related_list_link2 + "/relatedlist/nn/" + id:related_list_link == "customer" ? "#/home/" + "accounts" + "/relatedlist/" + id
                    : "#/home/" + related_list_link2 + "/relatedlist/" + id}>
                    {[<SVG src={r.related_icon} />]}
                    <p><Trans>{r.name == 'Customer' ? r.relatedlistname : r.name}</Trans></p></a>
                </li></div>]

              ))
            }
          </Slider>
        }
        <span className="next_arrow"></span>
      </div> </>
  );
}
export default RelatedIconList;