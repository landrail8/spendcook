import styled from "styled-components";


export const CollectionItem = styled.li``;

export const Collection = styled.ul`
  list-style: none;
  text-indent: 0;
  margin: 0 8px;
  padding: 0;
  
  ${CollectionItem} + ${CollectionItem} {
    margin-top: 8px;
  }
`;
