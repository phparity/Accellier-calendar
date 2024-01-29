import {useEffect} from "react";
import { CheckModuleName } from "../utils/CheckModuleName";
import useGetReq from "./useGetReq";
import useStorage from "./useStorage";

const useFetch = (url,setState,setErr,params) => {
  const storage = useStorage();
  const [getData] = useGetReq();
  const module_name = CheckModuleName();
  
    useEffect(() => {
      if (url !==''){
        getData(url,setState,setErr,params,storage)
      }
    }, [url,module_name]);
  };
  
  export default useFetch;