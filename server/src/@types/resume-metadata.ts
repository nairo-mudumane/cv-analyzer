import { DbData, DbKeys } from "./global";
import { IResume } from "./resume";

export interface ProcessedMetadata {
  name: string; // his full name
  age: number; // his age or zero
  description: string; // short description
  gender: string; // male (m) or female (f)
  headline: string | null; // current position or null
  experience: string | null; // short description of professional experience or null
  education: string | null; // short description of educational experience or null
  skills: string[]; // skill array
  other: string | null; // other relevant information
}

export interface IResumeMetadata extends DbData, ProcessedMetadata {
  lang: string;
  resumeId: string;
  resume: IResume;
  rawInfo: string | null;
}

export type INewResumeMetadata = Partial<
  Omit<IResumeMetadata, DbKeys | "resume">
>;
