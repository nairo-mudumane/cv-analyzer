import { AxiosError } from "axios";

export function throwAxiosError(error: unknown) {
  let message = (error as Error).message;

  if (error instanceof AxiosError)
    message =
      error.response && error.response.data && error.response.data.message;

  throw new Error(message);
}
