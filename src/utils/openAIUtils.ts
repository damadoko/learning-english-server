import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

import { TUTOR_PROMPT } from "../constants";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type SendMessageToChatGPTParams = {
  message: string;
  histories?: ChatCompletionMessageParam[];
  prompt?: string;
};

export const sendMessageToChatGPT = async ({
  message,
  histories = [],
  prompt = TUTOR_PROMPT,
}: SendMessageToChatGPTParams) => {
  const response = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt },
      ...histories,
      { role: "user", content: message },
    ],
  });

  return response.choices[0].message?.content;
};
