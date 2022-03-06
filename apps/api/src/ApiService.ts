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

import {
  JID_COOKIE_KEY,
  createAccessToken,
  createRefreshToken,
  setRefreshToken,
  verifyToken
} from "./authentication/helpers/tokenHelper";
import { AuthenticationResolver } from "./authentication/resolver/AuthenticationResolver";
import { AppDatabase } from "./database/AppDatabase";
import { BaseService } from "./shared/BaseService";
import { UserResolvers } from "./users/resolvers/UserResolver";

const { API_PORT, MONGO_URI, MONGO_DATABASE, NODE_ENV, REFRESH_TOKEN_SECRET } = process.env;

export class ApiService extends BaseService {
  private server: Server | undefined;

  public constructor() {
    super({ location: "api", logLevel: NODE_ENV === "development" ? "debug" : "info" });
  }

  protected async onRun(): Promise<void> {
    const isDevMode = NODE_ENV === "development";

    const database = new AppDatabase(MONGO_URI!, MONGO_DATABASE!);
    await database.connect();
    await database.createAllIndexes();

    Container.set(AppDatabase, database);

    const apiSchema = await buildSchema({
      resolvers: [AuthenticationResolver, UserResolvers],
      container: Container,
      emitSchemaFile: isDevMode ? "schema-api.gql" : undefined
    });

    const app = express();
    app.use(
      cors({
        origin: isDevMode
          ? ["http://localhost:3000", "https://studio.apollographql.com"]
          : undefined,
        credentials: true
      })
    );
    const httpServer = http.createServer(app);
    app.use(helmet({ frameguard: false }));
    app.use(cookieParser());

    if (isDevMode) {
      console.info("RUNNING IN DEV MODE");
      app.use((req, _res, next) => {
        console.info(`${req.method}: ${req.path}`);
        next();
      });
    }

    // health-check
    app.get("/status", (_req, res) => {
      return res.status(200).send({ message: "ok", time: new Date() });
    });

    app.post("/refresh_token", async (req, res) => {
      const token = req.cookies[JID_COOKIE_KEY];

      if (!token) {
        return res.send({ ok: false, accessToken: "" });
      }

      let payload: any = null;
      try {
        payload = verifyToken(token, REFRESH_TOKEN_SECRET!);
      } catch (err) {
        console.error(err);
        return res.send({ ok: false, accessToken: "" });
      }

      const user = await database.users.get(payload.userId);

      if (!user) {
        return res.send({ ok: false, accessToken: "" });
      }
      const refreshToken = createRefreshToken(user.id);
      setRefreshToken(res, refreshToken);

      return res.send({ ok: true, accessToken: createAccessToken(user.id) });
    });

    const apiApolloServer = new ApolloServer({
      schema: apiSchema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: ({ req, res }) => ({ req, res })
    });

    await apiApolloServer.start();
    apiApolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

    this.server = app.listen(API_PORT, () =>
      console.info(`✨ Server ready at http://localhost:${API_PORT}${apiApolloServer.graphqlPath}`)
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
