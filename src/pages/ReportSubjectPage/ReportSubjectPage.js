import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import * as React from 'react';
import "./style.css";
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import { getReportDetailsAPIdata, getReportSubjectdata } from "../../service/useApiData";
import { AuthContext } from "../../config/Authentications/AuthContext";
import {CheckModuleName} from "../../utils/CheckModuleName";
import { Trans } from 'react-i18next';
import i18n from "../../config/i18n";
const windowHeight = window?.screen?.height;


const ReportSubjectPage = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const tenantCname = authState.tenant_cname;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [reportValue, setReportValue] = React.useState([]);
    const [subjectReportValue, setSubjectReportValue] = React.useState([])
    const [selected, setSelected] = React.useState([]);
    const [keyValue, setKeyValue] = React.useState([]);
    let module_name = CheckModuleName();


    const reportSubjectDataAPI = () => {
        (async () => {
            const data = await getReportSubjectdata(tenantCname);
            if (data) {
                setSubjectReportValue(data);
            }
        })()
    }

    const blankData = (item) => {
        localStorage.setItem('reportId', '');
        localStorage.setItem('said', '');
        // localStorage.setItem('slug', item?.slug);
        setAuthState({ ...authState, reportId: '', said: '' })
    }

    React.useEffect(() => {
        reportSubjectDataAPI();
        localStorage.setItem('reportId', '');
        localStorage.setItem('said', '');
    }, []);

    return (
        <>
            <Header />
            <div className="detail_parent parent_padding subject_padding">
            <div className="container-fluid col-12 pl-4 pr-4">
            <div className="row pr-1">
              <div className="col-12">
                <div className="bread_crumb">
                  <Link target='_self' to={`/home/${module_name}s`}
                  //onClick={()=>(all_accounts(), clear())}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
                    <Trans>
                      {"All " + module_name + 's'} 
                    </Trans>
                  </Link>
                </div>
                </div>
                <div className="main reportMain">
                    <ul className="cards">
                        {
                            subjectReportValue?.map((item) => (
                                <li className="cards_item" key={item?.said}>
                                    <div className="card">
                                        <div className="card_content">
                                            <h2 className="card_title">{item?.subject_area}</h2>
                                            <p className="card_text">{item?.description}</p>
                                            <Link target='_self' to={`/home/${module_name}/add-edit-report/${item?.said}`}><span onClick={() => blankData(item)}>Create Report</span></Link>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ReportSubjectPage;