import { Request, Response } from "express";
import PDFParser from "pdf-parse";
import Gpt from "../../services/gpt";
import { IResume } from "../../@types";
import database from "../../services/database";
import { downloadBuffer } from "../../services/download-buffer";

type Params = { id: string };
type QueryParams = Partial<{ token: string; target: string }>;

export async function translate(request: Request, response: Response) {
  const gpt = new Gpt();
  let resume: IResume | null = null;
  const { id } = request.params as Params;
  const queryParams = request.query as QueryParams;

  try {
    if (!queryParams.token) throw new Error("access denied: no token provided");
    if (!queryParams.target) queryParams.target = "EN";

    resume = (await database.resume.findFirst({
      where: { id },
      include: { metadata: true },
    })) as IResume;
    if (!resume) return response.status(404).json({ message: "not found" });
    if (resume.token !== queryParams.token)
      throw new Error("access denied: invalid token");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const PDFBuffer = await downloadBuffer(resume!.url);
    if (!PDFBuffer) throw new Error("internal error: file unavailable");

    const pdfData = await PDFParser(PDFBuffer);

    const translated = await gpt.translate({
      source: pdfData.text,
      targetLang: queryParams.target!,
    });

    const updated = await database.resume.update({
      where: { id: resume.id as string },
      include: { metadata: true },
      data: {
        metadata: { update: { lang: queryParams.target, rawInfo: translated } },
      },
    });

    return response.status(200).json({ message: "ok", data: updated });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
