import { Field, InputType } from "type-graphql";

@InputType()
export class CredentialsInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
