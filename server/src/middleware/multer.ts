import path from "path";
import multer from "multer";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";
import fs from "fs";

const limits = {
  fileSize: 1024 * 1024 * 10, // 10MB
  files: 1,
};

function fileFilter(
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) callback(null, true);
  else callback(null, false);
}

function filename(
  request: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) {
  const now = new Date().toISOString().toLowerCase();
  const name = encodeURIComponent(file.originalname);

  callback(null, `${now}_-_${name}`);
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const destinationPath = path.resolve(".tmp");

    fs.mkdir(destinationPath, { recursive: true }, (error) => {
      if (error) callback(error, "");
      else callback(null, destinationPath);
    });
  },
  filename,
});

export const localUpload = multer({
  storage,
  fileFilter,
  limits,
});
