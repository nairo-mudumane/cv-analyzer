import { z as zod } from "zod";
import { INewVacancy } from "../@types";
import helpers from "../helpers";

const create = (data: INewVacancy) => {
  try {
    zod
      .object({
        headline: zod.string({ required_error: "The job title is mandatory" }),
        description: zod.string({
          required_error: "Job description is mandatory",
        }),
        expiresAt: zod
          .string({
            required_error:
              "The vacancy expiration date is mandatory and must have the following structure: dd/mm/yyyy",
          })
          .regex(
            /^\d{1,2}\/[01]{1,2}\/(19|20)(\d{2})$/,
            "The vacancy expiration date must have the following structure: dd/mm/yyyy"
          )
          .nullish(),
      })
      .parse(data);
  } catch (error) {
    helpers.zod.throwNewZodError(error);
  }
};

export default { create };
