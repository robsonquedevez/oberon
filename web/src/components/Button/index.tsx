import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    isLoading?: boolean;
    icon?: string;
}

const Button: React.FC<ButtonProps> = ({ label, isLoading = false, icon, ...props }) => {
    return (
        <Container className='waves-effect waves-light btn' { ...props} >
            {
                icon && 
                <i className='material-icons prefix'>{icon}</i>
            }
            {label}            
        </Container>
    );
}

export default Button;