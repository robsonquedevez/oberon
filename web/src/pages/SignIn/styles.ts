import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    font-family: 'Saira', sans-serif;
`;

export const ContentIllustration  = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: #26a69a;
    padding: 5rem;

    div {
        width: 100%;
    }

    h4 {        
        font-weight: 400;
        font-size: 2rem;
        margin-top: 1.2rem;
        color: #F8F9F9;
    }
`;

export const ContentForm  = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 5rem;

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0px;
    }

    button {
        margin-top: 3rem;
    }
`;

export const Logo = styled.img`
    width: 150px;
`;

export const Illustration = styled.img`
    width: 100%;
`;