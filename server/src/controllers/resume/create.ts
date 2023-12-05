import { Request, Response } from "express";
import PDFParser from "pdf-parse";
import crypto from "crypto";
import helpers from "../../helpers";
import storage from "../../services/storage";
import database from "../../services/database";
import { downloadBuffer } from "../../services/download-buffer";

export async function create(request: Request, response: Response) {
  const { file } = request;
  const upload = new storage.cloud();

  try {
    if (!file) throw new Error("resume file is required");

    const PDFBuffer = await downloadBuffer(file.path, true);
    if (!PDFBuffer) throw new Error("internal error: file unavailable");

    const pdfData = await PDFParser(PDFBuffer);

    const fileUrl = (await upload.single({
      destination: "resumes",
      filename: file.filename,
      filepath: file.path,
    })) as string;

    const token = crypto.randomBytes(32).toString("hex");

    const created = await database.resume.create({
      data: {
        token,
        url: fileUrl,
        metadata: { create: { rawInfo: pdfData.text } },
      },
    });

    return response
      .status(201)
      .json({ message: "ok", data: { id: created.id, token: created.token } });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ message: (error as Error).message });
  } finally {
    if (file) await helpers.fileSystem.removeFile(file.filename);
  }
}
