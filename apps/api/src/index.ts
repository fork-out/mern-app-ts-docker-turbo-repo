import "dotenv/config";
import "reflect-metadata";

import { ApiService } from "./ApiService";

const apiServer = new ApiService();

apiServer.run();
