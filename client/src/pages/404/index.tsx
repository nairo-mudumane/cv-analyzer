import { Button } from "@mui/material";

export function NotFound() {
  return (
    <main className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <div className="w-max-[10rem]">
        <img src="/not-found.svg" srcSet="/not-found.svg" alt="not found" />
      </div>

      <h2 className="text-primary text-3xl font-bold uppercase">
        Page not found
      </h2>

      <a href="/">
        <Button variant="outlined">Go to home page</Button>
      </a>
    </main>
  );
}
