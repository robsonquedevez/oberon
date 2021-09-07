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
    margin-top: 35px;

    h5 {
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        margin-left: 30px;
        color: #3f51b5;

        &:hover {
            cursor: pointer;
        }
    }
`;

export const PopUpContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    p {
        margin: 0px;
    }

    p + p {
        margin-top: 5px;
    }
`;