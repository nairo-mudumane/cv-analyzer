export interface UseInputTextErrors<T> {
  errors: T;
}

export interface UseInputText<T> extends Pick<UseInputTextErrors<T>, "errors"> {
  onChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  clear: () => void;
  updateErrors: (newErrors: { [k: string]: string }) => void;
  updateInitial: (key: string, value: string | number) => void;
}

export interface QueryParamOptions {
  replace?: boolean;
}

export interface UseQueryParams {
  get: (key: string) => string | undefined;
  set: (key: string, value: string, options?: QueryParamOptions) => void;
  remove: (key: string) => void;
}
