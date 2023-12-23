import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-primary font-bold text-3xl uppercase">
        Cv 2Business
      </h1>

      <div className="flex gap-4 mt-6">
        <Link to="/jobs">
          <Button variant="contained">View Jobs</Button>
        </Link>

        <Link to="/upload">
          <Button variant="outlined">Upload Resume</Button>
        </Link>
      </div>
    </main>
  );
}
