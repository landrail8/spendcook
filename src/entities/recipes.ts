import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

export interface Recipe {
  id: number;
  title: string;
  description: string;
}

export interface SearchOptions {
  query?: string | null;
}

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

export function useRecipes() {
  return {
    search
  };
}

function search({ query }: SearchOptions): Observable<Recipe[]> {
  return of(data).pipe(
    map(items =>
      items.filter(item => {
        if (!query) {
          return true;
        }

        return (
          item.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
        );
      })
    )
  );
}
