import { Request, Response } from "express";
import helpers from "../../helpers";

export async function create(request: Request, response: Response) {
  const reqFile = request.file;

  try {
    console.log({ reqFile });
    return response.json({ ok: true });
  } catch (error) {
    if (reqFile) await helpers.fileSystem.removeFile(reqFile.filename);
    return response.status(400).json({ message: (error as Error).message });
  }
}
