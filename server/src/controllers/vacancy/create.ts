import { Request, Response } from "express";
import moment from "moment";
import { INewVacancy, UndoPartial } from "../../@types";
import payloadHandler from "../../payload-handler";
import database from "../../services/database";

export async function create(request: Request, response: Response) {
  const payload = request.body as INewVacancy;

  try {
    payloadHandler.vacancy.create(payload);

    if (payload["expiresAt"])
      payload["expiresAt"] = moment(payload.expiresAt, "DD/MM/YYYY").toDate();
    else {
      const now = new Date();
      now.setDate(now.getDate() + 5);
      payload["expiresAt"] = now;
    }
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const created = await database.vacancy.create({
      data: payload as UndoPartial<INewVacancy>,
    });

    return response.status(201).json({ message: "created", data: created });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
