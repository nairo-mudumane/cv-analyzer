import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import clsx from "clsx";
import { useSelectedFile } from "../../hooks";

export function DraggableArea() {
  const { selected, setSelected } = useSelectedFile();

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    console.log({ acceptedFiles });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  React.useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0)
      if (acceptedFiles[0].type === "application/pdf")
        setSelected(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <form
      className={clsx(
        !selected && "flex-1",
        "h-screen flex items-center justify-center"
      )}
    >
      <label
        {...getRootProps()}
        className={clsx(
          selected ? "min-w-[36%]" : "min-w-[60%] cursor-pointer",
          "bg-[#7961f2] text-white rounded-lg p-2"
        )}
      >
        <div className="border-white min-h-[30vh] font-bold border border-dashed rounded-lg p-4 flex flex-col gap-4 items-center justify-center">
          <input
            {...getInputProps()}
            disabled={selected !== null}
            type="file"
            accept="application/pdf,application/vnd.ms-excel"
          />

          {selected ? (
            <div>{selected.name}</div>
          ) : (
            <div>
              <Button
                variant="contained"
                className="!bg-white !text-black rounded px-4 py-3 flex gap-4"
              >
                <UploadFile />
                <span>Choose File</span>
              </Button>

              <div className="text-zinc-300 text-sm mt-1">
                only ".pdf" files and max 16MB
              </div>
            </div>
          )}

          <div className="hidden ">Or drop files here</div>
        </div>
      </label>
    </form>
  );
}