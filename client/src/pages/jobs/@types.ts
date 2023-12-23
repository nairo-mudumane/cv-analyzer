import { IJob } from "../../@types";

export interface IJobsInnerProps {
  jobs: Array<IJob>;
  loading?: boolean;
  onAction?: () => unknown;
}

export type ISectionJobByIdProps = { jobId: string };
