import axios from "axios";
import fs from "fs";

async function toBuffer(
  url: string,
  localUrl = false
): Promise<Buffer | undefined> {
  if (localUrl) return Buffer.from(fs.readFileSync(url));

  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
}

export default { toBuffer };
