import styled from "styled-components";

export const StaticWrapper = styled.div`
  margin-top: 16px;
  height: 56px;
`;

export const FloatingWrapper = styled.nav`
  width: 100%;
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  height: 56px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
`;

export const Action = styled.a`
  min-width: 80px;
  max-width: 168px;
  margin: 0 12px;
  text-align: center;
  text-decoration: none;

  color: dimgrey;
  fill: dimgrey;

  &.active,
  &:hover {
    color: black;
    fill: black;
  }
`;
export const Icon = styled.figure`
  margin: 0;
  svg {
    width: 24px;
    height: 24px;
  }
`;
export const Title = styled.span``;
