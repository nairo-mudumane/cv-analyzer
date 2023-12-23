import React from "react";
import clsx from "clsx";
import { Alert, Button } from "@mui/material";
import useSWR from "swr";
import moment from "moment";
import services from "../../services";
import { Container } from "../../components";
import { ISectionJobByIdProps } from "./@types";

export default function SectionJobById({ jobId }: ISectionJobByIdProps) {
  const {
    data: job,
    error: errorJob,
    isLoading: isLoadingJob,
    mutate: mutateJob,
  } = useSWR(["/jobs", jobId], () => services.jobs.getById(jobId));

  const {
    data: resumes,
    error: errorResumes,
    isLoading: isLoadingResumes,
  } = useSWR(["/best_fit", jobId], () => services.jobs.getBestFit(jobId));

  const [expired, setExpired] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (job?.expiresAt)
      setExpired(new Date() > new Date(String(job.expiresAt)));
  }, [job]);

  if (isLoadingJob)
    return (
      <Container>
        <Alert severity="warning">
          <div>Loading, please wait...</div>
        </Alert>
      </Container>
    );

  if (errorJob || !job)
    return (
      <Container>
        <Alert severity="error">
          <div>{errorJob ? (errorJob as Error).message : "Nothing found"}</div>

          <Button
            variant="outlined"
            onClick={() => mutateJob()}
            sx={{ mt: 2, ml: "auto" }}
          >
            Try again
          </Button>
        </Alert>
      </Container>
    );

  return (
    <Container className="w-full h-[90vh] overflow-y-auto">
      <h3 className="text-primary underline-offset-2 font-bold text-xl md:text-3xl">
        {job.headline}
      </h3>

      <div className="text-sm">
        Posted {moment(job.createdAt).fromNow()} (
        {moment(job.createdAt).format("DD/MM/YYYY")})
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <div
          className={clsx(
            expired
              ? "bg-red-200 border-red-500 text-white"
              : "bg-green-200 border-green-500",
            "text-sm font-semibold rounded w-max py-1 px-2"
          )}
        >
          {expired ? "Expired" : "Expires"} {moment(job.expiresAt).fromNow()}
        </div>
        {resumes && (
          <span className="bg-primary text-white text-sm font-semibold rounded w-max py-1 px-2">
            {resumes.length} potential candidate(s)
          </span>
        )}
      </div>

      <div className="my-6 text-justify">
        <p>{job.description}</p>
      </div>

      <section>
        {!isLoadingResumes && (
          <h2 className="text-primary underline-offset-2 font-bold text-base md:text-lg mb-2">
            {resumes?.length || 0} potential candidate(s)
          </h2>
        )}

        <div className="grid gap-2 grid-cols-2">
          {isLoadingResumes ? (
            <Alert severity="warning">Loading potential candidates</Alert>
          ) : errorResumes ? (
            <Alert severity="error">{(errorResumes as Error).message}</Alert>
          ) : !resumes || resumes.length <= 0 ? (
            <Alert severity="warning">
              No potential candidates for this position
            </Alert>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className="border-primary bg-white text-sm border rounded-lg py-2 px-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-primary text-base font-bold">
                    {resume.metadata?.name}
                  </div>
                  <div className="my-2 flex gap-1">
                    <div>
                      Gender: {resume?.metadata?.gender || "Not informed"}
                    </div>
                    <div>Age: {resume?.metadata?.age || "Not informed"}</div>
                  </div>
                </div>

                <div className="text-sm text-justify">
                  {resume?.metadata?.skills.toString()}d
                </div>

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
            ))
          )}
        </div>
      </section>
    </Container>
  );
}
