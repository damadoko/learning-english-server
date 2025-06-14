import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

import { REPLACE_WORD, TRANS_PROMPT, TUTOR_PROMPT } from "../constants";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type SendMessageToChatGPTParams = {
  message?: string;
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
      ...(message ? [{ role: "user", content: message } as const] : []),
    ],
  });

  return response.choices[0].message?.content;
};

export const genTransPrompt = (word: string) => {
  return TRANS_PROMPT.replaceAll(REPLACE_WORD, word);
};
