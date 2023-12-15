import React from "react";
import { Alert, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { QueryParams, UndoPartial } from "../../@types";
import { useSelectedFile } from "../../hooks";

export function Translate() {
  const { translate, error } = useSelectedFile();
  const [searchParams] = useSearchParams();

  const params: QueryParams = {};
  params["resume"] = searchParams.get("resume") ?? "";
  params["target"] = searchParams.get("target") ?? "";
  params["token"] = searchParams.get("token") ?? "";

  const extractUrl = React.useMemo<string | null>(() => {
    if (params)
      if (params.token && params.resume)
        return `/extract?token=${params.token}&resume=${params.resume}`;
    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function retranslate() {
    localStorage.removeItem(`Tr_:${params.token!}`);
    window.location.reload();
  }

  function extract() {
    localStorage.removeItem(`Tr_:${params.token!}`);
    window.location.assign(extractUrl!);
  }

  React.useEffect(() => {
    const triggerTranslation = async () =>
      await translate(params as UndoPartial<QueryParams>);

    const isAlreadyTranslated = localStorage.getItem(`Tr_:${params.token!}`);
    if (!isAlreadyTranslated) {
      triggerTranslation();
      localStorage.setItem(`Tr_:${params.token!}`, "true");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      {error ? (
        <Alert
          severity="error"
          action={
            <Button variant="contained" onClick={retranslate}>
              Reset
            </Button>
          }
        >
          {error}
        </Alert>
      ) : (
        <ul>
          <div className="text-2xl font-bold mb-2">
            This document has already been translated in this browser
          </div>

          <div className="mt-6 flex gap-4">
            <li>
              <Button variant="outlined" onClick={retranslate}>
                Translate again
              </Button>
            </li>

            {extractUrl ? (
              <li>
                <Button variant="contained" onClick={extract}>
                  Process document
                </Button>
              </li>
            ) : (
              <Button
                variant="contained"
                onClick={() => window.location.replace("/")}
              >
                Reset
              </Button>
            )}
          </div>
        </ul>
      )}
    </div>
  );
}
