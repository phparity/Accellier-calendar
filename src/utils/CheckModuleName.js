import { Link, useParams } from 'react-router-dom'

export const CheckModuleName = (props) => {

    let { module_name } = useParams();    
    if (module_name === "accounts") {
        module_name = "customer"
    } else if (module_name === "contacts") {
        module_name = "contact"
    }  else if (module_name === "reports") {
        module_name = "report"
    } else if (module_name === "inventory") {
        module_name = "product"
    } else if (module_name === "equipment") {
        module_name = "equipment"
    }else if(module_name === "evmapping"){
        module_name = "evmapping"
    }else if(module_name === "eqchild"){
        module_name = "eqchild"
    }else if(module_name === "eqcalendar"){
        module_name = "eqcalendar"
    } else if (module_name === "suppliers") {
        module_name = "supplier"
    } else if (module_name === "supplierorders") {
        module_name = "supplierorder"
    } else if (module_name === "supplierorderreturns") {
        module_name = "supplierorderreturn"
    }else if (module_name === "opportunities") {
        
        if(props?.himmat){
            if (props.himmat === "operationalexpense") {
                module_name = "operationalexpense"
              } else if (props.himmat === "payrollcosts") {
                module_name = "payrollcosts"
              }
        }
         else{ module_name = "opportunity"}
    }
      
      else if (props?.yes === true) {
        module_name = props.himmat
      }
    return module_name

}
export const CheckModuleName1 = () => {

    let { module_name } = useParams();    
    if (module_name === "accounts") {
        module_name = "customer"
    } else if (module_name === "contact") {
        module_name = "contacts"
    } else if (module_name === "opportunities") {
        module_name = "opportunity"
    } else if (module_name === "reports") {
        module_name = "report"
    } else if (module_name === "inventory") {
        module_name = "product"
    } else if (module_name === "equipment") {
        module_name = "equipment"
    }else if(module_name === "evmapping"){
        module_name = "evmapping"
    }else if(module_name === "eqchild"){
        module_name = "eqchild"
    }else if(module_name === "eqcalendar"){
        module_name = "eqcalendar"
    }  else if (module_name === "supplierorders") {
        module_name = "supplierorder"
    } else if (module_name === "supplierorderreturns") {
        module_name = "supplierorderreturn"
    }
    return module_name

}
export const Markchange = (module_name) => {

    let markchange = ""
    if (module_name === "customer") {
        markchange = "accounts"
    } else if (module_name === "contact") {
        markchange = "contacts"
    } else if (module_name === "inventory") {
        markchange = "product"
    } else if (module_name === "equipment") {
        markchange = "equipment"
    }else if(module_name === "evmapping"){
        markchange = "evmapping"
    }else if(module_name === "eqchild"){
        markchange = "eqchild"
    }else if(module_name === "eqcalendar"){
        markchange = "eqcalendar"
    } else if (module_name === "suppliers") {
        markchange = "supplier"
    } else if (module_name === "opportunity") {
        markchange = "opportunity"
    } else if (module_name === "supplierorders") {
        markchange = "supplierorder"
    } else if (module_name === "supplierorderreturns") {
        markchange = "supplierorderreturn"
    } else {
        markchange = module_name
    }
    return markchange

}

export const Markchange1 = (module_name) => {

    let markchange = ""
    if (module_name === "customer") {
        markchange = "accounts"
    } else if (module_name === "contact") {
        markchange = "contacts"
    } else if (module_name === "product") {
        markchange = "inventory"
    } else if (module_name === "equipment") {
        markchange = "equipment"
    }else if(module_name === "evmapping"){
        markchange = "evmapping"
    }else if(module_name === "eqchild"){
        markchange = "eqchild"
    }else if(module_name === "eqcalendar"){
        markchange = "eqcalendar"
    } else if (module_name === "supplier") {
        markchange = "suppliers"
    } else if (module_name === "opportunity") {
        markchange = "opportunity"
    } else if (module_name === "supplierorders") {
        module_name = "supplierorder"
    } else if (module_name === "supplierorderreturns") {
        markchange = "supplierorderreturn"
    }
    else {
        markchange = module_name
    }
    return markchange

}

export const PrevModuleName =() =>{
    let { prev_module_name } = useParams();
    if (prev_module_name === "accounts") {
        prev_module_name = "customer"
    } else if (prev_module_name === "contacts") {
        prev_module_name = "contact"
    } else if (prev_module_name === "opportunities") {
        prev_module_name = "opportunity"
    }else if (prev_module_name === "inventory") {
        prev_module_name = "product"
    }else if (prev_module_name === "equipment") {
        prev_module_name = "equipment"
    }else if(prev_module_name === "evmapping"){
        prev_module_name = "evmapping"
    }else if(prev_module_name === "eqchild"){
        prev_module_name = "eqchild"
    }else if(prev_module_name === "eqcalendar"){
        prev_module_name = "eqcalendar"
    } return prev_module_name

}