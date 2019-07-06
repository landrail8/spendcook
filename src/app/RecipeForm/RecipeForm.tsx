import * as React from "react";
import { useRecipes } from "../../entities/recipes";
import Header from "../../components/Header/Header";
import HeaderBack from "../../components/Header/HeaderBack";
import HeaderTitle from "../../components/Header/HeaderTitle";
import useInput from "../../hooks/useInput";
import TextField from "./TextField";
import { Button, Paper } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {}

export default function RecipeForm({ history }: Props) {
  const recipes = useRecipes();
  const [title, onTitleChange] = useInput("");
  const [description, onDescriptionChange] = useInput("");
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    const newRecipe$ = recipes
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
        <HeaderBack />
        <HeaderTitle style={{ marginLeft: 32 }}>Добавить рецепт</HeaderTitle>
      </Header>
      <Paper
        style={{
          margin: 16,
          padding: 16
        }}
      >
        <form onSubmit={onSubmit}>
          <TextField label="Название" value={title} onChange={onTitleChange} />
          <TextField
            label="Описание"
            rows="4"
            multiline
            value={description}
            onChange={onDescriptionChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: 16
            }}
          >
            Сохранить
          </Button>
        </form>
      </Paper>
    </>
  );
}
