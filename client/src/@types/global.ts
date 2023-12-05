export interface DbData<ID = number | string> {
  id: ID;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type DbKeys = "id" | "createdAt" | "updatedAt";

export type UndoPartial<T> = { [P in keyof T]-?: T[P] };
