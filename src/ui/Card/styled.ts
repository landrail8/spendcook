import styled from "styled-components";

export const Card = styled.a`
  position: relative;
  text-decoration: none;
  display: block;
  padding: 0 16px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const CardImage = styled.figure`
  display: flex;
  align-items: center;
  background: dimgrey;
  border: 0;
  padding-top: 60%;
  margin: 0 -16px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const CardTitle = styled.h3`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: #000000de;
  font-weight: normal;
`;