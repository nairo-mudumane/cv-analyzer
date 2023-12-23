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
    error,
    isLoading,

    mutate,
  } = useSWR(["/jobs", jobId], () => services.jobs.getById(jobId));

  const [expired, setExpired] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (job?.expiresAt)
      setExpired(new Date() > new Date(String(job.expiresAt)));
  }, [job]);

  if (isLoading)
    return (
      <Container className="flex-1 max-w-[60%] py-6">
        <Alert severity="warning">
          <div>Loading, please wait...</div>
        </Alert>
      </Container>
    );

  if (error || !job)
    return (
      <Container className="flex-1 max-w-[60%] py-6">
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
    <Container className="flex-1 max-w-[60%] py-6">
      <h3 className="text-primary underline-offset-2 font-bold text-xl md:text-3xl">
        {job.headline}
      </h3>

      <div className="text-sm">
        Posted {moment(job.createdAt).fromNow()} (
        {moment(job.createdAt).format("DD/MM/YYYY")})
      </div>

      <div
        className={clsx(
          expired
            ? "bg-red-200 border-red-500 text-white"
            : "bg-green-200 border-green-500",
          "text-sm font-semibold rounded w-max py-1 px-2 mt-2"
        )}
      >
        {expired ? "Expired" : "Expires"} {moment(job.expiresAt).fromNow()}
      </div>

      <div className="mt-8 text-justify">
        <p>{job.description}</p>
      </div>
    </Container>
  );
}
