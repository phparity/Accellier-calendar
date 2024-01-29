
import { Trans } from 'react-i18next'
import { Link } from "react-router-dom"

const BackToLinks =({module_name,all_accounts,related_module,xlink,clear = () => {}})=>{

  const urlFetch = window.location.hash;
  let urlModule_name = "";
  const match = urlFetch.match(/\/home\/(\w+)\//);
  if (match) {
    urlModule_name = match[1];
  }
  
  const regex = /#\/home\/([^/]+)\/(.+)$/;

  // Function to extract part after #home
  const extractDynamicParts = (url) => {
    const match = regex.exec(url);
  
    if (match) {
      const module_name = match[1];
      const operation = match[2];
      return { module_name, operation };
    }
    return null;
  };
  const result = extractDynamicParts(urlFetch);

    return (
        <div className="bread_crumb">
        <Link target='_self' to ={xlink}
          onClick={()=>(all_accounts(), clear())}
         >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
          <Trans>
           {( related_module != null || undefined ? (result.operation === "add-edit-op" || result.operation === "add-edit")
            ?  `Back to ${localStorage.getItem("prev_module_name2")}`
               :
            `Back to ${urlModule_name}`
              :
              "All " + module_name + 's')
         }
          </Trans>
        </Link>
      </div>
    )
}

export default BackToLinks;