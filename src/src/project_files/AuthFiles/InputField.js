import React from 'react'
import './InputField.css'

function InputField({ titleText, placeholderText, handleInput, isPassword }) {
    return (
        <div style={{ paddingTop: '10px' }}>
            <p className='title'>{titleText}</p>
            <div>
                <input
                    onChange={handleInput}
                    autoComplete="true"
                    className='inputField' placeholder={placeholderText} type={isPassword === true ? 'password' : 'text'} required />
            </div>
        </div>
    )
}

export default InputField