// import axios from "axios";

// const CHATGPT_BASE_URL = "https://api.openai.com/v1/chat/completions";
// const CHATGPT_MODEL = "gpt-3.5-turbo";

// export const postChatGPTMessage = async (message, openAIKey) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${openAIKey}`,
//     },
//   };

//   const userMessage = { role: "user", content: message };

//   const chatGPTData = {
//     model: CHATGPT_MODEL,
//     messages: [userMessage],
//   };

//   try {
//     console.log("into the chatpt call");
//     const response = await axios.post(CHATGPT_BASE_URL, chatGPTData, config);
//     const message = response?.data?.choices[0]?.message?.content;
//     return message;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// 2nd Approach

import OpenAIApi from "openai";

export const postChatGPTMessage = async (message, apiKey) => {
  const openai = new OpenAIApi({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });

    return completion?.choices[0]?.message?.content;
  } catch (error) {
    console.error(error);
    return;
  }
};

//3rd Approach using 3.3.0 !working

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   organization: "OrgKEY",
//   apiKey: "ApiKEY",
// });

// const openai = new OpenAIApi(configuration);

// export const postChatGPTMessage = async (message, apiKey) => {
//   try {
//     const chatCompletion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     return chatCompletion?.choices[0]?.message?.content;
//   } catch (error) {
//     console.error(error.message);
//   }
// };
