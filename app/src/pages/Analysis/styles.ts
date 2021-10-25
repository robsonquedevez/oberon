import styled from 'styled-components';

export const Container = styled.div`
    display: block;
    padding: 0 30px;
`;

export const Search = styled.div`
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

export const TextDetail = styled.div`
    font-weight: 400;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: #566573;
    transition: color 0.2s;

    &:hover {
        color: #000000;
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

export const ShowDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
    max-height: 350px;
    
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    h6 {
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        margin-top: 1rem;
        color: #A1A1A1;
    }
`;

export const DisplayMap = styled.div`
    width: 100%;
    border-radius: 10px;
    border: 1px solid #CECECE;
    padding: 1px;
    margin-top: 10px;
`;