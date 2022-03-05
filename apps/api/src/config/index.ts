import nconf from "nconf";

export function initConfig<T extends Configuration>(defaults?: Partial<T>): T {
  nconf.use("memory");

  nconf.env({ parseValues: false });

  if (defaults) {
    nconf.defaults(defaults);
  }

  return useConfig<T>();
}

export function setConfig<T extends Configuration>(defaults: Partial<T>): void {
  Object.keys(defaults).forEach(key => nconf.set(key, defaults[key as keyof T]));
}

/**
 * Retrieves a configuration variable
 * @param key Configuration variable name to use
 */
export function useConfig<T extends Configuration>(): T {
  const env = nconf.get() as T;
  return env as T;
}

/**
 * Base configuration, services should extend this with their own configuration
 */
export type Configuration = {
  NODE_ENV: "development" | "production";
  MONGO_URI: string;
  MONGO_DATABASE: string;
  API_PORT: number;
};

export const ApiDevelopmentDefaults: Partial<Configuration> = {
  API_PORT: 4000,
  MONGO_DATABASE: "appdb"
};
