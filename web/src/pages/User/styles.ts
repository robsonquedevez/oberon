import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

export const Content = styled.div`
    width: 100%;
    margin-left: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    padding: 0rem 5rem;

    .edit_user, .delete_user {
        color: #1C2833;
        transition: color 0.3s;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0rem;

        i {
            margin-left: 1rem;
        }
    }

    .edit_user:hover {
        color: blue;
    }

    .delete_user:hover {
        color: red;
    }

    button {
        margin-bottom: -40px;
        margin-right: 20px;
    }
`;