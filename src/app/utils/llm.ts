import { ChatCohere } from "@langchain/cohere";

let llm = new ChatCohere({
  model: "command-r-plus",
  apiKey: process.env.COHERE_API_KEY,
});

export default llm;
