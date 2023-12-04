export interface ISelectedFileContext {
  selected: File | null;
  setSelected: React.Dispatch<File>;
  loading: boolean | string;
  error: string;
  finalData: unknown | null;
}
