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

  React.useEffect(() => {
    const triggerTranslation = async () =>
      await translate(params as UndoPartial<QueryParams>);

    const isAlreadyTranslated = localStorage.getItem(params.token!);
    if (!isAlreadyTranslated) {
      triggerTranslation();
      localStorage.setItem(params.token!, "true");
    }
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      {error ? (
        <Alert
          severity="error"
          action={
            <Button variant="contained" onClick={() => location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">Redirecting...</h2>
          <div
            className="text-primary underline underline-offset-4 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Click here to manually redirect
          </div>
        </>
      )}
    </div>
  );
}
