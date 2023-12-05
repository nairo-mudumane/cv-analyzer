import { IResume } from "../../@types";

export interface ISelectedFileContext {
  selected: File | null;
  setSelected: React.Dispatch<File>;
  loading: boolean | string;
  error: string;
  finalData: IResume | null;
}
