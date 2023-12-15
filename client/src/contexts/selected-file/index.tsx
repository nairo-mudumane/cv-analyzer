import React from "react";
import { useNavigate } from "react-router-dom";
import { ISelectedFileContext } from "./@types";
import services from "../../services";
import { IResume, QueryParams, UndoPartial } from "../../@types";

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
  const [translateTo, setTranslateTo] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const onSelectedFileChange = React.useCallback(async () => {
    try {
      if (selectedFile) {
        setLoading("uploading your file, please don't reload this page.");

        const { id, token } = await services.resume.upload(selectedFile);

        setResume({ id, token } as IResume);

        let redirectUrl = "";
        if (translateTo)
          redirectUrl = `/translate?target=${translateTo}&token=${token}&resume=${id}`;
        else redirectUrl = `/extract?token=${token}&resume=${id}`;

        navigate(redirectUrl);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [navigate, selectedFile, translateTo]);

  React.useEffect(() => {
    if (selectedFile && !resume?.token) onSelectedFileChange();
  }, [onSelectedFileChange, resume?.token, selectedFile]);

  async function translate(data: UndoPartial<QueryParams>) {
    try {
      setLoading("translating... This can take 1 minute or more.");

      const translated = await services.resume.translate(data).catch((err) => {
        localStorage.removeItem(data.token);
        throw err;
      });

      setResume(translated);

      const redirectUrl = `/extract?target=${translateTo}&token=${translated.token}&resume=${translated.id}`;
      navigate(redirectUrl);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function extract(data: UndoPartial<QueryParams>) {
    try {
      setLoading("processing information, this can take 1 minute or more.");

      const processed = await services.resume.extract(data).catch((err) => {
        localStorage.removeItem(`Tr_:${data.token}`);
        throw err;
      });

      setResume(processed);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

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
        translate,
        extract,
      }}
    >
      {props.children}
    </SelectedFileContext.Provider>
  );
}
