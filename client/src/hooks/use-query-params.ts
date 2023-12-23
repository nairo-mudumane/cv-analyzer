import { useSearchParams } from "react-router-dom";
import { QueryParamOptions, UseQueryParams } from "./@types";
import helpers from "../helpers";

export function useQueryParams(): UseQueryParams {
  const [searchParams, setSearchParams] = useSearchParams();

  function remove(key: string): void {
    searchParams.delete(key);
    setSearchParams(searchParams);
    return;
  }

  function set(key: string, value: string, options?: QueryParamOptions): void {
    if (options && options.replace) {
      setSearchParams({ [key]: String(helpers.crypto.encrypt(value)) });
      return;
    }

    searchParams.set(key, helpers.crypto.encrypt(value));
    return setSearchParams([...searchParams.entries()]);
  }

  function get(key: string): string | undefined {
    const result = searchParams.get(key);
    if (result === null || !result) return undefined;

    return helpers.crypto.decrypt(result);
  }

  return { get, set, remove };
}
