import React from "react";
import { useNavigate } from "react-router-dom";
import { ISelectedFileContext } from "./@types";
import services from "../../services";
import { IResume } from "../../@types";

export const SelectedFileContext = React.createContext({
  selectedFile: null,
} as ISelectedFileContext);

export function SelectedFileProvider(
  props: React.HtmlHTMLAttributes<HTMLElement>
) {
  const [loading, setLoading] = React.useState<boolean | string>(false);
  const [error, setError] = React.useState<string>("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [resume, setResume] = React.useState<IResume | null>(null);
  const [translateTo, setTranslateTo] = React.useState<string>("en");

  const navigate = useNavigate();

  const onSelectedFileChange = React.useCallback(async () => {
    try {
      if (selectedFile) {
        setLoading("uploading your file, please don't reload this page.");

        const { id, token } = await services.resume.upload(selectedFile);

        setResume({ id, token } as IResume);
        const redirectUrl = `/translate?target=${translateTo}&token=${token}&resume=${id}`;
        navigate(redirectUrl);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [navigate, selectedFile, translateTo]);

  React.useEffect(() => {
    if (selectedFile) onSelectedFileChange();
  }, [onSelectedFileChange, selectedFile]);

  // const processUploaded = async () => {
  //   try {
  //     setLoading("processing... (this may take 1 minute or more)");
  //     const { token, id } = uploaded!;
  //     const data = await services.resume.process({ token, id });

  //     setUploaded(data);
  //     setFinalData(data as IResume);
  //   } catch (error) {
  //     setError((error as Error).message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   if (selected) uploadSelected();
  // }, [selected]);

  // React.useEffect(() => {
  //   if (uploaded && !finalData) processUploaded();
  // }, [uploaded, finalData]);

  return (
    <SelectedFileContext.Provider
      value={{
        error,
        loading,
        resume,
        selectedFile,
        setSelectedFile,
        translateTo,
        setTranslateTo,
      }}
    >
      {props.children}
    </SelectedFileContext.Provider>
  );
}
