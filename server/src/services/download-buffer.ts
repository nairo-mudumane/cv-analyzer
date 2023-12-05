import axios from "axios";
import fs from "fs";

export async function downloadBuffer(
  url: string,
  localUrl = false
): Promise<Buffer | undefined> {
  if (localUrl) return Buffer.from(fs.readFileSync(url));

  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
}
