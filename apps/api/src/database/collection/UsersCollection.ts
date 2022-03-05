import { UserId } from "../../types/id";
import { User } from "../../types/user";
import { AppDatabase, MongoDocument } from "../AppDatabase";
import { BaseCollection } from "./BaseCollection";

export class UsersCollection extends BaseCollection<"users"> {
  public constructor(database: AppDatabase) {
    super(database, "users");
  }

  public async insert(item: User): Promise<void> {
    const insertItem: User & MongoDocument = {
      _id: item.id,
      ...item
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete insertItem.id;

    await this.collection.insertOne(insertItem);
  }

  public async get(id: UserId): Promise<User | null> {
    const item = await this.collection.findOne({ _id: id });

    this.mapId(item);

    return item;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const item = await this.collection.findOne({ email });

    this.mapId(item);

    return item;
  }

  public async update(
    id: UserId,
    fields: Partial<Pick<User, "name" | "profilePic">>
  ): Promise<User | null> {
    const { value } = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: { updatedAt: new Date(), ...fields } },
      { returnDocument: "after" }
    );

    this.mapId(value);

    return value;
  }

  public async createIndexes(): Promise<void> {
    await this.collection.createIndexes([{ key: { email: 1 } }]);
  }
}
