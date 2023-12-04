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

    const result = await this.openAiLlm.predict(prompt);

    return result;
  }
}
