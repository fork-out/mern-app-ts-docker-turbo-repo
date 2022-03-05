import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  token!: string;

  @Field({ nullable: false })
  expires!: Date;
}
