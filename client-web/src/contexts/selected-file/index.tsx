import React from "react";
import { ISelectedFileContext } from "./@types";
import services from "../../services";

export const SelectedFileContext = React.createContext({
  selected: null,
} as ISelectedFileContext);

export function SelectedFileProvider(
  props: React.HtmlHTMLAttributes<HTMLElement>
) {
  const [loading, setLoading] = React.useState<boolean | string>(false);
  const [error, setError] = React.useState<string>("");
  const [selected, setSelected] = React.useState<File | null>(null);
  const [uploaded, setUploaded] = React.useState<{
    token: string;
    id: string;
  } | null>(null);
  const [finalData, setFinalData] = React.useState<unknown | null>(null);

  const uploadSelected = async () => {
    try {
      setLoading("uploading...");
      const _uploaded = await services.resume.upload(selected!);
      setUploaded(_uploaded);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const processUploaded = async () => {
    try {
      setLoading("processing... (this may take 1 minute or more)");
      const { token, id } = uploaded!;
      const data = await services.resume.process({ token, id });

      // @ts-ignore
      setUploaded(data);
      setFinalData(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (selected) uploadSelected();
  }, [selected]);

  React.useEffect(() => {
    if (uploaded && !finalData) processUploaded();
  }, [uploaded, finalData]);

  return (
    <SelectedFileContext.Provider
      value={{ selected, setSelected, loading, error, finalData }}
    >
      {props.children}
    </SelectedFileContext.Provider>
  );
}
