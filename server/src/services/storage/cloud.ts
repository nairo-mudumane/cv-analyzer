import helpers from "../../helpers";
import { UploadConfig } from "./@types";
import { mediaStorage } from "./config";

/**
 * uploads files to cloud
 */
export default class CloudUpload {
  private env = process.env.ENV;

  /**
   * uploads file to cloud
   * @param config media configuration
   * @returns file http url
   */
  async single(config: UploadConfig) {
    try {
      const fileLink = await mediaStorage
        .upload(config.filepath, {
          public: true,
          destination: `${this.env}/${config.destination}/${config.filename}`,
        })
        .then(async (response) => {
          await helpers.fileSystem.removeFile(config.filepath);
          return response[0].metadata.mediaLink as string;
        });
      return fileLink;
    } catch (error) {
      await helpers.fileSystem.removeFile(config.filepath);
      return undefined;
    }
  }
}
