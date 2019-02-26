import { Observable } from "rxjs";

export default function asyncToObservable<T>(
  job: () => Promise<T>
): Observable<T> {
  return new Observable<T>(observer => {
    job()
      .then(
        value => {
          observer.next(value);
        },
        error => {
          observer.error(error);
        }
      )
      .finally(() => {
        observer.complete();
      });
  });
}
