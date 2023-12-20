import { Express } from "express";
import { ResumeRoutes } from "./resume";
import { VacancyRoutes } from "./vacancy";

export default function ServerRoutes(server: Express) {
  server.use("/resumes", ResumeRoutes);
  server.use("/opportunities/vacancies", VacancyRoutes);
}
