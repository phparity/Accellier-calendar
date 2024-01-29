import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import "./style.css";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ReportDataTable from "./reportDataTable";
import { useState, createContext} from "react";
export const d_table = createContext();

const ReportDetailsPage = () => {
    let {reportid} = useParams();
    const [current_pages, setCurrent_pages] = useState(1)
    return (
        <d_table.Provider value={{current_pages, setCurrent_pages}}>
            <div className="header_pos col-12"><Header /></div>

            <div className="reportCreatepage" id="reportTable"> 
                <ReportDataTable reportId={reportid} />
            </div>
            <Footer />
        </d_table.Provider>
    )
}

export default ReportDetailsPage;