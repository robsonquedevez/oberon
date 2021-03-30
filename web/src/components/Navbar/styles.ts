import styled from 'styled-components';

export const Container = styled.div`
    width: 5rem;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    left: 0;
    background: #26a69a;
    padding: 2rem 0rem;

    .logout {
        color: #1C2833;
        transition: color 0.3s;
         
        i {
            font-size: 32px;
        }
        
    }

    .logout:hover {
        color: #F8F9F9;
    }
    
`;

export const Logo = styled.img`
    width: 40px;
`;

export const Options = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .selected {
        border-left-color: #F8F9F9;
        border-left-width: 4px;
        border-left-style: solid;

        a {
            color: #F8F9F9;
        }
    }
`;

export const Item = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;

    a {
        color: #1C2833;
        transition: color 0.3s;
         
        i {
            font-size: 32px;
        }
        
    }

    a:hover {
        color: #F8F9F9;
    }

    
`;