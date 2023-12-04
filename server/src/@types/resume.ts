import { DbData, DbKeys } from "./global";

export interface IResume extends DbData {
  url: string;
  token: string;
}

export type INewResume = Partial<Pick<IResume, DbKeys>>;
