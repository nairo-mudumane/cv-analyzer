import React from "react";
import { ISectionResumesProps } from "./@types";
import { StyledSectionJobs } from "./styles";
import { Container } from "../../components";
import moment from "moment";
import { useQueryParams } from "../../hooks";
import clsx from "clsx";

export default function SectionResumes({ resumes }: ISectionResumesProps) {
  const query = useQueryParams();

  const selectedResume = React.useMemo(() => query.get("resume"), [query]);

  const onResumeClick = (id: string) => query.set("resume", id);

  return (
    <StyledSectionJobs className="h-[90vh] overflow-y-auto">
      {resumes.map((resume) => {
        return (
          <li
            key={resume.id}
            onClick={() => onResumeClick(resume.id)}
            className={clsx(
              selectedResume === resume.id && "bg-[#d7e9fb] ",
              "job cursor-pointer py-4"
            )}
          >
            <Container className="px-8 ">
              <h3 className="text-primary underline-offset-2 font-bold text-lg md:text-xl">
                {resume.metadata?.name}
              </h3>
              <div className="text-zinc-600 text-xs uppercase">
                {resume.metadata?.headline}
              </div>

              <div className="text-sm">
                Applied {moment(resume.createdAt).fromNow()} (
                {moment(resume.createdAt).format("DD/MM/YYYY")})
              </div>
            </Container>
          </li>
        );
      })}
    </StyledSectionJobs>
  );
}
