import { Request, Response } from "express";
import database from "../../services/database";

export async function getAll(request: Request, response: Response) {
  try {
    const resumes = await database.resume.findMany({
      include: { metadata: true },
    });
    return response.status(200).json({ message: "ok", data: resumes });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
