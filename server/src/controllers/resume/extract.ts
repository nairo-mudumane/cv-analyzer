import { Request, Response } from "express";
import database from "../../services/database";
import { IResume } from "../../@types";
import Gpt from "../../services/gpt";

export async function extract(request: Request, response: Response) {
  const gpt = new Gpt();
  let resume: IResume | null = null;
  const { id } = request.params as { id: string };
  const { token } = request.query as { token?: string };

  try {
    if (!token) throw new Error("access denied: no token provided");

    resume = (await database.resume.findFirst({
      where: { id },
      include: { metadata: true },
    })) as IResume;

    if (!resume) return response.status(404).json({ message: "not found" });
    if (resume.token !== token) throw new Error("access denied: invalid token");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const processedMetadata = await gpt.precessMetadata(
      resume.metadata!.rawInfo!
    );

    const updatedResume = await database.resume.update({
      include: { metadata: true },
      where: { id: resume.id as string },
      data: { metadata: { update: processedMetadata } },
    });

    return response.status(200).json({ message: "ok", data: updatedResume });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
