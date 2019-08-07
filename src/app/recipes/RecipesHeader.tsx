import * as React from "react";
import { useCallback } from "react";
import { BehaviorSubject } from "rxjs";
import useRxjs from "use-rxjs";
import { Header, HeaderButton, HeaderInput, HeaderTitle } from "../../ui";
import { BackButton } from "../../components";
import { Search as SearchIcon } from "@material-ui/icons";

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

  return searchQuery !== null ? (
    <Header>
      <HeaderButton as={BackButton} onClick={onDisableSearching} />
      <HeaderInput
        autoFocus
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
        placeholder="Поиск…"
      />
    </Header>
  ) : (
    <Header>
      <HeaderTitle>Рецепты</HeaderTitle>
      <HeaderButton onClick={onEnableSearching} children={<SearchIcon />} />
    </Header>
  );
}
