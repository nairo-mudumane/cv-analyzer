import React from "react";
import useSWR from "swr";
import { Alert, Button } from "@mui/material";
import services from "../../services";
import { Container } from "../../components";
import { ISectionItemById } from "./@types";

export default function SectionResumeById({ itemId }: ISectionItemById) {
  const {
    data: resume,
    error,
    isLoading,
    mutate,
  } = useSWR([`/resumes/${itemId}`], () => services.resume.getById(itemId));

  if (isLoading)
    return (
      <Container>
        <Alert severity="warning">
          <div>Loading, please wait...</div>
        </Alert>
      </Container>
    );

  if (error || !resume)
    return (
      <Container>
        <Alert severity="error">
          <div>{error ? (error as Error).message : "Nothing found"}</div>

          <Button
            variant="outlined"
            onClick={() => mutate()}
            sx={{ mt: 2, ml: "auto" }}
          >
            Try again
          </Button>
        </Alert>
      </Container>
    );

  return (
    <Container className="w-full h-[90vh] overflow-y-auto pt-4 pb-14">
      <div className="text-primary text-base font-bold flex justify-between items-center">
        <h2>{resume.metadata?.name}</h2>

        <div className="w-max max-w-full ml-auto flex gap-2 items-center">
          <Button
            variant="contained"
            size="small"
            target="_blank"
            href={resume.url}
          >
            Open resume
          </Button>
        </div>
      </div>

      <div className="my-2 flex gap-1">
        <div>Gender: {resume?.metadata?.gender || "Not informed"}</div>
        <div>Age: {resume?.metadata?.age || "Not informed"}</div>
      </div>

      <div className="py-2 mb-10 text-justify grid gap-3">
        <div>
          <h4 className="font-bold">About</h4>
          {resume?.metadata?.description}
        </div>

        <div>
          <h4 className="font-bold">Experience</h4>
          {resume?.metadata?.experience}
        </div>

        <div>
          <h4 className="font-bold">Education</h4>
          {resume?.metadata?.education}
        </div>

        <div>
          <h4 className="font-bold">Skills</h4>
          {resume?.metadata?.skills.toString()}
        </div>
      </div>
    </Container>
  );
}
