import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import { Server } from "http";
import { buildSchema } from "type-graphql";
import Container from "typedi";

import { ApiToken } from "./ApiToken";
import { AuthenticationResolver } from "./authentication/resolver/AuthenticationResolver";
import { ApiDevelopmentDefaults, Configuration, initConfig, useConfig } from "./config";
import { AppDatabase } from "./database/AppDatabase";
import { BaseService } from "./shared/BaseService";
import { UserResolvers } from "./users/resolvers/UserResolver";

export class ApiService extends BaseService {
  private server: Server | undefined;

  public constructor() {
    const { NODE_ENV } = initConfig<Configuration>(ApiDevelopmentDefaults);
    super({ location: "api", logLevel: NODE_ENV === "development" ? "debug" : "info" });
  }

  protected async onRun(): Promise<void> {
    const { API_PORT, MONGO_URI, MONGO_DATABASE, NODE_ENV } = useConfig<Configuration>();
    const isDevMode = NODE_ENV === "development";

    const database = new AppDatabase(MONGO_URI, MONGO_DATABASE);
    await database.connect();
    await database.createAllIndexes();

    Container.set(AppDatabase, database);

    const apiSchema = await buildSchema({
      resolvers: [AuthenticationResolver, UserResolvers],
      container: Container,
      emitSchemaFile: isDevMode ? "schema-api.gql" : undefined
    });

    const app = express();
    const httpServer = http.createServer(app);
    app.use(helmet({ frameguard: false }));
    app.use(cors());
    app.use(cookieParser());

    if (isDevMode) {
      console.debug("RUNNING IN DEV MODE");
      app.use((req, _res, next) => {
        console.debug(`${req.method}: ${req.path}`);
        next();
      });
    }

    // health-check
    app.get("/status", (_req, res) => {
      return res.status(200).send({ message: "ok", time: new Date() });
    });

    const apiApolloServer = new ApolloServer({
      schema: apiSchema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: ({ req, res }) => ({ req, res })
    });
    await apiApolloServer.start();
    apiApolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

    this.server = app.listen(API_PORT, () =>
      console.log(`✨ Server ready at http://localhost:${API_PORT}${apiApolloServer.graphqlPath}`)
    );
  }

  protected async onStop(): Promise<void> {
    this.logger.info("stop requested");

    if (this.server) {
      this.logger.debug("stopping server");
      await new Promise<void>(resolve => {
        this.server!.close(() => resolve());
      });
    }

    this.logger.info("stopped");
  }
}

export type Context = {
  user: ApiToken;
};
