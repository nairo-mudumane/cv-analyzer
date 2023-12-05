import { AxiosError } from "axios";
import { api } from "./axios";
import { IResume, QueryParams, UndoPartial } from "../@types";

type uploadedData = Pick<IResume, "id" | "token">;

export async function upload(file: File): Promise<uploadedData> {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const { id, token } = await api
      .post<{ data: uploadedData }>("/resumes/new", formData)
      .then(({ data }) => data.data);

    return { id, token };
  } catch (error) {
    let message = (error as Error).message;

    if (error instanceof AxiosError)
      message =
        error.response && error.response.data && error.response.data.message;

    throw new Error(message);
  }
}

export async function translate(
  data: UndoPartial<QueryParams>
): Promise<IResume> {
  try {
    const uri = `/resumes/${data.resume}/translate?target=${data.target}&token=${data.token}`;

    const translated = await api
      .post<{ data: IResume }>(uri)
      .then(({ data }) => data.data);

    return translated;
  } catch (error) {
    let message = (error as Error).message;

    if (error instanceof AxiosError)
      message =
        error.response && error.response.data && error.response.data.message;

    throw new Error(message);
  }
}

export async function extract(
  data: UndoPartial<QueryParams>
): Promise<IResume> {
  try {
    const processed = await api
      .post(`/resumes/${data.resume}/extract?token=${data.token}`, {
        ...data,
        id: data.resume,
      })
      .then(({ data }) => data.data);

    return processed;
  } catch (error) {
    let message = (error as Error).message;

    if (error instanceof AxiosError)
      message =
        error.response && error.response.data && error.response.data.message;

    throw new Error(message);
  }
}
