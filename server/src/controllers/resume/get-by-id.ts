import { Request, Response } from "express";
import database from "../../services/database";

export async function getById(request: Request, response: Response) {
  const { id } = request.params as { id: string };

  try {
    const resume = await database.resume.findFirst({
      where: { id },
      include: { metadata: true },
    });

    if (!resume) return response.status(404).json({ message: "not found" });

    return response.status(200).json({ message: "ok", data: resume });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
