import { IResumeMetadata } from ".";
import { DbData, DbKeys } from "./global";

export interface IResume extends DbData {
  url: string;
  token: string;
  metadata: IResumeMetadata;
}

export type INewResume = Partial<Pick<IResume, DbKeys>>;
