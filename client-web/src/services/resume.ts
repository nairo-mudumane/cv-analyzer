import { AxiosError } from "axios";
import { api } from "./axios";

type uploadedData = { token: string; id: string };

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

export async function process({ id, token }: uploadedData): Promise<unknown> {
  try {
    const processed = await api
      .post(`/resumes/${id}/extract?token=${token}`, { id, token })
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
