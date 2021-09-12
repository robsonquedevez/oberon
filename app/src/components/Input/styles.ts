import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const Err = styled.div`
    width: 100%;
    padding: 0px;
    margin-top: -10px;
    span {
        color: #f44336;
        font-size: 10pt;
        font-family: 'Roboto', sans-serif;
        margin-top: 5px;
    }
`;