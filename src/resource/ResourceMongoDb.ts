import { Observable } from "rxjs";
import { map, mapTo, mergeMap, tap } from "rxjs/operators";
import {
  Collection,
  FilterQuery,
  InsertWriteOpResult,
  MongoCallback,
  MongoClient, ObjectId
} from "mongodb";
import { Entity, EntityList, Filter, ResourceDescriptor } from "./types";
import Resource from "./Resource";

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "spendcook";

export default class ResourceMongoDb<E extends Entity> extends Resource<E> {
  constructor(descriptor: ResourceDescriptor<E>) {
    super(descriptor);
  }

  search({ limit = 20, ...filter }: Filter) {
    return this.collection$.pipe(
      mergeMap(collection =>
        fromCallback<EntityList<E>>(callback => {
          let cursor = collection.find(transformFilter<E>(filter));

          if (limit !== undefined) {
            cursor = cursor.limit(limit);
          }

          cursor.toArray(callback);
        })
      )
    );
  }

  post(entities: E[]) {
    return this.collection$.pipe(
      mergeMap(collection =>
        fromCallback<InsertWriteOpResult>(callback =>
          collection.insertMany(entities, callback)
        )
      ),
      map(result =>
        entities.map((entity, index) => ({
          ...entity,
          _id: result.insertedIds[index]
        }))
      )
    );
  }

  delete({ limit, ...filter }) {
    const mongoFilter = transformFilter<E>(filter);

    return this.collection$.pipe(
      mergeMap(collection =>
        fromCallback<InsertWriteOpResult>(callback =>
          limit === 1
            ? collection.deleteOne(mongoFilter, callback)
            : collection.deleteMany(mongoFilter, callback)
        )
      ),
      tap(result => console.log(result)),
      mapTo(undefined)
    );
  }

  private collection$: Observable<Collection<E>> = fromCallback<MongoClient>(
    callback =>
      MongoClient.connect(
        url,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true
        },
        callback
      )
  ).pipe(map(client => client.db(dbName).collection(this.descriptor.name)));
}

function fromCallback<T>(action: (callback: MongoCallback<T>) => void) {
  return new Observable<T>(observer =>
    action((err, result) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(result);
      }
      observer.complete();
    })
  );
}

function transformFilter<E extends Entity>({ id }: Filter): FilterQuery<E> {
  const filterQuery: any = {};

  if (id) {
    filterQuery._id = new ObjectId(id)
  }

  return filterQuery;
}
