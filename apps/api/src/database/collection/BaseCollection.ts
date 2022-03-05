import { Collection } from "mongodb";

import { AppDatabase, CollectionsMap } from "../AppDatabase";

export abstract class BaseCollection<T extends keyof CollectionsMap> {
  protected readonly database: AppDatabase;
  protected readonly collection: Collection<CollectionsMap[T]>;

  public constructor(database: AppDatabase, collection: T) {
    this.database = database;
    this.collection = database._collection(collection);
  }

  public mapId(document: CollectionsMap[T] | null): void {
    if (document) {
      Object.defineProperty(document, "id", {
        get: function () {
          return this._id;
        },
        enumerable: true
      });
    }
  }

  public mapAllIds(documents: CollectionsMap[T][]): void {
    documents.forEach(this.mapId);
  }

  protected abstract createIndexes(): Promise<void>;
}
