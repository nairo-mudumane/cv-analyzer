import { IResume } from "../../@types";

export interface ISelectedFileContext {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<File>;
  loading: boolean | string;
  error: string;
  resume: IResume | null;
  translateTo: string;
  setTranslateTo: React.Dispatch<string>;
}
