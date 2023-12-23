import { DbData, DbKeys } from "./global";

export interface IJob extends DbData<string> {
  headline: string;
  description: string;
  expiresAt: Date;
}

export type INewVacancy = Partial<Omit<IJob, DbKeys>>;
