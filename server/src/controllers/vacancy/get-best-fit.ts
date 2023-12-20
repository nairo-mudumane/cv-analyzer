import { Request, Response } from "express";
import { IVacancy } from "../../@types";
import database from "../../services/database";

export async function getBestFit(request: Request, response: Response) {
  const { key } = request.params as { key: string };
  let vacancy: IVacancy | null = null;

  try {
    vacancy = await database.vacancy.findFirst({ where: { id: key } });

    if (!vacancy) throw new Error("opportunity not found");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const resumes = await database.resumeMetadata.findMany({
      select: { rawInfo: true, resume: true },
    });

    return response.json({ vacancy, resumes });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
