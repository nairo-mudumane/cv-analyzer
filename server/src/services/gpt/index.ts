import { INewResumeMetadata, IResumeMetadata } from "../../@types";
import helpers from "../../helpers";
import prompts from "../../prompts";
import { IGetBestCandidateConfig, ITranslateOptions } from "./@types";
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

  public async getBestCandidate(
    data: IGetBestCandidateConfig
  ): Promise<Partial<IResumeMetadata>> {
    try {
      const prompt = prompts.extract.bestCandidate
        .replace("{{resumes}}", JSON.stringify(data.resumes))
        .replace("{{description}}", data.vacancyDescription)
        .replace("{{limit}}", String(data.candidateLength ?? 2));

      const result: string = await this.openAiLlm.predict(prompt);

      if (!helpers.json.isValid(result))
        throw new Error(
          "internal error: gpt exceed. please try again in 1 hour"
        );

      // let count = 0;
      // while (!helpers.json.isValid(result)) {
      //   if (count >= 2)
      // throw new Error(
      //   "internal error: gpt exceed. please try again in 1 hour"
      // );
      //   result = await this.openAiLlm.predict(prompt);
      //   count += 1;
      // }

      const parsed = helpers.json.parse<IResumeMetadata>(result);
      return parsed;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
