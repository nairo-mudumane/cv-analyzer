import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "./services/database";

const server = express();
const port = process.env.PORT;
const knownOrigins = process.env.KNOWN_ORIGINS?.split(",");

server.use(express.json());
server.use(cors({ origin: knownOrigins }));

database.$connect(() =>
  server.listen(port, () => console.log(`server stated: ${port}`))
);
