import { v4 as uuidv4 } from "uuid";

import { UserId } from "../types/id";

export const userId = (id?: string): UserId => {
  return `usr:${genId(id)}`;
};

function genId(id?: string): string {
  return id || uuidv4();
}
