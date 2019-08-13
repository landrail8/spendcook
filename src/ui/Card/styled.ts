import styled from "styled-components";

export const Card = styled.div`
  padding: 0 16px;
  margin: 8px;
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
  padding: 0;
  margin: 0 -16px;
  box-sizing: border-box;
  overflow: hidden;
  
  img {
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
