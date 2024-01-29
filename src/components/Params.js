
export const Param = {
  data1(module_name){
   return {
       params: {
         "module": module_name,
         "view": "index"
               }
   }

 },
  data2 (exp_cus_id){
   return {
       params: {
         "records": exp_cus_id
               }
   }

 },
  data3(module_name,swid,exp_cus_id){
   return {
       params: {
         "module": module_name,
                 "view": "index",
                 "wid": swid,
                 "formtype": "1",
                 "records": exp_cus_id
               }
   }

 },
 data4(dyData){
   return {
       params: {
         params: dyData 
               }
   }

 },
 data5(module_name){
  if(module_name === 'report') {
    return {
        params: {
          "module": 'reporting',
          "importfile": 0
        }
    }
  } else {
    return {
      params: {
        "module": module_name
        }
      }
  }

  },
  data6(authStateonClickMenuModule, module_name, authStatepage, authStateline, detailsper_page) {
    return {
      params: {
        "page": localStorage.getItem("onClickMenuModule") !== module_name ? "1" : localStorage.getItem("page"),
        "ipp": localStorage.getItem("line") || detailsper_page
      }
    }

 },data7(authStatepage,authStateline,authStateroleid,authStateuserid){
   return {
       params: {
         "page": authStatepage,
         "ipp": authStateline,
         "roleid": authStateroleid,
         "userid": authStateuserid
               }
   }

 },
 data8(valuexy,authStateorder,authStateline){
   return {
       params: {
         "filter": valuexy,
         "order": authStateorder,
         "ipp": authStateline
               }
   }

 },
 
 data9(authStatepage,detailsper_page,authStateline){
   return {
       params: {
         "page": authStatepage,
         "ipp": authStateline || detailsper_page
               }
   }

 },
 data10(search_mobile,input_mobile,authStateorder,authStateline){
   return {
       params: {
         "filter": search_mobile + "=" + input_mobile,
         "order": authStateorder,
         "ipp": authStateline
               }
   }

 },
 data11(accrValue,valuexy,authStatepage,authStateline){
   return {
          params: {
               "order": accrValue + ":" + "asc",
               "filter": valuexy,
               "page": authStatepage,
               "ipp": authStateline
           }
   }

 },
 data12(authStateprev_module_name,pvid,search_mobile,input_mobile,authStateorder,authStateline){
   return {
     params: {
                   "module": authStateprev_module_name,
                   "recordid": pvid,
                   "filter": search_mobile + "=" + input_mobile,
                   "order": authStateorder,
                   "ipp": authStateline
               }
   }

 },
 data13(prev_module_name, related_module,pvid,search_mobile,input_mobile,authStateorder,authStateline){
   return {
     params: {
                   "module": prev_module_name,
                   "relatedmodule": related_module,
                   "recordid": pvid,
                   "filter": search_mobile + "=" + input_mobile,
                   "order": authStateorder,
                   "ipp": authStateline
               }
   }

 },
 data14(authStateprev_module_name,pvid,accrValue,valuexy, authStatepage,authStateline){
   return {
     params: {
                   "module": authStateprev_module_name,
                   "recordid": pvid,
                   "order": accrValue + "~" + "asc",
                   "filter": valuexy,
                   "page": authStatepage,
                   "ipp": authStateline
               }
   }

 },
 data15(prev_module_name,related_module,pvid,accrValue,valuexy,authStatepage,authStateline){
   return {
     params: {
                   "module": prev_module_name,
                   "relatedmodule": related_module,
                   "recordid": pvid,
                   "order": accrValue + "~" + "asc",
                   "filter": valuexy,
                   "page": authStatepage,
                   "ipp": authStateline
               }
   
   }

 },
 data16(authStateprev_module_name,pvid,accrValue,valuexy,authStatepage,authStateline){
   return {
     params: {
                   "module": authStateprev_module_name,
                   "recordid": pvid,
                   "order": accrValue + "~" + "desc",
                   "filter": valuexy,
                   "page": authStatepage,
                   "ipp": authStateline
               }
   
   }

 },
 data17(prev_module_name,related_module,pvid,accrValue,valuexy,authStatepage,authStateline){
   return {
     params: {
                   "module": prev_module_name,
                   "relatedmodule": related_module,
                   "recordid": pvid,
                   "order": accrValue + "~" + "desc",
                   "filter": valuexy,
                   "page": authStatepage,
                   "ipp": authStateline
               }
   }

 },
 data18(accrValue,valuexy,authStatepage,authStateline){
   return {
     params: {
                   "order": accrValue + ":" + "desc",
                   "filter": valuexy,
                   "page": authStatepage,
                   "ipp": authStateline
               }
   }

 },
 data19(accrValue,valuexy,authStatepage,authStateline, module_name){
  if(module_name === 'report'){
    return {
      params: {
           "order": accrValue + ":" + "desc",
          //  "filter": valuexy,
          //  "page": authStatepage,
          //  "ipp": authStateline
            }
      }
  } else {
   return {
          params: {
               "order": accrValue + ":" + "desc",
               "filter": valuexy,
               "page": authStatepage,
               "ipp": authStateline
           }
   }
  }

 },


 


  
}


       
