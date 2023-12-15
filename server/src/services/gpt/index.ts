import { INewResumeMetadata } from "../../@types";
import helpers from "../../helpers";
import prompts from "../../prompts";
import { ITranslateOptions } from "./@types";
import { config } from "./config";
import { OpenAI } from "langchain/llms/openai";

export default class Gpt {
  private openAiLlm: OpenAI;

  constructor() {
    this.openAiLlm = new OpenAI(config);
  }

  public async translate(options: ITranslateOptions): Promise<string> {
    const prompt = prompts.lang.translate
      .replace("{{source}}", options.source)
      .replace("{{target}}", options.targetLang);

    console.log({ prompt });

    const result = await this.openAiLlm.predict(prompt);

    console.log({ result });

    return result;
  }

  public async precessMetadata(source: string): Promise<INewResumeMetadata> {
    try {
      const prompt = prompts.extract.metadata.replace("{{source}}", source);
      let result: string = await this.openAiLlm.predict(prompt);

      while (!helpers.json.isValid(result))
        result = await this.openAiLlm.predict(prompt);

      const parsed = helpers.json.parse<INewResumeMetadata>(result);
      return parsed;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
