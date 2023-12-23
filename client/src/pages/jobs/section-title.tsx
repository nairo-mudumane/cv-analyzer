import { Container } from "../../components";
import { IJobsInnerProps } from "./@types";
import { Button, CircularProgress } from "@mui/material";

export default function SectionTitle({
  jobs,
  loading,
  onAction,
}: IJobsInnerProps) {
  return (
    <>
      <Container className="flex gap-4 justify-between">
        <div className="flex-1">
          <h2 className="text-primary font-bold text-xl md:text-3xl">
            Available job opportunities
            <span className="text-zinc-400 text-base block">
              {jobs.length} results
            </span>
          </h2>
        </div>

        <div>
          <Button
            size="small"
            variant="contained"
            disabled={loading}
            className="gap-2"
            onClick={onAction}
          >
            {!loading ? (
              "New job"
            ) : (
              <>
                <span>Loading</span>
                <CircularProgress size={16} color="inherit" />
              </>
            )}
          </Button>
        </div>
      </Container>
    </>
  );
}
