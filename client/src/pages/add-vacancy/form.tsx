import { Button, TextField } from "@mui/material";
import { useInputText } from "../../hooks";
import React from "react";

export default function Form() {
  const input = useInputText({ headline: "", description: "" });

  async function onSubmit(event?: React.FormEvent) {
    event?.preventDefault();
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="shadow-md rounded p-4 md:min-w-[36vw] w-full grid gap-4"
      >
        <TextField
          autoFocus
          required
          label="Headline"
          name="headline"
          value={input.headline}
          onBlur={input.onBlur}
          onChange={input.onChange}
          error={input.errors.headline ? true : false}
          helperText={input.errors.headline ?? undefined}
        />

        <TextField
          required
          multiline
          minRows={4}
          maxRows={6}
          label="Description"
          name="description"
          value={input.description}
          onBlur={input.onBlur}
          onChange={input.onChange}
          error={input.errors.description ? true : false}
          helperText={input.errors.description ?? undefined}
        />

        <div className="w-max ml-auto">
          <Button variant="contained" type="submit">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
