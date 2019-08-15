import * as React from "react";
import styled from "styled-components";
import * as components from "../../ui";
import { Search } from "@material-ui/icons";

export const Header = styled(components.Header)``;
export const HeaderTitle = styled(components.HeaderTitle)``;
export const SearchButton = styled(components.HeaderButton).attrs({
  children: <Search />
})``;
export const SearchInput = styled.input``;
