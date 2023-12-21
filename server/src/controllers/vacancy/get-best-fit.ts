import { Request, Response } from "express";
import { IVacancy } from "../../@types";
import database from "../../services/database";
import Gpt from "../../services/gpt";

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
    const gpt = new Gpt();

    const rawResumes = await database.resumeMetadata.findMany({
      select: { id: true, skills: true },
    });

    const sortedResumes = (await gpt.getBestCandidate({
      candidateLength: 2,
      resumes: JSON.stringify(rawResumes),
      vacancyDescription: vacancy.description,
    })) as typeof rawResumes;

    const formatedResumes = await database.resume.findMany({
      include: { metadata: true },
      where: { metadata: { OR: sortedResumes.map(({ id }) => ({ id })) } },
    });

    return response.json({ rawResumes, sortedResumes, formatedResumes });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
