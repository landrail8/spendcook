import * as React from "react";
import { BehaviorSubject, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import useRx from "use-rxjs";
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  InputBase
} from "@material-ui/core";
import { ArrowBack, Search } from "@material-ui/icons";

const data: Recipe[] = [
  {
    id: 1,
    title: "Борщ",
    description: "Борщ любят в России"
  },

  {
    id: 2,
    title: "Сметана",
    description: "Сметану любют борщ"
  }
];

interface Recipe {
  id: number;
  title: string;
  description: string;
}

type SearchQuery = null | string;

export default function Recipes() {
  const { searchQuery, setSearchQuery, items } = useRx(() => {
    const searchQuery$ = new BehaviorSubject<SearchQuery>(null);

    return searchQuery$.pipe(
      mergeMap(searchQuery =>
        of(data).pipe(
          map(items => ({
            searchQuery,
            setSearchQuery: (value: string) => searchQuery$.next(value),
            items: items.filter(item => {
              if (!searchQuery) {
                return true;
              }

              return (
                item.title
                  .toLocaleLowerCase()
                  .indexOf(searchQuery.toLocaleLowerCase()) > -1
              );
            })
          }))
        )
      )
    );
  });

  const isSearching = searchQuery !== null;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isSearching ? (
            <>
              <IconButton color="inherit" onClick={() => setSearchQuery(null)}>
                <ArrowBack />
              </IconButton>
              <InputBase
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск…"
                style={{ color: "white", marginLeft: 32 }}
              />
            </>
          ) : (
            <>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                Рецепты
              </Typography>
              <IconButton onClick={() => setSearchQuery("")} color="inherit">
                <Search />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <List>
        {items.map(({ id, title, description }) => (
          <React.Fragment key={id}>
            <ListItem button>
              <div
                style={{ width: 100, height: 56, backgroundColor: "#ccc" }}
              />
              <ListItemText primary={title} secondary={description} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </>
  );
}
