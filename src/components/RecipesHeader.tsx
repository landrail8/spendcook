import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography
} from "@material-ui/core";
import { ArrowBack, Search } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { BehaviorSubject } from "rxjs";
import useRxjs from "use-rxjs";

interface Props {
  searchQuery$: BehaviorSubject<SearchQuery>;
}

export type SearchQuery = null | string;

export default function RecipesHeader({ searchQuery$ }: Props) {
  const searchQuery = useRxjs(searchQuery$);
  const onSearch = useCallback(
    (value: SearchQuery) => searchQuery$.next(value),
    [searchQuery$]
  );
  const onEnableSearching = useCallback(() => onSearch(""), [onSearch]);
  const onDisableSearching = useCallback(() => onSearch(null), [onSearch]);

  return (
    <AppBar position="static">
      <Toolbar>
        {searchQuery !== null ? (
          <>
            <IconButton color="inherit" onClick={onDisableSearching}>
              <ArrowBack />
            </IconButton>
            <InputBase
              autoFocus
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              placeholder="Поиск…"
              style={{ color: "white", marginLeft: 32 }}
            />
          </>
        ) : (
          <>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Рецепты
            </Typography>
            <IconButton onClick={onEnableSearching} color="inherit">
              <Search />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
