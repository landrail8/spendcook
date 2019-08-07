import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as components from "../../ui";
import { Search } from "@material-ui/icons";

export const Header = styled(components.Header)``;
export const HeaderTitle = styled(components.HeaderTitle)``;
export const SearchButton = styled(components.HeaderButton).attrs({
  children: <Search />
})``;
export const SearchInput = styled.input``;

export const List = styled.div``;
export const ListItem = styled.ul``;
export const ListLink = styled(Link)``;
export const ListTitle = styled.h3``;
