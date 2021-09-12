import styled from "styled-components";

export const Container = styled.div`
    display: block;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem 3rem;    

    h2 {
        font-weight: 400;
        font-size: 2rem;
        font-family: 'Roboto', sans-serif;
        margin-bottom: 1rem;
        color: #566573;
    }

    button {
        margin-top: 1.5rem;
    }
`;

export const  InputGroup = styled.div`
    display: flex;
    justify-content: space-arrow;
    align-items: center;

    div + div {
        margin-left: 1rem;
    }
`;

export const Loading = styled.div`
    display: flex;
    align-items: center;

    p {
        font-family: 'Roboto', sans-serif;
        color: #566573;
        margin-left: 1.5rem;        
    }
`;