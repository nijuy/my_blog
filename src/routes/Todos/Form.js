import React from 'react';
import './Form.css';

const Form = ({ value, onChange, onKeyPress }) => {
    return(
        <>
            <input className = "form"
                value = { value } 
                onChange = { onChange } 
                onKeyPress = { onKeyPress } 
                placeholder = '할 일을 입력하세요'
            /> 
        </>
    );
}
export default Form;