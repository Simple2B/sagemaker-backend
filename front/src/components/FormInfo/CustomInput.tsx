import React from 'react';
import './FormInfo'

interface ICustomInput {
    inputLabel: string,
    error?: string,
    styles: string,
    type: string,
    placeholder: string,
    value: string,
    onChangeHandler: any 
}

const CustomInput: React.FC<ICustomInput> = (
        {
            inputLabel, 
            error,
            styles, 
            type, 
            placeholder, 
            value, 
            onChangeHandler
        }
    ) => {
    return(
        <div className='containerFormInfo_input'>
            <div className='inputLabel'>{inputLabel}</div>
            {error !== "" && <div className='containerFormInfo_error'>{error}</div>}
            {/* classname => errorContainerInput */}
            <div className={styles}>
              <input 
                type={type}
                placeholder={placeholder} 
                value={value} 
                onChange={onChangeHandler}
              />
            </div>
          </div>
    )
}

export default CustomInput;
