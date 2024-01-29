import { useState } from "react"
import Moment from 'moment';

const createCustom = (props) => {

    const {
        blocke,
        module_name,
        row_value,
        add,
        related_record,
        rajya,
        selectedUserList,
        customerDetails,
        e_id,
        searchTableModule,
        authState,
        country,
        salutation,
        searchRelatedTo,
        add_forName,
        uitype_module,
        relatedPopUp,
        main_module,
        related_module,
        uitype6_value,
        g_total,
        total1,
        multiField,
        supplierorder_num
    } = props

    let custom = ''

    blocke && Object.keys(blocke).map((k) => (
        blocke[k].map((acc) => (
            acc.fieldname != [module_name + "_num"] && acc.fieldname != "source" && acc.fieldname != "status" &&
                acc.uitype != 6 && acc.fieldname != [module_name + "_country"]
                && acc.fieldname != "related_customer" && acc.fieldname != "related_module" && acc.fieldname != "execute_mode" && acc.fieldname != "salutation"
                && acc.fieldname != "grand_total" && acc.fieldname != "total_tax" && acc.fieldname != "start_datetime" && acc.fieldname != "end_datetime" && acc.uitype !== 10 && acc.uitype !== 14 && acc.fieldname != "receipt_status" && acc.fieldname != "supplierorderreceipt_name" ?
                module_name === "contact" ?
                    custom = { ...custom, [acc.fieldname]: add[acc.fieldname] } :
                    custom = { ...custom, [acc.fieldname]: add[acc.fieldname] } : null,

            acc.uitype == 14 && multiField != 2 ? 
            (relatedPopUp != true || module_name == "currentstock") ?
                custom = { ...custom, [acc.fieldname]: row_value && row_value[acc.fieldname] || add[acc.fieldname], [acc.fieldname.replace(/_record$/g, "_module")]: uitype_module && uitype_module[acc.fieldname] || add_forName && add_forName[acc.fieldname.replace(/_record$/g, "_module")] } :
                custom = { ...custom, [acc.fieldname]: row_value && row_value[`related_${searchRelatedTo}id`] || add[acc.fieldname], [acc.fieldname.replace(/_record$/g, "_module")]: related_record || add_forName[acc.fieldname.replace(/_record$/g, "_module")] } : null,

                acc.uitype == 14 && multiField >= 1? 
                custom = { ...custom, [acc.fieldname]: row_value && row_value[acc.fieldname] || add[acc.fieldname] , [acc.fieldname.replace(/_record$/g, "_module")]: row_value && row_value[acc.fieldname.replace(/_record$/g, "_module")] || add_forName && add_forName[acc.fieldname.replace(/_record$/g, "_module")] } :null,


            // acc.uitype == 6 && acc.show_hide_criteria != '0' ?  

            // // custom = { ...custom, [acc.fieldname]: add[acc.fieldname] || uitype6_value[`related_${acc.relatedto}id`]}

            // custom = { ...custom, [acc.fieldname]: uitype6_value != undefined ? uitype6_value[`related_${acc.relatedto}id`] : add[acc.fieldname] }
            // // custom = { ...custom, [acc.fieldname]: uitype6_value != undefined ? uitype6_value[`related_${acc.relatedto}id`] || add[acc.fieldname] : add[acc.fieldname] }
            //     : null,


              
            acc.uitype == 6 && acc.show_hide_criteria != '0' ?  

            // custom = { ...custom, [acc.fieldname]: add[acc.fieldname] || uitype6_value[`related_${acc.relatedto}id`]}

            custom = { ...custom, [acc.fieldname]: uitype6_value !== null && uitype6_value[`related_${acc.relatedto[0]}`] !== undefined ? uitype6_value[`related_${acc.relatedto}id`] : add_forName[`related_${acc.relatedto[0]}id`]}
            // custom = { ...custom, [acc.fieldname]: uitype6_value != undefined ? uitype6_value[`related_${acc.relatedto}id`] || add[acc.fieldname] : add[acc.fieldname] }
                : null,

                acc.uitype == 6 && (module_name == "supplierorderreceipt" || related_module == "supplierorderreceipt")?
                custom = { ...custom, [acc.fieldname]: supplierorder_num }
                : null,

            acc.uitype == 6 && acc.show_hide_criteria == '3' && related_module ?
                custom = { ...custom, [acc.fieldname]: localStorage.getItem('prev_c_id'), ['related_module']: main_module }
                : null,

            acc.fieldname == [module_name + "_country"] ?
                custom = { ...custom, [acc.fieldname]: country || add[acc.fieldname] } : null,
            acc.fieldname == 'salutation' ?
                custom = { ...custom, [acc.fieldname]: salutation || add[acc.fieldname] } : null,

            acc.fieldname == "execute_mode" ?
                custom = { ...custom, [acc.fieldname]: "PREPARE" } : null,

            acc.fieldname == "start_datetime" && acc.fieldname !== "createtime" ?
                custom = {
                    ...custom, [acc.fieldname]: (add[acc.fieldname] !== undefined ? add.start_datetime ? Moment(add.start_datetime, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === add.start_datetime
                        ? add.start_datetime
                        : Moment(add.start_datetime, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") : "" : '')
                } : null,

            // acc.fieldname === "start_date" && acc.fieldname !== "createtime" ?
            //     custom = {
            //         ...custom, [acc.fieldname]: (add[acc.fieldname] !== undefined ? add.start_date ? Moment(add.start_date, "DD-MM-YYYY").format("YYYY-MM-DD") === add.start_date
            //             ? Moment(add.start_date, "DD-MM-YYYY ").format("YYYY-MM-DD")
            //             : Moment(add.start_date, "DD-MM-YYYY ").format("YYYY-MM-DD") : "" : '')
            //     } : null,
                acc.fieldname === "start_date" && acc.fieldname !== "createtime" ?
                custom = {
                    ...custom, [acc.fieldname]: (add[acc.fieldname] !== undefined ? add.start_date ? Moment(add.start_date, "DD-MM-YYYY").format("YYYY-MM-DD") === add.start_date
                        ? Moment(add.start_date, "DD-MM-YYYY ").format("YYYY-MM-DD")
                        : add.start_date : "" : '')
                } : null,

            acc.fieldname === "end_datetime" && acc.fieldname !== "createtime" ?
                custom = { ...custom, [acc.fieldname]: (add[acc.fieldname] !== undefined ? Moment(add[acc.fieldname], "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss") : '') } : null,


            acc.uitype == 100 ?
                acc.options.map((owner) => (
                    add[acc.fieldname] == [owner.firstname + " " + owner.lastname] ?
                        custom = { ...custom, ["ownerid"]: owner.userid } : custom = { ...custom, ["ownerid"]: authState.userid, ["assign_to"]: authState.username || localStorage.getItem("username")}
                )) : null,

            module_name === "report" ?
                custom = { ...custom, ["report_users"]: selectedUserList } : null,

            acc.uitype === 10 && acc.fieldname === "modifiedtime" ?
                custom = { ...custom, [acc.fieldname]: Moment().format("YYYY-MM-DD HH:mm:ss") } : null,

            acc.uitype === 10 && acc.fieldname === "createtime" ?
                custom = { ...custom, [acc.fieldname]: Moment(add.createtime, "DD-MM-YYYY hh:mm:ss").format('YYYY-MM-DD HH:MM:SS') == "Invalid date" ? Moment().format("YYYY-MM-DD HH:mm:ss") : Moment(add.createtime, "DD-MM-YYYY hh:mm:ss").format('YYYY-MM-DD HH:MM:SS') || Moment().format("YYYY-MM-DD HH:mm:ss") } : null,

            custom['related_module'] == '' ? delete custom['related_module'] : null,
            custom[acc.fieldname.replace(/_record$/g, "_module")] == ''|| custom[acc.fieldname.replace(/_record$/g, "_module")] == null ? delete custom[acc.fieldname.replace(/_record$/g, "_module")] : null,

            acc.fieldname == 'rate_conversion' ?  
            custom = { ...custom, ["rate_conversion"]: "1.00" } : null,

            acc.fieldname == "total_tax" ?
                custom = { ...custom, [acc.fieldname]: total1 } : null,

            acc.fieldname == "grand_total" ?
                custom = { ...custom, [acc.fieldname]: g_total } : null,
            //commnets for comma issue   
            acc.uitype === 11 && (acc.fieldname !== "grand_total"&& acc.fieldname !== "total_tax")?
                custom = {
                    ...custom,
                    [acc.fieldname]: custom[acc.fieldname] && custom[acc.fieldname].includes ? custom[acc.fieldname].includes(',') ? custom[acc.fieldname].replace(/,/g, '') : custom[acc.fieldname] : ""
                } : null,
                custom[acc.fieldname] == '' || custom[acc.fieldname] == null ? delete custom[acc.fieldname] : null,
                acc.uitype !== 14 && add[acc.fieldname] == ''? custom = {...custom,[acc.fieldname]: acc.fieldname === module_name+'_county' && add_forName[`${acc.fieldname}`] ? add_forName[`${acc.fieldname}id`]:add[acc.fieldname]}:null



        ))
    ))
    return { custom }
}


export const usePayload = (props) => {
    const [customPayload, setCustomPayload] = useState({})
    const boot = () => {
        const { custom } = createCustom(props)
        setCustomPayload(custom)
    }
    return {
        boot,
        customPayload
    }

}