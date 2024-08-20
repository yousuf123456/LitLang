import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

let embeddings = new VoyageEmbeddings({
  inputType: "query",
  apiKey: process.env.VOYAGE_API_KEY,
  modelName: "voyage-large-2-instruct",
});

export default embeddings;
