import { Request, Response } from "express";
import database from "../../services/database";

export async function getAll(request: Request, response: Response) {
  try {
    const vacancies = await database.vacancy.findMany();

    return response.status(200).json({ message: "created", data: vacancies });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
