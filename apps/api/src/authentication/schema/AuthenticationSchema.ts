import { Field, ObjectType } from "type-graphql";

import { ApiUser } from "../../types/user";
import { UserScalar } from "./Scalars";

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  accessToken!: string;

  @Field(() => UserScalar, { nullable: false })
  user!: ApiUser;
}
