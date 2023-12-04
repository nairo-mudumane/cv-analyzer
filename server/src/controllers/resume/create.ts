import { Request, Response } from "express";
import helpers from "../../helpers";
import storage from "../../services/storage";
import database from "../../services/database";

export async function create(request: Request, response: Response) {
  const { file } = request;

  try {
    if (!file) throw new Error("resume file is required");

    const upload = new storage.cloud();
    const fileUrl = (await upload.single({
      destination: "resumes",
      filename: file.filename,
      filepath: file.path,
    })) as string;

    const created = await database.resume.create({ data: { url: fileUrl } });

    return response.status(201).json({ message: "ok", data: created });
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  } finally {
    if (file) await helpers.fileSystem.removeFile(file.filename);
  }
}
