import { Express } from "express";
import { ResumeRoutes } from "./resume";

export default function ServerRoutes(server: Express) {
  server.use("/resumes", ResumeRoutes);
}
