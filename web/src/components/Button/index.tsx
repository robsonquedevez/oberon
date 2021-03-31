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
    // const styles = (circle ? ' btn-floating btn-large' : ' ') + (color ? color : ' ') +' waves-effect waves-light btn';

    return (
        <Container className={stylesButton} { ...props} >
            {
                icon && 
                <i className='material-icons'>{icon}</i>
            }
            {
                label &&
                <span>{label}</span>
            }
        </Container>
    );
}

export default Button;