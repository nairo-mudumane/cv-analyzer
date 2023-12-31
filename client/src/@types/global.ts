export interface DbData<ID = number | string> {
  id: ID;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type DbKeys = "id" | "createdAt" | "updatedAt";

export type UndoPartial<T> = { [P in keyof T]-?: T[P] };

export type QueryParams = Partial<{
  target: string | null;
  token: string;
  resume: string;
}>;

export type APIResponse<T = unknown> = {
  message: string;
  count?: number;
  data?: T;
};
