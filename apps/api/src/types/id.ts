export type UserIdPrefix = "usr";

export type IdPrefix = UserIdPrefix;

export type Id<Prefix extends IdPrefix> = `${Prefix}:${string}`;

export type UserId = Id<UserIdPrefix>;
