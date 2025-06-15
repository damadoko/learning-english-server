import { Request, Response } from "express";
import { genTransPrompt, sendMessageToChatGPT } from "../utils/openAIUtils";

export const getTranslation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const word = req.query?.word;
    if (!word) {
      res
        .status(400)
        .send({ success: false, error: { message: "Missing word" } });
      return;
    }
    if (typeof word !== "string") {
      res
        .status(400)
        .send({ success: false, error: { message: "Invalid word" } });
    } else {
      const reply = await sendMessageToChatGPT({
        prompt: genTransPrompt(word),
      });
      res.send({ success: true, translate: JSON.parse(reply) });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error: { message: "Server error" } });
  }
};
