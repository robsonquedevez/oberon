import styled from 'styled-components';

export const ContentLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
        font-weight: 400;
        font-size: 1.8rem;
        font-family: 'Saira', sans-serif;
        margin-left: 0.7rem;
    }
`;

export const UserLogin = styled.div`
    padding: 0.3rem 1.5rem;
    border-radius: 50px;
    background-color: #074583;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-right: 1.2rem;
        p {
            font-size: 11pt;
        }
        
        p + p {
            font-size: 10pt;
        }
    }
`;