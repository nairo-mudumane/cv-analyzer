import { ZodError } from "zod";

function throwNewZodError(error: unknown) {
  let errMessage = (error as Error).message;

  if (error instanceof ZodError) {
    const { issues } = error;
    const { message, path } = issues[0];
    errMessage = `[${path.toString()}]: ${message}`;
  }

  throw new Error(errMessage);
}

export default { throwNewZodError };
