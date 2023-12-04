import axios from "axios";

export async function downloadBuffer(url: string): Promise<Buffer | undefined> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
}
