import { IResume, QueryParams, UndoPartial } from "../../@types";

export interface ISelectedFileContext {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<File>;
  loading: boolean | string;
  error: string;
  resume: IResume | null;
  translateTo: string;
  setTranslateTo: React.Dispatch<string>;
  translate: (data: UndoPartial<QueryParams>) => Promise<void>;
  extract: (data: UndoPartial<QueryParams>) => Promise<void>;
}
