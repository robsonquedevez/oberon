import styled from "styled-components";

export const Container = styled.div``;

export const  InputGroup = styled.div`
    display: flex;
    justify-content: space-arrow;
    align-items: center;

    div + div {
        margin-left: 1rem;
    }
`;

export const SelectedPoints = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    p {
        font-size: 0.9rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`;