import React from "react";
import useSWR from "swr";
import { Alert, Button } from "@mui/material";
import SectionJobById from "./section-job-by-id";
import SectionJobs from "./section-jobs";
import SectionTitle from "./section-title";
import services from "../../services";
import { Container, LoadingScreen } from "../../components";
import { useQueryParams } from "../../hooks";

export function Jobs() {
  const query = useQueryParams();
  const queryJobId = React.useMemo(() => query.get("job"), [query]);

  const {
    data: jobs,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/jobs", services.jobs.getAll);

  if (isLoading) return <LoadingScreen fixed />;

  if (error || !jobs)
    return (
      <Container className="bg-zinc-100 w-screen h-screen py-6">
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
    <div className="bg-zinc-100 flex flex-col w-screen h-screen">
      <SectionTitle
        jobs={jobs}
        onAction={mutate}
        loading={isValidating || isLoading}
      />

      <main className="flex-1 flex justify-between">
        <SectionJobs jobs={jobs} />
        {queryJobId && <SectionJobById jobId={queryJobId} />}
      </main>
    </div>
  );
}
