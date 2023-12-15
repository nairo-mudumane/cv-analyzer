import crypto from "crypto";

function randomBytes(size = 32): string {
  return crypto.randomBytes(size).toString("hex");
}

export default { randomBytes };
