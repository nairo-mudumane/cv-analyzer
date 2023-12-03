import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "./services/database";
import ServerRoutes from "./routes";

const server = express();
const port = process.env.PORT;
const knownOrigins = process.env.KNOWN_ORIGINS?.split(",");

server.use(express.json());
server.use(cors({ origin: knownOrigins }));
ServerRoutes(server);

database.$connect(() =>
  server.listen(port, () => console.log(`server stated: ${port}`))
);
