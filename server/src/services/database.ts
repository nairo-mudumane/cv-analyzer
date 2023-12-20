import { PrismaClient } from "@prisma/client";
import { OnConnectCallback } from "./@types";

const prisma = new PrismaClient({ log: ["warn", "error"] });

prisma.vacancy;

const $connect = async (callback?: OnConnectCallback) => {
  try {
    console.log("connecting to database...");
    await prisma.$connect();
    console.log("connected to database");

    if (callback) callback();
  } catch (error) {
    console.log("failed to connect to database");
    console.error(error);
    process.exit(1);
  }
};

export default {
  $connect,
  resume: prisma.resume,
  resumeMetadata: prisma.resumeMetadata,
  vacancy: prisma.vacancy,
};
