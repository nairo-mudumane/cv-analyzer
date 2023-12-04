import { DbData, DbKeys } from "./global";

export type MetadataLang = "PT" | "EN";

export interface IResume extends DbData {
  url: string;
  token: string;
}

export type INewResume = Partial<Pick<IResume, DbKeys>>;
