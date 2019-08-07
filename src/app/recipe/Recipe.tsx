import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Container,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import useRxjs from "use-rxjs";
import { useRecipes } from "../../entities/recipes";
import { BackButton } from "../../components";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { HeaderButton, HeaderTitle, Header } from "../../ui";

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  id: string;
}

interface Ingridient {
  name: string;
  count: string;
}

const ingridients: Ingridient[] = [
  {
    name: "Рисовая крупа",
    count: "1 стакан"
  },
  {
    name: "Вода",
    count: "2 стакана"
  },
  {
    name: "Молоко",
    count: "2 стакана"
  },
  {
    name: "Сливочное масло",
    count: "4 ст. ложки"
  }
];

export default function Recipe({ match, history }: Props) {
  const { id } = match!.params;
  const recipes = useRecipes();
  const recipe = useRxjs(() => recipes.getById(id));

  if (!recipe) {
    return null;
  }

  const { title, description } = recipe;

  function onDelete() {
    confirm(`Удалить ${title}?`);
    recipes.deleteById(id).subscribe(() => history.goBack());
  }

  return (
    <>
      <Header>
        <HeaderButton as={BackButton} />
        <HeaderTitle style={{ marginLeft: 32 }}>{title}</HeaderTitle>
        <IconButton onClick={onDelete} color="inherit">
          <DeleteIcon />
        </IconButton>
      </Header>
      <Container>
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Ингридиенты
        </Typography>
        <Table>
          {ingridients.map(({ name, count }) => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">{count}</TableCell>
            </TableRow>
          ))}
        </Table>
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Инструкция
        </Typography>
        {description.split("\n").map((text, key) => (
          <p key={key}>{text}</p>
        ))}
      </Container>
    </>
  );
}
