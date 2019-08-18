import * as React from "react";
import { useRecipes } from "../../entities/recipes";
import { Header, HeaderButton, HeaderTitle } from "../../ui";
import useInput from "../../hooks/useInput";
import TextField from "./TextField";
import { RouteComponentProps } from "react-router";
import { BackButton } from "../../components";
import * as S from "./styled";

interface Props extends RouteComponentProps {}

export default function RecipeForm({ history }: Props) {
  const recipes = useRecipes();
  const [title, onTitleChange] = useInput("");
  const [description, onDescriptionChange] = useInput("");
  const onSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    recipes
      .post([
        {
          title,
          description
        }
      ])
      .subscribe(recipes => {
        history.replace(`/recipes/${recipes[0].id}`);
      });
  };

  return (
    <>
      <Header>
        <HeaderButton as={BackButton} />
        <HeaderTitle style={{ marginLeft: 32 }}>Добавить рецепт</HeaderTitle>
      </Header>
      <S.Form onSubmit={onSubmit}>
        <TextField
          id="title"
          label="Название"
          value={title}
          onChange={onTitleChange}
        />
        <TextField
          id="description"
          label="Описание"
          rows={4}
          multiline
          value={description}
          onChange={onDescriptionChange}
        />
        <S.Button type="submit">Сохранить</S.Button>
      </S.Form>
    </>
  );
}
