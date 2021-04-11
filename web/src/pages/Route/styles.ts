import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const BtnAction = styled.div`
    position: absolute;
    right: 50px;
    bottom: 50px;
    z-index: 999;
    padding: 0px;

    ul {
        padding: 0px;
        height: 0px;
        width: 0px;
        height: 20px;
        opacity: 0;
        transition: height 0.3s;

        li {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
        
    }

    &:hover {

        ul {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 0px;
            margin: 0px 0px 10px 0px;
            width: 100%;
            height: 200px;
            opacity: 1;

            li {
                position: static;
                right: 10px;
                bottom: 10px;
            }

            
        }
    }
`;

export const Search = styled.div`
    position: absolute;
    top: 10px;
    left: 100px;
    z-index: 999;
    width: 40rem;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
            margin-left: 20px;
        }

    }
`;

interface RouteLocationProps {
    isFocus?: boolean;
}

export const RouteLocation = styled.div<RouteLocationProps>`
    position: absolute;
    top: 10px;
    left: 100px;
    z-index: 999;
    width: 40rem;
    opacity: 0.3;

    ${props => props.isFocus &&
        css`
            opacity: 1;
        `
    }
`;

export const Quadrant = styled.div`
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

