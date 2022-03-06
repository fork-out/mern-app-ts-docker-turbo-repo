import { Field, ObjectType } from "type-graphql";

import { UserId } from "../../types/id";
import { UserRole } from "../../types/user";

@ObjectType()
export class UserSchema {
  constructor(init?: Partial<UserSchema>) {
    Object.assign(this, init);
  }

  @Field(() => String)
  public id!: UserId;

  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public email!: string;

  @Field(() => String)
  public role!: UserRole;
}
