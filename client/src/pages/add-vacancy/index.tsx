import { Container } from "../../components";
import Form from "./form";

export function AddVacancy() {
  return (
    <Container className="py-10 w-screen h-screen flex flex-col gap-4 items-center justify-between">
      <h1 className="text-primary font-bold text-3xl md:text-4xl">
        Post Opportunity
      </h1>

      <Form />
    </Container>
  );
}
