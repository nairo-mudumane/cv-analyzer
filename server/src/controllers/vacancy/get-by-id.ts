import { Request, Response } from "express";
import database from "../../services/database";

export async function getById(request: Request, response: Response) {
  const { key } = request.params as { key: string };

  try {
    const vacancy = await database.vacancy.findFirst({ where: { id: key } });

    if (!vacancy) return response.status(400).json({ message: "not found" });

    return response.status(200).json({ message: "created", data: vacancy });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
