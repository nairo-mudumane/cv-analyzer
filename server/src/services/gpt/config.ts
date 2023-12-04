import "dotenv/config";

export const config = {
  temperature: 0.5,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPEN_AI_APY_KEY,
};
