import { APIResponse, IJob, IResume } from "../@types";
import helpers from "../helpers";
import { api } from "./axios";

const baseUrl = "/opportunities/vacancies";

export async function getAll(): Promise<Array<IJob> | undefined> {
  try {
    const jobs = await api
      .get<APIResponse<Array<IJob>>>(baseUrl)
      .then(({ data }) => data.data);

    return jobs;
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}

export async function getById(id: string): Promise<IJob | undefined> {
  try {
    const job = await api
      .get<APIResponse<IJob>>(`${baseUrl}/${id}`)
      .then(({ data }) => data.data);

    return job;
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}

export async function getBestFit(
  jobId: string
): Promise<Array<IResume> | undefined> {
  try {
    const bestCandidates = await api
      .get<APIResponse<Array<IResume>>>(`${baseUrl}/${jobId}/best_fit`)
      .then(({ data }) => data.data);

    return bestCandidates;
  } catch (error) {
    helpers.axios.throwAxiosError(error);
  }
}
