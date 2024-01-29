import "../assets/style/CustomerList.css"
import Header from "../layouts/Header";
import DataTable from "../components/DataTable";
import Footer from "../layouts/Footer";
import { useState, createContext} from "react";
export const d_table = createContext();


function CustomerList() {
  const [current_pages, setCurrent_pages] = useState(1)
  return (
    <d_table.Provider value={{current_pages, setCurrent_pages}}>

      <div>
        <Header />
       <DataTable /> 
       <Footer/>
      </div>
      </d_table.Provider>
  
  )
}
export default CustomerList;
