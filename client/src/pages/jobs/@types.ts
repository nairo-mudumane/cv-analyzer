import { IJob, IResume } from "../../@types";

export interface IJobsInnerProps {
  jobs: Array<IJob>;
  loading?: boolean;
  onAction?: () => unknown;
}

export type ISectionItemById = { itemId: string };

export interface ISectionResumesProps {
  resumes: Array<IResume>;
}
