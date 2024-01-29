import React from "react"

function Buttons(props){
    return (
        <button className={props.class} type={props.type} onClick={props.onClick}  disabled={props.disabled}>{props.children} </button>
    )
}
export default Buttons