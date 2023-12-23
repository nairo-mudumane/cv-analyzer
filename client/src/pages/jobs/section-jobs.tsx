import clsx from "clsx";
import moment from "moment";
import { Container } from "../../components";
import { IJobsInnerProps } from "./@types";
import { useQueryParams } from "../../hooks";
import React from "react";
import { StyledSectionJobs } from "./styles";

export default function SectionJobs({ jobs }: IJobsInnerProps) {
  const query = useQueryParams();

  const selectedJob = React.useMemo(() => query.get("job"), [query]);

  const onJobClick = (id: string) => query.set("job", id, { replace: true });

  return (
    <StyledSectionJobs className="max-w-[30%] flex-1 border-r border-zinc-400">
      <ul>
        {jobs.map((job) => {
          const expired = new Date() > new Date(String(job.expiresAt));

          return (
            <li
              key={job.id}
              onClick={() => onJobClick(job.id)}
              className={clsx(
                selectedJob === job.id && "bg-[#d7e9fb] ",
                "job cursor-pointer py-4"
              )}
            >
              <Container className="px-8 ">
                <h3 className="text-primary underline-offset-2 font-bold text-lg md:text-xl">
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
                  {expired ? "Expired" : "Expires"}{" "}
                  {moment(job.expiresAt).fromNow()}
                </div>
              </Container>
            </li>
          );
        })}
      </ul>
    </StyledSectionJobs>
  );
}
