import React from "react";
import { Alert, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { QueryParams, UndoPartial } from "../../@types";
import { useSelectedFile } from "../../hooks";

export function Extract() {
  const { extract, error, resume } = useSelectedFile();
  const [searchParams] = useSearchParams();

  const params: QueryParams = {};
  params["resume"] = searchParams.get("resume") ?? "";
  params["target"] = searchParams.get("target") ?? "";
  params["token"] = searchParams.get("token") ?? "";

  React.useEffect(() => {
    const triggerExtraction = async () =>
      await extract(params as UndoPartial<QueryParams>);
    triggerExtraction();

    const isAlreadyExtracted = localStorage.getItem(`Ex_:${params.token!}`);
    if (!isAlreadyExtracted) {
      triggerExtraction();
      localStorage.setItem(`Ex_:${params.token!}`, "true");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ul>
          <h2 className="font-bold text-3xl mb-4">Extracted Data</h2>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Name
            </h3>
            <div className="pl-4">{resume?.metadata?.name}</div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Age
            </h3>
            <div className="pl-4">
              {resume?.metadata?.age || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Description
            </h3>
            <div className="pl-4">
              {resume?.metadata?.description || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Gender
            </h3>
            <div className="pl-4">
              {resume?.metadata?.gender || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Headline
            </h3>
            <div className="pl-4">
              {resume?.metadata?.headline || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Experience
            </h3>
            <div className="pl-4">
              {resume?.metadata?.experience || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Education
            </h3>
            <div className="pl-4">
              {resume?.metadata?.education || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Other relevant
            </h3>
            <div className="pl-4">
              {resume?.metadata?.other || "Not informed"}
            </div>
          </li>

          <li className="mb-4">
            <h3 className="bg-primary text-white rounded py-2 px-4 font-bold">
              Skills
            </h3>
            <div className="pl-4">{resume?.metadata?.skills.toString()}</div>
          </li>
        </ul>
      )}

      <div className="my-4">
        <Button variant="contained" href="/">
          Reset
        </Button>
      </div>
    </div>
  );
}
