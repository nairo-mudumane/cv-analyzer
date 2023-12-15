import { IResume, QueryParams, UndoPartial } from "../../@types";

export interface ISelectedFileContext {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<File>;
  loading: boolean | string;
  error: string;
  resume: IResume | null;
  translateTo: string | null;
  setTranslateTo: React.Dispatch<string | null>;
  translate: (data: UndoPartial<QueryParams>) => Promise<void>;
  extract: (data: UndoPartial<QueryParams>) => Promise<void>;
}
