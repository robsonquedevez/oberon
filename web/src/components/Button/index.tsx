import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    isLoading?: boolean;
    icon?: string;
    circle?: boolean;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ label, isLoading = false, icon, color, circle, ...props }) => {
    const stylesButton = 'btn waver-effect btn-large waves-light ' + (circle ? ' btn-floating ' : ' ') + (color ? ' ' + color : ' ');

    return (
        <Container className={stylesButton} { ...props} >
            {
                label &&
                <span>{label}</span>
            }
            {
                icon && 
                <i className='material-icons'>{icon}</i>
            }
        </Container>
    );
}

export default Button;