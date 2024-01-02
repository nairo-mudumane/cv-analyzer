import React from "react";
import useSWR from "swr";
import {
  Alert,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import SectionJobById from "./section-job-by-id";
import SectionJobs from "./section-jobs";
import SectionTitle from "./section-title";
import services from "../../services";
import { Container, LoadingScreen } from "../../components";
import { useQueryParams } from "../../hooks";
import SectionResumes from "./section-resumes";
import SectionResumeById from "./section-resume-by-id";

export function Jobs() {
  const query = useQueryParams();
  const queryJobId = React.useMemo(() => query.get("job"), [query]);
  const queryResumeId = React.useMemo(() => query.get("resume"), [query]);

  const {
    data: jobs,
    error: errorJobs,
    isLoading: isLoadingJobs,
    isValidating,
    mutate: mutateJobs,
  } = useSWR("/jobs", services.jobs.getAll);

  const {
    data: resumes,
    error: errorResumes,
    isLoading: isLoadingResumes,
  } = useSWR("/resumes", services.resume.getAll);

  const [showResumes, setShowResumes] = React.useState<boolean>(false);

  const onShowResumesChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setShowResumes(event.target.checked);

  const onActionClick = () => mutateJobs();

  if (isLoadingJobs || isLoadingResumes) return <LoadingScreen fixed />;

  if (errorJobs || errorResumes)
    return (
      <Container className="bg-zinc-100 w-screen h-screen py-6">
        <Alert severity="error">
          <div>
            {errorJobs
              ? (errorJobs as Error).message
              : errorResumes
              ? (errorResumes as Error).message
              : "Nothing found"}
          </div>

          <Button
            variant="outlined"
            onClick={() => mutateJobs()}
            sx={{ mt: 2, ml: "auto" }}
          >
            Try again
          </Button>
        </Alert>
      </Container>
    );

  if (!jobs || !resumes)
    return (
      <Container className="bg-zinc-100 w-screen h-screen py-6">
        <Alert severity="error">
          <div>Nothing found</div>

          <Button
            variant="outlined"
            onClick={window.location.reload}
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
          loading={isValidating || isLoadingJobs}
        />

        <Container>
          <FormGroup aria-disabled={isValidating || isLoadingJobs}>
            <FormControlLabel
              label="Show Candidates"
              disabled={isValidating || isLoadingJobs}
              aria-disabled={isValidating || isLoadingJobs}
              control={
                <Switch
                  checked={showResumes}
                  onChange={onShowResumesChange}
                  disabled={isValidating || isLoadingJobs}
                  aria-disabled={isValidating || isLoadingJobs}
                />
              }
            />
          </FormGroup>
        </Container>
      </section>

      <main className="flex justify-between">
        {showResumes ? (
          <>
            <section className="border-zinc-400 border-r flex-1 min-w-[30%]">
              <SectionResumes resumes={resumes} />
            </section>

            {queryResumeId && <SectionResumeById itemId={queryResumeId} />}
          </>
        ) : (
          <>
            <section className="border-zinc-400 border-r flex-1 min-w-[30%]">
              <SectionJobs jobs={jobs} />
            </section>

            {queryJobId && <SectionJobById itemId={queryJobId} />}
          </>
        )}
      </main>
    </div>
  );
}
