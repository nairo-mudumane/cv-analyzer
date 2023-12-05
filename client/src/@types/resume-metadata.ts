import { DbData, DbKeys } from "./global";

export interface ProcessedMetadata {
  name: string;
  age: number;
  description: string;
  gender: string;
  headline: string | null;
  experience: string | null;
  education: string | null;
  skills: string[];
  other: string | null;
}

export interface IResumeMetadata extends DbData, ProcessedMetadata {
  lang: string;
  rawInfo: string | null;
}

export type INewResumeMetadata = Partial<
  Omit<IResumeMetadata, DbKeys | "resume">
>;
