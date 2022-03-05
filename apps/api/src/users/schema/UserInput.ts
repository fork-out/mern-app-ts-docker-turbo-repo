import { Field, InputType } from "type-graphql";

@InputType()
export class UserCreateInput {
  @Field(() => String!)
  public name!: string;

  @Field(() => String!)
  public email!: string;

  @Field(() => String!)
  public password!: string;

  @Field(() => String, { nullable: true })
  public profilePic?: string;
}
