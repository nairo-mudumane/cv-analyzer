import { Request, Response } from "express";
import PDFParser from "pdf-parse";
import database from "../../services/database";
import { IResume } from "../../@types";
import { downloadBuffer } from "../../services/download-buffer";
import Gpt from "../../services/gpt";

export async function extract(request: Request, response: Response) {
  const gpt = new Gpt();
  let resume: IResume | null = null;
  const { id } = request.params as { id: string };
  const { token } = request.query as { token?: string };

  try {
    if (!token) throw new Error("access denied: no token provided");

    resume = await database.resume.findFirst({ where: { id } });
    if (!resume) return response.status(404).json({ message: "not found" });

    if (resume.token !== token) throw new Error("access denied: invalid token");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const PDFBuffer = await downloadBuffer(resume!.url);
    if (!PDFBuffer) throw new Error("internal error: file unavailable");

    const pdfData = await PDFParser(PDFBuffer);

    const translated = await gpt.translate({
      source: pdfData.text,
      targetLang: "EN",
    });

    return response.json({ "pdfData.text": pdfData.text, translated });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}