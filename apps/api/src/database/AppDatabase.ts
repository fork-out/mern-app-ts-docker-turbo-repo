import { Collection, Db, MongoClient, ReadPreference } from "mongodb";

import { User } from "../types/user";
import { UsersCollection } from "./collection/UsersCollection";

export class AppDatabase {
  private readonly client: MongoClient;
  private database!: Db;

  public readonly databaseName: string;

  public users!: UsersCollection;

  public constructor(url: string, databaseName: string) {
    this.databaseName = databaseName;
    this.client = new MongoClient(url, { readPreference: ReadPreference.PRIMARY_PREFERRED });
  }

  /**
   * Connect to the mongo database
   */
  public async connect(): Promise<void> {
    await this.client.connect();

    this.database = this.client.db(this.databaseName);
    this.users = new UsersCollection(this);
  }

  /**Direct access to a collection, should only be used by the database module */
  public _collection<K extends keyof CollectionsMap>(name: K): Collection<CollectionsMap[K]> {
    if (!this.database) {
      throw new Error("Database connection is not initialized.  Call connect() first");
    }

    return this.database.collection(name);
  }

  public async createAllIndexes(): Promise<void> {
    await Promise.all([this.users.createIndexes()]);
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export type MongoDocument = {
  _id: string;
};

export type CollectionsMap = {
  users: MongoDocument & User;
};
