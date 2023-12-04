import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

export function DraggableArea() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    console.log({ acceptedFiles });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  React.useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0)
      setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <form className="flex-1 h-screen flex items-center justify-center">
      <label
        {...getRootProps()}
        className="bg-[#7961f2] text-white rounded-lg p-2 cursor-pointer min-w-[60%]"
      >
        <div className="border-white min-h-[30vh] font-bold border border-dashed rounded-lg p-4 flex flex-col gap-4 items-center justify-center">
          <input
            {...getInputProps()}
            type="file"
            accept="application/pdf,application/vnd.ms-excel"
          />
          <div>
            {selectedFile ? (
              <div>{selectedFile.name}</div>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className="hidden ">Or drop files here</div>
        </div>
      </label>
    </form>
  );
}
