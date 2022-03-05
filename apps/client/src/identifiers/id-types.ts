export const USER = "usr" as const;

export type UserId = `${typeof USER}:${string}`;
