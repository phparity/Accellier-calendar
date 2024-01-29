import { useEffect } from "react";
import { recordErrorAPIdata } from "../../service/useApiData";

const DebugApiCall = (props) => {  
    console.log('props', props);
    useEffect(() => {
        console.log('abc', props);
    }, [props])

    return null
}

export default DebugApiCall;