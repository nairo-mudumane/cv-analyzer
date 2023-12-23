import { api } from "./axios";
import { APIResponse, IResume, QueryParams, UndoPartial } from "../@types";
import helpers from "../helpers";

type uploadedData = Pick<IResume, "id" | "token">;

export async function upload(file: File): Promise<uploadedData | undefined> {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const { id, token } = await api
      .post<APIResponse<uploadedData>>("/resumes/new", formData)
      .then(({ data }) => data.data!);

    return { id, token };
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}

export async function translate(
  data: UndoPartial<QueryParams>
): Promise<IResume | undefined> {
  try {
    const uri = `/resumes/${data.resume}/translate?target=${data.target}&token=${data.token}`;

    const translated = await api
      .post<APIResponse<IResume>>(uri)
      .then(({ data }) => data.data!);

    return translated;
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}

export async function extract(
  data: UndoPartial<QueryParams>
): Promise<IResume | undefined> {
  try {
    const processed = await api
      .post<APIResponse<IResume>>(
        `/resumes/${data.resume}/extract?token=${data.token}`,
        {
          ...data,
          id: data.resume,
        }
      )
      .then(({ data }) => data.data!);

    return processed;
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}
