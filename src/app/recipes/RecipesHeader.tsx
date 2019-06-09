import { IconButton, InputBase, Typography } from "@material-ui/core";
import { ArrowBack, Search } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { BehaviorSubject } from "rxjs";
import useRxjs from "use-rxjs";
import Header from "../../components/Header/Header";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBack from "../../components/Header/HeaderBack";

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
    <Header>
      {searchQuery !== null ? (
        <>
          <HeaderBack onClick={onDisableSearching} />
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
          <HeaderTitle>Рецепты</HeaderTitle>
          <IconButton onClick={onEnableSearching} color="inherit">
            <Search />
          </IconButton>
        </>
      )}
    </Header>
  );
}
