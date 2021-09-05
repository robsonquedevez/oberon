import React, { useEffect, useRef, useState, InputHTMLAttributes } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from '@unform/core';

import { Err } from './styles';

interface InputProps extends InputHTMLAttributes<TextFieldProps> {
    name: string;
    label: string;
    type?: string;
    changeDisable?: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
    shrink?: boolean;
};

const Input: React.FC<InputProps> = ({ 
        name, 
        label, 
        type='text', 
        changeDisable=false, 
        variant='outlined',
        shrink
}) => {
    const [err, setErr] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);

     useEffect(() => {
        registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        });
        setErr(!!error);
    }, [fieldName, registerField, setErr, error]);

    return (     
        <>   
            <TextField
                variant={variant}
                margin="normal"
                fullWidth
                defaultValue={defaultValue}
                label={label}
                type={type}
                error={err}
                inputRef={inputRef}
                onFocus={() => { setErr(false) }}
                disabled={changeDisable}                
                InputLabelProps={{
                    shrink,
                }}
                
            />
            {
                err &&
                <Err>
                    <span>{error}</span>
                </Err>
            }
        </>
    );
}

export default Input;