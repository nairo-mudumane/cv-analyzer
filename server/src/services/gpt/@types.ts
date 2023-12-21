import { IResumeMetadata } from "../../@types";

export interface ITranslateOptions {
  source: string;
  targetLang: string;
}

export interface IGetBestCandidateConfig {
  resumes: Partial<IResumeMetadata> | unknown;
  vacancyDescription: string;
  candidateLength?: number;
}
