import { DbData, DbKeys } from "./global";
import { IResumeMetadata } from "./resume-metadata";

export interface IResume extends DbData {
  url: string;
  token: string;
  metadataId: string;
  metadata: IResumeMetadata | null;
}

export type INewResume = Partial<Pick<IResume, DbKeys>>;
