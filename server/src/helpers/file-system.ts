import fs from "fs";
import path from "path";

/** removeFile
 * permanently deletes a file
 * @param filePath string containing the path of the file to be deleted
 */
export async function removeFile(filePath: string): Promise<void> {
  return await new Promise<void>((resolve, reject) => {
    try {
      filePath = path.resolve(filePath);
      return resolve(fs.unlinkSync(filePath));
    } catch (error) {
      reject(error);
    }
  });
}

/** writeFile
 * writes file into a given path
 * @param filename string containing the path to the file
 * @param data string or js Buffer to write into the file
 */
export async function writeFile(
  filename: string,
  data: string | NodeJS.ArrayBufferView
): Promise<void> {
  return await new Promise<void>((resolve, reject) => {
    try {
      filename = path.join(__dirname, "../../", filename);

      return resolve(
        fs.writeFile(filename, data, (err) => {
          if (err) throw err;
          else return;
        })
      );
    } catch (error) {
      reject(error);
    }
  });
}

/** fromRootTo
 * @returns a string containing path from project root directory
 * @param pathTo destination path
 */
export function fromRootTo(pathTo: string): string {
  const result = path.join(__dirname, "../../", pathTo);
  return result;
}
