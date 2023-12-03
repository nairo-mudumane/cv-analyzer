import { DbData, DbKeys } from "./global";

export interface IResume extends DbData {
  url: string;
  skills: Array<string>;
}

export type INewResume = Partial<Omit<IResume, DbKeys>>;
