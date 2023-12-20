import { DbData, DbKeys } from "./global";

export interface IVacancy extends DbData<string> {
  headline: string;
  description: string;
  expiresAt: Date;
}

export type INewVacancy = Partial<Omit<IVacancy, DbKeys>>;
