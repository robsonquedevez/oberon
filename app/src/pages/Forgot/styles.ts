import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const Presentation = styled.div`
    background: #3f51b5;
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    padding: 2rem 4rem;
    
    h2 {
        font-weight: 400;
        font-size: 2rem;
        color: #F8F9F9;
        font-family: 'Saira', sans-serif;
    }
`;

export const Login = styled.div`
    background: #F8F9F9;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem 5rem;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #566573;
        font-size: 0.9rem;
        font-family: 'Roboto', sans-serif;

       
        &:hover {
            color: #3f51b5;                
        }
    }

    h2 {
        font-weight: 400;
        font-size: 3rem;
        color: #1C2833;
        font-family: 'Saira', sans-serif;
    }

    h6 {
        color: #566573;
        font-size: 0.9rem;
        font-family: 'Roboto', sans-serif;

        a {
            text-decoration: none;
        }
    }

    form {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        button {
            margin-top: 5rem;
        }
    }

`;

export const Brand = styled.img`
    max-width: 10rem;
`;

export const Illustration = styled.img`
    display: block;
    margin: 0 auto;
    max-width: 34rem;
`;

export const FieldGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Animate = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

    animation ${appearFromLeft} 1s;
`;
