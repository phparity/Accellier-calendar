import React, { useState, useEffect, useContext, createContext } from "react";
import "../../assets/style/Header.css";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import { Trans } from "react-i18next";
import useGetReq from "../../service/useGetReq";
import { GLOBALSEARCHAPI } from "../../service/ApiPath";
import { AuthContext } from "../../config/Authentications/AuthContext";
import useStorage from "../../service/useStorage";
const GlobalSearchBar = () => {
  const {authState,setAuthState} = useContext(AuthContext)
  const storage = useStorage();
  let tenantCname = authState.tenant_cname
  const [global_srch, setGlobal_srch] = useState("");
  const [global_res, setglobal_res] = useState([]);
  const [show2, setShow2] = useState(false);
  const [getData] = useGetReq();
  const [data1, setData1] = useState();
  const [err, setErr] = useState();

  const handleClose2 = () => setShow2(false);

  const detailfromsearch = (datax) => {
    setAuthState({...authState, customerDetails:JSON.stringify(datax)})
    handleClose2();
  };

  const global_submit = (e) => {
    e.preventDefault();
    let param = {
      params: {
        srch: global_srch,
      },
    };
    getData(GLOBALSEARCHAPI(tenantCname), setData1, setErr, param,storage);
  };
  useEffect(() => {
    if (data1) {
      setglobal_res(data1);
      setShow2(true);
    }
  }, [data1]);

  return (
    <>

      <form onSubmit={global_submit} className="form-inline search-inline">
        <div className="search-wap">
          <i className="float-left">
            <CgSearch />
          </i>
          <input
            value={global_srch || ""}
            onChange={(e) => {
              setGlobal_srch(e.target.value);
            }}
            className="form-control"
            type="search"
            placeholder="Search for"
            aria-label="Search"
          />
        </div>
      </form>

      <Modal
        show={show2}
        onHide={handleClose2}
        className="global_modal"
        scrollable={true}
        autoFocus={false}
      >
        <Modal.Body>
          {global_res[0] !== "No Reccords Found" ? (
            Object.keys(global_res).map((global, i) => [
              <h5 key={i}>
                <Trans>{global}</Trans>
              </h5>,
              global != null
                ? global_res[global].map(
                  (apidata, datax) => (
                    (datax = JSON.parse(apidata.data)),
                    (
                      <ul
                        key={apidata.recordid}
                        onClick={() => detailfromsearch(apidata.recordid)}
                      >
                        <Link
                        target='_self'
                          to={
                            global.match(/Opportunit/g) ||
                              global.match(/Invoice/g)
                              ? "/home/" +
                              global.toLowerCase().replace("y", "ies") +
                              "/detail-op/" +
                              apidata.recordid
                              : "/home/" +
                              global
                                .toLowerCase()
                                .replace("customer", "accounts") +
                              "/detail/" +
                              apidata.recordid
                          }
                        >
                          {datax != null ? datax[3] : null}
                        </Link>
                      </ul>
                    )
                  )
                )
                : null,
            ])
          ) : (
            <h5 key={0}>
              <Trans>{global_res[0]}</Trans>
            </h5>
          )}
        </Modal.Body>
      </Modal>
     
    </>
  );
};

export default GlobalSearchBar;
