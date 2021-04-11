import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 10px;
    left: 100px;
    z-index: 999;
    width: 40rem;
`;

export const BtnClose = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: red;
    }
`;

export const ListQuadrant = styled.div`
    
`;

export const CreateQuadrant = styled.div`

    .btn-group {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
    }

    .field-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding: 1.2rem 0rem;
    }
`;

export const ColletionItem = styled.a`
    display: flex;
    align-items: center;
    justify-content:space-between;
    width: 100%;
    flex-direction: row;
    padding: 0.5rem 1rem;
    cursor: pointer;        
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;

    span, i {
        color: #333;
        transition: color 0.3s;
    }

    i:hover {
        color: blue;
    }

    &:hover {
        background: #dedede;
    }


`;
