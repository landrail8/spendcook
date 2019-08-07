import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Header, HeaderTitle, HeaderInput, HeaderButton } from "./index";
import { ArrowBack, Search } from "@material-ui/icons";

storiesOf("Header", module)
  .add("Обычное состояние", () => (
    <Header>
      <HeaderTitle>Рецепты</HeaderTitle>
      <HeaderButton>
        <Search />
      </HeaderButton>
    </Header>
  ))
  .add("Поиск", () => (
    <Header>
      <HeaderButton onClick={() => alert("back!")}>
        <ArrowBack />
      </HeaderButton>
      <HeaderInput placeholder="Поиск…" />
    </Header>
  ));
