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

  const onActionClick = () => mutate();

  if (isLoading) return <LoadingScreen fixed />;

  if (error)
    return (
      <Container className="bg-zinc-100 w-screen h-screen py-6">
        <Alert severity="error">
          <div>{(error as Error).message}</div>

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

  if (!jobs)
    return (
      <Container className="bg-zinc-100 w-screen h-screen py-6">
        <Alert severity="error">
          <div>Nothing found</div>

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
    <div className="bg-zinc-100 w-screen h-screen overflow-hidden">
      <section className="bg-white h-10vh py-4">
        <SectionTitle
          jobs={jobs}
          onAction={onActionClick}
          loading={isValidating || isLoading}
        />
      </section>

      <main className="flex justify-between">
        <section className="border-zinc-400 border-r flex-1 min-w-[30%]">
          <SectionJobs jobs={jobs} />
        </section>

        {queryJobId && (
          <section className="">
            <SectionJobById jobId={queryJobId} />
          </section>
        )}
      </main>
    </div>
  );
}
