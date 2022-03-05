import { v4 as uuidv4 } from "uuid";

import { USER, UserId } from "./id-types";

export const InstanceIdentifiers = {
  makeUserId(id?: string): UserId {
    return `${USER}:${id || uuidv4()}` as UserId;
  }
};
