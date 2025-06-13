import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const sendMessageToChatGPT = async (
  message: string,
  histories: ChatCompletionMessageParam[]
) => {
  const response = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...histories, { role: "user", content: message }],
  });

  return response.choices[0].message?.content;
};
