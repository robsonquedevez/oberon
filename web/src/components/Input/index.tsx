import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    icon?: string;
    label: string;
}

const Input: React.FC<InputProps> = ({ label, icon, ...props }) => {
    return (
        <Container className='input-field'>
            {
                icon &&
                <i className='material-icons prefix'>{icon}</i>
            }
            <input id={label} className='validade' {...props} />
            <label htmlFor={label}>{label}</label>
        </Container>
    );
}

export default Input;