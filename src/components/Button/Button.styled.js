import { styled } from "styled-components";

export const LoadMoreBtnStyles = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 40px;
    width: 220px;
    height: 50px;
    border-radius: 50px;
    border: 3px solid #fff;
    background-color: transparent;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s, color 0.3s;
  
    &:hover {
    background-color: #fff; 
    color: #3d8880;
    }
`