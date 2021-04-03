import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const Content = styled.div`
    width: 100%;
    margin-left: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;

    .input-field {
        display: flex;
    }
`;