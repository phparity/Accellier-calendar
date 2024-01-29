import React from 'react'

import './Input.scss'

function Input(props) {
    return (
        <>
            <input className={`border_input ${props.inputClass}`} type={props.inputType} name={props.inputName} placeholder={props.inputPlaceholder} />
        </>
    )
}

export default Input